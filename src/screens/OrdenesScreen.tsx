import React, { useEffect, useState, useContext, FC } from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { reqResApiFinanza } from '../api/reqResApi'
import { OrdennesIniciadasInterface } from '../interfaces/ordenesIniciadasInterface';
import { blue, grey, navy } from '../components/colores';
import { OrdenesContext } from '../context/OrdenesContext';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { FontFamily, IconHeader, TextButtons } from '../components/Constant';
import { RootStackParams } from '../navigation/Navigation';

type props = StackScreenProps<RootStackParams, "OrdenesScreen">;


const OrdenesScreen: FC<props> = ({ navigation }) => {
  const [ordenes, setOrdenes] = useState<OrdennesIniciadasInterface[]>([])
  const [ordenesShow, setOrdenesShow] = useState<OrdennesIniciadasInterface[]>([])

  const { changeOrden } = useContext(OrdenesContext)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [Filtro, setFiltro] = useState<string>('');

  const getOrdenesIniciadas = async () => {

    try {
      const request = await reqResApiFinanza.get<OrdennesIniciadasInterface[]>('PantsQuality/OrdenesIniciadas');
      setOrdenes(request.data)
      setOrdenesShow(request.data)
    } catch (err) {

    }
  }

  const onPress = (orden: string) => {
    changeOrden(orden);
    navigation.navigate('LavadoScreen');
  }

  const filtrar = () => {
    const ordenTMP: OrdennesIniciadasInterface[] = []
    if (Filtro != '') {
      ordenes.map(x => {
        if (x.prodmasterrefid.includes(Filtro)) {
          ordenTMP.push(x);
        }
      })
      setOrdenesShow(ordenTMP)
    } else {
      setOrdenesShow(ordenes)
    }

  }

  const renderItem = (item: OrdennesIniciadasInterface) => {
    return (
      <View style={styles.containerRenderItem}>
        <TouchableOpacity style={styles.renderItemTouch} onPress={() => onPress(item.prodmasterrefid)}>
          <View style={styles.containerIcon}>
            <Text>
              <Icon name='document-text-sharp' size={IconHeader} color={navy} />
            </Text>
          </View>
          <View style={{ width: '80%' }}>
            <Text style={styles.text}>Orden: {item.prodmasterrefid}</Text>
            <Text style={styles.text}>Articulo: {item.itemid}</Text>

          </View>
        </TouchableOpacity>
      </View>
    )
  }
  useEffect(() => {
    getOrdenesIniciadas();
  }, [])

  useEffect(() => {
    filtrar();
  }, [Filtro])
  return (
    <View style={styles.container}>
      <View style={styles.containerBuscar}>
        <Text style={styles.text}>Buscar:</Text>
        <View style={{ width: '90%' }}>
          <TextInput
            style={styles.input}
            placeholder='OP-00000000'
            placeholderTextColor={'#DAE1E7'}
            onChangeText={(value) => setFiltro(value)}
            value={Filtro}
          />
        </View>
      </View>

      <FlatList
        data={ordenesShow}
        keyExtractor={(item) => item.prodmasterid.toString()}
        renderItem={({ item }) => renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => getOrdenesIniciadas()} colors={['#069A8E']} />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: grey }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: grey
  },
  containerRenderItem: {
    width: '95%',
    borderWidth: 1.5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: navy,
    backgroundColor: '#fff',
    marginHorizontal: '1%',
    marginVertical: 2
  },
  renderItemTouch: {
    width: '100%',
    flexDirection: 'row'
  },
  containerIcon: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: navy,
    fontStyle: 'italic',
    fontFamily: FontFamily
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: navy,
    backgroundColor: grey,
    fontSize: TextButtons,
    textAlign: 'center'
  },
  containerBuscar: {
    width: '90%',
    marginHorizontal: '1%',
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default OrdenesScreen;