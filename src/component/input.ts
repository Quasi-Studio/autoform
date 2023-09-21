class AInputModel {
    val: string
    place_holder: string

    onchange: () => void = () => {}
}

class AInput extends ComponentBase<AInputModel> {

    label_el: HTMLLabelElement
    input_el: HTMLInputElement

    constructor(val: Partial<AInputModel>) {
        super(val)
    }

    mount(): void {
        this.el = document.createElement('div')
        this.el.classList.add('mdui-textfield')
        this.el.classList.add('mdui-textfield-floating-label')

        this.label_el = document.createElement('label')
        this.label_el.classList.add('mdui-textfield-label')


        this.input_el = document.createElement('input')
        this.input_el.classList.add('mdui-textfield-input')

        // this.input_el.addEventListener('change', )
    }

    update(key: string, val: any) {

    }
}