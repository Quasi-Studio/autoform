
import mdui from "mdui"
import { ComponentBase, ComponentModel } from ".."

type ASelectMsgType = 'options'

class ASelectModel extends ComponentModel<ASelectMsgType> {
    options: string[] = []
    value: string = ''
    onchange: () => void = () => {} // after change

    update(payload: any, forward: (msg: ASelectMsgType) => void): void {
        if (payload.options !== undefined) {
            this.options = (payload.options as Array<string>).filter(() => true)
            forward('options')
        }
        if (payload.onchange !== undefined) {
            this.onchange = payload.onchange
        }
    }
}

class ASelect extends ComponentBase<ASelectModel, ASelectMsgType> {
    
    select_el: HTMLSelectElement
    option_el: HTMLOptionElement[] = []
    mdui_select_obj: any

    mount(el: HTMLDivElement): void {
        this.select_el = document.createElement('select')
        // this.select_el.classList.add('mdui-select')
        // this.select_el.setAttribute('mdui-select', `{position: 'bottom'}`)
        // I don't know why but it works.
        this.mdui_select_obj = new mdui.Select(this.select_el)
        this.select_el.addEventListener('change', () => {
            this.model.value = this.select_el.value
            this.model.onchange()
        })
        this.el.appendChild(this.select_el)
        this.update('options')
        // mdui.mutation()

        el.appendChild(this.el)
    }

    update(msg: ASelectMsgType): void {
        if (msg === 'options') {
            for (let i of this.option_el)
                this.select_el.removeChild(i)
            this.option_el = this.model.options.map((v, indx) => {
                let option_el = document.createElement('option')
                option_el.value = indx.toString()
                option_el.innerText = v
                this.select_el.appendChild(option_el)
                return option_el
            })
            if (parseInt(this.model.value) < this.model.options.length) {
                this.select_el.value = this.model.value
            } else {
                this.select_el.value = '0'
            }
            this.mdui_select_obj.handleUpdate()
        }
    }
}

export {
    ASelectModel,
    ASelect
}