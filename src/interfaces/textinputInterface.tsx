export interface TextInputInterface {
    title: string,
    justify: boolean,
    height: number,
    placeholder: string,
    teclado: any,
    multiline: boolean,
    editable: boolean,
    onChangeText: (value:string) => void,
    value: string,
    maxlength: number
}