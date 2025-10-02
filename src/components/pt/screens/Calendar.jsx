import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTab, setSelectedTab] = useState('Danh sách lớp');

  const generateDaysInMonth = () => {
    const daysOfWeek = ['CN', 'TH 2', 'TH 3', 'TH 4', 'TH 5', 'TH 6', 'TH 7'];
    const days = [];
    
    for (let date = 1; date <= 31; date++) {
      const dayIndex = (date - 1) % 7;
      days.push({
        day: daysOfWeek[dayIndex],
        date: date
      });
    }
    return days;
  };
  
  const days = generateDaysInMonth();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#30C451" barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>Xin chào ...</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <View style={styles.filterContent}>
              <Icon name="tune" size={16} color="white" />
              <Text style={styles.filterText}>Lọc</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Danh sách lớp' && styles.activeTab]}
            onPress={() => setSelectedTab('Danh sách lớp')}
          >
            <Text style={[styles.tabText, selectedTab === 'Danh sách lớp' && styles.activeTabText]}>
              Danh sách lớp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Lịch đã đặt' && styles.activeTab]}
            onPress={() => setSelectedTab('Lịch đã đặt')}
          >
            <Text style={[styles.tabText, selectedTab === 'Lịch đã đặt' && styles.activeTabText]}>
              Lịch đã đặt
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
                selectedDate === item.date && styles.selectedDayContainer
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              {/* Thứ ở trên */}
              <Text style={[
                styles.dayText,
                selectedDate === item.date && styles.selectedDayText
              ]}>
                {item.day}
              </Text>
              {/* Ngày ở dưới */}
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

      {/* Content Area */}
      <View style={styles.contentContainer}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Chưa có lịch nào được đặt</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#30C451',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: 'white',
    fontSize: 16,
    marginTop: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#30C451',
  },
  calendarWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarScrollView: {
    paddingVertical: 15,
  },
  calendarScrollContent: {
    paddingHorizontal: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    textAlign: 'center',
  },
  selectedDayText: {
    color: 'white',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default Calendar;
