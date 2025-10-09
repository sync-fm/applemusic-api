import { AppleMusic, AuthType, Region } from "./AppleMusic";

const am = new AppleMusic({
	authType: AuthType.Scraped,
	region: Region.US,
});

await am.init();

const album = await am.Albums.get({ id: "310730204" });

console.log("Album:", album.data[0].attributes);
