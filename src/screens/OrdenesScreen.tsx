import React, { useEffect, useState, useContext, FC } from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { reqResApiFinanza } from '../api/reqResApi'
import { OrdennesIniciadasInterface } from '../interfaces/ordenesIniciadasInterface';
import { grey, navy, orange } from '../components/colores';
import { OrdenesContext } from '../context/OrdenesContext';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { FontFamily, IconHeader, TextButtons } from '../components/Constant';
import { RootStackParams } from '../navigation/Navigation';
import Header from '../components/Header';

type props = StackScreenProps<RootStackParams, "OrdenesScreen">;


const OrdenesScreen: FC<props> = ({ navigation }) => {
  const [ordenes, setOrdenes] = useState<OrdennesIniciadasInterface[]>([])
  const [ordenesShow, setOrdenesShow] = useState<OrdennesIniciadasInterface[]>([])

  const { changeProdMasterRefId, changeProdMasterId, changeItem } = useContext(OrdenesContext)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [Filtro, setFiltro] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false);

  const getOrdenesIniciadas = async () => {
    if (!cargando) {
      setCargando(true)
      try {
        const request = await reqResApiFinanza.get<OrdennesIniciadasInterface[]>('PantsQuality/OrdenesIniciadas/0/15/' + (Filtro != '' ? Filtro : '-'));
        setOrdenes(request.data);
        setOrdenesShow(request.data)
        setPage(1)
      } catch (err) {

      }
      setCargando(false)
    }
  }

  const getOrdenesIniciadasMas = async () => {
    if (!cargando) {
      setCargando(true)
      try {
        const request = await reqResApiFinanza.get<OrdennesIniciadasInterface[]>('PantsQuality/OrdenesIniciadas/' + page + '/15/' + (Filtro != '' ? Filtro : '-'));
        setOrdenes(ordenes.concat(request.data));
        setOrdenesShow(ordenesShow.concat(request.data))
        setPage(page + 1)

      } catch (err) {

      }
      setCargando(false)
    }

  }


  const onPress = (item: OrdennesIniciadasInterface) => {
    changeProdMasterRefId(item.prodmasterrefid);
    changeProdMasterId(item.prodmasterid);
    changeItem(item.itemid)
    //Postear
    navigation.navigate('LavadoScreen');
  }


  const renderItem = (item: OrdennesIniciadasInterface) => {
    const onPressOrden = (item2: OrdennesIniciadasInterface) => {
      //Enviar a la base de datos
      onPress(item2)
    }
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={styles.containerRenderItem}>
          <TouchableOpacity style={styles.renderItemTouch} onPress={() => onPressOrden(item)}>
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
      </View>

    )
  }
  useEffect(() => {
    getOrdenesIniciadas();
  }, [])
  return (
    <View style={styles.container}>
      <Header show={false} />
      <View style={styles.containerBuscar}>
        <Text style={styles.text}>Buscar:</Text>
        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder='OP-00000000'
            placeholderTextColor={'#DAE1E7'}
            onChangeText={(value) => setFiltro(value)}
            value={Filtro}
          />
          <TouchableOpacity onPress={getOrdenesIniciadas}>
            <Text>
              <Icon name='search-sharp' size={30} color={navy} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        ordenesShow.length == 0 ?
          <ActivityIndicator color={orange} />
          :
          <FlatList
            data={ordenesShow}
            keyExtractor={(item) => item.prodmasterid.toString()}
            renderItem={({ item }) => renderItem(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => getOrdenesIniciadas()} colors={['#069A8E']} />
            }
            onEndReached={getOrdenesIniciadasMas}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: grey }}
          />
      }

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
    maxWidth: 450,
    width: '90%',
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
    textAlign: 'center',
    width: '90%'
  },
  containerBuscar: {
    width: '90%',
    marginHorizontal: '1%',
    marginVertical: 2,
    paddingHorizontal: 5,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default OrdenesScreen;