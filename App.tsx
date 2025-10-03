import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Calendar from './src/components/pt/screens/Calendar'
import Book from './src/components/pt/screens/Book'

const App = () => {
  return (
    <View style={styles.container}>
      <Book />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})