import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      // ĐƯỜNG DẪN ĐÚNG CHO CẤU TRÚC MỚI
      source={require('../assets/images/welcome_bg.jpg')}
      style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        {/* ĐƯỜNG DẪN ĐÚNG CHO CẤU TRÚC MỚI */}
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 28, color: 'white', fontWeight: 'bold', marginBottom: 10 },
  logo: { width: 250, height: 100, resizeMode: 'contain' },
});

export default SplashScreen;