import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_3.jpg')}
      style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }} />
        <View style={styles.contentContainer}>
          <View style={styles.textBox}>
            <Text style={styles.title}>
              A Community For You, Challenge Yourself
            </Text>
          </View>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.replace('Home')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  container: { flex: 1, justifyContent: 'flex-end', padding: 20 },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  textBox: {
    backgroundColor: '#9CCC65',
    borderRadius: 15,
    padding: 25,
    marginBottom: 30,
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#424242',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen3;