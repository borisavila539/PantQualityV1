import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextButtons } from '../components/Constant'
import { blue } from '../components/colores'
import { ButtonsInterface } from '../interfaces/Buttons'

const Buttons: FC<ButtonsInterface> = ({ onPress, disable, title }) => {
  return (
    <TouchableOpacity
      style={{ width: '100%', marginBottom: 10, maxWidth: 450 }}
      activeOpacity={0.5}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
      disabled={disable}
    >
      <View style={styles.button} >
        {
          !disable ?
            <Text style={styles.text}>{title}</Text>
            :
            <ActivityIndicator color="#FFF" />
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: blue,
  },
  text: {
    fontSize: TextButtons,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
});

export default Buttons;
