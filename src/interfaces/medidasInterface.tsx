
export interface TallasInterface {
    itemid: string;
    sizechartid: string;
    seT_TALLAS: string,
    sizeid: string
}

export interface MedidasInterface {
    id: number,
    nombre: string,
    activo: boolean,
    link: string,
    intruccion1: string,
    intruccion2: string,
    intruccion3: string,
    specs: string ,
    referencia: string,
    medida: string,
    medidaNumerador: string,
    diferencia: string
}

export interface MedidasEnviarInterface {
    ID:number,
    idMasterOrden: number,
    idMedida: number,
    lavadoID:number,
    idTalla: string,
    Medida: string,
    MedidaNumerador: string,
    Diferencia: string,
    usuarioID: number
}

export interface DatosMedidaInterface{
    intruccion1: string,
    intruccion2: string,
    intruccion3: string,
    specs: string ,
    referencia: string
}