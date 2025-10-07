import { Region } from "../types/SharedSearchParams";

export enum AuthType {
  Scraped,
  DeveloperToken,
  UserTokenViaDevToken,
  UserTokenUnofficial,
}

const BaseURLs: Record<AuthType, string> = {
  [AuthType.Scraped]: "https://amp-api-edge.music.apple.com",
  [AuthType.DeveloperToken]: "https://api.music.apple.com",
  [AuthType.UserTokenViaDevToken]: "https://api.music.apple.com",
  [AuthType.UserTokenUnofficial]: "https://amp-api-edge.music.apple.com",
};

export type AppleMusicConfigParams = {
  region?: Region;
  authType?: AuthType;
};

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
    if (!(authType in BaseURLs)) {
      throw new Error("Invalid AuthType");
    }
    return BaseURLs[AuthType[authType.toString()]];
  }
}
