import React , {FC}from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { grey } from '../components/colores';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

type props = StackScreenProps<RootStackParams, "LavadoScreen">;

const HomeScreen:FC<props> = ({navigation}) => {
  const onPressAuditoriaFinal =() =>{
    navigation.navigate("OrdenesScreen");
  }

  const onPressOther = () =>{

  }
  return (
    <View style={{ flex: 1, backgroundColor: grey }}>
            <Header show={false} />
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Buttons onPress={onPressAuditoriaFinal} disable={false} title='Auditoria Final' />
                        <Buttons onPress={onPressOther} disable={false} title='Auditoria Partes' />
                        <Buttons onPress={onPressOther} disable={false} title='Medias de J y Alturas de Bolsas' />
                        <Buttons onPress={onPressOther} disable={false} title='Estandar de Bolsas' />
        </View>
        </SafeAreaView>
        </ScrollView>
        <Text>Home</Text>
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

export default HomeScreen;
