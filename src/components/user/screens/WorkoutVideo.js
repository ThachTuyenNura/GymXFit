// screens/WorkoutVideo.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

export default function WorkoutVideo() {
  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} style={styles.backWrap}>
            <Image
              source={require('../../../media/pictures/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Nâng cao</Text>

          <View style={styles.headerRight}>
            <Image
              source={require('../../../media/pictures/Search_icon.png')}
              style={styles.icon}
            />
            <Image
              source={require('../../../media/pictures/Notifications_icon.png')}
              style={styles.icon}
            />
            <Image
              source={require('../../../media/pictures/User_Icon.png')}
              style={styles.icon}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Phần video hoặc ảnh chính */}
        <View style={styles.featuredWrapper}>
          <View style={styles.featuredCard}>
            {/* Ảnh workout */}
            <Image
              source={require('../../../media/pictures/workout1.jpg')}
              style={styles.workoutImage}
            />

            {/* Nút Play giữa màn hình */}
            <TouchableOpacity activeOpacity={0.8} style={styles.playButton}>
              <Image
                source={require('../../../media/pictures/Play_Button.png')}
                style={styles.playIcon}
              />
            </TouchableOpacity>

            {/* Sao vàng yêu thích */}
            <TouchableOpacity activeOpacity={0.8} style={styles.favoriteBtn}>
              <Image
                source={require('../../../media/pictures/favorites_yellow_star.png')}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Thông tin bài tập */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Gập bụng trên ghế nghiêng</Text>
            <Text style={styles.infoDesc}>
              Tăng cường sức mạnh cơ bụng và cải thiện độ linh hoạt của phần
              thân trên. Giữ tư thế ổn định khi gập người và kiểm soát nhịp thở
              đều.
            </Text>

            {/* 3 thông tin nhỏ phía dưới */}
            <View style={styles.infoRowWrapper}>
              <View style={styles.infoItem}>
                <Image
                  source={require('../../../media/pictures/Time.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>30 giây</Text>
              </View>

              <View style={styles.infoItem}>
                <Image
                  source={require('../../../media/pictures/Calories.png')}
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
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 44 : 14,
  },

  // Header
  headerWrap: { paddingHorizontal: 20, marginBottom: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backWrap: { width: 30, alignItems: 'flex-start' },
  backIcon: { width: 20, height: 20, resizeMode: 'contain' },
  headerText: { fontSize: 22, fontWeight: '700', color: '#111' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24, marginLeft: 14, resizeMode: 'contain' },

  // Ảnh chính
  featuredWrapper: {
    width: '100%',
    backgroundColor: '#20B24A',
    paddingVertical: 20,
    marginBottom: 22,
  },
  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: 500, // phù hợp với màn hình 1080x2400
    resizeMode: 'cover',
  },

  // Nút Play
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '42%',
    zIndex: 5,
  },
  playIcon: { width: 110, height: 110, resizeMode: 'contain' },

  // Sao yêu thích
  favoriteBtn: { position: 'absolute', top: 16, right: 16, zIndex: 6 },
  favoriteIcon: { width: 32, height: 32, resizeMode: 'contain' },

  // Thông tin mô tả
  infoSection: { paddingHorizontal: 20, marginTop: 14 },
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
