import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextButtons } from '../components/Constant'
import { blue, orange } from '../components/colores'
import { ButtonsInterface } from '../interfaces/Buttons'

const Buttons = ({onPressFuntion,disable, title}:ButtonsInterface) => {
  return (
    <TouchableOpacity
        style ={{width: '100%', marginBottom: 10}}
        activeOpacity={0.5}
        onPress={onPressFuntion()}
        hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
        disabled = {disable}
        >
        <View style={styles.button}>
            <Text style={styles.text}>{title}</Text>
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
        fontFamily: 'sans-serif'
      },
});

export default Buttons;
