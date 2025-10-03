import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/workout1.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: width, // Sử dụng chiều rộng của màn hình
    height: height, // Sử dụng chiều cao của màn hình
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover', // Đảm bảo hình ảnh fill toàn màn hình
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 339, // Vị trí logo
    left: '50%',
    transform: [{ translateX: -100 }], // Căn giữa
  },
  logo: {
    width: 187,
    height: 138,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
