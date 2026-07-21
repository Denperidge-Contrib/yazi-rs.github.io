import React from "react";
import {parse} from "toml";
import CodeBlock from '@theme/CodeBlock';
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import defaults from "!!raw-loader!./yazi-default.toml";

function getRawtoml(data: string, section: string) {
        const toml = data.match(new RegExp("\\[" + section + "\\](.|\n)*?^\\[", "gm"))[0].replace(/\]$\n\n^\[/m, "]")
        parse(toml)  // Sanity check
        return toml;
}

const data = parse(defaults);
export default function Setting({id, show_key, raw=false, ...props}: {children: any, id: string, pretty:boolean, show_key?:boolean}) {
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
                                        {getRawtoml(defaults, section)}
                                </CodeBlock>
                        </section>

                )
        }
}

