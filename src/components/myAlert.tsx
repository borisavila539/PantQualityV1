import { Modal, Pressable, StyleSheet, Text, View, } from 'react-native';
import { myAlertInterface } from "../interfaces/alert";
import { grey, navy } from './colores';
import Icon from 'react-native-vector-icons/Ionicons'

import { FontFamily, TextoPantallas } from './Constant';


function MyAlert({ visible, tipoMensaje, mensajeAlerta, onPress }: myAlertInterface) {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.constainer}>
                    <Text>
                        <Icon name={tipoMensaje ? 'checkmark-sharp' : 'alert-circle-outline'} size={80} color={tipoMensaje ? 'green' : 'orange'} />
                    </Text>
                    <Text style={styles.text}>
                        {mensajeAlerta}
                    </Text>
                    <Pressable onPress={onPress} style={styles.pressable}>
                        <Text style={[styles.text, { color: grey, marginTop: 0 }]}>Ok</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#00000099',
    },
    constainer: {
        width: '80%',
        backgroundColor: grey,
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    text: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: FontFamily,
        color: navy
    },
    pressable: {
        backgroundColor: '#0078AA',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 15
    }
});

export default MyAlert;