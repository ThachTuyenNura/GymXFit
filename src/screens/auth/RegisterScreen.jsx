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
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestOTP } from '@api/userApi';

const RegisterScreen = props => {
  const { navigation } = props;
  const [mobileNumber, setMobileNumber] = useState('');
  // Thêm state để quản lý trạng thái loading
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    const trimmedNumber = mobileNumber.trim();

    //Kiểm tra rỗng
    if (trimmedNumber === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại.');
      return;
    }

    //Kiểm tra ít nhất 10 chữ số
    if (trimmedNumber.length !== 10) {
      Alert.alert('Lỗi', 'Số điện thoại phải có 10 chữ số.');
      return;
    }

    setIsLoading(true); // Bật loading

    try {
      await requestOTP(trimmedNumber);
      Alert.alert('Thành công', 'Mã OTP đã được gửi đến số điện thoại của bạn.');
      navigation.navigate('VerifyRegisterScreen', {
        phone: trimmedNumber
      });
    } catch (error) {
      // Bắt lỗi từ API (ví dụ: số điện thoại đã tồn tại, server lỗi...)
      const errorMessage = error.response?.data?.error || error.message;
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Logo */}
        <Image
          source={require('@assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Phụ đề */}
      <Text style={styles.subtitle}>Đăng ký với FitNexus</Text>

      {/* Ô nhập liệu */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          editable={!isLoading} // Không cho sửa khi đang loading
        />
      </View>

      {/* Nút đăng ký */}
      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button, isLoading && styles.buttonDisabled]}
        editable={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>

      {/* Liên kết đăng nhập */}
      <Text style={styles.signInText}>
        Đã có tài khoản?{' '}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Đăng nhập
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonDisabled: { // <<< THÊM
    backgroundColor: '#A5D6A7',
  },
  container: {
    flex: 1,
    padding: 20,
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
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
