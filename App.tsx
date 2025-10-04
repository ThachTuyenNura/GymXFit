<<<<<<< HEAD
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Notification from './src/components/allscreens/Notification'
import Search from './src/components/allscreens/Search'
import Home from './src/components/allscreens/Home'
import Profile from './src/components/allscreens/Profile'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Profile />
      {/* <Notification /> */}
      {/* <Search/> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});

export default App;
=======
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
>>>>>>> a3374182503d475c7813888ecadd8c6451f00758
