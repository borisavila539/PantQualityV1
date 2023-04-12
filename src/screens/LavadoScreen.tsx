import React, { FC, useContext } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { grey } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { OrdenesContext } from '../context/OrdenesContext';
import Header from '../components/Header';
import { RootStackParams } from '../navigation/Navigation';

type props = StackScreenProps<RootStackParams, "LavadoScreen">;

const LavadoScreen: FC<props> = ({ navigation }) => {
    const { changeLavado } = useContext(OrdenesContext)

    const onPressAntes = () => {
        changeLavado('Antes del Lavado')
        navigation.navigate("TipoMedidaScreen")
    }

    const onPressDespues = () => {
        changeLavado('Despues del Lavado')
        navigation.navigate("TipoMedidaScreen")
    }

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header />
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Buttons onPressFuntion={() => onPressAntes} disable={false} title='Antes del Lavado' />
                        <Buttons onPressFuntion={() => onPressDespues} disable={false} title='Despues del lavado' />
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
});

export default LavadoScreen;
