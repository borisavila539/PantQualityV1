import React, { createContext, useReducer } from 'react';
import { OrdenesReducer } from './OrdenesReducer';

//Definir que informacion grabar
export interface OrdenesState {
    OrdenId: number,
    prodMasterRefID: string,
    prodmasterid: string,
    itemid: string,
    lavado: string,
    lavadoID: number,
    medida: string,
    medidaId: number,
    FileName: string,
    idUsuario: number,
    masterID: number,
    TutorialLink: string,
    TallaID: string,
    ModuloId: number,
    ModuloName: string,
    Rol: string,
    TipoMedida: string,
    TipoMedidaID: number,


}

//Estado inicial
export const ordenesInitialState: OrdenesState = {
    prodMasterRefID: '',
    prodmasterid: '',
    itemid: '',
    lavado: '',
    medida: '',
    FileName: '',
    OrdenId: 0,
    idUsuario: 0,
    medidaId: 0,
    lavadoID: 0,
    masterID: 0,
    TutorialLink: '',
    TallaID: '',
    ModuloId: 0,
    ModuloName: '',
    Rol: '',
    TipoMedida: '',
    TipoMedidaID: 0

}

export interface OrdenesContextProps {
    ordenesState: OrdenesState;
    changeOrdenId: (ordenId: number) => void;
    changeProdMasterRefId: (prodMasterRefID: string) => void;
    changeProdMasterId: (prodMasterId: string) => void;
    changeItem: (item: string) => void;
    changeLavado: (lavado: string) => void;
    changeLavadoID: (lavadoId: number) => void;
    changemedida: (medida: string) => void;
    changemedidaID: (medidaid: number) => void;
    changeFileName: (fileName: string) => void;
    changeUserid: (userid: number) => void;
    changeMasterID: (masterID: number) => void;
    changeTutorialLink: (TutorialLink: string) => void;
    changeTallaID: (MedidaID: string) => void;
    changeModuloId: (ModuloId: number) => void;
    changeRol: (rol: string) => void;
    changeTipoMedida: (TipoMedida: string) => void;
    changeTipoMedidaID: (TipoMedida: number) => void
    changeModuloName: (ModuloName: string) => void
}

//Crear el contexto
export const OrdenesContext = createContext({} as OrdenesContextProps)

export const OrdenesProvider = ({ children }: any) => {
    const [ordenesState, dispatch] = useReducer(OrdenesReducer, ordenesInitialState)

    const changeOrdenId = (ordenId: number) => {
        dispatch({ type: 'changeOrdenId', payload: ordenId })
    }
    const changeProdMasterRefId = (prodMasterRefID: string) => {
        dispatch({ type: 'changeProdMasterRefId', payload: prodMasterRefID })
    }

    const changeProdMasterId = (prodMasterId: string) => {
        dispatch({ type: 'changeProdMasterID', payload: prodMasterId })

    };
    const changeItem = (item: string) => {
        dispatch({ type: 'changeItem', payload: item })

    };
    const changeLavado = (lavado: string) => {
        dispatch({ type: 'changeLavado', payload: lavado })
    }
    const changeLavadoID = (lavadoID: number) => {
        dispatch({ type: 'changeLavadoID', payload: lavadoID })
    }
    const changemedida = (medida: string) => {
        dispatch({ type: 'changeMedida', payload: medida })
    }
    const changemedidaID = (medidaID: number) => {
        dispatch({ type: 'changeMedidaID', payload: medidaID })
    }
    const changeFileName = (fileName: string) => {
        dispatch({ type: 'changeFileName', payload: fileName })
    }

    const changeUserid = (userid: number) => {
        dispatch({ type: 'changeUserId', payload: userid })
    }
    const changeMasterID = (masterID: number) => {
        dispatch({ type: 'changeMasterID', payload: masterID })
    }
    const changeTutorialLink = (TutorialLink: string) => {
        dispatch({ type: 'changeTutorialLink', payload: TutorialLink })
    };

    const changeTallaID = (Talla: string) => {
        dispatch({ type: 'changeTallaID', payload: Talla })
    };

    const changeModuloId = (ModuloId: number) => {
        dispatch({ type: 'ChangeModuloID', payload: ModuloId })
    }

    const changeRol = (rol: string) => {
        dispatch({ type: 'ChangeRol', payload: rol })
    }

    const changeTipoMedida = (TipoMedida: string) => {
        dispatch({ type: 'ChangeTipoMedida', payload: TipoMedida })
    }

    const changeTipoMedidaID = (TipoMedidaID: number) => {
        dispatch({ type: 'ChangeTipoMedidaID', payload: TipoMedidaID })
    }

    const changeModuloName = (ModuloName: string) => {
        dispatch({ type: 'changeModuloName', payload: ModuloName })
    }
    return (
        <OrdenesContext.Provider value={{
            ordenesState: ordenesState,
            changeOrdenId,
            changeProdMasterRefId,
            changeProdMasterId,
            changeItem,
            changeLavado,
            changeLavadoID,
            changemedida,
            changemedidaID,
            changeFileName,
            changeUserid,
            changeMasterID,
            changeTutorialLink,
            changeTallaID,
            changeModuloId,
            changeRol,
            changeTipoMedida,
            changeTipoMedidaID,
            changeModuloName
        }}>
            {children}
        </OrdenesContext.Provider>
    )
}