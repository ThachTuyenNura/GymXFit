import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Calendar from './src/components/pt/screens/Calendar'

const App = () => {
  return (
    <View style={styles.container}>
      <Calendar />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})