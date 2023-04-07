import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { SafeAreaView } from 'react-native';
import { OrdenesProvider } from './src/context/OrdenesContext';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppState>
          <Navigation />
        </AppState>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const AppState = ({ children }: any) => {
  return (
    <OrdenesProvider>
      {children}
    </OrdenesProvider>
  )
}

export default App;
