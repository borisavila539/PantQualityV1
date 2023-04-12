export interface TextInputInterface {
    title: string,
    justify: boolean,
    height: number,
    placeholder: string,
    teclado: any,
    multiline: boolean,
    editable: boolean,
    onChangeText: Function,
    value: string,
    maxlength: number
}