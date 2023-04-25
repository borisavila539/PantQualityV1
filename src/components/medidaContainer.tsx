import React from 'react'
import TextInputContainer from './TextInputContainer'
import { ObjectHeigth } from './Constant'
import { MedidaContainerInterface } from '../interfaces/medidaContainerInterface'

export const MedidaContainer = ({ mostrar, medida, onChangeText, value }: MedidaContainerInterface) => {
    return (
        <>
            {
                mostrar &&
                <TextInputContainer
                    title={ medida}
                    justify={true}
                    height={ObjectHeigth}
                    placeholder='0.00'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={true}
                    onChangeText={(value:string) => onChangeText(value)}
                    value={value}
                    maxlength={20}
                />
            }
        </>
    )
}
