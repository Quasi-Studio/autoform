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

interface ANumber extends WithHint {
    type: 'number'
    default?: number
    validate?: (value: number) => {
        isValid: boolean
        message?: string
    }
}

interface ABoundedNumber extends WithHint {
    type: 'bounded-number'
    min: number
    max: number
    default?: number
}

interface AForm extends WithHint {
    type: 'form'
    child: {
        [k: string] : AElement
    }
}

type AElement
    = AString
    | ANumber
    | ABoundedNumber
    | AForm

type ReturnValue<AElement> =
    AElement extends AString ? string :
    AElement extends ANumber ? number :
    AElement extends ABoundedNumber ? number :
    AElement extends AForm ? {
        [k in keyof AElement['child']]: ReturnValue<AElement['child'][k]>
    } : never

export type {
    AString,
    ANumber,
    ABoundedNumber,
    AForm,
    AElement,
    ReturnValue
}

function isAString(obj: any): obj is AString {
    return obj.type === 'string'
}

function isANumber(obj: any): obj is ANumber {
    return obj.type === 'number'
}

function isABoundedNumber(obj: any): obj is ABoundedNumber {
    return obj.type === 'bounded-number'
        && obj.max !== undefined
        && obj.min !== undefined
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
    return isAString(obj) || isANumber(obj) || isABoundedNumber(obj) || isAForm(obj)
}

export {
    isAString,
    isANumber,
    isABoundedNumber,
    isAForm,
    isAElement
}