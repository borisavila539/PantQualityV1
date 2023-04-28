import React from 'react'
import TextInputContainer from './TextInputContainer'
import { ObjectHeigth } from './Constant'
import { MedidaContainerInterface } from '../interfaces/medidaContainerInterface'

export const MedidaContainer = ({ mostrar, medida, onChangeText, value,editable }: MedidaContainerInterface) => {
    return (
        <>
            {
                mostrar &&
                <TextInputContainer
                    title={ medida}
                    justify={true}
                    height={ObjectHeigth}
                    placeholder='0'
                    teclado={'decimal-pad'}
                    multiline={false}
                    editable={editable}
                    onChangeText={(value:string) => onChangeText(value)}
                    value={value}
                    maxlength={20}
                />
            }
        </>
    )
}
