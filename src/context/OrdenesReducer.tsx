import { OrdenesState } from "./OrdenesContext";

type OrdenesAction =
    | { type: 'changeProdMasterRefId', payload: string }
    | { type: 'changeProdMasterID', payload: string }
    | { type: 'changeItem', payload: string }
    | { type: 'changeLavado', payload: string }
    | { type: 'changeMedida', payload: string }
    | { type: 'changeFileName', payload: string }


export const OrdenesReducer = (state: OrdenesState, action: OrdenesAction): OrdenesState => {
    switch (action.type) {
        case 'changeProdMasterRefId':
            return {
                ...state,
                prodMasterRefID: action.payload
            }
        case 'changeProdMasterID':
            return {
                ...state,
                prodmasterid: action.payload
            }
            case 'changeItem':
                return {
                    ...state,
                    itemid: action.payload
                }
        case 'changeLavado':
            return {
                ...state,
                lavado: action.payload
            }
        case 'changeMedida':
            return {
                ...state,
                medida: action.payload
            }
        case 'changeFileName':
            return {
                ...state,
                FileName: action.payload
            }
        default:
            return state;
    }
}