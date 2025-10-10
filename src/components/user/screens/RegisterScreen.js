import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const RegisterScreen = (props) => {
 const { navigation } = props;
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../media/pictures/logo.png')} // ✅ sửa đường dẫn
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Phụ đề */}
      <Text style={styles.subtitle}>Đăng ký với FitNexus</Text>

      {/* Ô nhập liệu */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
        />
      </View>

      {/* Nút đăng ký */}
      <TouchableOpacity
        onPress={() => navigation.navigate('VerifyScreen')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      {/* Liên kết đăng nhập */}
      <Text style={styles.signInText}>
        Đã có tài khoản? <Text style={styles.signInLink}>Đăng nhập</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 20,
    fontSize: 14,
    color: 'black',
  },
  signInLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
