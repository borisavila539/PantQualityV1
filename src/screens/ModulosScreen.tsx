import React, { useState, useEffect, useContext, FC } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { blue, grey } from '../components/colores';
import { ModulosInterface } from '../interfaces/ModulosInterface';
import { reqResApiFinanza } from '../api/reqResApi';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '../components/Buttons';
import { OrdenesContext } from '../context/OrdenesContext';
import { RootStackParams } from '../navigation/Navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { TextButtons } from '../components/Constant';

type props = StackScreenProps<RootStackParams, "ModulosScreen">;

const ModulosScreen: FC<props> = ({ navigation }) => {
    const [modulos, setModulos] = useState<ModulosInterface[]>([]);
    const { changeModuloId } = useContext(OrdenesContext);

    const getModulos = async () => {
        try {
            const request = await reqResApiFinanza.get<ModulosInterface[]>('PantsQuality/modulosCalidad');
            setModulos(request.data)
        } catch (err) {

        }
    }

    const selectModulo = (modulo: ModulosInterface) => {
        changeModuloId(modulo.id)
        navigation.navigate("OrdenesScreen");
    }

    useEffect(() => {
        getModulos();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header show={false} deleteCredencials={true}/>
            <ScrollView style={{ flex: 1, backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.text}>Selecione Modulo</Text>

                    <View style={styles.containerBotones}>
                        {
                            modulos.map((modulo) => {
                                return (
                                    <Buttons key={modulo.id} onPress={() => selectModulo(modulo)} disable={false} title={modulo.modulo} />
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
    containerBotones: {
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

export default ModulosScreen;