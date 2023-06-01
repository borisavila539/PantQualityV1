import React, { FC } from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { grey } from '../components/colores';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

type props = StackScreenProps<RootStackParams, "HomeScreen">;

const HomeScreen: FC<props> = ({ navigation }) => {
  const onPressAuditoriaFinal = () => {
    navigation.navigate("LavadoScreen");
  }

  const onPressComentario = () => {
    navigation.navigate("ComentarioScreen");
  }

  const onPressOther = () => {

  }
  return (
    <View style={{ flex: 1, backgroundColor: grey }}>
      <Header show={true} deleteCredencials={false}/>
      <ScrollView style={{ height: '100%', backgroundColor: grey }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.formulario}>
            <Buttons onPress={onPressAuditoriaFinal} disable={false} title='Auditoria Final' />
            <Buttons onPress={onPressOther} disable={false} title='Auditoria Partes' />
            <Buttons onPress={onPressComentario} disable={false} title='Comentarios' />
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

export default HomeScreen;
