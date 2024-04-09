import React, { FC, useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { blue, grey, navy } from '../components/colores';
import Buttons from '../components/Buttons';
import { StackScreenProps } from '@react-navigation/stack';
import { OrdenesContext } from '../context/OrdenesContext';
import Header from '../components/Header';
import { RootStackParams } from '../navigation/Navigation';
import { reqResApiFinanza } from '../api/reqResApi';
import { MaesterOrdenInterface } from '../interfaces/MasterOrden';
import MyAlert from '../components/myAlert';
import MyAlertValidate from '../components/MyAlertValidate';
import { HistoricoEstadoOrdenInterface } from '../interfaces/HistoricoEstadoOrdenInterface';
import { FontFamily } from '../components/Constant';

type props = StackScreenProps<RootStackParams, "LavadoScreen">;

const LavadoScreen: FC<props> = ({ navigation }) => {
    const { changeLavado, ordenesState, changeOrdenId, changeLavadoID, changeMasterID } = useContext(OrdenesContext)
    const [enviando, setEnviando] = useState<boolean>(false);
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [showMensajeAlertaR, setShowMensajeAlertaR] = useState<boolean>(false);
    const [showMensajeAlertaE, setShowMensajeAlertaE] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');
    const [HistoricoEstdo, setHistoricoEstado] = useState<HistoricoEstadoOrdenInterface[]>([])

    const ObtenerDatosOrden = async () => {
        try {
            const request = await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/orden/' + ordenesState.prodmasterid + '/' + ordenesState.prodMasterRefID + '/' + ordenesState.itemid);
            if (request.data.length > 0) {
                changeOrdenId(request.data[0].id)
                changeMasterID(request.data[0].id)
            }
        } catch (err) {

        }
    }

    const onPressAntes = () => {
        changeLavado('Antes del Lavado')
        changeLavadoID(0);
        navigation.navigate("TipoMedidaScreen")
    }

    const onPressDespues = () => {
        changeLavado('Despues del Lavado')
        changeLavadoID(1)
        navigation.navigate("TipoMedidaScreen")
    }

    const Cerrarorden = async () => {
        setEnviando(true);

        try {
            const request = await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/CambiarEstadoOrden/' + ordenesState.masterID + '/' + ordenesState.idUsuario + '/1');
            if (request.data[0].posted === 1) {
                changeOrdenId(0)
                navigation.goBack();
            } else {
                setMensajeAlerta('No se puedo actualizar el estado de la orden')
                setTipoMensaje(false);
                setShowMensajeAlertaE(true);
            }
        } catch (err) {
            setMensajeAlerta('No se puedo actualizar el estado de la orden')
            setTipoMensaje(false);
            setShowMensajeAlertaE(true);
        }
        setEnviando(false);
        setShowMensajeAlerta(false)
    }

    const Rechazarorden = async () => {
        setEnviando(true);

        try {
            const request = await reqResApiFinanza.get<MaesterOrdenInterface[]>('PantsQuality/CambiarEstadoOrden/' + ordenesState.masterID + '/' + ordenesState.idUsuario + '/0');
            if (request.data[0].posted === 0) {
                changeOrdenId(0)
                navigation.goBack();
            } else {
                setMensajeAlerta('No se puedo actualizar el estado de la orden')
                setTipoMensaje(false);
                setShowMensajeAlertaE(true);
            }
        } catch (err) {
            setMensajeAlerta('No se puedo actualizar el estado de la orden')
            setTipoMensaje(false);
            setShowMensajeAlertaE(true);
        }
        setEnviando(false);
        setShowMensajeAlertaR(false)
    }

    const getHistoricoEstadoOrden = async () => {
        await reqResApiFinanza.get<HistoricoEstadoOrdenInterface[]>('PantsQuality/HistoricoEstadoOrden/' + ordenesState.masterID)
            .then(x => {
                setHistoricoEstado(x.data)
            })
    }
    const renderItem = (item: HistoricoEstadoOrdenInterface) => {
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.containerRenderItem}>
                    <Text style={styles.textComments}>Usuario: <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.usuario}</Text></Text>
                    <Text style={styles.textComments}>Modulo: <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.modulo}</Text></Text>
                    <Text style={styles.textComments}>Fecha: <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.fecha.toString().replace('T', ' ')}</Text></Text>
                    <Text style={styles.textComments}>Estado: <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.estado ? 'Aprobado' : 'Rechazado'}</Text></Text>
                </View>
            </View>
        )
    }
    useEffect(() => {
        ObtenerDatosOrden();
        getHistoricoEstadoOrden();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: grey ,alignItems:'center'}}>
            <Header show={true} deleteCredencials={false} />
            
                
                    <View style={styles.formulario}>
                        <Buttons onPress={onPressAntes} disable={false} title='Antes del Lavado' />
                        {
                            ordenesState.TipoMedida == "Auditoria Final" &&
                            <Buttons onPress={onPressDespues} disable={false} title='Despues del lavado' />
                        }
                        <Buttons onPress={() => setShowMensajeAlerta(true)} disable={enviando} title='Aprobar Orden' />
                        <Buttons onPress={() => setShowMensajeAlertaR(true)} disable={enviando} title='Rechazar Orden' />
                        {
                        HistoricoEstdo.length > 0 &&
                        <FlatList
                            data={HistoricoEstdo}
                            renderItem={({ item }) => renderItem(item)}
                            showsVerticalScrollIndicator={false}
                            style={{width:'100%'}}
                        />
                    }
                    </View>
            <MyAlert visible={showMensajeAlertaE} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlertaE(false)} />
            <MyAlertValidate visible={showMensajeAlerta} tipoMensaje={true} mensajeAlerta={'¿Desea Aprobar la orden?'} onPress={Cerrarorden} onPressCancel={() => setShowMensajeAlerta(false)} />
            <MyAlertValidate visible={showMensajeAlertaR} tipoMensaje={true} mensajeAlerta={'¿Desea Rechazar la orden?'} onPress={Rechazarorden} onPressCancel={() => setShowMensajeAlertaR(false)} />

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
        alignItems: "center",
        flex:1,
        paddingTop: 5
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
        marginVertical: 2,
    },
    textComments: {
        color: blue,
        fontStyle: 'italic',
        fontFamily: FontFamily
    },
});

export default LavadoScreen;
