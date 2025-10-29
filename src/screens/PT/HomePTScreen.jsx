import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const HomePTScreen = ({ navigation }) => {
  React.useEffect(() => {
    // Ẩn toàn bộ UI hệ thống khi vào màn hình
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') SystemNavigationBar.stickyImmersive();

    return () => {
      // Hiện lại khi rời màn hình
      if (Platform.OS === 'android') SystemNavigationBar.navigationShow();
    };
  }, []);

  // 🟢 Danh sách các nút chức năng hợp lý cho PT
  const buttons = [
    { title: 'Hồ sơ PT', icon: 'person', screen: 'PTProfileScreen' },
    { title: 'Lịch PT', icon: 'calendar-today', screen: 'PTScheduleScreen' },
    { title: 'Khách hàng', icon: 'groups', screen: 'PTCustomerListScreen' },
  ];

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('@assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>Chào mừng PT!</Text>
      <Text style={styles.subtitle}>Hãy chọn chức năng bạn muốn truy cập</Text>

      {/* Danh sách nút chức năng */}
      <View style={styles.buttonContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuButton}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Icon name={btn.icon} size={28} color="#fff" />
            <Text style={styles.menuText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomePTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: '#20B24A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
    elevation: 2,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
