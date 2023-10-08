import mdui from "mdui"
import { ComponentBase, ComponentModel } from "./base"

class AButtonModel extends ComponentModel {
    caption: string = ''
    onclick: () => void = () => {}
}

class AButton extends ComponentBase<AButtonModel> {

    button_el: HTMLButtonElement

    mount(el: HTMLDivElement): void {
        this.button_el = document.createElement('button')
        this.button_el.classList.add('mdui-btn')
        this.button_el.classList.add('mdui-btn-raised')
        this.button_el.classList.add('mdui-ripple')
        
        this.caption = this.model.caption
        this.el.appendChild(this.button_el)

        this.button_el.addEventListener('click', (_) => {
            this.model.onclick()
        })

        el.appendChild(this.el)
    }

    get onclick(): () => void {
        return this.model.onclick
    }

    set onclick(fn: () => void) {
        this.model.onclick = fn
    }

    get caption(): string {
        return this.model.caption
    }

    set caption(caption: string) {
        this.model.caption = caption
        this.button_el.innerText = this.model.caption
        mdui.mutation()
    }

}

export {
    AButtonModel,
    AButton
}