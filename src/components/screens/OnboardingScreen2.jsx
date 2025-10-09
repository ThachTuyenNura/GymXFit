import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

const OnboardingScreen2 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_2.jpg')}
      style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Onboarding3')}>
          <Text style={styles.skipText}>Skip ▸</Text>
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.textBox}>
            <Text style={styles.title}>
              Find Nutrition Tips That Fit Your Lifestyle
            </Text>
          </View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Onboarding3')}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  container: { flex: 1, justifyContent: 'space-between', padding: 20 },
  skipButton: { alignSelf: 'flex-end', padding: 10 },
  skipText: { color: 'white', fontSize: 16 },
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
  nextButton: {
    backgroundColor: '#424242',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen2;