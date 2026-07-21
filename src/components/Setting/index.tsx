import React from "react";
import {parse} from "toml";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import defaults from "!!raw-loader!./yazi-default.toml";

const data = parse(defaults);
export default function({children, id}: {children: any, id: string}) {
        const [section, key] = id.split(".", 2);
        const def = JSON.stringify(data[section][key]);
        return (
                <section>
                        <Heading as="h3" id={id}>
                                <code>{key}</code>
                        </Heading>
                        {children}
                        <p>Default value is <code>{def}</code></p>

                </section>
        )
}

