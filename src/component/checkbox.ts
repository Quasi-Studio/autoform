import mdui from "mdui"
import { ComponentBase, ComponentModel } from "./base"

type ACheckboxStatus = 'checked' | 'unchecked' // | 'partial'

class ACheckboxModel extends ComponentModel {
    value: ACheckboxStatus = 'unchecked'
    label: string = ''
    onchange: () => void = () => {}
}

class ACheckbox extends ComponentBase<ACheckboxModel> {

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
        
        this.value = this.model.value
        this.input_el.addEventListener('change', () => {
            this.model.value = this.input_el.checked ? 'checked': 'unchecked'
            this.model.onchange()
        } )
        this.el.appendChild(this.label_el)

        el.appendChild(this.el)
    }

    get value(): ACheckboxStatus {
        return this.model.value
    }

    set value(val: ACheckboxStatus) {
        this.model.value = val
        this.input_el.checked = val === 'checked'
        mdui.mutation()
    }

    get label(): string {
        return this.model.label
    }

    set label(val: string) {
        this.model.label = val;  // I dislike this semicolon
        (this.label_el.lastChild as Text).textContent = val
    }

    get onchange(): () => void {
        return this.model.onchange
    }

    set onchange(fn: () => void) {
        this.model.onchange = fn
    }

}

export {
    ACheckboxModel,
    ACheckbox
}