import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import { requestLoginOtp } from '@api/userApi';

const LoginScreen = (props) => {
  const { navigation } = props;
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const trimmedNumber = mobileNumber.trim();

    // 🟥 Kiểm tra không để trống
    if (trimmedNumber === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại của bạn.');
      return;
    }

    // 🟧 Kiểm tra có ít nhất 10 chữ số
    if (trimmedNumber.length !== 10) {
      Alert.alert('Lỗi', 'Số điện thoại phải có 10 chữ số.');
      return;
    }

    setIsLoading(true);

    try {
      // Gọi API để yêu cầu gửi OTP
      await requestLoginOtp(trimmedNumber);

      Alert.alert('Thành công', 'Mã OTP đã được gửi đến số điện thoại của bạn.');

      // Nếu thành công, chuyển sang màn hình xác thực và truyền SĐT theo
      navigation.navigate('VerifyLoginScreen', { phone: trimmedNumber });

    } catch (error) {
      // Bắt lỗi từ API (ví dụ: SĐT không tồn tại)
      Alert.alert('Đăng nhập thất bại', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('@assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.loginText}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        editable={!isLoading}
      />

      <TouchableOpacity onPress={handleLogin}
        style={[styles.button, isLoading && styles.buttonDisabled]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Bạn chưa có tài khoản?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Đăng ký ngay
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonDisabled: { // <<< THÊM
    backgroundColor: '#A5D6A7',
  },
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
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
