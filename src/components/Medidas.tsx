import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { MedidaContainer } from './medidaContainer';
import { MedidasInterface } from '../interfaces/medidasInterface';
import { navy } from './colores';
import { FontFamily, TextoPantallas } from './Constant';
interface Medidas {
    nombre: string,
    intruccion1: string,
    intruccion2: string,
    intruccion3: string,
    specs: string,
    referencia: string,
    diferencia: string,
    onChange: (value: string) => void,
    valor: string,
    mostrar: boolean
}
export const Medidas: FC<Medidas> = ({ nombre, intruccion1, intruccion2, intruccion3, specs, referencia, diferencia, onChange, valor, mostrar }) => {
    return (
        <>
            {
                mostrar &&
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={styles.containerRenderItem}>
                        <Text style={styles.textRender}>{nombre}</Text>
                        <Text style={styles.textRender}>Intruccion 1: {intruccion1}</Text>
                        <Text style={styles.textRender}>Intruccion 2: {intruccion2}</Text>
                        <Text style={styles.textRender}>Intruccion 3: {intruccion3}</Text>
                        <Text style={styles.textRender}>Spec: {specs}</Text>
                        <MedidaContainer editable={true} mostrar={true} medida={'Medida'}
                            onChangeText={(value: string) => onChange(value)}
                            value={valor} />
                        <MedidaContainer editable={false} mostrar={true} medida={'Diferencia'} onChangeText={() => null}
                            value={diferencia}
                        />
                        <Text style={styles.textRender}>Referencia: {referencia} </Text>
                    </View>
                </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    containerRenderItem: {
        maxWidth: 450,
        width: '90%',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderColor: navy,
        backgroundColor: '#fff',
        marginHorizontal: '1%',
        marginVertical: 2
    },
    textRender: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        color: navy,
        fontFamily: FontFamily
    },
});
