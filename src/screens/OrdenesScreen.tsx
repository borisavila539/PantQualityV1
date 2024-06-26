import React, { useEffect, useState, useContext, FC } from 'react'
import { Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { reqResApiFinanza } from '../api/reqResApi'
import { OrdennesIniciadasInterface } from '../interfaces/ordenesIniciadasInterface';
import { blue, grey, navy, orange } from '../components/colores';
import { OrdenesContext } from '../context/OrdenesContext';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { FontFamily, IconHeader, TextButtons } from '../components/Constant';
import { RootStackParams } from '../navigation/Navigation';
import Header from '../components/Header';
import { MaesterOrdenInterface } from '../interfaces/MasterOrden';
import SelectDropdown from 'react-native-select-dropdown';
import { estadoInterface } from '../interfaces/estadosInterface';
import { EstilosInterface } from '../interfaces/EstilosInterface';

type props = StackScreenProps<RootStackParams, "OrdenesScreen">;


const OrdenesScreen: FC<props> = ({ navigation }) => {
  const [ordenes, setOrdenes] = useState<MaesterOrdenInterface[]>([])
  const [ordenesShow, setOrdenesShow] = useState<MaesterOrdenInterface[]>([])
  const { ordenesState, changeProdMasterRefId, changeProdMasterId, changeItem, changeMasterID } = useContext(OrdenesContext)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [Filtro, setFiltro] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false);
  const [estado, setEstado] = useState<number>(-1);
  const [logout, setLogout] = useState<boolean>(false);


  let estados: estadoInterface[] = [
    { id: -1, text: 'Todos' },
    { id: 0, text: 'Pendiente' },
    { id: 1, text: 'Aprobado' },
    { id: 2, text: 'Rechazado' }
  ]
  let estadosTex: string[] = ['Todos', 'Pendiente', 'Aprobado', 'Rechazado']
  const getOrdenesIniciadas = async () => {

    if (ordenesState.ModuloName != "Pre-Produccion") {
      if (!cargando) {
        setCargando(true)
        console.log('con' + cargando)
        try {
          let estadoOrden: MaesterOrdenInterface[] = [];
          const request = await reqResApiFinanza.get<OrdennesIniciadasInterface[]>('PantsQuality/OrdenesIniciadas/0/10/' + (Filtro != '' ? Filtro : '-'));
          let size: number = request.data.length;
          let cont = 0;
          console.log(request.data)
          request.data.map(async (x) => {
            try {
              //console.log('PantsQuality/orden/' + x.prodmasterid + '/' + x.prodmasterrefid + '/' + x.itemid + '/' + estado)
              await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/orden/' + x.prodmasterid + '/' + x.prodmasterrefid + '/' + x.itemid + '/' + estado).then(request2 => {
                //console.log(request2.data[0])
                cont++;
                if (request2.data.length > 0) {
                  estadoOrden = [...estadoOrden, request2.data[0]]
                }
              }).catch(err => {
                console.log(x.prodmasterid)
              });
            } catch (err) {

              console.log(x)
            }

            if (cont === size) {
              setOrdenes(estadoOrden)
              setOrdenesShow(estadoOrden)
            }
          })
          setPage(1)

          if (ordenesState.Rol === "Comentario") {
            setLogout(true)
          } else {
            setLogout(false)
          }
        } catch (err) {
          setCargando(false)
          console.log(err)
        }
        setCargando(false)
      }
    } else {
      if (!cargando && Filtro != '') {
        setCargando(true)
        try {
          let estadoOrden: MaesterOrdenInterface[] = [];
          let size: number = 0;
          await reqResApiFinanza.get<EstilosInterface[]>('PantsQuality/Estilos/' + (Filtro != '' ? Filtro : '-'))
            .then(resp => {
              size = resp.data.length;
              resp.data.map(async (element) => {
                try {
                  await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/orden/' + element.estilo + '/' + element.estilo + '/' + element.estilo + '/' + estado)
                    .then(tmp => {
                      if (tmp.data.length > 0) {
                        estadoOrden = [...estadoOrden, tmp.data[0]]
                      }

                      if (size == estadoOrden.length) {
                        setOrdenes(estadoOrden)
                        setOrdenesShow(estadoOrden)
                      }
                    })
                } catch (err) {
                  console.log(err)
                }
              })
            })

        } catch (err) {
          console.log(err)
        }
      }
    }

    setCargando(false)

  }

  const getOrdenesIniciadasMas = async () => {
    if (!cargando) {
      setCargando(true)
      try {
        let estadoOrden: MaesterOrdenInterface[] = [];
        const request = await reqResApiFinanza.get<OrdennesIniciadasInterface[]>('PantsQuality/OrdenesIniciadas/' + page + '/10/' + (Filtro != '' ? Filtro : '-'));
        let size: number = request.data.length;
        request.data.map(async (x) => {
          try {
            const request2 = await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/orden/' + x.prodmasterid + '/' + x.prodmasterrefid + '/' + x.itemid + '/' + estado).then(request2 => {
              if (request2.data.length > 0) {
                estadoOrden = [...estadoOrden, request2.data[0]]
                setOrdenes(ordenes.concat(estadoOrden))
                setOrdenesShow(ordenesShow.concat(estadoOrden))
              }
            });
          } catch (err) {
            console.log(x)
          }


        })
        setPage(page + 1)

      } catch (err) {

      }
      setCargando(false)
    }
    setCargando(false)

  }

  const onPress = (item: MaesterOrdenInterface) => {
    if (item.posted != 1) {
      changeProdMasterRefId(item.prodmasterrefid);
      changeProdMasterId(item.prodmasterid);
      changeItem(item.itemid);
      changeMasterID(item.id)

      //Postear
      if (ordenesState.Rol === "Comentario") {
        navigation.navigate("ComentarioScreen")

      } else {
        navigation.navigate('HomeScreen');
      }

    }
  }


  const renderItem = (item: MaesterOrdenInterface) => {
    const onPressOrden = (item2: MaesterOrdenInterface) => {
      onPress(item2)
    }
    const getColor = (): string => {

      switch (item.posted) {
        case 0:
          return grey;
        case 1:
          return '#367E18';
        case 2:
          return '#CC3636';
        default:
          return '#000';
      }
    }
    const getAprobacion = (): string => {
      switch (item.posted) {
        case 0:
          return 'Pendiente'
        case 1:
          return 'Aprobado'
        case 2:
          return 'Rechazado'
        default:
          return 'Pendiente'
      }
    }
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={[styles.containerRenderItem, { backgroundColor: getColor() }]}>
          <TouchableOpacity style={styles.renderItemTouch} onPress={() => onPressOrden(item)}>
            <View style={styles.containerIcon}>
              <Text>
                <Icon name='document-text-sharp' size={IconHeader} color={item.posted ? '#fff' : navy} />
              </Text>
            </View>
            <View style={{ width: '80%' }}>
              {
                ordenesState.ModuloName != "Pre-Produccion" ? 
                <>
                <Text style={[styles.text, item.posted ? { color: '#fff' } : null]}>Orden: {item.prodmasterrefid}</Text>
              <Text style={[styles.text, item.posted ? { color: '#fff' } : null]}>Articulo: {item.itemid}</Text>
                </>
                :
                <Text style={[styles.text, item.posted ? { color: '#fff' } : null]}>Estilo: {item.prodmasterrefid}</Text>
              }
              
              <Text style={[styles.text, item.posted ? { color: '#fff' } : null]}>Estado: {getAprobacion()}</Text>

            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const onSelectEstado = (selectedItem: string, index: number) => {

    estados.forEach(x => {
      if (x.text == selectedItem) {
        index = x.id
      }
    })
    console.log(index)
    setEstado(index)
  }

  function icon() {
    return (
      <Text>
        <Icon name='chevron-down-outline' size={30} color={navy} />
      </Text>
    )
  }

  useEffect(() => {
    getOrdenesIniciadas()
  }, [ordenesState.OrdenId, estado])

  return (
    <View style={styles.container}>
      <Header show={false} deleteCredencials={logout} />
      <View style={{ width: '100%', alignItems: 'center' }}>

        <View style={styles.containerBuscar}>
          <Text style={styles.text}>Buscar:</Text>
          <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder={ordenesState.ModuloName != "Pre-Produccion" ?'OP-00000000':'Estilo' }
              placeholderTextColor={'#DAE1E7'}
              onChangeText={(value) => setFiltro(value)}
              value={Filtro}
            />
            <TouchableOpacity onPress={() => getOrdenesIniciadas()}>
              <Text>
                <Icon name='search-sharp' size={30} color={navy} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '90%', maxWidth: 450 }}>
          <SelectDropdown
            data={estadosTex}
            onSelect={onSelectEstado}
            buttonTextAfterSelection={(SelectedItem, index) => {
              return SelectedItem
            }}
            defaultButtonText='--Estado--'
            renderDropdownIcon={() => icon()}
            buttonStyle={styles.button}
          />

        </View>
      </View>
      {
        ordenesShow.length == 0 ?
          <>
            {
              cargando ? 
              <ActivityIndicator color={orange} />
              :
              <Text style={{textAlign: 'center'}}>No se encontraron ordenes</Text>
            }
          </>

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
    width: '90%',
    color: navy
  },
  containerBuscar: {
    maxWidth: 450,
    width: '90%',
    marginHorizontal: '1%',
    marginVertical: 2,
    paddingHorizontal: 5,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: blue,
    backgroundColor: '#f0f0f0',
    width: '100%',
    marginVertical: 10,
    fontFamily: FontFamily
  }
});

export default OrdenesScreen;