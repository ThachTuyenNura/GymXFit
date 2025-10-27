// screens/SurveyScreen.js
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '@context/UserContext';
import { updateProfile } from '@api/userApi';

const SurveyScreen = ({ navigation }) => {
  const [ten, setTen] = useState('');
  const [ngaySinh, setNgaySinh] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [gioiTinh, setGioiTinh] = useState('');
  const [email, setEmail] = useState('');
  const [chieuCao, setChieuCao] = useState('');
  const [canNang, setCanNang] = useState('');
  const { refreshUser } = useContext(UserContext);

  // 📅 Hàm chọn ngày
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setNgaySinh(selectedDate);
  };

  // 📆 Định dạng ngày dd/mm/yyyy
  const formatDate = date => {
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  // ✅ Hàm gửi form
  const handleSubmit = async () => {
    if (!ten.trim()) return Alert.alert('Lỗi', 'Vui lòng nhập họ và tên.');
    if (!ngaySinh) return Alert.alert('Lỗi', 'Vui lòng chọn ngày sinh.');
    if (!gioiTinh) return Alert.alert('Lỗi', 'Vui lòng chọn giới tính.');
    if (!email.trim()) return Alert.alert('Lỗi', 'Vui lòng nhập email.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return Alert.alert('Lỗi', 'Email không hợp lệ.');

    if (!chieuCao.trim()) return Alert.alert('Lỗi', 'Vui lòng nhập chiều cao.');
    if (isNaN(chieuCao) || Number(chieuCao) <= 0)
      return Alert.alert('Lỗi', 'Chiều cao phải là số hợp lệ.');

    if (!canNang.trim()) return Alert.alert('Lỗi', 'Vui lòng nhập cân nặng.');
    if (isNaN(canNang) || Number(canNang) <= 0)
      return Alert.alert('Lỗi', 'Cân nặng phải là số hợp lệ.');

    try {
      const profileData = {
        name: ten,
        dob: ngaySinh.toISOString(),
        email,
        gender: gioiTinh,
        height: Number(chieuCao),
        weight: Number(canNang),
      };

      await updateProfile(profileData);
      await refreshUser();
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại.');
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
        {/* 🧩 Header */}
        <View style={styles.headerContainer}>
          <Image
            source={require('@assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Cập nhật thông tin</Text>
          <Text style={styles.subtitle}>
            Vui lòng điền thông tin cá nhân của bạn
          </Text>
        </View>

        {/* 🧾 Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            placeholderTextColor="#888"
            value={ten}
            onChangeText={setTen}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text
              style={
                ngaySinh
                  ? styles.dateSelectionText
                  : styles.dateSelectionPlaceholder
              }
            >
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

          {/* ⚧ Giới tính */}
          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.genderContainer}>
            {[
              { key: 'male', label: 'Nam' },
              { key: 'female', label: 'Nữ' },
              { key: 'other', label: 'Khác' },
            ].map(option => (
              <TouchableOpacity
                key={option.key}
                style={styles.genderOption}
                onPress={() => setGioiTinh(option.key)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    gioiTinh === option.key && styles.radioSelected,
                  ]}
                >
                  {gioiTinh === option.key && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.genderText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Chiều cao (cm)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={chieuCao}
            onChangeText={setChieuCao}
          />

          <TextInput
            style={styles.input}
            placeholder="Cân nặng (kg)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={canNang}
            onChangeText={setCanNang}
          />
        </View>

        {/* ✅ Nút xác nhận */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Xác nhận thông tin</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 35,
  },
  headerContainer: {
    alignItems: 'center',
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
  dateSelectionText: {
    color: '#000',
  },
  dateSelectionPlaceholder: {
    color: '#888',
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
