import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background */}
      <Image
        source={require('../../../media/pictures/workout1.jpg')} // ✅ sửa đường dẫn
        style={styles.backgroundImage}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image
          source={require('../../../media/pictures/logo.png')} // ✅ sửa đường dẫn
          style={styles.logo}
        />
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
    width: width, // full chiều rộng màn hình
    height: height, // full chiều cao màn hình
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover', // hình ảnh fill toàn màn hình
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 339, // vị trí logo
    left: '50%',
    transform: [{ translateX: -100 }], // căn giữa theo X
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
    fontWeight: '600',
  },
});

export default WelcomeScreen;
