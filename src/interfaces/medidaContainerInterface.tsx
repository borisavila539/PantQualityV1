export interface MedidaContainerInterface{
    mostrar: boolean;
    medida: string;
    onChangeText:(value:string)=>void;
    value : string;
}