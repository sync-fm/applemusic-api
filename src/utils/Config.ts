import { Region } from "../types/SharedSearchParams";

/**
 * Authentication modes supported by the Apple Music API client.
 * @category Configuration
 */
export enum AuthType {
  Scraped,
  DeveloperToken,
  UserTokenViaDevToken,
  UserTokenUnofficial,
}

/**
 * Base URL mapping for each {@link AuthType}.
 * @category Configuration
 */
export const BaseURLs: Record<AuthType, string> = {
  [AuthType.Scraped]: "https://amp-api-edge.music.apple.com",
  [AuthType.DeveloperToken]: "https://api.music.apple.com",
  [AuthType.UserTokenViaDevToken]: "https://api.music.apple.com",
  [AuthType.UserTokenUnofficial]: "https://amp-api-edge.music.apple.com",
};

/**
 * Parameters accepted by {@link AppleMusicConfig}.
 * @category Configuration
 */
export type AppleMusicConfigParams = {
  region?: Region;
  authType?: AuthType;
};

/**
 * Mutable configuration shared across endpoints for an {@link AppleMusic} client.
 * @category Configuration
 */
export class AppleMusicConfig {
  public region: Region = Region.US;
  public authType: AuthType = AuthType.Scraped;

  constructor(config?: Partial<AppleMusicConfigParams>) {
    if (config) {
      if (config.region) this.region = config.region;
      if (config.authType) this.authType = config.authType;
    }
  }
  public setRegion(region: Region): void {
    this.region = region;
  }

  public setAuthType(authType: AuthType): void {
    this.authType = authType;
  }

  public getBaseURL(): string {
    return BaseURLs[this.authType];
  }

  public getBaseURLForAuthType(authType: AuthType): string {
    switch (authType) {
      case AuthType.Scraped:
        return BaseURLs[AuthType.Scraped];
      case AuthType.DeveloperToken:
        return BaseURLs[AuthType.DeveloperToken];
      case AuthType.UserTokenViaDevToken:
        return BaseURLs[AuthType.UserTokenViaDevToken];
      case AuthType.UserTokenUnofficial:
        return BaseURLs[AuthType.UserTokenUnofficial];
      default:
        throw new Error("Invalid AuthType");
    }
  }
}
