import { ABase, ASelect, AInput, ElASelect, ElAInput, ElTree, isASelect, isAInput } from "./types"

function inject_string(template: AInput): ElAInput {
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

function inject<T extends ABase>(template: T): ElTree<T> {
    if (isAInput(template))
        return inject_string(template)
    if (isASelect(template))
        return inject_select(template)
    throw new Error('Not implemented')
}

export {
    inject
}