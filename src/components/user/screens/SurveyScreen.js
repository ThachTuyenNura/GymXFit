// screens/SurveyScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { updateProfile } from '../UserHTTP';

const SurveyScreen = ({ navigation }) => {
  const [ten, setTen] = useState('');
  const [ngaySinh, setNgaySinh] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [gioiTinh, setGioiTinh] = useState('');
  const [email, setEmail] = useState('');
  const [chieuCao, setChieuCao] = useState('');
  const [canNang, setCanNang] = useState('');
  const { refreshUser } = useContext(UserContext);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setNgaySinh(selectedDate);
  };

  const formatDate = date => {
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleSubmit = async () => {
    // 🔍 Kiểm tra tất cả trường bắt buộc
    if (!ten.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ và tên.');
      return;
    }

    if (!ngaySinh) {
      Alert.alert('Lỗi', 'Vui lòng chọn ngày sinh.');
      return;
    }

    if (!gioiTinh) {
      Alert.alert('Lỗi', 'Vui lòng chọn giới tính.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email.');
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      return;
    }

    if (!chieuCao.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập chiều cao.');
      return;
    }

    if (isNaN(chieuCao) || Number(chieuCao) <= 0) {
      Alert.alert('Lỗi', 'Chiều cao phải là số hợp lệ (lớn hơn 0).');
      return;
    }

    if (!canNang.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập cân nặng.');
      return;
    }

    if (isNaN(canNang) || Number(canNang) <= 0) {
      Alert.alert('Lỗi', 'Cân nặng phải là số hợp lệ (lớn hơn 0).');
      return;
    }

    try {
      // Chuẩn bị dữ liệu để gửi đi
      const profileData = {
        name: ten,
        dob: ngaySinh.toISOString(), // Gửi định dạng chuẩn ISO
        email: email,
        height: chieuCao,
        weight: canNang
        // Giới tính sẽ cần thêm vào schema backend
      };

      // Gọi API cập nhật
      await updateProfile(profileData);

      // Báo cho Context biết để tải lại thông tin user
      // Vì user mới đã có 'name', AppNavigation sẽ tự động chuyển sang HomeNavigation
      await refreshUser();

    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại.');
      console.error(error);
    }
  };

  const androidBehavior = Platform.OS === 'android' ? 'height' : undefined;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={androidBehavior}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
          {/* Logo */}
          <Image
            source={require('../../../media/pictures/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Tiêu đề */}
          <Text style={styles.title}>Cập nhật thông tin</Text>
          <Text style={styles.subtitle}>
            Vui lòng điền thông tin cá nhân của bạn
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Họ tên */}
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            placeholderTextColor="#888"
            value={ten}
            onChangeText={setTen}
          />

          {/* Ngày sinh */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text style={{ color: ngaySinh ? '#000' : '#888' }}>
              {ngaySinh ? formatDate(ngaySinh) : 'Ngày sinh'}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={ngaySinh || new Date()}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
            />
          )}

          {/* Giới tính */}
          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => setGioiTinh('Nam')}
            >
              <View
                style={[
                  styles.radioOuter,
                  gioiTinh === 'Nam' && styles.radioSelected,
                ]}
              >
                {gioiTinh === 'Nam' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Nam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => setGioiTinh('Nữ')}
            >
              <View
                style={[
                  styles.radioOuter,
                  gioiTinh === 'Nữ' && styles.radioSelected,
                ]}
              >
                {gioiTinh === 'Nữ' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>Nữ</Text>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Chiều cao */}
          <TextInput
            style={styles.input}
            placeholder="Chiều cao (cm)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={chieuCao}
            onChangeText={setChieuCao}
          />

          {/* Cân nặng */}
          <TextInput
            style={styles.input}
            placeholder="Cân nặng (kg)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={canNang}
            onChangeText={setCanNang}
          />
        </View>

        {/* Nút Gửi */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Xác nhận thông tin</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 35
  },
  headerContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#000',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#20B24A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#20B24A',
  },
  radioSelected: {
    borderColor: '#20B24A',
  },
  genderText: {
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#20B24A',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default SurveyScreen;
