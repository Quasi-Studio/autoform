import mdui from "mdui";
import { ABase, ASelect, AString, AOption, ReturnValue, isASelect, isAString, ElTree } from "./types";
import { inject } from "./inject";
// import { ElTree } from "./el";

class AutoForm<T extends ABase> {
    readonly template: T
    el_tree: ElTree<T>

    constructor (template: T) {
        this.template = template
    }

    init(el: HTMLDivElement): void {            

        // if (isAString(this.template))
        //     inject_string(el, this.template)
        if (isASelect(this.template)) {
            let _el = inject(this.template)
            el.appendChild(_el.div)
        }
        mdui.mutation()
    }

    // value(): ReturnValue<T> {
    //     return {}
    // }
}

export {
    AutoForm
}