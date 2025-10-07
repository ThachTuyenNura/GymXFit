import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './src/components/navigations/AppNavigation';


const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})