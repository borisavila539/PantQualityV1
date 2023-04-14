import React, { createContext, useReducer } from 'react';
import { OrdenesReducer } from './OrdenesReducer';

//Definir que informacion grabar
export interface OrdenesState {
    prodMasterRefID: string,
    prodmasterid: string,
    itemid: string,
    lavado: string,
    medida: string,
    FileName: string,

}

//Estado inicial
export const ordenesInitialState: OrdenesState = {
    prodMasterRefID: '',
    prodmasterid: '',
    itemid: '',
    lavado: '',
    medida: '',
    FileName: ''
}

export interface OrdenesContextProps {
    ordenesState: OrdenesState;
    changeProdMasterRefId: (prodMasterRefID: string) => void;
    changeProdMasterId: (prodMasterId: string) => void;
    changeItem: (item: string) => void;
    changeLavado: (lavado: string) => void;
    changemedida: (medida: string) => void;
    changeFileName: (fileName: string) => void;

}

//Crear el contexto
export const OrdenesContext = createContext({} as OrdenesContextProps)

export const OrdenesProvider = ({ children }: any) => {
    const [ordenesState, dispatch] = useReducer(OrdenesReducer, ordenesInitialState)

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
    const changemedida = (medida: string) => {
        dispatch({ type: 'changeMedida', payload: medida })
    }
    const changeFileName = (fileName: string) => {
        dispatch({ type: 'changeFileName', payload: fileName })
    }

    return (
        <OrdenesContext.Provider value={{
            ordenesState: ordenesState,
            changeProdMasterRefId,
            changeProdMasterId,
            changeItem,
            changeLavado,
            changemedida,
            changeFileName
        }}>
            {children}
        </OrdenesContext.Provider>
    )
}