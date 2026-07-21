import React from "react";
import {parse} from "toml";
import CodeBlock from '@theme/CodeBlock';

import yazi from "!!raw-loader!./yazi-default.toml";
import keymap from "!!raw-loader!./keymap-default.toml";

import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {useLocation} from "@docusaurus/router";


function getRelevantSettingsFile() {
        switch (useLocation().pathname) {
                case "/docs/configuration/yazi":
                        return yazi;
                case "/docs/configuration/keymap":
                        return keymap;
                
        }

}

function getDefaultAsCodeblock(data: object, section: string, key?: string) {
        // Get default value & stringify
        const rawData = key ? data[section][key] : data[section];
        const value = JSON.stringify(rawData);
        return (
                <code>{value}</code>
        )
}

// For raw=true
function _getRawtoml(defaultFileString: string, regex: RegExp, cb: (val: string) => string) {
        const toml = cb(defaultFileString.match(regex)[0])
        parse(toml)  // Sanity check
        return toml;
}

function getRawtoml(defaultFileString: string, section: string, key?: string) {
        const sectionToml = _getRawtoml(
                defaultFileString,
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

export function Defaults({section, searchKey}: {section: string, searchKey: string}) {
        const data = parse(getRelevantSettingsFile());

        const sectionSettings = data[section]
        const relevantSettings = Object.keys(sectionSettings).filter(setting => setting.includes(searchKey));
        const elements = relevantSettings.map(key => {
                return (
                        <li>
                                {key} = {getDefaultAsCodeblock(data, section, key)}
                        </li>
                )
        });
        return (
                <section class="default">
                        <p>Default values including <code>{searchKey}</code>:</p>
                        <ul>
                                {elements}
                        </ul>
                </section>
        )
}

export default function Setting({id, show_key, raw=false, asList=false, ...props}: {children: any, id: string, raw:boolean, asList?: boolean, show_key?:boolean}) {
        const relevantFile = getRelevantSettingsFile();
        const data = parse(relevantFile);
        const [section, key] = id.split(".", 2);  // Get section & key

        // Optionally add "for {key}" to output
        const p = `Default value ${show_key ? `for ${key}` : ""} is`

        if (!raw) {
                return (
                        <p className="default" {...props}>{p} {getDefaultAsCodeblock(data, section, key)}</p>
                )
        } else {
                return (
                        <section className="default">
                                <p {...props}>{p}:</p>
                                <CodeBlock language="toml">
                                        {getRawtoml(relevantFile, section, key)}
                                </CodeBlock>
                        </section>

                )
        }
}

