import mdui from "mdui"
import { ComponentBase, ComponentModel } from ".."

type ASwitchMsgType = 'value'

type ASwitchStatus = 'off' | 'on'

class ASwitchModel extends ComponentModel<ASwitchMsgType> {
    value: ASwitchStatus = 'off'
    onchange: () => void = () => {}

    update(payload: any, forward: (msg: ASwitchMsgType) => void): void {
        if (payload.value !== undefined) {
            this.value = payload.value
            forward('value')
        }
        if (payload.onchange !== undefined) {
            this.onchange = payload.onchange
        }
    }
}

class ASwitch extends ComponentBase<ASwitchModel, ASwitchMsgType> {

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
        
        this.update('value')
        this.input_el.addEventListener('change', () => {
            this.model.value = this.input_el.checked ? 'on': 'off'
            this.update('value')
            this.model.onchange()
        } )
        this.el.appendChild(this.label_el)

        el.appendChild(this.el)
    }

    update(msg: ASwitchMsgType): void {
        if (msg === 'value') {
            this.input_el.checked = this.model.value === 'on'
        }
        mdui.mutation()
    }
}

export {
    ASwitchModel,
    ASwitch
}