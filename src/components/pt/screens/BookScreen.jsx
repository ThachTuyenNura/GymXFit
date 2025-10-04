import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookScreen = () => {
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedDate, setSelectedDate] = useState(24);

  const weekDays = [
    { day: 'TH 4', date: 24 },
    { day: 'TH 5', date: 25 },
    { day: 'TH 6', date: 26 },
    { day: 'TH 7', date: 27 },
    { day: 'CN', date: 28 },
    { day: 'TH 2', date: 29 },
    { day: 'TH 3', date: 30 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đặt lịch HLV</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn huấn luyện viên</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>
              {selectedTrainer || 'N/A'}
            </Text>
            <Icon name="keyboard-arrow-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle2}>Câu lạc bộ</Text>
          <View style={styles.clubContainer}>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn thời gian bắt đầu</Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.calendarScroll}
          >
            {weekDays.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayContainer,
                  selectedDate === item.date && styles.selectedDayContainer
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDate === item.date && styles.selectedDayText
                ]}>
                  {item.day}
                </Text>
                <Text style={[
                  styles.dateText,
                  selectedDate === item.date && styles.selectedDateText
                ]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#30C451',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionTitle2: {
    fontSize: 14,
    color: '#aaaaaaff',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#30C451',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  clubContainer: {
    backgroundColor: '#aaaaaaff',
    height: 40,
    borderRadius: 8,
  },
  calendarScroll: {
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 50,
  },
  selectedDayContainer: {
    backgroundColor: '#30C451',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  selectedDayText: {
    color: 'white',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: 'white',
  },
  bookButton: {
    backgroundColor: '#30C451',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});