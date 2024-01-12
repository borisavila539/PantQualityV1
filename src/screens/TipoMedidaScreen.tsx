import React, { FC, useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { blue, grey } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { OrdenesContext } from '../context/OrdenesContext';
import { TextButtons } from '../components/Constant';
import Header from '../components/Header';
import { RootStackParams } from '../navigation/Navigation';
import { reqResApiFinanza } from '../api/reqResApi';
import { MedidasInterface, TallasInterface } from '../interfaces/medidasInterface';

type props = StackScreenProps<RootStackParams, "TipoMedidaScreen">;


const TipoMedidaScreen: FC<props> = ({ navigation }) => {

    const { ordenesState, changeTallaID } = useContext(OrdenesContext);
    const [Tallas, setTallas] = useState<TallasInterface[]>([])

    const getMedidas = async () => {
        try {
            const request = await reqResApiFinanza.get<TallasInterface[]>('PantsQuality/tallas/' + ordenesState.itemid+'/'+ordenesState.prodMasterRefID);
            //const request = await reqResApiFinanza.get<MedidasInterface[]>('PantsQuality/Medidas')
            setTallas(request.data)
        } catch (err) {
            console.log('No carga'+ ordenesState.itemid+'/'+ordenesState.prodMasterRefID)
            console.log(err)

        }
    }

    const irTallas = (dato: TallasInterface) => {
        changeTallaID(dato.sizeid)
        navigation.navigate('MedidasScreen')
    }

    useEffect(() => {
        getMedidas();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header show={true} deleteCredencials={false}/>
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Text style={styles.text}>{ordenesState.lavado}</Text>
                        {
                            Tallas.map((talla) => {
                                return (
                                    <Buttons key={talla.sizeid} onPress={() => irTallas(talla)} disable={false} title={talla.sizeid} />
                                )
                            })
                        }
                    </View>
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
    text: {
        fontSize: TextButtons,
        color: blue,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        marginBottom: 10
    }
});

export default TipoMedidaScreen;
