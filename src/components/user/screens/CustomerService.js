// screens/CustomerService.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

const CustomerService = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Tiêu đề đầu trang */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // sự kiện quay lại
        >
          <Image
            source={require('../../../media/pictures/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dịch vụ khách hàng</Text>
      </View>

      {/* Phần mô tả ngắn */}
      <Text style={styles.subtitle}>Xin chào! Tôi ở đây để hỗ trợ bạn</Text>

      {/* Đường kẻ phân cách */}
      <View style={styles.separator} />

      {/* Các tùy chọn */}
      <TouchableOpacity style={styles.optionRow}>
        <View>
          <Text style={styles.optionTitle}>
            Chúng tôi có thể giúp gì cho bạn?
          </Text>
          <Text style={styles.optionSubtitle}>Hỗ trợ</Text>
        </View>
        <Image
          source={require('../../../media/pictures/arrow_right.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity style={styles.optionRow}>
        <View>
          <Text style={styles.optionTitle}>Trung tâm trợ giúp</Text>
          <Text style={styles.optionSubtitle}>Thông tin chung</Text>
        </View>
        <Image
          source={require('../../../media/pictures/arrow_right.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 8,
    padding: 6, // tăng vùng chạm cho dễ bấm
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#20B24A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    marginBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEF94E',
    marginVertical: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#555',
  },
  arrowIcon: {
    width: 12,
    height: 12,
    tintColor: '#20B24A',
    resizeMode: 'contain',
  },
});

export default CustomerService;
