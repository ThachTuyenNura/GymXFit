import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const LoginScreen = (props) => {
  const { navigation } = props;
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../media/pictures/logo.png')} // dùng lại logo cũ
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Tiêu đề */}
      <Text style={styles.loginText}>Đăng nhập</Text>

      {/* Ô nhập số điện thoại */}
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      {/* Nút đăng nhập */}
      <TouchableOpacity onPress={()=>navigation.navigate('RegisterScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Liên kết sang đăng ký */}
      <Text style={styles.registerText}>
        Bạn chưa có tài khoản?{' '}
        <Text style={styles.registerLink}>Đăng ký ngay</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#20B24A',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#20B24A',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  registerText: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
  },
  registerLink: {
    color: '#20B24A',
    fontWeight: '700',
  },
});

export default LoginScreen;
