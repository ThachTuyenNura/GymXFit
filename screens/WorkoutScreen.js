import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Platform,
} from 'react-native';

const WorkoutScreen = () => {
  const workoutData = [
    {
      id: '1',
      title: 'Cardio Boxing',
      duration: '50 Minutes',
      calories: '1300 Kcal',
      exercises: '5 Exercises',
      image: require('../assets/workout1.jpg'),
    },
    {
      id: '2',
      title: 'Hypertrophy - Legs',
      duration: '12 Minutes',
      calories: '1250 Kcal',
      exercises: '5 Exercises',
      image: require('../assets/workout1.jpg'),
    },
    {
      id: '3',
      title: 'Rest or Active',
      duration: '30 Minutes',
      calories: '800 Kcal',
      exercises: '5 Exercises',
      image: require('../assets/workout1.jpg'),
    },
  ];

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutCard}>
      {/* Left: title + details */}
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>

        <View style={styles.workoutDetailsColumn}>
          <View style={styles.detailItem}>
            <Image
              source={require('../assets/Time.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>

          <View style={styles.detailItem}>
            <Image
              source={require('../assets/Calories.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.calories}</Text>
          </View>

          <View style={styles.detailItem}>
            <Image
              source={require('../assets/Workout_icon.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{item.exercises}</Text>
          </View>
        </View>
      </View>

      {/* Right: thumbnail + favorite */}
      <View style={styles.thumbSection}>
        <Image source={item.image} style={styles.thumbImage} />
        <TouchableOpacity style={styles.itemFavorite}>
          <Image
            source={require('../assets/favorites_white_star.png')}
            style={styles.itemFavoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.innerPadding}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TouchableOpacity>
              <Image
                source={require('../assets/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Workout</Text>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity>
              <Image
                source={require('../assets/Search_icon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../assets/Notifications_icon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../assets/User_Icon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Level buttons */}
      <View style={[styles.levelContainer, styles.innerPadding]}>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>Intermediate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}>
          <Text style={styles.levelText}>Advanced</Text>
        </TouchableOpacity>
      </View>

      {/* Featured block */}
      <View style={styles.featuredWrapper}>
        <View style={styles.featuredCard}>
          <Image
            source={require('../assets/workout1.jpg')}
            style={styles.featuredImage}
          />

          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>Training Of The Day</Text>
          </View>

          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>Upper Body Strength</Text>

            <View style={styles.featuredDetails}>
              <View style={styles.detailItem}>
                <Image
                  source={require('../assets/Time.png')}
                  style={styles.detailIconWhite}
                />
                <Text style={styles.featuredDetailText}>60 Minutes</Text>
              </View>

              <View style={styles.detailItem}>
                <Image
                  source={require('../assets/Calories.png')}
                  style={styles.detailIconWhite}
                />
                <Text style={styles.featuredDetailText}>120 Kcal</Text>
              </View>

              <View style={styles.detailItem}>
                <Image
                  source={require('../assets/Workout_icon.png')}
                  style={styles.detailIconWhite}
                />
                <Text style={styles.featuredDetailText}>5 Exercises</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.featuredFavorite}>
              <Image
                source={require('../assets/favorites_white_star.png')}
                style={styles.featuredFavoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Unlock Title + List */}
      <View style={styles.innerPadding}>
        <Text style={styles.unlockTitle}>Unlock Your Potential</Text>

        <FlatList
          data={workoutData}
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

  // Featured
  featuredWrapper: {
    backgroundColor: '#20B24A',
    borderRadius: 0,
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
    backgroundColor: 'rgba(0,0,0,0.45)', // nhẹ hơn để icon rõ
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
  featuredDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18, // khoảng cách đều giữa các cụm
  },
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
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
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
    tintColor: '#fff',
  },

  // Unlock list
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
    alignItems: 'flex-start',
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
