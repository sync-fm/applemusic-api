/**
 * Internal token acquisition and caching helpers.
 *
 * @module Utilities/TokenStorage
 */
import type { AxiosInstance } from "axios";
import type { AppleMusicConfig } from "./Config";
import type { Logger } from "./Logger";

/** @internal */
export class TokenStorage {
	private token: string;
	private expiresAt: number; // Unix timestamp in milliseconds
	private tokenLifetime: number; // in milliseconds
	private refreshThreshold: number; // in milliseconds
	private isTokenValid: boolean = false;

	private ax: AxiosInstance | null = null;
	private readonly config: AppleMusicConfig;

	constructor(
		config: AppleMusicConfig,
		axiosClient: AxiosInstance,
		tokenLifetime: number = 3600000,
		refreshThreshold: number = 10 * 1000,
	) {
		this.token = "";
		this.expiresAt = 0;
		this.tokenLifetime = tokenLifetime;
		this.refreshThreshold = refreshThreshold;
		this.ax = axiosClient;
		this.config = config;
	}

	public set axiosClient(ax: AxiosInstance) {
		this.ax = ax;
	}

	private get logger(): Logger {
		return this.config.logger;
	}

	private async yoinkToken(): Promise<{
		token: string;
		success: boolean;
		errorMessage?: string;
	}> {
		this.logger.debug("yoinkToken: fetching root document");
		const res = await this.ax.get("/");
		this.logger.debug("yoinkToken: html length", res.data.length);
		const html = res.data as string;
		const scriptURLMatch = html.match(
			/crossorigin src="(\/assets\/index.+?\.js)"/,
		);
		if (!scriptURLMatch) {
			this.logger.error("yoinkToken: failed to find script asset URL");
			return {
				token: "",
				success: false,
				errorMessage: "Failed to find script asset URL",
			};
		}
		const baseJSUrl = `${scriptURLMatch[1].trim()}`;
		this.logger.debug("yoinkToken: fetching asset", baseJSUrl);
		const jsRes = await this.ax.get(baseJSUrl);
		this.logger.debug("yoinkToken: asset length", jsRes.data.length);
		const js = jsRes.data as string;
		const tokenMatch = js.match(/(eyJhbGc.+?)"/);
		if (!tokenMatch) {
			this.logger.error("yoinkToken: failed to locate token in asset");
			return {
				token: "",
				success: false,
				errorMessage: "Failed to find token in JS",
			};
		}
		this.logger.debug(
			"yoinkToken: extracted token prefix",
			tokenMatch[1].substring(0, 10),
		);
		return { token: tokenMatch[1].trim(), success: true };
	}

	private async validateToken(): Promise<{
		valid: boolean;
		errorMessage?: string;
	}> {
		if (!this.token) {
			return { valid: false, errorMessage: "No token" };
		}
		this.logger.debug("validateToken: validating token");
		const res = await this.ax.request({
			url: "https://amp-api-edge.music.apple.com/v1/test",
			method: "GET",
			withCredentials: true,
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15",
				"Accept-Language": "en-US,en;q=0.5",
				Authorization: this.token ? `Bearer ${this.token}` : "",
				Origin: "https://music.apple.com",
				Referer: "https://music.apple.com/",
			},
		});
		this.logger.debug("validateToken: status", res.status);
		return { valid: res.status === 200 };
	}

	private isTokenExpiringSoon(): boolean {
		const now = Date.now();
		return this.expiresAt - now < this.refreshThreshold;
	}

	public async getToken(): Promise<string> {
		this.logger.debug(
			"TokenStorage.getToken",
			JSON.stringify({
				valid: this.isTokenValid,
				expiresIn: this.expiresIn,
				expiringSoon: this.isTokenExpiringSoon(),
			}),
		);
		if (this.isTokenValid && !this.isTokenExpiringSoon()) {
			this.logger.debug("TokenStorage: returning cached token");
			return this.token;
		}

		this.logger.debug("TokenStorage: fetching new token");
		const { token, success, errorMessage } = await this.yoinkToken();
		if (!success) {
			this.logger.error("TokenStorage: failed to fetch token", errorMessage);
			throw new Error(`Failed to fetch token: ${errorMessage}`);
		}

		this.token = token;
		this.expiresAt = Date.now() + this.tokenLifetime;

		const { valid, errorMessage: validationError } = await this.validateToken();
		if (!valid) {
			this.isTokenValid = false;
			this.logger.error(
				"TokenStorage: fetched token failed validation",
				validationError,
			);
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
