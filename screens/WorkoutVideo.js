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
      {/* Header */}
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} style={styles.backWrap}>
            <Image
              source={require('../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Advanced</Text>

          <View style={styles.headerRight}>
            <Image
              source={require('../assets/Search_icon.png')}
              style={styles.icon}
            />
            <Image
              source={require('../assets/Notifications_icon.png')}
              style={styles.icon}
            />
            <Image
              source={require('../assets/User_Icon.png')}
              style={styles.icon}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Featured workout section with green background */}
        <View style={styles.featuredWrapper}>
          <View style={styles.featuredCard}>
            <Image
              source={require('../assets/workout1.jpg')}
              style={styles.workoutImage}
            />

            {/* Play Button */}
            <TouchableOpacity activeOpacity={0.8} style={styles.playButton}>
              <Image
                source={require('../assets/Play_Button.png')}
                style={styles.playIcon}
              />
            </TouchableOpacity>

            {/* Favorite Star */}
            <TouchableOpacity activeOpacity={0.8} style={styles.favoriteBtn}>
              <Image
                source={require('../assets/favorites_yellow_star.png')}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>

            {/* Overlay Info */}
            <View style={styles.cardOverlay}>
              <View style={styles.overlayDetails}>
                <View style={styles.overlayItem}>
                  <Image
                    source={require('../assets/Time.png')}
                    style={styles.overlayIcon}
                  />
                  <Text style={styles.overlayText}>60 Minutes</Text>
                </View>
                <View style={styles.overlayItem}>
                  <Image
                    source={require('../assets/Calories.png')}
                    style={styles.overlayIcon}
                  />
                  <Text style={styles.overlayText}>1450 Kcal</Text>
                </View>
                <View style={styles.overlayItem}>
                  <Image
                    source={require('../assets/Workout_icon.png')}
                    style={styles.overlayIcon}
                  />
                  <Text style={styles.overlayText}>Advanced</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Incline Bench Sit Up</Text>
            <Text style={styles.infoDesc}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed
              Cursus Libero Eget.
            </Text>

            {/* Khối trắng bo tròn bọc cả 3 item */}
            <View style={styles.infoRowWrapper}>
              <View style={styles.infoItem}>
                <Image
                  source={require('../assets/Time.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>30 Seconds</Text>
              </View>

              <View style={styles.infoItem}>
                <Image
                  source={require('../assets/Calories.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>3 Rep</Text>
              </View>

              <View style={styles.infoItem}>
                <Image
                  source={require('../assets/Workout_icon.png')}
                  style={styles.smallIcon}
                />
                <Text style={styles.infoItemText}>Advanced</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 36 : 10,
  },

  // Header
  headerWrap: { paddingHorizontal: 18, marginBottom: 8 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backWrap: { width: 28, alignItems: 'flex-start' },
  backIcon: { width: 18, height: 18, resizeMode: 'contain' },
  headerText: { fontSize: 20, fontWeight: '700', color: '#111' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 22, height: 22, marginLeft: 12, resizeMode: 'contain' },

  // Green Background Section (play video)
  featuredWrapper: {
    width: '100%',
    backgroundColor: '#20B24A',
    paddingVertical: 18,
    marginBottom: 20,
  },
  featuredCard: {
    marginHorizontal: 18,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  workoutImage: { width: '100%', height: 620, resizeMode: 'cover' }, // gấp đôi
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    zIndex: 5,
  },
  playIcon: { width: 110, height: 110, resizeMode: 'contain' },
  favoriteBtn: { position: 'absolute', top: 14, right: 14, zIndex: 6 },
  favoriteIcon: { width: 26, height: 26, resizeMode: 'contain' },
  cardOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  overlayDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayItem: { flexDirection: 'row', alignItems: 'center' },
  overlayIcon: { width: 14, height: 14, resizeMode: 'contain' },
  overlayText: { color: '#fff', marginLeft: 6, fontSize: 12 },

  // Info Section
  infoSection: { paddingHorizontal: 18, marginTop: 12 },
  infoCard: {
    backgroundColor: '#EEF94E',
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoDesc: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 14,
  },

  // pill trắng chứa 3 item
  infoRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  smallIcon: { width: 16, height: 16, resizeMode: 'contain', marginRight: 6 },
  infoItemText: { fontSize: 13, color: '#333' },
});
