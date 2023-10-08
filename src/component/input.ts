import mdui from 'mdui'
import { ComponentBase, ComponentModel } from './base'

type AInputMsgType = 'val' | 'place_holder'

class AInputModel extends ComponentModel<AInputMsgType> {
    val: string = ''
    place_holder: string = ''
    onchange: () => void = () => {}

    update(payload: any, forward: (msg: AInputMsgType) => void): void {
        if (payload.val !== undefined) {
            this.val = payload.val
            forward('val')
        }
        if (payload.place_holder !== undefined) {
            this.place_holder = payload.place_holder
            forward('place_holder')
        }
        if (payload.onchange !== undefined) {
            this.onchange = payload.onchange
        }
    }
}

class AInput extends ComponentBase<AInputModel, AInputMsgType> {

    label_el: HTMLLabelElement
    input_el: HTMLInputElement

    mount(el: HTMLDivElement): void {
        this.el.classList.add('mdui-textfield')
        this.el.classList.add('mdui-textfield-floating-label')

        this.label_el = document.createElement('label')
        this.label_el.classList.add('mdui-textfield-label')
        this.update('place_holder')
        this.el.appendChild(this.label_el)

        this.input_el = document.createElement('input')
        this.input_el.classList.add('mdui-textfield-input')
        this.update('val')
        this.el.appendChild(this.input_el)

        this.input_el.addEventListener('input', (_: Event) => {
            this.model.val = this.input_el.value
            this.model.onchange()
        })
        el.appendChild(this.el)
    }

    update(msg: AInputMsgType): void {
        if (msg === 'val') {
            this.input_el.value = this.model.val
            mdui.updateTextFields(this.input_el)
        }
        if (msg === 'place_holder')
            this.label_el.innerText = this.model.place_holder
        mdui.mutation()
    }
}

export {
    AInputModel,
    AInput
}