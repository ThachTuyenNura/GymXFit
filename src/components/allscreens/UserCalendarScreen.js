import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

const UserCalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(1);

  // Giả lập dữ liệu buổi tập
  const bookedSessions = [
    {
      id: 1,
      date: 3,
      title: 'Yoga buổi sáng',
      trainer: 'HLV Lan Anh',
      time: '06:30 - 07:30',
    },
    {
      id: 2,
      date: 3,
      title: 'Body Combat',
      trainer: 'HLV Minh Khang',
      time: '08:00 - 09:00',
    },
    {
      id: 3,
      date: 5,
      title: 'Zumba Dance',
      trainer: 'HLV Thảo My',
      time: '18:00 - 19:00',
    },
  ];

  // Tạo danh sách ngày
  const generateDaysInMonth = () => {
    const daysOfWeek = ['CN', 'TH 2', 'TH 3', 'TH 4', 'TH 5', 'TH 6', 'TH 7'];
    const days = [];
    for (let date = 1; date <= 31; date++) {
      const dayIndex = (date - 1) % 7;
      days.push({ day: daysOfWeek[dayIndex], date });
    }
    return days;
  };

  const days = generateDaysInMonth();
  const filteredSessions = bookedSessions.filter(
    session => session.date === selectedDate,
  );

  // Hàm Back an toàn (chỉ chạy nếu có navigation stack)
  const handleGoBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log('⚠ Không có màn hình nào để quay lại');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#30C451" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Image
              source={require('../../media/pictures/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.greeting}>Lịch tập cá nhân</Text>
          <View style={{ width: 28 }} />
        </View>
        <Text style={styles.subText}>Xem các buổi tập đã đặt trong tháng</Text>
      </View>

      {/* Thanh lịch */}
      <View style={styles.calendarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarScrollContent}
          style={styles.calendarScrollView}
        >
          {days.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                selectedDate === item.date && styles.selectedDayContainer,
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDate === item.date && styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item.date && styles.selectedDateText,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nội dung */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.sessionList}>
          {filteredSessions.length > 0 ? (
            filteredSessions.map(session => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>{session.title}</Text>
                  <Text style={styles.sessionTrainer}>{session.trainer}</Text>
                  <Text style={styles.sessionTime}>{session.time}</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Xem</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Không có lịch tập nào trong ngày
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default UserCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#30C451',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    width: 18, // nhỏ hơn trước
    height: 18,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontSize: 14,
  },
  calendarWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
  },
  calendarScrollView: {
    paddingVertical: 15,
  },
  calendarScrollContent: {
    paddingHorizontal: 10,
  },
  dayContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    minWidth: 50,
  },
  selectedDayContainer: {
    backgroundColor: '#30C451',
  },
  dayText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
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
  contentContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
  },
  sessionList: {
    padding: 15,
  },
  sessionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sessionTrainer: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  sessionTime: {
    fontSize: 13,
    color: '#30C451',
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: '#30C451',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
  },
});
