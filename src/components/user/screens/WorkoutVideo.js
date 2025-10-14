// screens/WorkoutVideo.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';

const WorkoutVideo = ({ navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const infoText =
    'Tăng cường sức mạnh cơ bụng và cải thiện độ linh hoạt của phần thân trên. Giữ tư thế ổn định khi gập người và kiểm soát nhịp thở đều.';

  return (
    <View style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          {/* Nút back */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backWrap}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../../media/pictures/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <Text style={styles.headerText}>Nâng cao</Text>

          {/* Nhóm icon bên phải */}
          <View style={styles.headerRight}>
            {/* Nút tìm kiếm (toggle hiển thị ô tìm kiếm) */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowSearch(!showSearch)}
            >
              <Image
                source={require('../../../media/pictures/Search_icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* Nút thông báo */}
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require('../../../media/pictures/Notifications_icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* Nút user */}
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require('../../../media/pictures/User_Icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ô tìm kiếm (chỉ hiển thị khi nhấn icon) */}
        {showSearch && (
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm trong mô tả bài tập..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        )}
      </View>

      {/* ---------- NỘI DUNG CHÍNH ---------- */}
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Ảnh chính + Play + Sao */}
        <View style={styles.featuredWrapper}>
          <View style={styles.featuredCard}>
            <Image
              source={require('../../../media/pictures/workout1.jpg')}
              style={styles.workoutImage}
            />

            {/* Nút Play (chỉ nhấn được, không hành động) */}
            <TouchableOpacity activeOpacity={0.6} style={styles.playButton}>
              <Image
                source={require('../../../media/pictures/Play_Button.png')}
                style={styles.playIcon}
              />
            </TouchableOpacity>

            {/* Nút Sao yêu thích */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.favoriteBtn}
              onPress={toggleFavorite}
            >
              <Image
                source={
                  isFavorite
                    ? require('../../../media/pictures/yellowstar.png')
                    : require('../../../media/pictures/favorites_white_star.png')
                }
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Thông tin bài tập */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Gập bụng trên ghế nghiêng</Text>
            <Text style={styles.infoDesc}>{infoText}</Text>

            {/* 3 dòng thông tin nhỏ */}
            <View style={styles.infoRowWrapper}>
              <View style={styles.infoItem}>
                <Image
                  source={require('../../../media/pictures/time.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>30 giây</Text>
              </View>

              <View style={styles.infoItem}>
                <Image
                  source={require('../../../media/pictures/calories.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>3 lần</Text>
              </View>

              <View style={styles.infoItem}>
                <Image
                  source={require('../../../media/pictures/Workout_icon.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>Nâng cao</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 36 : 10,
  },

  // Header
  headerWrap: { paddingHorizontal: 18, marginBottom: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  backWrap: { width: 30, alignItems: 'flex-start' },
  backIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerText: { fontSize: 22, fontWeight: '700', color: '#111' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 26, height: 26, marginLeft: 14, resizeMode: 'contain' },

  // Ô tìm kiếm
  searchInput: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Ảnh chính
  featuredWrapper: {
    width: '100%',
    backgroundColor: '#20B24A',
    paddingVertical: 20,
    marginBottom: 22,
  },
  featuredCard: {
    marginHorizontal: 18,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  workoutImage: { width: '100%', height: 500, resizeMode: 'cover' },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '42%',
    zIndex: 5,
  },
  playIcon: { width: 110, height: 110, resizeMode: 'contain' },
  favoriteBtn: { position: 'absolute', top: 16, right: 16, zIndex: 6 },
  favoriteIcon: { width: 32, height: 32, resizeMode: 'contain' },

  // Thông tin bài tập
  infoSection: { paddingHorizontal: 18, marginTop: 14 },
  infoCard: {
    backgroundColor: '#EEF94E',
    borderRadius: 45,
    paddingVertical: 22,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#111',
  },
  infoDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  infoRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 35,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
  },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  smallIcon: { width: 18, height: 18, resizeMode: 'contain', marginRight: 6 },
  infoItemText: { fontSize: 14, color: '#333', fontWeight: '500' },
});

export default WorkoutVideo;
