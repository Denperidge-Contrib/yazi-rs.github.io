import { writeFile } from "fs/promises";
import versions from "../versions.json" with {type: "json"};
import {join} from "path";

const FILENAME = "yazi-default.toml";

const stable = versions[0];

for (const data of [
	{
		"target": `../docs/configuration/${FILENAME}`,
		"url": "https://raw.githubusercontent.com/sxyazi/yazi/refs/heads/main/yazi-config/preset/yazi-default.toml"
	},
	{
		"target": `../versioned_docs/version-${stable}/configuration/${FILENAME}`,
		"url": `https://raw.githubusercontent.com/sxyazi/yazi/refs/tags/v${stable}/yazi-config/preset/yazi-default.toml`
	}
]) {
	data.target = join(import.meta.dirname, data.target);
	const contents = await (await fetch(data.url)).text();
	writeFile(data.target, contents, {encoding: "utf-8"})
}

