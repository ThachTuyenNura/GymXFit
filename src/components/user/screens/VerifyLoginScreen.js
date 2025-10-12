import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

const VerifyScreen = (props) => {
    const { navigation } = props;
    const [code, setCode] = useState(['', '', '', '']); // 4 số mã xác thực

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    const handleContinue = () => {
        // navigation.navigate('VerifyLoginScreen');
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Image
                        source={require('../../../media/pictures/Back_black.png')} // ✅ sửa đường dẫn
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Xác minh</Text>
                <TouchableOpacity style={styles.exitButton}>
                    <Image
                        source={require('../../../media/pictures/Exit_black.png')} // ✅ sửa đường dẫn
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {/* Nội dung */}
            <View style={styles.content}>
                <Text style={styles.subtitle}>
                    Nhập mã gồm 4 chữ số mà FitNexus vừa gửi đến +84 070 123 4567
                </Text>

                {/* Ô nhập mã OTP */}
                <View style={styles.inputContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            value={digit}
                            onChangeText={text => handleChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            onFocus={() =>
                                setCode(prev => prev.map((d, i) => (i === index ? '' : d)))
                            }
                        />
                    ))}
                </View>

                {/* Nút Tiếp tục */}
                <TouchableOpacity
                    style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>

                {/* Gửi lại mã */}
                <Text style={styles.resendText}>
                    Chưa nhận được mã? <Text style={styles.resendLink}>Gửi lại</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 35,
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
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
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
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
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendText: {
        marginTop: 20,
        color: 'black',
        textAlign: 'center',
    },
    resendLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default VerifyScreen;
