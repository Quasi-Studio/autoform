import mdui from "mdui";
import { ABase } from "./types";
import { inject } from "./inject";
// import { ElTree } from "./el";

class AutoForm<T extends ABase> {
    readonly template: T
    // el_tree: ElTree<T>

    constructor (template: T) {
        this.template = template
    }

    init(el: HTMLDivElement): void {
        el.appendChild(inject(this.template).div)
        mdui.mutation()
    }

    // value(): ReturnValue<T> {
    //     return {}
    // }
}

export {
    AutoForm
}