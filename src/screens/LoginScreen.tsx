import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, TouchableOpacity, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { TextButtons } from '../components/Constant'
import { reqResApi } from '../api/reqResApi'
import { Credencials, Data, LoginInterface, LoginInterfaceFail } from '../interfaces/reqResApi';
import { StackScreenProps } from '@react-navigation/stack'
import { grey, navy, orange } from '../components/colores'
import MyAlert from '../components/myAlert'

interface Props extends StackScreenProps<any, any> { };

const LoginScreen = ({ navigation }: Props) => {
  const [usuario, setUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [enviando, setEnviando] = useState<Boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(true);
  const [showMensajeAlerta, setShowMensajeAlerta] = useState<boolean>(false);
  const [tipoMensaje, setTipoMensaje] = useState<boolean>(false);
  const [mensajeAlerta, setMensajeAlerta] = useState<string>('');

  const login = async () => {
    setEnviando(true);
    const data: Credencials = { UserAccount: usuario, Password: contrasena };

    await reqResApi.post<LoginInterface>('authentication/movil', data)
      .then(resp => {
        if (resp.data.Message === 'Ok') {
          navigation.navigate('MedidasScreen')
        }
      }).catch(resp => {
        setMensajeAlerta('Usuario o contraseña incorrecta...')
        setTipoMensaje(false);
        setShowMensajeAlerta(true);
      });

    setEnviando(false);

  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Text>Imagen</Text>
        </View>
        <View style={styles.containerInputs}>
          <View style={styles.textInputAlign}>
            <Text>
              <Icon name='person-outline' size={20} color={grey} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder='Usuario'
              placeholderTextColor={'#fff'}
              onChangeText={(value) => setUsuario(value)}
              value={usuario}
            />
          </View>
          <View style={styles.textInputAlign}>
            <Text>
              <Icon name='lock-closed' size={20} color={grey} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder='Contaseña'
              secureTextEntry={viewPassword}
              placeholderTextColor={'#fff'}
              onChangeText={(value) => setContrasena(value)}
              value={contrasena}
            />
            <Pressable onPress={() => setViewPassword(!viewPassword)}>
              <Text>
                <Icon name={viewPassword ? 'eye' : 'eye-off'} size={20} color={grey} />
              </Text>
            </Pressable>



          </View>
          <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ width: '100%' }}
              activeOpacity={0.5}
              onPress={login}
              hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
            >
              <View style={styles.button}>
                {
                  !enviando ?
                    <Text style={[styles.text]}>Iniciar Sesion</Text>
                    :
                    <Text style={[styles.text]}>Iniciando...</Text>
                }
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <MyAlert visible={showMensajeAlerta} tipoMensaje = {tipoMensaje} mensajeAlerta={mensajeAlerta} onPress={() => setShowMensajeAlerta(false)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: navy
  },
  containerImage: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
    maxHeight: 500
  }
  ,
  containerInputs: {
    width: '80%',
    height: '30%',
    justifyContent: 'space-around',
    maxWidth: 600,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textInputAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    paddingHorizontal: 3,
    marginBottom: 15,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    borderRadius: 8,
    borderColor: grey,
    borderWidth: 1
  },
  input: {
    flex: 3,
    padding: 5,
    marginLeft: 10,
    fontSize: TextButtons,
    color: grey,
    fontFamily: 'sans-serif',

  },
  button: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: orange,
  },
  text: {
    fontSize: TextButtons,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
})

export default LoginScreen;
