import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

// Import ảnh nền và logo của bạn
// Hãy đảm bảo bạn đã đặt các file ảnh này vào thư mục 'assets' hoặc 'images' của dự án.
// Ví dụ: assets/background.jpg và assets/logo.png
const BACKGROUND_IMAGE = require('../../assets/images/welcome_bg.jpg'); 
const LOGO_IMAGE = require('../../assets/images/logo.png'); // Tạo file này từ logo GymXFit

// Giả định LOGO_IMAGE là ảnh chỉ chứa biểu tượng tạ và chữ 'X' màu xanh, 
// và chúng ta sẽ dùng Text để hiển thị chữ 'GymXFit'
const LogoComponent = () => (
  <View style={styles.logoContainer}>
    {/* Biểu tượng tạ và chữ X */}
    <Image 
      source={LOGO_IMAGE} 
      style={styles.logoImage} 
      resizeMode="contain" 
    />
    {/* Chữ GymXFit */}
    <Text style={styles.appName}>GymXFit</Text>
  </View>
);


const WelcomeScreen = () => {
  return (
    <ImageBackground 
      source={BACKGROUND_IMAGE} 
      style={styles.background}
      // Dùng resizeMode 'cover' để đảm bảo ảnh phủ kín toàn bộ màn hình
      resizeMode="cover" 
    >
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <LogoComponent />
      </View>
    </ImageBackground>
  );
};

// --- STYLES ---

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // Màu overlay tối nhẹ giúp chữ dễ đọc hơn trên nền ảnh tối
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',     // Căn giữa theo chiều ngang
    paddingTop: 100,          // Đẩy nội dung xuống một chút để không bị dính vào cạnh trên
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Màu đen overlay 40%
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#FFFFFF', // Màu trắng
    marginBottom: 5,
    letterSpacing: 1,
  },
  logoContainer: {
    alignItems: 'center', // Căn giữa logo và chữ theo chiều ngang
    marginTop: 10,
  },
  logoImage: {
    // Kích thước của phần biểu tượng tạ/chữ X
    width: 200, 
    height: 80, 
    marginBottom: -10, // Kéo logo lên sát chữ
  },
  appName: {
    fontSize: 50,
    fontWeight: '700', // Chữ GymXFit đậm
    // Màu xanh lá cây tương tự trong ảnh (có thể điều chỉnh mã màu)
    color: '#70B42E', 
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Thêm shadow cho nổi bật
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default WelcomeScreen;