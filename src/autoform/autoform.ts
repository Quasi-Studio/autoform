import mdui from "mdui";
import { AElement, AString, ReturnValue, isAString } from "./types";

class AutoForm {
    readonly template: AElement

    constructor (template: AElement) {
        this.template = template
    }

    inject(el: HTMLDivElement): void {
        let inject_string = (el: HTMLDivElement, template: AString) => {
            el.classList.add('mdui-textfield', 'mdui-textfield-floating-label')
            let label = document.createElement('label')
            label.classList.add('mdui-textfield-label')
            if (template.hint)
                label.innerText = template.hint
            let input = document.createElement('input')
            input.classList.add('mdui-textfield-input')
        }
        if (isAString(this.template))
            inject_string(el, this.template)
        mdui.mutation()
    }

    value(): ReturnValue<typeof this.template> {
        return {}
    }
}

export {
    AutoForm
}