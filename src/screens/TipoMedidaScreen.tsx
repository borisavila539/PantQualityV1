import React from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { grey } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { };

const TipoMedidaScreen = ({ navigation }: Props) => {
    const irMedidas = () => {
        navigation.navigate('MedidasScreen')
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Cintura Alta' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Cintura Baja' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Cadera Alta' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Cadera Baja' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Asiento' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Tiro Delantero' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Muslo' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Muslo medio' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Rodilla' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Pantorrilla' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Ruedo' />
                        <Buttons onPressFuntion={() => irMedidas} disable={false} title='Entrepierna' />
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

export default TipoMedidaScreen;
