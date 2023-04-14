import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { OrdenesContext } from '../context/OrdenesContext'
import { TextoHeader } from './Constant'
import { grey, navy } from './colores'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../navigation/Navigation'
import { StackNavigationProp } from '@react-navigation/stack'

const Header = () => {
    const { ordenesState } = useContext(OrdenesContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const navigateBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={navigateBack}>
                <Text>
                    <Icon name='arrow-back-sharp' size={20} color={grey} />
                </Text>
            </Pressable>
            <Text style={styles.text}>{ordenesState.prodMasterRefID}</Text>
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
