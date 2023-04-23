import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Linking } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { blue, grey } from '../components/colores';
import {  TextButtons } from '../components/Constant';
import { OrdenesContext } from '../context/OrdenesContext';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import { reqResApiFinanza } from '../api/reqResApi';
import { TallasInterface, MedidasEnviarInterface } from '../interfaces/medidasInterface';
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

    //Medidas
    const [M01, setM01] = useState<string>('');
    const [M02, setM02] = useState<string>('');
    const [M03, setM03] = useState<string>('');
    const [M04, setM04] = useState<string>('');
    const [M05, setM05] = useState<string>('');
    const [M06, setM06] = useState<string>('');
    const [M07, setM07] = useState<string>('');
    const [M08, setM08] = useState<string>('');
    const [M09, setM09] = useState<string>('');
    const [M10, setM10] = useState<string>('');
    const [M11, setM11] = useState<string>('');
    const [M12, setM12] = useState<string>('');
    const [M13, setM13] = useState<string>('');
    const [M14, setM14] = useState<string>('');
    const [M15, setM15] = useState<string>('');
    const [M16, setM16] = useState<string>('');
    const [M17, setM17] = useState<string>('');
    const [M18, setM18] = useState<string>('');
    const [M19, setM19] = useState<string>('');
    const [M20, setM20] = useState<string>('');

    //Medidas texto
    const [s01, setS01] = useState<string>('');
    const [s02, setS02] = useState<string>('');
    const [s03, setS03] = useState<string>('');
    const [s04, setS04] = useState<string>('');
    const [s05, setS05] = useState<string>('');
    const [s06, setS06] = useState<string>('');
    const [s07, setS07] = useState<string>('');
    const [s08, setS08] = useState<string>('');
    const [s09, setS09] = useState<string>('');
    const [s10, setS10] = useState<string>('');
    const [s11, setS11] = useState<string>('');
    const [s12, setS12] = useState<string>('');
    const [s13, setS13] = useState<string>('');
    const [s14, setS14] = useState<string>('');
    const [s15, setS15] = useState<string>('');
    const [s16, setS16] = useState<string>('');
    const [s17, setS17] = useState<string>('');
    const [s18, setS18] = useState<string>('');
    const [s19, setS19] = useState<string>('');
    const [s20, setS20] = useState<string>('');
    //validar se pueden colocar
    const [T01, setT01] = useState<boolean>(false);
    const [T02, setT02] = useState<boolean>(false);
    const [T03, setT03] = useState<boolean>(false);
    const [T04, setT04] = useState<boolean>(false);
    const [T05, setT05] = useState<boolean>(false);
    const [T06, setT06] = useState<boolean>(false);
    const [T07, setT07] = useState<boolean>(false);
    const [T08, setT08] = useState<boolean>(false);
    const [T09, setT09] = useState<boolean>(false);
    const [T10, setT10] = useState<boolean>(false);
    const [T11, setT11] = useState<boolean>(false);
    const [T12, setT12] = useState<boolean>(false);
    const [T13, setT13] = useState<boolean>(false);
    const [T14, setT14] = useState<boolean>(false);
    const [T15, setT15] = useState<boolean>(false);
    const [T16, setT16] = useState<boolean>(false);
    const [T17, setT17] = useState<boolean>(false);
    const [T18, setT18] = useState<boolean>(false);
    const [T19, setT19] = useState<boolean>(false);
    const [T20, setT20] = useState<boolean>(false);

    const getMedidas = async () => {
        try {
            let size: number;
            const request = await reqResApiFinanza.get<TallasInterface[]>('PantsQuality/tallas/' + ordenesState.itemid);
            size = request.data.length;

            //Mostrar Medidas bool
            setT01(size >= 1 ? true : false)
            setT02(size >= 2 ? true : false)
            setT03(size >= 3 ? true : false)
            setT04(size >= 4 ? true : false)
            setT05(size >= 5 ? true : false)
            setT06(size >= 6 ? true : false)
            setT07(size >= 7 ? true : false)
            setT08(size >= 8 ? true : false)
            setT09(size >= 9 ? true : false)
            setT10(size >= 10 ? true : false)
            setT11(size >= 11 ? true : false)
            setT12(size >= 12 ? true : false)
            setT13(size >= 13 ? true : false)
            setT14(size >= 14 ? true : false)
            setT15(size >= 15 ? true : false)
            setT16(size >= 16 ? true : false)
            setT17(size >= 17 ? true : false)
            setT18(size >= 18 ? true : false)
            setT19(size >= 19 ? true : false)
            setT20(size >= 20 ? true : false)

            //llenarTallas
            let cont: number = 1;
            request.data.map(x => {
                cont == 1 ? setS01(x.sizeid) : null
                cont == 2 ? setS02(x.sizeid) : null
                cont == 3 ? setS03(x.sizeid) : null
                cont == 4 ? setS04(x.sizeid) : null
                cont == 5 ? setS05(x.sizeid) : null
                cont == 6 ? setS06(x.sizeid) : null
                cont == 7 ? setS07(x.sizeid) : null
                cont == 8 ? setS08(x.sizeid) : null
                cont == 9 ? setS09(x.sizeid) : null
                cont == 10 ? setS10(x.sizeid) : null
                cont == 11 ? setS11(x.sizeid) : null
                cont == 12 ? setS12(x.sizeid) : null
                cont == 13 ? setS13(x.sizeid) : null
                cont == 14 ? setS14(x.sizeid) : null
                cont == 15 ? setS15(x.sizeid) : null
                cont == 16 ? setS16(x.sizeid) : null
                cont == 17 ? setS17(x.sizeid) : null
                cont == 18 ? setS18(x.sizeid) : null
                cont == 19 ? setS19(x.sizeid) : null
                cont == 20 ? setS20(x.sizeid) : null
                cont++;

            })
        } catch (err) {

        }
    }

    const enviarMedidas = async() => {
        setEnviando(true)
        const medidasEnviar:MedidasEnviarInterface = {
            id:0,
            masterID: ordenesState.masterID,
            lavadoID: ordenesState.lavadoID,
            medidaId: ordenesState.medidaId,
            usuario: ordenesState.idUsuario,
            medida01: M01 != '' ? parseFloat(M01) : 0,
            medida02: M02 != '' ? parseFloat(M02) : 0,
            medida03: M03 != '' ? parseFloat(M03) : 0,
            medida04: M04 != '' ? parseFloat(M04) : 0,
            medida05: M05 != '' ? parseFloat(M05) : 0,
            medida06: M06 != '' ? parseFloat(M06) : 0,
            medida07: M07 != '' ? parseFloat(M07) : 0,
            medida08: M08 != '' ? parseFloat(M08) : 0,
            medida09: M09 != '' ? parseFloat(M09) : 0,
            medida10: M10 != '' ? parseFloat(M10) : 0,
            medida11: M11 != '' ? parseFloat(M11) : 0,
            medida12: M12 != '' ? parseFloat(M12) : 0,
            medida13: M13 != '' ? parseFloat(M13) : 0,
            medida14: M14 != '' ? parseFloat(M14) : 0,
            medida15: M15 != '' ? parseFloat(M15) : 0,
            medida16: M16 != '' ? parseFloat(M16) : 0,
            medida17: M17 != '' ? parseFloat(M17) : 0,
            medida18: M18 != '' ? parseFloat(M18) : 0,
            medida19: M19 != '' ? parseFloat(M19) : 0,
            medida20: M20 != '' ? parseFloat(M20) : 0,
        }
        
        try{
            const request = await reqResApiFinanza.post<MedidasEnviarInterface[]>('PantsQuality/medidasInsert',medidasEnviar);
            if( request.data[0].usuario > 0)
            {
                setMensajeAlerta('Enviado')
                setTipoMensaje(true);
                setShowMensajeAlerta(true);                
            }
        }catch(err){
            setMensajeAlerta('No Se encontro el archivo de excel')
            setTipoMensaje(false);
            setShowMensajeAlerta(true);
        }
        setEnviando(false)
    }

    const irVideoTutorial = async() =>{
        if(ordenesState.TutorialLink.length > 0){
            Linking.openURL(ordenesState.TutorialLink)
        }else{
            setMensajeAlerta('No hay Tutorial')
            setTipoMensaje(false);
            setShowMensajeAlerta(true);
        }
    }

    useEffect(() => {
        getMedidas()
    }, [])

    useEffect(()=>{
        if(mensajeAlerta == 'Enviado' && !showMensajeAlerta){
            navigation.goBack();
        }
    },[showMensajeAlerta])

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header show={true}/>
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Text style={styles.text}>{ordenesState.lavado}</Text>
                        <Text style={styles.text}>{ordenesState.medida}</Text>
                        <Buttons onPress={irVideoTutorial} disable={false} title='Tutorial' />

                        <MedidaContainer mostrar={T01} medida={s01} onChangeText={(value: string) => setM01(value)} value={M01} />
                        <MedidaContainer mostrar={T02} medida={s02} onChangeText={(value: string) => setM02(value)} value={M02} />
                        <MedidaContainer mostrar={T03} medida={s03} onChangeText={(value: string) => setM03(value)} value={M03} />
                        <MedidaContainer mostrar={T04} medida={s04} onChangeText={(value: string) => setM04(value)} value={M04} />
                        <MedidaContainer mostrar={T05} medida={s05} onChangeText={(value: string) => setM05(value)} value={M05} />
                        <MedidaContainer mostrar={T06} medida={s06} onChangeText={(value: string) => setM06(value)} value={M06} />
                        <MedidaContainer mostrar={T07} medida={s07} onChangeText={(value: string) => setM07(value)} value={M07} />
                        <MedidaContainer mostrar={T08} medida={s08} onChangeText={(value: string) => setM08(value)} value={M08} />
                        <MedidaContainer mostrar={T09} medida={s09} onChangeText={(value: string) => setM09(value)} value={M09} />
                        <MedidaContainer mostrar={T10} medida={s10} onChangeText={(value: string) => setM10(value)} value={M10} />
                        <MedidaContainer mostrar={T11} medida={s11} onChangeText={(value: string) => setM11(value)} value={M11} />
                        <MedidaContainer mostrar={T12} medida={s12} onChangeText={(value: string) => setM12(value)} value={M12} />
                        <MedidaContainer mostrar={T13} medida={s13} onChangeText={(value: string) => setM13(value)} value={M13} />
                        <MedidaContainer mostrar={T14} medida={s14} onChangeText={(value: string) => setM14(value)} value={M14} />
                        <MedidaContainer mostrar={T15} medida={s15} onChangeText={(value: string) => setM15(value)} value={M15} />
                        <MedidaContainer mostrar={T16} medida={s16} onChangeText={(value: string) => setM16(value)} value={M16} />
                        <MedidaContainer mostrar={T17} medida={s17} onChangeText={(value: string) => setM17(value)} value={M17} />
                        <MedidaContainer mostrar={T18} medida={s18} onChangeText={(value: string) => setM18(value)} value={M18} />
                        <MedidaContainer mostrar={T19} medida={s19} onChangeText={(value: string) => setM19(value)} value={M19} />
                        <MedidaContainer mostrar={T20} medida={s20} onChangeText={(value: string) => setM20(value)} value={M20} />
                        
                        <Buttons onPress={enviarMedidas} disable={enviando} title='Enviar' />
                    </View>
                </SafeAreaView>
            </ScrollView>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)}/>
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
export default MedidasScreen;