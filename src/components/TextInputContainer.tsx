import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { TextInputInterface } from '../interfaces/textinputInterface'
import { FontFamily, TextoPantallas } from './Constant'
import { navy } from './colores'

export const TextInputContainer = ({ title, justify, height, placeholder, teclado, multiline, editable, onChangeText, value, maxlength }: TextInputInterface) => {
    return (
        <View style={styles.textInput}>
            <Text style={styles.text}>{title}</Text>
            <TextInput 
                style={[
                    styles.input,
                    {
                        textAlign: justify? 'justify': 'center',
                        height: height,

                    }]}
                placeholder={placeholder}
                keyboardType={teclado}
                multiline={multiline}
                editable={editable}
                onChangeText={onChangeText()}
                value={value}
                maxLength={maxlength}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: TextoPantallas,
        fontWeight: 'bold',
        color: navy,
        fontFamily: FontFamily
    },
    textInput: {
        width: '100%',
        padding: 5
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 100,
        fontSize: 18,
        backgroundColor: '#f0f0f0',
        height: 35,
        borderColor: '#000',
        padding: 2,
        color: navy,
        fontFamily: FontFamily

    }

});
