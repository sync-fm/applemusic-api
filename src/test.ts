import { AppleMusic } from "./AppleMusic";
import { View } from "./types/SharedSearchParams";
import { SearchEndpointTypes } from "./endpoints/Search";
import fs from "fs"

const am = new AppleMusic();
await am.init();

console.log("meow", await am.Albums.Get({
    id: "310730204"
}));
