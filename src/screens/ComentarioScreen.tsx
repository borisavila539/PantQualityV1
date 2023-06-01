import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { blue, grey, navy } from '../components/colores';
import Header from '../components/Header';
import { FontFamily, TextButtons } from '../components/Constant';
import { comentarioInterface, comentariosInterface } from '../interfaces/comentarioInterface';
import { OrdenesContext } from '../context/OrdenesContext';
import { reqResApiFinanza } from '../api/reqResApi';
import MyAlert from '../components/myAlert';

type props = StackScreenProps<RootStackParams, "ComentarioScreen">;

const ComentarioScreen: FC<props> = ({ navigation }) => {
    const [comentario, setComentario] = useState<string>('');
    const [comentarios, setComentarios] = useState<comentariosInterface[]>([])
    const [enviando, setEnviando] = useState<boolean>(false);
    const { ordenesState } = useContext(OrdenesContext);
    const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
    const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
    const [mensajeAlerta, setMensajeAlerta] = useState<string>('');


    const getComentarios = async () => {
        try {
            const request = await reqResApiFinanza.get<comentariosInterface[]>('PantsQuality/comentarios/' + ordenesState.masterID);
            setComentarios(request.data)
        } catch (err) {

        }
    }
    const enviarComentario = async () => {
        setEnviando(true);
        if (comentario.length > 0) {
            let comment: comentarioInterface[] = [];

            comment.push({
                masterID: ordenesState.masterID,
                usuario: ordenesState.idUsuario,
                comentario: comentario
            })

            try {
                const request = await reqResApiFinanza.post<comentarioInterface[]>('PantsQuality/comentarioInsert', comment);
                if (request.data[0].masterID > 0) {
                    setComentario('')
                }
            } catch (err) {

            }
            getComentarios();
        } else {
            setMensajeAlerta('Debe ingresar un comentario')
            setTipoMensaje(false);
            setShowMensajeAlerta(true);
        }
        setEnviando(false);
    }

    const renderItem = (item: comentariosInterface) => {
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.containerRenderItem}>
                    <Text style={styles.textComments}>Usuario: <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.usuario}</Text></Text>
                    <Text style={styles.textComments}>Comentario:</Text>
                    <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.comentario}</Text>
                    <Text style={styles.textComments}>Fecha: <Text style={[styles.textComments, { color: navy, fontStyle: 'normal' }]}>{item.fecha.toString().replace('T', ' ')}</Text></Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getComentarios();
    }, [])
    
    return (
        <View style={{ flex: 1, backgroundColor: grey, alignItems: 'center' }}>
            <Header show={true} deleteCredencials={false}/>
            <View style={styles.sendMessage}>
                <TextInput
                    style={styles.input}
                    placeholder='Comentario...'
                    multiline={true}
                    onChangeText={(value) => setComentario(value)}
                    value={comentario}
                    maxLength={300}
                />
                <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: '100%' }}
                        activeOpacity={0.5}
                        onPress={enviarComentario}
                        hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
                        disabled={enviando}
                    >
                        <View style={styles.button}>
                            {
                                !enviando ?
                                    <Text style={[styles.text]}>Enviar Comentario</Text>
                                    :
                                    <ActivityIndicator color="#FFF" />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerComments}>
                <FlatList
                    data={comentarios}
                    renderItem={({ item }) => renderItem(item)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <MyAlert visible={showMensajeAlerta} tipoMensaje={tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)} />

        </View>
    )
}

const styles = StyleSheet.create({
    containerComments: {
        flex: 1,
        borderColor: navy,
        borderTopWidth: 1,
        width: '100%',
        maxWidth: 600,
        marginTop: 10,
        paddingTop: 5
    },
    sendMessage: {
        width: '90%',
        height: 200,
        maxWidth: 600
    },
    input: {
        flex: 1,
        padding: 5,
        marginTop: 10,
        fontSize: TextButtons,
        color: navy,
        fontFamily: 'sans-serif',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#fff'

    },
    button: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: blue,
    },
    text: {
        fontSize: TextButtons,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
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

export default ComentarioScreen;
