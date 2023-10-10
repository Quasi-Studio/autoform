import mdui from "mdui"
import { ComponentBase, ComponentModel } from "./base"

type ASwitchStatus = 'off' | 'on'

class ASwitchModel extends ComponentModel {
    value: ASwitchStatus = 'off'
    onchange: () => void = () => {}
}

class ASwitch extends ComponentBase<ASwitchModel> {

    label_el: HTMLLabelElement
    input_el: HTMLInputElement
    i_el: HTMLElement

    mount(el: HTMLDivElement): void {
        this.label_el = document.createElement('label')
        this.label_el.classList.add('mdui-switch')

        this.input_el = document.createElement('input')
        this.input_el.type = 'checkbox'
        this.label_el.appendChild(this.input_el)
        
        this.i_el = document.createElement('i')
        this.i_el.classList.add('mdui-switch-icon')
        this.label_el.appendChild(this.i_el)
        
        this.value = this.model.value
        this.input_el.addEventListener('change', () => {
            this.model.value = this.input_el.checked ? 'on': 'off'
            this.model.onchange()
        } )
        this.el.appendChild(this.label_el)

        el.appendChild(this.el)
    }

    get value(): ASwitchStatus {
        return this.model.value
    }

    set value(value: ASwitchStatus) {
        this.model.value = value
        this.input_el.checked = this.model.value === 'on'
        mdui.mutation()
    }

    get onchange(): () => void {
        return this.model.onchange
    }

    set onchange(fn: () => void) {
        this.model.onchange = fn
    }
}

export {
    ASwitchModel,
    ASwitch
}