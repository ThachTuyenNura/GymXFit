import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PTProfileScreen = ({ navigation }) => {
  const ptInfo = {
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    experience: '5 năm',
    specialty: 'Giảm mỡ, Tăng cơ',
    avatar: require('@assets/images/avt.png'),
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* 🔙 Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomePTScreen')}
      >
        <Icon name="arrow-back" size={26} color="#000" />
      </TouchableOpacity>

      {/* 👤 Thông tin PT */}
      <View style={styles.infoContainer}>
        <View style={styles.avtContainer}>
          <Image source={ptInfo.avatar} style={styles.imageAvt} />
          <Text style={styles.name}>{ptInfo.name}</Text>
          <Text style={styles.phone}>📞 {ptInfo.phone}</Text>
        </View>

        <View style={styles.infoBodyContainer}>
          <View>
            <Icon name="fitness-center" size={20} color="#fff" />
            <Text style={styles.textInfoBody}>Kinh nghiệm</Text>
            <Text style={styles.textInfoValue}>{ptInfo.experience}</Text>
          </View>
          <View style={styles.duongke}></View>
          <View>
            <Icon name="check-circle" size={20} color="#fff" />
            <Text style={styles.textInfoBody}>Chuyên môn</Text>
            <Text style={styles.textInfoValue}>{ptInfo.specialty}</Text>
          </View>
        </View>
      </View>

      {/* ⚙️ Các tùy chọn */}
      <View style={styles.optionContainer}>
        {/* 🟩 Nút chỉnh sửa hồ sơ */}
        <TouchableOpacity
          style={styles.itemOption}
          onPress={() => navigation.navigate('UpdatePTProfileScreen')}
        >
          <View style={styles.imageItemContainer}>
            <Image
              style={{ tintColor: '#fff' }}
              source={require('@assets/images/profile.png')}
            />
          </View>
          <Text style={styles.textItemOption}>Chỉnh sửa hồ sơ</Text>
          <Image
            style={styles.iconArrow}
            source={require('@assets/images/arrowright.png')}
          />
        </TouchableOpacity>

        {/* 🟥 Nút đăng xuất */}
        <TouchableOpacity style={styles.itemOption}>
          <View style={styles.imageItemContainer}>
            <Image source={require('@assets/images/logout.png')} />
          </View>
          <Text style={styles.textItemOption}>Đăng xuất</Text>
          <Image
            style={styles.iconArrow}
            source={require('@assets/images/arrowright.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PTProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 25,
    zIndex: 10,
  },
  infoContainer: {
    backgroundColor: '#B5DB7F',
    paddingTop: 100,
    paddingHorizontal: 30,
    paddingBottom: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avtContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imageAvt: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212020',
  },
  phone: {
    fontSize: 15,
    color: '#333',
    marginTop: 2,
  },
  infoBodyContainer: {
    flexDirection: 'row',
    backgroundColor: '#30C451',
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  textInfoBody: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  textInfoValue: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  duongke: {
    width: 1,
    height: 40,
    backgroundColor: '#fff',
  },
  optionContainer: {
    marginTop: 40,
    paddingHorizontal: 35,
  },
  itemOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageItemContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#30C451',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItemOption: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
    color: '#000',
  },
  iconArrow: {
    tintColor: '#212020',
  },
});
