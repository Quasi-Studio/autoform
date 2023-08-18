import { ABase, ASelect, AInput, ElASelect, ElAInput, ElTree, isASelect, isAInput, ACheckbox, ElACheckbox, isACheckbox, AForm, ElAForm, isAForm } from "./types"

function inject_input(template: AInput): ElAInput {
    let div = document.createElement('div')
    div.classList.add('mdui-textfield', 'mdui-textfield-floating-label')

    let label = document.createElement('label')
    label.classList.add('mdui-textfield-label')
    if (template.hint)
        label.innerText = template.hint
    div.appendChild(label)

    let input = document.createElement('input')
    input.classList.add('mdui-textfield-input')
    div.appendChild(input)

    return {
        div, label, input
    }
}

function inject_select(template: ASelect): ElASelect {
    let div = document.createElement('div')

    let select = document.createElement('select')
    select.classList.add('mdui-select')
    select.setAttribute('mdui-select', `{position: 'bottom'}`)
    div.appendChild(select)

    let options: HTMLOptionElement[] = []
    for (let i = 0; i < template.option.length; i++) {
        let option = document.createElement('option')
        option.innerText = template.option[i]
        option.setAttribute('value', i.toString())
        select.appendChild(option)
        options.push(option)
    }

    return {
        div, select,
        option: options
    }
}

function inject_checkbox(template: ACheckbox): ElACheckbox {
    let div = document.createElement('div')
    
    let label = document.createElement('label')
    label.classList.add('mdui-checkbox')
    div.appendChild(label)
    label.innerText = template.label

    let input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    label.appendChild(input)

    let i = document.createElement('i')
    i.classList.add('mdui-checkbox-icon')
    label.appendChild(i)

    return {
        div, label, input, i
    }
}

function inject_form<T extends Record<string, ABase>>(template: AForm<T>): ElAForm<T> {
    let div = document.createElement('div')
    div.classList.add('md-form')

    let child = {}

    for (let el in template.child) {
        let s_div = document.createElement('div')
        s_div.classList.add('md-form-item')
        div.appendChild(s_div)

        let label = document.createElement('label')
        label.classList.add('mdui-label')
        if (template.child[el].caption)
            label.innerText = template.child[el].caption!
        s_div.appendChild(label)

        let s_el = inject(template.child[el])
        s_div.appendChild(s_el.div)
        // @ts-ignore
        child[el as string] = {
            div, label,
            el: s_el
        }
    }
    
    return {
        div,
        // @ts-ignore
        child
    }
}

function inject<T extends ABase>(template: T): ElTree<T> {
    if (isAInput(template))
        return inject_input(template)
    if (isASelect(template))
        return inject_select(template)
    if (isACheckbox(template))
        return inject_checkbox(template)
    if (isAForm(template))
        return inject_form(template)
    throw new Error('Not implemented')
}

export {
    inject
}