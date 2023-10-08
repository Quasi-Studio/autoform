abstract class ComponentModel {}

abstract class ComponentBase<Model extends ComponentModel> {
    el: HTMLDivElement

    constructor(public model: Model) {
        this.el = document.createElement('div')
    }

    public abstract mount(el: HTMLDivElement): void

}


export {
    ComponentModel,
    ComponentBase
}