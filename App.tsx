import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchCalendarScreen from './src/components/pt/screens/SearchcalendarScreen'
import BookScreen from './src/components/pt/screens/BookScreen'
import CalenderScreen from './src/components/pt/screens/CalenderScreen'
import CardMembershipScreen from './src/components/user/screens/CardMembershipScreen'


const App = () => {
  return (
    <View style={styles.container}>
      <CardMembershipScreen />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})