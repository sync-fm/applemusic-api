import type { AxiosInstance } from "axios";
import { AlbumsEndpoint } from "./endpoints/Albums";
import { ArtistsEndpoint } from "./endpoints/Artists";
import { HintsEndpoint } from "./endpoints/Hints";
import { MusicVideosEndpoint } from "./endpoints/MusicVideos";
import { SearchEndpoint } from "./endpoints/Search";
import { SongsEndpoint } from "./endpoints/Songs";
import { SuggestionsEndpoint } from "./endpoints/Suggestions";
import { getAuthenticatedAxios } from "./utils/AxiosManager";
import { AppleMusicConfig, type AppleMusicConfigParams } from "./utils/Config";
import { ERROR } from "./utils/Constants";
import type { Logger } from "./utils/Logger";

/**
 * High-level Apple Music API client composed of typed endpoint helpers.
 *
 * @category Apple Music Client
 * @remarks
 * The client lazily instantiates every endpoint and shares a common configuration
 * and authenticated Axios instance. You must call {@link AppleMusic.init | init()}
 * before accessing any endpoint methods.
 *
 * @example
 * ```ts
 * const client = new AppleMusic({ region: Region.US });
 * await client.init();
 *
 * const album = await client.Albums.get({ id: "310730204" });
 * console.log(album.data[0].attributes?.name);
 * ```
 */
export class AppleMusic {
	private client: AxiosInstance | null = null;
	private initialized = false;

	/**
	 * Search endpoint for performing search queries across the Apple Music catalog.
	 * @group Endpoints
	 */
	public readonly Search!: SearchEndpoint;

	/**
	 * Suggestions endpoint for retrieving search term suggestions.
	 * @group Endpoints
	 */
	public readonly Suggestions!: SuggestionsEndpoint;

	/**
	 * Hints endpoint for retrieving search hints.
	 * @group Endpoints
	 */
	public readonly Hints!: HintsEndpoint;

	/**
	 * Albums endpoint for album-related operations.
	 * @group Endpoints
	 */
	public readonly Albums!: AlbumsEndpoint;

	/**
	 * Songs endpoint for song-related operations.
	 * @group Endpoints
	 */
	public readonly Songs!: SongsEndpoint;

	/**
	 * Artists endpoint for artist-related operations.
	 * @group Endpoints
	 */
	public readonly Artists!: ArtistsEndpoint;

	/**
	 * Music Videos endpoint for music video operations.
	 * @group Endpoints
	 */
	public readonly MusicVideos!: MusicVideosEndpoint;

	/**
	 * Structured logger propagated to every endpoint.
	 */
	public get log(): Logger {
		return this.config.logger;
	}

	/**
	 * Replace the underlying logger at runtime.
	 */
	public set log(logger: Logger) {
		this.config.setLogger(logger);
	}

	/**
	 * Mutable configuration backing this client instance.
	 */
	public config: AppleMusicConfig;

	/**
	 * Create a new Apple Music client.
	 *
	 * @param config - Optional configuration object or instance to seed the client.
	 */
	public constructor(config?: AppleMusicConfig | AppleMusicConfigParams) {
		this.config =
			config instanceof AppleMusicConfig
				? config
				: new AppleMusicConfig(config);

		// Create proxies for endpoints that throw helpful errors before initialization
		/** @internal */
		const createUninitializedProxy = <T extends object>(): T => {
			return new Proxy({} as T, {
				get: () => {
					throw new Error(ERROR.CLIENT_NOT_INITIALIZED);
				},
			});
		};

		this.Search = createUninitializedProxy<SearchEndpoint>();
		this.Suggestions = createUninitializedProxy<SuggestionsEndpoint>();
		this.Hints = createUninitializedProxy<HintsEndpoint>();
		this.Albums = createUninitializedProxy<AlbumsEndpoint>();
		this.Songs = createUninitializedProxy<SongsEndpoint>();
		this.Artists = createUninitializedProxy<ArtistsEndpoint>();
		this.MusicVideos = createUninitializedProxy<MusicVideosEndpoint>();
	}

	/** @internal */
	private requireInitialized(): void {
		if (!this.initialized) {
			throw new Error(ERROR.CLIENT_NOT_INITIALIZED);
		}
	}

	/**
	 * Authenticate with Apple Music and prepare every endpoint for use.
	 *
	 * @remarks
	 * This method is idempotent. Repeated calls reuse the same configuration and reinitialize
	 * each endpoint. All endpoint accessors throw until initialization succeeds.
	 *
	 * @throws {@link Error} If authentication fails.
	 */
	public async init(): Promise<void> {
		this.client = await getAuthenticatedAxios(this.config);
		this.log.debug("Base Apple Music client ready");

		// @ts-expect-error - We're initializing readonly properties
		this.Search = new SearchEndpoint(this.config);
		await this.Search.init();
		this.log.debug("Search endpoint ready");

		// @ts-expect-error - We're initializing readonly properties
		this.Suggestions = new SuggestionsEndpoint(this.config);
		await this.Suggestions.init();
		this.log.debug("Suggestions endpoint ready");

		// @ts-expect-error - We're initializing readonly properties
		this.Hints = new HintsEndpoint(this.config);
		await this.Hints.init();
		this.log.debug("Hints endpoint ready");

		// @ts-expect-error - We're initializing readonly properties
		this.Albums = new AlbumsEndpoint(this.config);
		await this.Albums.init();
		this.log.debug("Albums endpoint ready");

		// @ts-expect-error - We're initializing readonly properties
		this.Songs = new SongsEndpoint(this.config);
		await this.Songs.init();
		this.log.debug("Songs endpoint ready");

		// @ts-expect-error - We're initializing readonly properties
		this.Artists = new ArtistsEndpoint(this.config);
		await this.Artists.init();
		this.log.debug("Artists endpoint ready");

		// @ts-expect-error - We're initializing readonly properties
		this.MusicVideos = new MusicVideosEndpoint(this.config);
		await this.MusicVideos.init();
		this.log.debug("Music Videos endpoint ready");

		this.initialized = true;
		this.log.debug("Apple Music API initialized :333");
	}

	/**
	 * Perform a lightweight request to validate the configured developer token.
	 *
	 * @returns Whether the token is currently accepted by Apple Music.
	 */
	public async verifyTokenValidity(): Promise<boolean> {
		this.requireInitialized();
		try {
			const res = await this.client.get(
				"https://amp-api-edge.music.apple.com/v1/test",
			);
			return res.status === 200;
		} catch {
			return false;
		}
	}
}
