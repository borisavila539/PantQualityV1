import React, { useContext } from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { blue, grey } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { OrdenesContext } from '../context/OrdenesContext';
import { TextButtons } from '../components/Constant';
import Header from '../components/Header';

interface Props extends StackScreenProps<any, any> { };

const TipoMedidaScreen = ({ navigation }: Props) => {

    const {ordenesState, changemedida} = useContext(OrdenesContext);

    const irMedidasCinturaAlta = () => {
        changemedida('Cintura Alta')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasCinturaBaja = () => {
        changemedida('Cintura Baja')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasCaderaAlta = () => {
        changemedida('Cadera Alta')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasCaderaBaja = () => {
        changemedida('Cadera Baja')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasAsiento = () => {
        changemedida('Asiento')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasTiroDelantero = () => {
        changemedida('Tiro Delantero')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasMuslo = () => {
        changemedida('Muslo')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasMusloMedio = () => {
        changemedida('Muslo Medio')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasRodilla = () => {
        changemedida('Rodilla')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasPantorrilla = () => {
        changemedida('Pantorrilla')
        navigation.navigate('MedidasScreen')
    }
    
    const irMedidasRuedo = () => {
        changemedida('Ruedo')
        navigation.navigate('MedidasScreen')
    }

    const irMedidasEntrepierna = () => {
        changemedida('Entrepierna')
        navigation.navigate('MedidasScreen')
    }

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header/>
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Text style={styles.text}>{ordenesState.lavado}</Text>
                        <Buttons onPressFuntion={() => irMedidasCinturaAlta} disable={false} title='Cintura Alta' />
                        <Buttons onPressFuntion={() => irMedidasCinturaBaja} disable={false} title='Cintura Baja' />
                        <Buttons onPressFuntion={() => irMedidasCaderaAlta} disable={false} title='Cadera Alta' />
                        <Buttons onPressFuntion={() => irMedidasCaderaBaja} disable={false} title='Cadera Baja' />
                        <Buttons onPressFuntion={() => irMedidasAsiento} disable={false} title='Asiento' />
                        <Buttons onPressFuntion={() => irMedidasTiroDelantero} disable={false} title='Tiro Delantero' />
                        <Buttons onPressFuntion={() => irMedidasMuslo} disable={false} title='Muslo' />
                        <Buttons onPressFuntion={() => irMedidasMusloMedio} disable={false} title='Muslo medio' />
                        <Buttons onPressFuntion={() => irMedidasRodilla} disable={false} title='Rodilla' />
                        <Buttons onPressFuntion={() => irMedidasPantorrilla} disable={false} title='Pantorrilla' />
                        <Buttons onPressFuntion={() => irMedidasRuedo} disable={false} title='Ruedo' />
                        <Buttons onPressFuntion={() => irMedidasEntrepierna} disable={false} title='Entrepierna' />
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
