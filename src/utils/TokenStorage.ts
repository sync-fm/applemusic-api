import { AxiosInstance } from "axios";

export class TokenStorage {
    private token: string;
    private expiresAt: number; // Unix timestamp in milliseconds
    private tokenLifetime: number; // in milliseconds
    private refreshThreshold: number; // in milliseconds
    private isTokenValid: boolean = false;

    private ax: AxiosInstance | null = null;

    constructor(axiosClient: AxiosInstance, tokenLifetime: number = 3600000, refreshThreshold: number = 10 * 1000) {
        this.token = "";
        this.expiresAt = 0;
        this.tokenLifetime = tokenLifetime;
        this.refreshThreshold = refreshThreshold;
        this.ax = axiosClient;
    }

    public set axiosClient(ax: AxiosInstance) {
        this.ax = ax;
    }

    private async yoinkToken(): Promise<{ token: string, success: boolean, errorMessage?: string }> {
        console.log("yoinkToken: getting /")
        const res = await this.ax.get("/")
        console.log("yoinkToken: got html, length:", res.data.length)
        const html = res.data as string
        const scriptURLMatch = html.match(/crossorigin src="(\/assets\/index.+?\.js)"/)
        if (!scriptURLMatch) {
            return { token: "", success: false, errorMessage: "Failed to find script asset URL" }
        }
        const baseJSUrl = `${scriptURLMatch[1].trim()}`
        console.log("yoinkToken: getting js", baseJSUrl)
        const jsRes = await this.ax.get(baseJSUrl)
        console.log("yoinkToken: got js, length:", jsRes.data.length)
        const js = jsRes.data as string
        const tokenMatch = js.match(/(eyJhbGc.+?)"/)
        if (!tokenMatch) {
            return { token: "", success: false, errorMessage: "Failed to find token in JS" }
        }
        console.log("yoinkToken: found token:", tokenMatch[1].substring(0, 10))
        return { token: tokenMatch[1].trim(), success: true }
    }

    private async validateToken(): Promise<{ valid: boolean, errorMessage?: string }> {
        if (!this.token) {
            return { valid: false, errorMessage: "No token" }
        }
        console.log("validateToken: validating token")
        const res = await this.ax.request({
            url: "https://amp-api-edge.music.apple.com/v1/test",
            method: "GET",
            withCredentials: true,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15",
                "Accept-Language": "en-US,en;q=0.5",
                "Authorization": this.token ? `Bearer ${this.token}` : "",
                "Origin": "https://music.apple.com",
                "Referer": "https://music.apple.com/",
            }
        })
        console.log("validateToken: response status:", res.status)
        return { valid: res.status === 200 }
    }

    private isTokenExpiringSoon(): boolean {
        const now = Date.now();
        return (this.expiresAt - now) < this.refreshThreshold;
    }

    public async getToken(): Promise<string> {
        console.log("TokenStorage.getToken called, valid:", this.isTokenValid, "expiring soon:", this.isTokenExpiringSoon())
        if (this.isTokenValid && !this.isTokenExpiringSoon()) {
            console.log("returning cached token")
            return this.token;
        }

        console.log("fetching new token")
        const { token, success, errorMessage } = await this.yoinkToken();
        if (!success) {
            throw new Error(`Failed to fetch token: ${errorMessage}`);
        }

        this.token = token;
        this.expiresAt = Date.now() + this.tokenLifetime;

        const { valid, errorMessage: validationError } = await this.validateToken();
        if (!valid) {
            this.isTokenValid = false;
            throw new Error(`Fetched token is invalid: ${validationError}`);
        }

        this.isTokenValid = true;
        return this.token;
    }

    public get valid(): boolean {
        return this.isTokenValid;
    }

    public get expiresIn(): number {
        return Math.max(0, this.expiresAt - Date.now());
    }

    public get currentToken(): string {
        return this.token;
    }
}