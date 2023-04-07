import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { blue, grey } from '../components/colores';
import TextInputContainer from '../components/TextInputContainer';
import { ObjectHeigth, TextButtons } from '../components/Constant';
import { OrdenesContext } from '../context/OrdenesContext';
import Buttons from '../components/Buttons';
import Header from '../components/Header';

const MedidasScreen = () => {
    const [M27, setM27] = useState<string>('');
    const [M28, setM28] = useState<string>('');
    const [M29, setM29] = useState<string>('');
    const [M30, setM30] = useState<string>('');
    const [M31, setM31] = useState<string>('');
    const [M32, setM32] = useState<string>('');
    const [M33, setM33] = useState<string>('');
    const [M34, setM34] = useState<string>('');
    const [M35, setM35] = useState<string>('');
    const [M36, setM36] = useState<string>('');
    const [M37, setM37] = useState<string>('');
    const [M38, setM38] = useState<string>('');

    const { ordenesState } = useContext(OrdenesContext);

    return (
        <View style={{ flex: 1, backgroundColor: grey }}>
            <Header />
            <ScrollView style={{ height: '100%', backgroundColor: grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.formulario}>
                        <Text style={styles.text}>{ordenesState.lavado}</Text>
                        <Text style={styles.text}>{ordenesState.medida}</Text>
                        <TextInputContainer
                            title='Medida 27'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM27(value)}
                            value={M27}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 28'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM28(value)}
                            value={M28}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 29'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM29(value)}
                            value={M29}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 30'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM30(value)}
                            value={M30}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 31'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM31(value)}
                            value={M31}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 32'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM32(value)}
                            value={M32}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 33'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM33(value)}
                            value={M33}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 34'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM34(value)}
                            value={M34}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 35'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM35(value)}
                            value={M35}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 36'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM36(value)}
                            value={M36}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 37'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM37(value)}
                            value={M37}
                            maxlength={10}
                        />
                        <TextInputContainer
                            title='Medida 38'
                            justify={true}
                            height={ObjectHeigth}
                            placeholder='0.00'
                            teclado={'decimal-pad'}
                            multiline={false}
                            editable={true}
                            onChangeText={(value: string) => setM38(value)}
                            value={M38}
                            maxlength={10}
                        />
                        <Buttons onPressFuntion={() => console.log('enviar')} disable={false} title='Enviar' />
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
    text: {
        fontSize: TextButtons,
        color: blue,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        marginBottom: 10
    }
});
export default MedidasScreen;