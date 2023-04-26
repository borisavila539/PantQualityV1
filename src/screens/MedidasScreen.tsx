import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Linking, FlatList } from 'react-native'
import { blue, grey, navy } from '../components/colores';
import { FontFamily, TextButtons, TextoPantallas } from '../components/Constant';
import { OrdenesContext } from '../context/OrdenesContext';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import { reqResApiFinanza } from '../api/reqResApi';
import { MedidasInterface } from '../interfaces/medidasInterface';
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

    const getMedidas = async () => {
        try {
            const request = await reqResApiFinanza.get<MedidasInterface[]>('PantsQuality/DatosMedida/' + ordenesState.prodmasterid + '/' + ordenesState.TallaID + '/' + ordenesState.lavadoID)
            setMedidas(request.data)

        } catch (err) {

        }
    }

    const enviarMedidas = async () => {
        setEnviando(true)

        setEnviando(false)
    }

    const irVideoTutorial = async (video:string) => {
        try{
            if (video.length > 0) {
                Linking.openURL(ordenesState.TutorialLink)
            } else {
                setMensajeAlerta('No hay Tutorial')
                setTipoMensaje(false);
                setShowMensajeAlerta(true);
            }
        }catch(err){
            setMensajeAlerta('Error de conexion')
                setTipoMensaje(false);
                setShowMensajeAlerta(true);
        }
        
    }

    const renderItem = (item: MedidasInterface, index: number) => {

        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.containerRenderItem}>
                <Buttons onPress={() =>irVideoTutorial(item.link)} disable={enviando} title='Tutorial' />

                    <Text style={[styles.textRender,{alignSelf: 'center', fontSize: TextoPantallas + 3}]}>{item.nombre}</Text>
                    <Text style={styles.textRender}>Intruccion 1: {item.intruccion1}</Text>
                    <Text style={styles.textRender}>Intruccion 2: {item.intruccion2}</Text>
                    <Text style={styles.textRender}>Intruccion 3: {item.intruccion3}</Text>
                    <Text style={styles.textRender}>Spec: {item.specs}</Text>
                    <MedidaContainer editable={true} mostrar={true} medida={'Medida'}
                        onChangeText={(value: string) => {
                            const nuevasMedidas = [...medidas];
                            nuevasMedidas[index].medida = value;
                            nuevasMedidas[index].diferencia = (parseFloat(nuevasMedidas[index].specs.length > 0 ? nuevasMedidas[index].specs : '0') - parseFloat(nuevasMedidas[index].medida.length > 0 ? nuevasMedidas[index].medida : '0')).toString();
                            nuevasMedidas[index].diferencia =parseFloat(nuevasMedidas[index].diferencia).toFixed(4).toString()
                            setMedidas(nuevasMedidas);
                        }}
                        value={item.medida} />
                    <MedidaContainer editable={false} mostrar={true} medida={'Diferencia'}
                        onChangeText={() => null}
                        value={item.diferencia} />
                    <Text style={styles.textRender}>Referencia: {item.referencia} </Text>
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
                <Buttons onPress={enviarMedidas} disable={enviando} title='Enviar' />
            </View>

            <FlatList
                data={medidas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => renderItem(item, index)}
                style={{ flex: 1, width: '100%' }}
            />

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