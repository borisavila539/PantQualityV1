import React, { FC, useContext, useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { grey } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { OrdenesContext } from '../context/OrdenesContext';
import Header from '../components/Header';
import { RootStackParams } from '../navigation/Navigation';
import TextInputContainer from '../components/TextInputContainer';
import { ObjectHeigth } from '../components/Constant';
import { reqResApiFinanza } from '../api/reqResApi';
import { MaesterOrdenInterface } from '../interfaces/MasterOrden';

type props = StackScreenProps<RootStackParams, "LavadoScreen">;

const LavadoScreen: FC<props> = ({ navigation }) => {
    const { changeLavado, ordenesState, changeOrdenId } = useContext(OrdenesContext)

    const ObtenerDatosOrden = async () => {
        try {
            const request = await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/orden/' + ordenesState.prodmasterid + '/' + ordenesState.prodMasterRefID + '/' + ordenesState.itemid);
            if (request.data.length > 0) {
                changeOrdenId(request.data[0].id)
            }
        } catch (err) {
            console.log('no consulto nombre archivo')
        }
    }

    const onPressAntes = () => {
        changeLavado('Antes del Lavado')
        navigation.navigate("TipoMedidaScreen")
    }

    const onPressDespues = () => {
        changeLavado('Despues del Lavado')
        navigation.navigate("TipoMedidaScreen")
    }

    useEffect(()=>{
        ObtenerDatosOrden();
    },[])

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header />
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Buttons onPressFuntion={() => onPressAntes} disable={false} title='Antes del Lavado' />
                        <Buttons onPressFuntion={() => onPressDespues} disable={false} title='Despues del lavado' />
                    </View>
                    <Text>
                        {ordenesState.FileName}
                    </Text>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: grey,
        alignItems: "center",
        paddingVertical: 20
    },
    formulario: {
        width: '80%',
        maxWidth: 600,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default LavadoScreen;
