import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { TextInputInterface } from '../interfaces/textinputInterface'
import { FontFamily, TextoPantallas } from './Constant'
import { blue, navy } from './colores'

const TextInputContainer = ({ title, justify, height, placeholder, teclado, multiline, editable, onChangeText, value, maxlength }: TextInputInterface) => {
    return (
        <View style={styles.textInput}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        textAlign: justify ? 'justify' : 'center',
                        height: height,

                    }]}
                placeholder={placeholder}
                placeholderTextColor={blue}
                keyboardType={teclado}
                multiline={multiline}
                editable={editable}
                onChangeText={(value:string)=> onChangeText(value)}
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
        maxWidth: 450,
        width: '100%',
        padding: 5
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 100,
        fontSize: 18,
        backgroundColor: '#fff',
        height: 35,
        borderColor: '#000',
        padding: 2,
        color: navy,
        fontFamily: FontFamily
    }
});

export default TextInputContainer
