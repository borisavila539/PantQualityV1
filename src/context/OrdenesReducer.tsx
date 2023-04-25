import { OrdenesState } from "./OrdenesContext";

type OrdenesAction =
    | { type: 'changeUserId', payload: number }
    | { type: 'changeOrdenId', payload: number }
    | { type: 'changeProdMasterRefId', payload: string }
    | { type: 'changeProdMasterID', payload: string }
    | { type: 'changeItem', payload: string }
    | { type: 'changeLavado', payload: string }
    | { type: 'changeLavadoID', payload: number }
    | { type: 'changeMedida', payload: string }
    | { type: 'changeMedidaID', payload: number }
    | { type: 'changeFileName', payload: string }
    | { type: 'changeMasterID', payload: number }
    | { type: 'changeTutorialLink', payload: string }
    | { type: 'changeTallaID', payload: string }





export const OrdenesReducer = (state: OrdenesState, action: OrdenesAction): OrdenesState => {
    switch (action.type) {
        case "changeUserId":
            return {
                ...state,
                idUsuario: action.payload
            }
        case "changeOrdenId":
            return {
                ...state,
                OrdenId: action.payload
            }
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
        case 'changeLavadoID':
            return {
                ...state,
                lavadoID: action.payload
            }
        case 'changeMedida':
            return {
                ...state,
                medida: action.payload
            }
        case 'changeMedidaID':
            return {
                ...state,
                medidaId: action.payload
            }
        case 'changeFileName':
            return {
                ...state,
                FileName: action.payload
            }
        case "changeMasterID":
            return {
                ...state,
                masterID: action.payload
            }
        case "changeTutorialLink":
            return {
                ...state,
                TutorialLink: action.payload
            }
        case "changeTallaID":
            return {
                ...state,
                TallaID: action.payload
            }
        default:
            return state;
    }
}