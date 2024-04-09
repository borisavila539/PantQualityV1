import React, { FC, useContext, useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import { grey } from '../components/colores';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams, Navigation } from '../navigation/Navigation';
import { TipoMedidainterface } from '../interfaces/TipoMedidaInterface';
import { reqResApiFinanza } from '../api/reqResApi';
import { OrdenesContext } from '../context/OrdenesContext';

type props = StackScreenProps<RootStackParams, "HomeScreen">;

const HomeScreen: FC<props> = ({ navigation }) => {

  const [data, setData] = useState<TipoMedidainterface[]>([]);
  const { changeTipoMedida,changeTipoMedidaID } = useContext(OrdenesContext)
  const getData = () => {
    try {
      reqResApiFinanza.get<TipoMedidainterface[]>('PantsQuality/TipoMedidas').then(resp => {
        setData([...resp.data, { id: 100, hoja: 0, nombre: 'Comentario' }])
      })
    } catch (err) {
      console
    }
  }
  const onPress = (item: TipoMedidainterface) => {
    changeTipoMedida(item.nombre)
    changeTipoMedidaID(item.id)
    navigation.navigate("LavadoScreen");

  }

  const onPressComentario = () => {
    navigation.navigate("ComentarioScreen");
  }

  const renderItem = (item: TipoMedidainterface) => {
    return (
      <Buttons onPress={item.nombre == "Comentario" ? onPressComentario : () => onPress(item)} disable={false} title={item.nombre} />
    )
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: grey }}>
      <Header show={true} deleteCredencials={false} />

      <View style={styles.formulario}>
        {
          data.length > 0 &&
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        }

      </View>

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
    width: '100%',
    maxWidth: 600,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
});

export default HomeScreen;
