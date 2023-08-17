import mdui from "mdui";
import { AElement, ASelect, AString, ReturnValue, isASelect, isAString } from "./types";

class AutoForm {
    readonly template: AElement

    constructor (template: AElement) {
        this.template = template
    }

    inject(el: HTMLDivElement): void {
        let inject_string = (el: HTMLDivElement, template: AString) => {
            let div = document.createElement('div')
            div.classList.add('mdui-textfield', 'mdui-textfield-floating-label')
            el.appendChild(div)

            let label = document.createElement('label')
            label.classList.add('mdui-textfield-label')
            if (template.hint)
                label.innerText = template.hint
            div.appendChild(label)

            let input = document.createElement('input')
            input.classList.add('mdui-textfield-input')
            div.appendChild(input)
        }

        let inject_select = (el: HTMLDivElement, template: ASelect) => {
            let div = document.createElement('div')
            el.appendChild(div)
            
            let select = document.createElement('select')
            select.classList.add('mdui-select')
            select.setAttribute('mdui-select', `{position: 'bottom'}`)
            div.appendChild(select)

            for (let i = 0; i < template.option.length; i++) {
                let option = document.createElement('option')
                option.innerText = template.option[i]
                option.setAttribute('value', i.toString())
                select.appendChild(option)
            }
        }

        if (isAString(this.template))
            inject_string(el, this.template)
        if (isASelect(this.template))
            inject_select(el, this.template)
        mdui.mutation()
    }

    value(): ReturnValue<typeof this.template> {
        return {}
    }
}

export {
    AutoForm
}