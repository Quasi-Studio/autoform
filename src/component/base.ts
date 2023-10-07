abstract class ComponentModel<MsgType> {
    abstract update(o: any, forward: (msg: MsgType) => void): void
}

abstract class ComponentBase<Model extends ComponentModel<MsgType>, MsgType> {
    el: HTMLDivElement
    // model: Model

    constructor(public model: Model) {
        this.el = document.createElement('div')
        // this.model = new componentModelCtor()
    }

    public patch(o: any): void {
        this.model.update(o, this.update.bind(this))
    }

    public abstract mount(el: HTMLDivElement): void

    protected abstract update(msg: MsgType): void
}


export {
    ComponentModel,
    ComponentBase
}