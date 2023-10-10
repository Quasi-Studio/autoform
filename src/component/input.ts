import mdui from 'mdui'
import { ComponentBase, ComponentModel } from './base'

class AInputModel extends ComponentModel {
    val: string = ''
    place_holder: string = ''
    onchange: () => void = () => {}
}

class AInput extends ComponentBase<AInputModel> {

    label_el: HTMLLabelElement
    input_el: HTMLInputElement

    mount(el: HTMLDivElement): void {
        this.el.classList.add('mdui-textfield')
        this.el.classList.add('mdui-textfield-floating-label')

        this.label_el = document.createElement('label')
        this.label_el.classList.add('mdui-textfield-label')
        this.place_holder = this.model.place_holder

        this.el.appendChild(this.label_el)

        this.input_el = document.createElement('input')
        this.input_el.classList.add('mdui-textfield-input')
        this.val = this.model.val

        this.el.appendChild(this.input_el)

        this.input_el.addEventListener('input', (_: Event) => {
            this.model.val = this.input_el.value
            this.model.onchange()
        })
        el.appendChild(this.el)
    }

    get val(): string {
        return this.model.val
    }

    set val(val: string) {
        this.model.val = val
        this.input_el.value = this.model.val
        mdui.updateTextFields(this.input_el)
    }

    get place_holder(): string {
        return this.model.place_holder
    }

    set place_holder(val: string) {
        this.model.place_holder = val
        this.label_el.innerText = val
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
    AInputModel,
    AInput
}