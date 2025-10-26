import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RegisterScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image
        style={styles.backgroundImage}
        source={require('@assets/images/workout1.jpg')} // ✅ sửa đường dẫn
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image
          source={require('@assets/images/logo.png')} // ✅ sửa đường dẫn
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%', // full chiều rộng màn hình
    height: '100%', // full chiều cao màn hình
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover', // hình ảnh fill toàn màn hình
  },
  logo: {
    marginTop: 24
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default WelcomeScreen;
