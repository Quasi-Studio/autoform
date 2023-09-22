abstract class ComponentModel<MsgType> {
    abstract update(...args: any[]): MsgType[]
}

abstract class ComponentBase<Model extends ComponentModel<MsgType>, MsgType> {
    el: HTMLDivElement

    constructor(public model: Model) {
        this.el = document.createElement('div')
    }

    public patch(...args: any[]): void {
        let upd = this.model.update(...args)
        for (let i of upd) {
            this.update(i)
        }
    }

    public abstract mount(el: HTMLDivElement): void

    protected abstract update(msg: MsgType): void
}


export {
    ComponentModel,
    ComponentBase
}