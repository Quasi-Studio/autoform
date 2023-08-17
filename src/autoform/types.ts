interface WithHint {
    hint?: string
}

interface String extends WithHint {
    type: 'string'
    default?: string
    validate?: (value: string) => {
        isValid: boolean
        message?: string
    }
}

interface Number extends WithHint {
    type: 'number'
    default?: number
    validate?: (value: number) => {
        isValid: boolean
        message?: string
    }
}

interface BoundedNumber extends WithHint {
    type: 'bounded-number'
    min: number
    max: number
    default?: number
}

interface Form extends WithHint {
    type: 'form'
    child: {
        [k: string] : FormElement
    }
}

type FormElement
    = String
    | Number
    | BoundedNumber
    | Form

type ReturnValue<FormElement> =
    FormElement extends String ? string :
    FormElement extends Number ? number :
    FormElement extends BoundedNumber ? number :
    FormElement extends Form ? {
        [k in keyof FormElement['child']]: ReturnValue<FormElement['child'][k]>
    } : never


export type {
    String,
    Number,
    BoundedNumber,
    Form,
    FormElement,
    ReturnValue
}