abstract class ComponentModel<MsgType> {
    abstract update(...args: any[]): any[]
}

abstract class ComponentBase<Model extends ComponentModel<MsgType>, MsgType> {
    el: HTMLDivElement

    constructor(public value: Model) {}

    public patch(...args: any[]): any[] {
        return this.value.update(...args)
    }

    public abstract mount(): void

    protected abstract update(msg: MsgType): void
}
