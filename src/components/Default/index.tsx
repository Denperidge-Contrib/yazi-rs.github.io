import React from "react";
import {parse} from "toml";
import CodeBlock from '@theme/CodeBlock';
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import defaults from "!!raw-loader!./yazi-default.toml";

function _getRawtoml(data: string, regex: RegExp, cb: (val: string) => string) {
        const toml = cb(data.match(regex)[0])
        parse(toml)  // Sanity check
        return toml;
}

function getRawtoml(data: string, section: string, key?: string) {

        const sectionToml = _getRawtoml(
                data,
                new RegExp("\\[" + section + "\\](.|\n)*?^\\[", "gm"),
                (val) => val.replace(/\]$\n\n^\[/m, "]")
        );
        if (!key) { return sectionToml; }
        else {
                return _getRawtoml(
                        sectionToml,
                        new RegExp(key +"(.|\n)*?\]", "gm"),
                        (val) => val)
        }
}

const data = parse(defaults);
export default function Setting({id, show_key, raw=false, ...props}: {children: any, id: string, raw:boolean, show_key?:boolean}) {
        const [section, key] = id.split(".", 2);  // Get section & key

        // Optionally add "for {key}" to output
        const p = `Default value ${show_key ? `for ${key}` : ""} is`

        if (!raw) {
                // Get default value & stringify
                const rawData = key ? data[section][key] : data[section];
                const value = JSON.stringify(rawData);
                return (
                        <p className="default" {...props}>{p} <code>{value}</code></p>
                )
        } else {
                return (
                        <section className="default">
                                <p {...props}>{p}:</p>
                                <CodeBlock language="toml">
                                        {getRawtoml(defaults, section, key)}
                                </CodeBlock>
                        </section>

                )
        }
}

