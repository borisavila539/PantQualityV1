import React from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { grey } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { };

const LavadoScreen = ({ navigation }: Props) => {
    const irTiposMedida = () => {
        navigation.navigate('TipoMedidaScreen')
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Buttons onPressFuntion={() => irTiposMedida} disable={false} title='Antes del Lavado' />
                        <Buttons onPressFuntion={() => irTiposMedida} disable={false} title='Despues del lavado' />
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
        backgroundColor: '#fff',
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
