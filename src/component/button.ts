import mdui from "mdui";
import { ComponentBase, ComponentModel } from "..";

type AButtonMsgType = 'caption'

class AButtonModel extends ComponentModel<AButtonMsgType> {
    caption: string = ''
    onclick: () => void = () => {}

    constructor (p: any) {
        super()
        this.update(p)
    }

    update(p: any): AButtonMsgType[] {
        let ret = [] as AButtonMsgType[]
        if (p.caption !== undefined) {
            this.caption = p.caption
            ret.push('caption')
        }

        if (p.onclick !== undefined) {
            this.onclick = p.onclick
        }
        return ret
    }
}

class AButton extends ComponentBase<AButtonModel, AButtonMsgType> {

    button_el: HTMLButtonElement

    constructor(model: AButtonModel) {
        super(model)
    }

    mount(el: HTMLDivElement): void {
        this.button_el = document.createElement('button')
        this.button_el.classList.add('mdui-btn')
        this.button_el.classList.add('mdui-btn-raised')
        this.button_el.classList.add('mdui-ripple')
        this.update('caption')
        this.el.appendChild(this.button_el)

        this.button_el.addEventListener('click', (_) => {
            this.model.onclick()
        })

        el.appendChild(this.el)
    }

    update(msg: AButtonMsgType): void {
        if (msg === 'caption') {
            this.button_el.innerText = this.model.caption
        }
        mdui.mutation()
    }
}

export {
    AButtonModel,
    AButton
}