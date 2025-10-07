import { test, expect } from "vitest";
import { AppleMusicConfig, AuthType } from "./Config";
import { Region } from "../types/SharedSearchParams";

test("Can get BaseURL for defined AuthTypes", () => {
  const config = new AppleMusicConfig();

  config.setAuthType(AuthType.Scraped);
  expect(config.getBaseURL()).toBe("https://amp-api-edge.music.apple.com");

  config.setAuthType(AuthType.DeveloperToken);
  expect(config.getBaseURL()).toBe("https://api.music.apple.com");

  config.setAuthType(AuthType.UserTokenViaDevToken);
  expect(config.getBaseURL()).toBe("https://api.music.apple.com");

  config.setAuthType(AuthType.UserTokenUnofficial);
  expect(config.getBaseURL()).toBe("https://amp-api-edge.music.apple.com");
});

test("getBaseURLForAuthType throws error for invalid AuthType", () => {
  const config = new AppleMusicConfig();

  expect(() => config.getBaseURLForAuthType(999 as AuthType)).toThrow(
    "Invalid AuthType"
  );
});

test("Can construct AppleMusicConfig with initial values", () => {
  const config = new AppleMusicConfig({
    region: Region.DK,
    authType: AuthType.DeveloperToken,
  });

  expect(config.region).toBe("dk");
  expect(config.authType).toBe(AuthType.DeveloperToken);
  expect(config.getBaseURL()).toBe("https://api.music.apple.com");
});

test("Can change region and authType after construction", () => {
  const config = new AppleMusicConfig();

  expect(config.region).toBe(Region.US);
  expect(config.authType).toBe(AuthType.Scraped);

  config.setRegion(Region.FR);
  config.setAuthType(AuthType.UserTokenViaDevToken);

  expect(config.region).toBe(Region.FR);
  expect(config.authType).toBe(AuthType.UserTokenViaDevToken);
  expect(config.getBaseURL()).toBe("https://api.music.apple.com");
});
