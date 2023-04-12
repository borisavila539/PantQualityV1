import React, { useContext, useReducer, useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { OrdenesContext } from '../context/OrdenesContext'
import { TextoHeader } from './Constant'
import {  grey, navy } from './colores'
import { StackScreenProps } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props extends StackScreenProps<any, any> { };

const Header = () => {
    const {ordenesState} = useContext(OrdenesContext)
  return (
    <View style={styles.header}>
        <Pressable >
            <Text>
            <Icon name='arrow-back-sharp' size={20} color={grey} />
            </Text>
        </Pressable>
        <Text style={styles.text}>{ordenesState.orden}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: navy,
        padding: 5,
    },
    text: {
        flex: 3,
        fontSize: TextoHeader,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",

    },
})

export default Header;
