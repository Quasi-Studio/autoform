abstract class ComponentModel<MsgType> {
    abstract update(payload: any, forward: (msg: MsgType) => void): void
}

abstract class ComponentBase<Model extends ComponentModel<MsgType>, MsgType> {
    el: HTMLDivElement
    // model: Model

    constructor(public model: Model) {
        this.el = document.createElement('div')
        // this.model = new componentModelCtor()
    }

    public patch(payload: any): void {
        this.model.update(payload, this.update.bind(this))
    }

    public abstract mount(el: HTMLDivElement): void

    protected abstract update(msg: MsgType): void
}


export {
    ComponentModel,
    ComponentBase
}