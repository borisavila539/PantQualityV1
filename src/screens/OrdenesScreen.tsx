import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { reqResApiFinanza } from '../api/reqResApi'
import { OrdennesIniciadasInterface } from '../interfaces/ordenesIniciadasInterface'
import axios from 'axios'
import { Data } from '../interfaces/reqResApi';

const OrdenesScreen = () => {
  const getOrdenesIniciadas = async() => {
     await reqResApiFinanza.get<OrdennesIniciadasInterface[]>('PantsQuality/OrdenesIniciadas')
      .then(resp => {
        console.log(resp.data[0].itemid)
        
      }).catch( resp =>{
        console.log(resp)
        console.log('no')
      });
      
      
      
  }
  useEffect(() => {
    getOrdenesIniciadas();
  }, [])
  return (
    <View>
      <Text>Ordenes</Text>
    </View>
  )
}

export default OrdenesScreen;