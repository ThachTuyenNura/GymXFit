import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

const WorkoutScreen2 = () => {
  const roundData = [
    {
      round: 'Round 1',
      exercises: [
        { id: '1', title: 'Barbell Bench Press', time: '00:30', reps: '3x' },
        { id: '2', title: 'Tricep Dips', time: '00:15', reps: '2x' },
        {
          id: '3',
          title: 'Incline Bench Sit Up',
          time: '00:30',
          reps: '3x',
          active: true, // riêng cái này đổi sang Play_Button_2.png
        },
      ],
    },
    {
      round: 'Round 2',
      exercises: [
        { id: '4', title: 'Romanian Deadlifts', time: '00:10', reps: '2x' },
        { id: '5', title: 'Foam Rolling', time: '00:10', reps: '4x' },
      ],
    },
  ];

  const renderExercise = item => (
    <View key={item.id} style={styles.exerciseCard}>
      {/* play button */}
      <View style={styles.playButtonWrap}>
        <Image
          source={
            item.active
              ? require('../assets/Play_Button_2.png')
              : require('../assets/Play_Button.png')
          }
          style={styles.playIcon}
        />
      </View>

      {/* info */}
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle}>{item.title}</Text>
        <View style={styles.exerciseDetails}>
          <Image
            source={require('../assets/Time.png')}
            style={styles.detailIcon}
          />
          <Text style={styles.exerciseTime}>{item.time}</Text>
        </View>
      </View>

      {/* reps */}
      <Text style={styles.repsText}>Repetition {item.reps}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity>
            <Image
              source={require('../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Advanced</Text>
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

      {/* Featured block */}
      <View style={styles.featuredWrapper}>
        <View style={styles.featuredCard}>
          <Image
            source={require('../assets/workout1.jpg')}
            style={styles.featuredImage}
          />

          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>Upper Body Strength</Text>
          </View>

          <View style={styles.featuredOverlay}>
            <View style={styles.featuredDetails}>
              <View style={styles.detailRow}>
                <Image
                  source={require('../assets/Time.png')}
                  style={styles.detailIcon}
                />
                <Text style={styles.featuredDetailText}>60 Minutes</Text>
              </View>
              <View style={styles.detailRow}>
                <Image
                  source={require('../assets/Calories.png')}
                  style={styles.detailIcon}
                />
                <Text style={styles.featuredDetailText}>1450 Kcal</Text>
              </View>
              <View style={styles.detailRow}>
                <Image
                  source={require('../assets/Workout_icon.png')}
                  style={styles.detailIcon}
                />
                <Text style={styles.featuredDetailText}>Advanced</Text>
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

      {/* Rounds */}
      {roundData.map(round => (
        <View
          key={round.round}
          style={{ marginBottom: 16, paddingHorizontal: 18 }}
        >
          <Text style={styles.roundTitle}>{round.round}</Text>
          {round.exercises.map(ex => renderExercise(ex))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 36 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  leftHeader: { flexDirection: 'row', alignItems: 'center' },
  rightHeader: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 10, height: 10, marginRight: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#111' },
  headerIcon: { width: 22, height: 22, marginLeft: 12 },

  featuredWrapper: {
    backgroundColor: '#20B24A',
    borderRadius: 0,
    padding: 12,
    marginBottom: 18,
  },
  featuredCard: { borderRadius: 10, overflow: 'hidden', position: 'relative' },
  featuredImage: { width: '100%', height: 180, resizeMode: 'cover' },
  badgeWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#111' },

  // chỉnh overlay để không che icon/text
  featuredOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.35)', // nhẹ hơn để nhìn rõ
    borderRadius: 10,
    padding: 10,
    paddingRight: 46,
  },
  featuredDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  detailIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#fff', // icon trắng sáng rõ
  },
  featuredDetailText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuredFavorite: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredFavoriteIcon: { width: 18, height: 18, tintColor: '#fff' },

  roundTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  playButtonWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playIcon: { width: 40, height: 40, resizeMode: 'contain' },
  exerciseInfo: { flex: 1 },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  exerciseDetails: { flexDirection: 'row', alignItems: 'center' },
  exerciseTime: { marginLeft: 6, fontSize: 12, color: '#333' },
  repsText: { fontSize: 12, fontWeight: '700', color: '#111' },
});

export default WorkoutScreen2;
