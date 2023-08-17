interface WithHint {
    hint?: string
}

interface AString extends WithHint {
    type: 'string'
    default?: string
    validate?: (value: string) => {
        isValid: boolean
        message?: string
    }
}

interface ASelect extends WithHint {
    type: 'select'
    option: string[]
}

interface AForm extends WithHint {
    type: 'form'
    child: {
        [k: string] : AElement
    }
}

type AElement
    = AString
    | ASelect
    | AForm

type ReturnValue<AElement> =
    AElement extends AString ? string :
    AElement extends ASelect ? string :
    AElement extends AForm ? {
        [k in keyof AElement['child']]: ReturnValue<AElement['child'][k]>
    } : never

export type {
    AString,
    ASelect,
    AForm,
    AElement,
    ReturnValue
}

function isAString(obj: any): obj is AString {
    return obj.type === 'string'
}

function isASelect(obj: any): obj is ASelect {
    return obj.type === 'select' && obj.option instanceof Array
}

function isAForm(obj: any): obj is AForm {
    if (! obj.child)
        return false
    if (obj.type !== 'form')
        return false
    for (let i of Object.keys(obj.child))
        if (! isAElement(obj.child[i]))
            return false
    return true
}

function isAElement(obj: any): obj is AElement {
    return isAString(obj) || isASelect(obj) || isAForm(obj)
}

export {
    isAString,
    isASelect,
    isAForm,
    isAElement
}