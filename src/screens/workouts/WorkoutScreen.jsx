import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Platform,
} from 'react-native';

const WorkoutScreen = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState({});

  const workoutData = [
    {
      id: '1',
      title: 'Đấm bốc Cardio',
      duration: '50 phút',
      calories: '1300 Kcal',
      exercises: '5 bài tập',
      image: require('@assets/images/workout1.jpg'),
    },
    {
      id: '2',
      title: 'Phát triển cơ – Chân',
      duration: '12 phút',
      calories: '1250 Kcal',
      exercises: '5 bài tập',
      image: require('@assets/images/workout1.jpg'),
    },
    {
      id: '3',
      title: 'Nghỉ hoặc vận động nhẹ',
      duration: '30 phút',
      calories: '800 Kcal',
      exercises: '5 bài tập',
      image: require('@assets/images/workout1.jpg'),
    },
  ];

  const filteredData = workoutData.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const toggleFavorite = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('WorkoutScreen2', { workout: item })}
    >
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>

        <View style={styles.workoutDetailsColumn}>
          <View style={styles.detailItem}>
            <Image
              source={require('@assets/images/time.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Image
              source={require('@assets/images/calories.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.calories}</Text>
          </View>
          <View style={styles.detailItem}>
            <Image
              source={require('@assets/images/Workout_icon.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.exercises}</Text>
          </View>
        </View>
      </View>

      <View style={styles.thumbSection}>
        <Image source={item.image} style={styles.thumbImage} />
        <TouchableOpacity
          style={styles.itemFavorite}
          onPress={() => toggleFavorite(item.id)}
        >
          <Image
            source={
              favorites[item.id]
                ? require('@assets/images/yellowstar.png')
                : require('@assets/images/favorites_white_star.png')
            }
            style={styles.itemFavoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.innerPadding}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('@assets/images/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Bài tập</Text>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
              <Image
                source={require('@assets/images/Search_icon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('@assets/images/Notifications_icon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('@assets/images/User_Icon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ô tìm kiếm */}
        {searchVisible && (
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập tên bài tập..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        )}
      </View>

      {/* Cấp độ */}
      <View style={[styles.levelContainer, styles.innerPadding]}>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>Người mới</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>Trung cấp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>Nâng cao</Text>
        </TouchableOpacity>
      </View>

      {/* Banner bài tập trong ngày */}
      <View style={styles.featuredWrapper}>
        <View style={styles.featuredCard}>
          <Image
            source={require('@assets/images/workout1.jpg')}
            style={styles.featuredImage}
          />
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>Bài tập trong ngày</Text>
          </View>
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>Sức mạnh phần thân trên</Text>
            <View style={styles.featuredDetails}>
              <View style={styles.detailItem}>
                <Image
                  source={require('@assets/images/time.png')}
                  style={styles.detailIconWhite}
                />
                <Text style={styles.featuredDetailText}>60 phút</Text>
              </View>
              <View style={styles.detailItem}>
                <Image
                  source={require('@assets/images/calories.png')}
                  style={styles.detailIconWhite}
                />
                <Text style={styles.featuredDetailText}>120 Kcal</Text>
              </View>
              <View style={styles.detailItem}>
                <Image
                  source={require('@assets/images/Workout_icon.png')}
                  style={styles.detailIconWhite}
                />
                <Text style={styles.featuredDetailText}>5 bài tập</Text>
              </View>
            </View>

            {/* Nút sao yêu thích trong banner */}
            <TouchableOpacity
              style={styles.featuredFavorite}
              onPress={() => toggleFavorite('featured')}
            >
              <Image
                source={
                  favorites['featured']
                    ? require('@assets/images/yellowstar.png')
                    : require('@assets/images/favorites_white_star.png')
                }
                style={styles.featuredFavoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Danh sách bài tập */}
      <View style={styles.innerPadding}>
        <Text style={styles.unlockTitle}>Khám phá tiềm năng của bạn</Text>
        <FlatList
          data={filteredData}
          renderItem={renderWorkoutItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 36 : 10,
  },
  innerPadding: { paddingHorizontal: 18 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  leftHeader: { flexDirection: 'row', alignItems: 'center' },
  rightHeader: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 22, height: 22, marginRight: 12, resizeMode: 'contain' },
  headerIcon: { width: 26, height: 26, marginLeft: 14, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: '700', color: '#111' },

  // Search
  searchInput: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Level buttons
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 14,
  },
  levelButton: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#1EB64F',
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  levelText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Banner
  featuredWrapper: {
    backgroundColor: '#20B24A',
    padding: 12,
    marginBottom: 18,
  },
  featuredCard: { borderRadius: 10, overflow: 'hidden', position: 'relative' },
  featuredImage: { width: '100%', height: 200, resizeMode: 'cover' },
  badgeWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  badgeText: { fontSize: 13, fontWeight: '700', color: '#333' },
  featuredOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 10,
    padding: 12,
    paddingRight: 56,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  featuredDetails: { flexDirection: 'row', alignItems: 'center' },
  detailItem: { flexDirection: 'row', alignItems: 'center', marginRight: 18 },
  detailIconWhite: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  featuredDetailText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  featuredFavorite: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredFavoriteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // Workout list
  unlockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutInfo: { flex: 1 },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  workoutDetailsColumn: { flexDirection: 'column', alignItems: 'flex-start' },
  detailIcon: { width: 20, height: 20, resizeMode: 'contain' },
  detailText: { marginLeft: 8, fontSize: 13, color: '#333' },
  thumbSection: {
    width: 100,
    height: 84,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    marginLeft: 12,
    position: 'relative',
  },
  thumbImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  itemFavorite: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
  },
  itemFavoriteIcon: { width: 22, height: 22, resizeMode: 'contain' },
});

export default WorkoutScreen;
