
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
    diferencia: string
}

export interface MedidasEnviarInterface {
    id: number,
    masterID: number,
    lavadoID: number,
    medidaId: number,
    usuario: number,
    medida01: number,
    medida02: number,
    medida03: number,
    medida04: number,
    medida05: number,
    medida06: number,
    medida07: number,
    medida08: number,
    medida09: number,
    medida10: number,
    medida11: number,
    medida12: number,
    medida13: number,
    medida14: number,
    medida15: number,
    medida16: number,
    medida17: number,
    medida18: number,
    medida19: number,
    medida20: number,
}

export interface DatosMedidaInterface{
    intruccion1: string,
    intruccion2: string,
    intruccion3: string,
    specs: string ,
    referencia: string
}