import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Linking, FlatList, ActivityIndicator } from 'react-native'
import { blue, grey, navy } from '../components/colores';
import { FontFamily, TextButtons, TextoPantallas } from '../components/Constant';
import { OrdenesContext } from '../context/OrdenesContext';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import { reqResApiFinanza } from '../api/reqResApi';
import { MedidasEnviarInterface, MedidasInterface } from '../interfaces/medidasInterface';
import { MedidaContainer } from '../components/medidaContainer';
import MyAlert from '../components/myAlert';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

const MedidasScreen = () => {
    const { ordenesState } = useContext(OrdenesContext)
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const [medidas, setMedidas] = useState<MedidasInterface[]>([])
    const [cargando, setCargando] = useState<boolean>(false)

    const getMedidas = async () => {
        setCargando(true)
        try {
            console.log('PantsQuality/DatosMedida/' + ordenesState.prodmasterid.replace(" ","-") + '/' + ordenesState.TallaID + '/' + ordenesState.lavadoID)
            const request = await reqResApiFinanza.get<MedidasInterface[]>('PantsQuality/DatosMedida/' + ordenesState.prodmasterid + '/' + ordenesState.TallaID + '/' + ordenesState.lavadoID)
            console.log(request.data)
            setMedidas(request.data)
        } catch (err) {
            console.log(err)

        }
        setCargando(false)
    }

    const enviarMedidas = async () => {
        setEnviando(true)
        let index: number = medidas.findIndex(x => parseFloat(x.medida) == 0 || (parseFloat(x.medida) == 0 && parseFloat(x.medidaNumerador) == 0) || x.medida == '' || (x.medida == '' && x.medidaNumerador == ''));

        if (index == -1) {
            try {
                let m: MedidasEnviarInterface[] = [];

                medidas.map(x => {
                    m.push({
                        id: 0,
                        idMasterOrden: ordenesState.masterID,
                        idTalla: ordenesState.TallaID,
                        usuarioID: ordenesState.idUsuario,
                        idMedida: x.id,
                        Medida: x.medida ? x.medida : '0',
                        MedidaNumerador: x.medidaNumerador,
                        Diferencia: x.diferencia ? x.diferencia : '0',
                        lavadoID: ordenesState.lavadoID
                    })
                })
                const request = await reqResApiFinanza.post<MedidasEnviarInterface[]>('PantsQuality/medidasInsert', m);
                if (request.data[0].id > 0) {
                    if (navigation.canGoBack()) {
                        navigation.goBack()
                    }
                }
            } catch (err) {
                
            }
        } else {
            setMensajeAlerta('No se ha especificado la medida: ' + medidas[index].nombre )
            setTipoMensaje(false);
            setShowMensajeAlerta(true);
        }
        setEnviando(false)
    }

    const irVideoTutorial = async (video: string) => {
        if (!enviando) {
            try {
                if (video.length > 0) {
                    Linking.openURL(video)
                } else {
                    setMensajeAlerta('No hay Tutorial')
                    setTipoMensaje(false);
                    setShowMensajeAlerta(true);
                }
            } catch (err) {
                setMensajeAlerta('Error de conexion')
                setTipoMensaje(false);
                setShowMensajeAlerta(true);
            }
        }

    }

    const renderItem = (item: MedidasInterface, index: number) => {

        const validarNum = (txt: string): string => {
            if (!Number.isNaN(parseInt(txt))) {
                txt = parseFloat(txt).toFixed(4);
                let entero = parseInt(txt)
                let fraccion = Math.round(parseFloat((parseFloat(txt) - parseInt(txt)).toFixed(4)) * 16)
                return (entero != 0 ? entero + ' ' : (parseFloat(txt) < 0 ? '-' : '')) +( fraccion != 0 ? (fraccion < 0 ? -fraccion : fraccion) +'/16' :'') 
            } else {
                return txt;
            }
        }
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.containerRenderItem}>
                    <Buttons onPress={() => irVideoTutorial(item.link)} disable={false} title='Tutorial' />

                    <Text style={[styles.textRender, { alignSelf: 'center', fontSize: TextoPantallas + 3 }]}>{item.nombre}</Text>
                    <Text style={styles.textRender}>Intruccion 1: {validarNum(item.intruccion1)}</Text>
                    <Text style={styles.textRender}>Intruccion 2: {validarNum(item.intruccion2)}</Text>
                    <Text style={styles.textRender}>Intruccion 3: {validarNum(item.intruccion3)}</Text>
                    <Text style={styles.textRender}>Spec: {validarNum(item.specs)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flex: 1 }}>
                            <MedidaContainer editable={!enviando} mostrar={true} medida={'Medida'}
                                onChangeText={(value: string) => {
                                    const nuevasMedidas = [...medidas];
                                    nuevasMedidas[index].medida = value;
                                    nuevasMedidas[index].diferencia = (parseFloat(nuevasMedidas[index].specs.length > 0 ? parseFloat(nuevasMedidas[index].specs).toFixed(4) : '0') - (parseFloat(nuevasMedidas[index].medidaNumerador.length > 0 ? nuevasMedidas[index].medidaNumerador : '0') / 16 + parseFloat(nuevasMedidas[index].medida.length > 0 ? nuevasMedidas[index].medida : '0'))).toString();
                                    nuevasMedidas[index].diferencia = parseFloat(nuevasMedidas[index].diferencia).toFixed(4).toString()
                                    setMedidas(nuevasMedidas);
                                }}
                                value={parseFloat(item.medida) > 0 ? item.medida : '' } />
                        </View>
                        <View style={{ flex: 1 }}>
                            <MedidaContainer editable={!enviando} mostrar={true} medida={''}
                                onChangeText={(value: string) => {
                                    const nuevasMedidas = [...medidas];
                                    nuevasMedidas[index].medidaNumerador = value;
                                    nuevasMedidas[index].diferencia = (parseFloat(nuevasMedidas[index].specs.length > 0 ? parseFloat(nuevasMedidas[index].specs).toFixed(4) : '0') - (parseFloat(nuevasMedidas[index].medidaNumerador.length > 0 ? nuevasMedidas[index].medidaNumerador : '0') / 16 + parseFloat(nuevasMedidas[index].medida.length > 0 ? nuevasMedidas[index].medida : '0'))).toString();
                                    nuevasMedidas[index].diferencia = parseFloat(nuevasMedidas[index].diferencia).toFixed(4).toString()
                                    setMedidas(nuevasMedidas);
                                }}
                                value={parseFloat(item.medidaNumerador) > 0 ? item.medidaNumerador : '' } />
                        </View>
                        <Text style={[styles.textRender, { marginBottom: 5, fontSize: 30 }]}>/</Text>

                        <View style={{ flex: 1 }}>
                            <MedidaContainer editable={false} mostrar={true} medida={''}
                                onChangeText={(value: string) => null}
                                value={'16'} />
                        </View>
                    </View>
                    <Text style={styles.textRender}>Diferencia: {validarNum((parseFloat(item.specs.length > 0 ? parseFloat(item.specs).toFixed(4) : '0') - (parseFloat(item.medidaNumerador.length > 0 ? item.medidaNumerador : '0') / 16 + parseFloat(item.medida.length > 0 ? item.medida : '0'))).toFixed(4))} </Text>
                    <Text style={styles.textRender}>Referencia: {validarNum(item.referencia)} </Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getMedidas()
    }, [])


    useEffect(() => {
        if (mensajeAlerta == 'Enviado' && !showMensajeAlerta) {
            navigation.goBack();
        }
    }, [showMensajeAlerta])

    return (
        <View style={{ flex: 1, backgroundColor: grey, alignItems: 'center' }}>
            <Header show={true} />
            <View style={styles.formulario}>
                <Text style={styles.text}>{ordenesState.lavado}</Text>
                <Text style={styles.text}>Talla: {ordenesState.TallaID}</Text>
                {
                    !cargando && medidas.length > 0 &&
                    <Buttons onPress={enviarMedidas} disable={enviando} title='Enviar' />

                }
            </View>
            {
                cargando ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color={navy} size={'large'} />
                        <Text style={styles.text}>Cargando informacion del Excel...</Text>
                    </View>
                    :

                    medidas.length > 0 ?
                        <FlatList
                            data={medidas}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            style={{ flex: 1, width: '100%' }}
                        />
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.text}>No se encontro el archivo...</Text>
                        </View>
            }
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        maxWidth: 600,
        backgroundColor: grey,
        alignItems: "center",
        paddingVertical: 20
    },
    formulario: {
        width: '90%',
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
    },
    containerRenderItem: {
        maxWidth: 450,
        width: '90%',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderColor: navy,
        backgroundColor: '#fff',
        marginHorizontal: '1%',
        marginVertical: 2
    },
    textRender: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        color: navy,
        fontFamily: FontFamily
    },
});
export default MedidasScreen;