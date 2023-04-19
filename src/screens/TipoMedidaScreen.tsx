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
import { MedidasInterface } from '../interfaces/medidasInterface';

type props = StackScreenProps<RootStackParams, "TipoMedidaScreen">;


const TipoMedidaScreen: FC<props> = ({ navigation }) => {

    const { ordenesState, changemedida, changemedidaID, changeTutorialLink } = useContext(OrdenesContext);
    const [Medidas, setMedidas] = useState<MedidasInterface[]>([])

    const getMedidas = async () => {
        try {
            const request = await reqResApiFinanza.get<MedidasInterface[]>('PantsQuality/Medidas')
            setMedidas(request.data)
        } catch (err) {

        }
    }

    const irTallas = (dato: MedidasInterface) => {
        changemedida(dato.nombre)
        changemedidaID(dato.id)
        changeTutorialLink(dato.link)
        navigation.navigate('MedidasScreen')
    }

    useEffect(() => {
        getMedidas();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header show={true} />
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Text style={styles.text}>{ordenesState.lavado}</Text>
                        {
                            Medidas.map((medida) => {
                                return (
                                    <Buttons key={medida.id} onPress={() => irTallas(medida)} disable={false} title={medida.nombre} />
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
