type AMap<Child extends Record<string, ABase> = Record<string, ABase>> = {
    input: [AInput, ElAInput, string],
    select: [ASelect, ElASelect, string],
    option: [AOption, ElAOption, boolean],
    form: [AForm, ElAForm, {
        [K in keyof Child]: AMap[Child[K]["type"]][2]
    }]
}

interface ElBase {
    div: HTMLDivElement
}

interface ElAInput extends ElBase {
    label: HTMLLabelElement
    input: HTMLInputElement
}

interface ElASelect extends ElBase {
    select: HTMLSelectElement
    option: HTMLOptionElement[]
}

interface ElAOption extends ElBase  {
    // TODO
}

type ChildOfAForm<T extends AForm> =
    T extends AForm<infer Child> ? Child : never;

interface ElAForm<Child extends Record<string, ABase> = Record<string, ABase>> extends ElBase {
    child: {
        [K in keyof Child]: AMap[Child[K]["type"]][1]
    }
}

type ElAElement
    = ElAInput
    | ElASelect
    | ElAOption
    | ElAForm

type ElTree<T extends ABase> = AMap[T['type']][1];

export type {
    ElAInput,
    ElASelect,
    ElAOption,
    ElAForm,
    ElAElement,
    ElTree
}

interface ABase {
    type: keyof AMap;
    caption?: string
}

interface AInput extends ABase {
    type: 'input'
    default?: string
    hint?: string
    validate?: (value: string) => {
        isValid: boolean
        message?: string
    }
}

interface ASelect extends ABase {
    type: 'select'
    option: string[]
}

interface AOption extends ABase {
    type: 'option'
    value: string
}

interface AForm<Child extends Record<string, ABase> = Record<string, ABase>> extends ABase {
    type: 'form'
    child: Child
}

type ReturnValue<T extends ABase> = AMap[T['type']][2]

export type {
    ABase,
    AInput,
    ASelect,
    AOption,
    AForm,
    ReturnValue
}

function isAInput(obj: any): obj is AInput {
    return obj.type === 'input'
}

function isASelect(obj: any): obj is ASelect {
    return obj.type === 'select' && obj.option instanceof Array
}

function isAOption(obj: any): obj is AOption {
    return obj.type === 'option'
}

function isAForm(obj: any): obj is AForm {
    if (!obj.child)
        return false
    if (obj.type !== 'form')
        return false
    for (let i of Object.keys(obj.child))
        if (!isAElement(obj.child[i]))
            return false
    return true
}

function isAElement(obj: any): obj is ABase {
    return isAInput(obj) || isASelect(obj) || isAOption(obj) || isAForm(obj)
}

export {
    isAInput,
    isASelect,
    isAOption,
    isAForm,
    isAElement
}