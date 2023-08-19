import mdui from "mdui";
import { ABase, ElTree, ReturnValue } from "./types.js";
import { inject } from "./inject.js";
import { value } from "./value.js";

class AutoForm<T extends ABase> {
    readonly template: T
    // @ts-ignore
    el_tree: ElTree<T>

    constructor (template: T) {
        this.template = template
    }

    init(el: HTMLDivElement): void {
        this.el_tree = inject(this.template)
        el.appendChild(this.el_tree.div)
        mdui.mutation()
        console.log(this.el_tree)
    }

    value(): ReturnValue<T> {
        return value(this.el_tree, this.template)
    }
}

export {
    AutoForm
}