import { ABase, ACheckbox, AForm, AInput, ASelect, ElACheckbox, ElAForm, ElAInput, ElASelect, ElBase, ReturnValue, isACheckbox, isAForm, isAInput, isASelect } from "./types.js";

function value_input(el: ElAInput, _: AInput): string {
    return el.input.value
}

function value_select(el: ElASelect, t: ASelect): string {
    return t.option[el.select.selectedIndex]
}

function value_checkbox(el: ElACheckbox, _: ACheckbox): boolean {
    return el.input.checked
}

function value_form<T extends Record<string, ABase>>(el: ElAForm<T>, t: AForm<T>): ReturnValue<AForm<T>> {
    let ret = {} as ReturnValue<AForm<T>>
    for (let c in t.child)
        ret[c] = value(el.child[c].el, t.child[c])
    return ret
}

function value(el: ElBase, t: ABase): any {
    if (isAInput(t))
        return value_input(el as ElAInput, t)
    if (isASelect(t))
        return value_select(el as ElASelect, t)
    if (isACheckbox(t))
        return value_checkbox(el as ElACheckbox, t)
    if (isAForm(t))
        return value_form(el as ElAForm, t)
    throw new Error('Not Implemented.')
}

export {
    value
}