import mdui from "mdui"
import { ComponentBase, ComponentModel } from ".."

type ACheckboxMsgType = 'value' | 'label'

type ACheckboxStatus = 'checked' | 'unchecked' // | 'partial'

class ACheckboxModel extends ComponentModel<ACheckboxMsgType> {
    value: ACheckboxStatus = 'unchecked'
    label: string = ''
    onchange: () => void = () => {}

    constructor (p: any) {
        super()
        this.update(p)
    }

    update(p: any): ACheckboxMsgType[] { // I know its better to have a callback func
        let ret = [] as ACheckboxMsgType[]
        if (p.value !== undefined) {
            this.value = p.value
            ret.push('value')
        }
        if (p.label !== undefined) {
            this.label = p.label
            ret.push('label')
        }
        if (p.onchange !== undefined) {
            this.onchange = p.onchange
        }
        return ret
    }
}

class ACheckbox extends ComponentBase<ACheckboxModel, ACheckboxMsgType> {

    label_el: HTMLLabelElement
    input_el: HTMLInputElement
    i_el: HTMLElement

    mount(el: HTMLDivElement): void {
        this.label_el = document.createElement('label')
        this.label_el.classList.add('mdui-checkbox')
        // this.label_el.textContent = this.model.label

        this.input_el = document.createElement('input')
        this.input_el.type = 'checkbox'
        this.label_el.appendChild(this.input_el)
        
        this.i_el = document.createElement('i')
        this.i_el.classList.add('mdui-checkbox-icon')
        this.label_el.appendChild(this.i_el)
        
        this.label_el.appendChild(new Text(this.model.label))
        this.update('value')
        this.input_el.addEventListener('change', () => {
            this.model.value = this.input_el.checked ? 'checked': 'unchecked'
            this.update('value')
            this.model.onchange()
        } )
        this.el.appendChild(this.label_el)

        el.appendChild(this.el)
    }

    update(msg: ACheckboxMsgType): void {
        if (msg === 'label') {
            // this.label_el.textContent = this.model.label
            // this.label_el.appendChild(new Text(this.model.label))
            (this.label_el.lastChild as Text).textContent = this.model.label
            // this.label_el.appendChild(this.input_el)
            // this.label_el.appendChild(this.i_el)
            return
        }
        if (msg === 'value') {
            this.input_el.checked = this.model.value === 'checked'
        }
        mdui.mutation()
    }
}

export {
    ACheckboxModel,
    ACheckbox
}