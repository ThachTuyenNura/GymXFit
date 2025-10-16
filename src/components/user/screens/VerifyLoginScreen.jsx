import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Keyboard,
    ActivityIndicator
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyLoginOtp, requestLoginOtp } from '../UserHTTP';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const VerifyScreen = ({ navigation }) => {
    const route = useRoute(); // <<< THÊM: Để lấy SĐT từ màn hình trước
    const { phone } = route.params;
    const [code, setCode] = useState(['', '', '', '']);
    const [countdown, setCountdown] = useState(60);
    const inputsRef = useRef([]);
    // <<< THÊM: State quản lý loading
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const { login } = useContext(UserContext);

    // ⏳ Đếm ngược gửi lại mã
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleChange = (text, index) => {
        const char = text.replace(/[^0-9]/g, '').slice(0, 1);

        setCode(prev => {
            const next = [...prev];
            next[index] = char;
            return next;
        });

        // focus sang ô tiếp theo
        if (char !== '' && index < 3) {
            const nextInput = inputsRef.current[index + 1];
            if (nextInput && typeof nextInput.focus === 'function') {
                nextInput.focus();
            }
        }
    };

    const handleAutoFill = fullText => {
        const digits = fullText.replace(/\D/g, '').slice(0, 4).split('');
        if (digits.length === 4) {
            setCode(digits);
            Keyboard.dismiss();
        }
    };

    // ✅ Tiếp tục → sang Home
    const handleContinue = async () => {
        const otp = code.join('');
        if (otp.length !== 4) {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ 4 chữ số mã xác thực.');
            return;
        }

        Keyboard.dismiss();
        setIsVerifying(true);

        try {
            // Gọi API để xác thực
            const response = await verifyLoginOtp(phone, otp);

            if (response.ok && response.token) {
                // LƯU TOKEN LẠI! Đây là bước quan trọng nhất
                // await AsyncStorage.setItem('token', response.token);
                login(response.token);

                // Alert.alert('Thành công!', 'Đăng nhập thành công.', [
                //     { text: 'OK', onPress: () => navigation.navigate('Home') } // Chuyển đến màn hình chính
                // ]);
            } else {
                throw new Error(response.message || 'Xác thực thất bại');
            }
        } catch (error) {
            Alert.alert('Đăng nhập thất bại', error.message);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0 || isResending) return;

        setIsResending(true);
        try {
            await requestLoginOtp(phone);
            Alert.alert('Thành công', 'Mã xác thực đã được gửi lại!');
            setCountdown(60);
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Image
                        source={require('../../../media/pictures/Back_black.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Xác minh</Text>

                <TouchableOpacity
                    style={styles.exitButton}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Image
                        source={require('../../../media/pictures/Exit_black.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {/* Nội dung */}
            <View style={styles.content}>
                <Text style={styles.subtitle}>
                    Nhập mã gồm 4 chữ số mà GymXFit vừa gửi đến {phone}
                </Text>

                <View style={styles.inputContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={el => (inputsRef.current[index] = el)}
                            style={styles.input}
                            value={digit}
                            onChangeText={text => handleChange(text, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            returnKeyType={index === 3 ? 'done' : 'next'}
                            onSubmitEditing={() => {
                                if (index < 3) inputsRef.current[index + 1]?.focus();
                                else handleContinue();
                            }}
                            onTextInput={e => {
                                const text = e.nativeEvent?.text || '';
                                if (text.length > 1) handleAutoFill(text);
                            }}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.button, isVerifying && styles.buttonDisabled]}
                    onPress={handleContinue}
                    disabled={isVerifying}
                >
                    {isVerifying ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Tiếp tục</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.resendText}>
                    Chưa nhận được mã?{' '}
                    <Text
                        style={[styles.resendLink, (countdown > 0 || isResending) && styles.resendDisabled]}
                        onPress={handleResendCode}
                    >
                        {isResending ? 'Đang gửi...' : (countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại')}
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonDisabled: { // <<< THÊM
        backgroundColor: '#A5D6A7',
    },
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: { padding: 10 },
    exitButton: { padding: 10 },
    icon: { width: 24, height: 24, resizeMode: 'contain' },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5,
        color: '#000',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    resendText: { marginTop: 20, color: 'black', textAlign: 'center' },
    resendLink: { color: '#4CAF50', fontWeight: 'bold' },
    resendDisabled: { color: 'gray' },
});

export default VerifyScreen;
