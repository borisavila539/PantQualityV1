import { OrdenesState } from "./OrdenesContext";

type OrdenesAction = 
    |{type: 'changeLavado', payload: string}
    | {type: 'changeMedida', payload: string}

export const OrdenesReducer = (state:OrdenesState, action: OrdenesAction):OrdenesState =>{
    switch(action.type){
        case 'changeLavado':
            return {
                ...state,
                lavado: action.payload
            }
        case 'changeMedida':
            return{
                ...state,
                medida: action.payload
            }
        default:
            return state;
    }
}