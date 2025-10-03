import axios, { AxiosInstance } from "axios"
import { Cookie, CookieJar } from "tough-cookie"
import { TokenStorage } from "./TokenStorage";

class AxiosManager {
    private cookiejar: CookieJar
    private tokenAxios: AxiosInstance
    private apiAxios: AxiosInstance | null = null
    private tokenStorage: TokenStorage
    private lastToken: string = ""

    constructor() {
        this.cookiejar = new CookieJar()
        this.tokenAxios = this.createAxiosInstance()
        this.apiAxios = this.createAxiosInstance()
        this.tokenStorage = new TokenStorage(this.tokenAxios)
        this.addAuthInterceptor()
    }

    private createAxiosInstance(): AxiosInstance {
        const instance = axios.create({
            baseURL: "https://music.apple.com/",
            headers: { // yummy apple puter :D
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15",
                "Accept-Language": "en-US,en;q=0.5",
                "Origin": "https://music.apple.com",
                "Referer": "https://music.apple.com/",
            },
            withCredentials: true,
            timeout: 10000, // 10 seconds timeout
        })

        // Cookie interceptors
        instance.interceptors.request.use(req => {
            if (req.baseURL) {
                const cookieString = this.cookiejar.getCookieStringSync(req.baseURL)
                if (cookieString) {
                    req.headers["cookie"] = cookieString
                }
            }
            return req
        })

        instance.interceptors.response.use(res => {
            if (res.headers && res.config.baseURL) {
                const cookieStrings = res.headers["set-cookie"] || []
                for (const cookieString of cookieStrings) {
                    const cookie = Cookie.parse(cookieString)
                    if (cookie) {
                        this.cookiejar.setCookieSync(cookie, res.config.baseURL)
                    }
                }
            }
            return res
        })

        return instance
    }

    private addAuthInterceptor() {
        this.apiAxios!.interceptors.request.use(async req => {
            // Only add auth for API requests to amp-api, not for token fetching on music.apple.com
            if (req.url && req.url.includes('amp-api')) {
                let token = this.tokenStorage.currentToken
                if (!token) {
                    token = await this.tokenStorage.getToken()
                }
                req.headers["Authorization"] = `Bearer ${token}`
            }
            return req
        })
    }

    public async getInstance(): Promise<AxiosInstance> {
        const currentToken = await this.tokenStorage.getToken()
        if (currentToken !== this.lastToken) {
            // New token, create new instances with new cookie jar
            this.cookiejar = new CookieJar()
            this.tokenAxios = this.createAxiosInstance()
            this.apiAxios = this.createAxiosInstance()
            this.tokenStorage.axiosClient = this.tokenAxios
            this.addAuthInterceptor()
            this.lastToken = currentToken
        }
        return this.apiAxios
    }
}

const axiosManager = new AxiosManager()

export default axiosManager
export { AxiosManager }

export async function getAuthenticatedAxios(): Promise<AxiosInstance> {
    return await axiosManager.getInstance()
}