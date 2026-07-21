import Heading from "@theme/Heading";
import React, {} from "react";
import {parse} from "toml";


import defaults from "!!raw-loader!./yazi-default.toml";

console.log(defaults);

// export default parse(defaults);
const data = parse(defaults);
export default function({section}: {section: string}) {
        const [part1, part2] = section.split(".", 2);
        return `<p>Default value is ${data[part1][part2]}</p>`
}



// export default function Setting({children, section}): JSX.Element {
//         return Object.keys()
//         const newChildren = [];
//
//         React.Children.forEach(children, (child) => {
//                 // newChildren.push(Object.keys(child).join(", "))
//                 newChildren.push(React.cloneElement(child, {
//                         onPointerMove: "aaa"
//                 }))
//         })
//         
//         // children = React.Children.map(children, (child) => {
//         //         
//         //         return child
//         //         if (!child.props.children) { return }
//         //         if (!child.props.children[0]) return
//         //         return child.props.children
//         //         return React.cloneElement(child, {
//         //                 
//         //         })
//         // });
//         // console.log(children)
//         //
//         return (
//                 <section>
//                         {newChildren}
//                 </section>
//         )
// }
