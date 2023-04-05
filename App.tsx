import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App;
