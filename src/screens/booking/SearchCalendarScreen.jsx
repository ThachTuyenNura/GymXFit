import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';

// 🧩 Import icon hiện đại & phù hợp hơn
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SearchCalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedTab, setSelectedTab] = useState('Danh sách lớp');
  const [searchQuery, setSearchQuery] = useState('');

  const dates = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];

  const handleSelectDate = index => {
    setSelectedDate(index);
  };

  const handleTabChange = tab => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#30C451" barStyle="light-content" />

      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch tập luyện</Text>
        <TouchableOpacity style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm lớp hoặc HLV..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* 🔹 Lịch thứ trong tuần */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateScroll}
      >
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              selectedDate === index && styles.dateItemActive,
            ]}
            onPress={() => handleSelectDate(index)}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate === index && styles.dateTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔹 Tab điều hướng */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === 'Danh sách lớp' && styles.tabActive,
          ]}
          onPress={() => handleTabChange('Danh sách lớp')}
        >
          <MaterialCommunityIcons
            name="calendar-check-outline"
            size={20}
            color={selectedTab === 'Danh sách lớp' ? '#fff' : '#30C451'}
          />
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Danh sách lớp' && styles.tabTextActive,
            ]}
          >
            Danh sách lớp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === 'Đã đăng ký' && styles.tabActive,
          ]}
          onPress={() => handleTabChange('Đã đăng ký')}
        >
          <FontAwesome5
            name="check-circle"
            size={18}
            color={selectedTab === 'Đã đăng ký' ? '#fff' : '#30C451'}
          />
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Đã đăng ký' && styles.tabTextActive,
            ]}
          >
            Đã đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Nội dung */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.classCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.classTitle}>Lớp Yoga Cơ Bản</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Còn chỗ</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={18}
              color="#30C451"
            />
            <Text style={styles.cardText}>Thứ 3 - 09/12/2025</Text>
          </View>

          <View style={styles.cardRow}>
            <Ionicons name="time-outline" size={18} color="#30C451" />
            <Text style={styles.cardText}>07:00 - 08:30</Text>
          </View>

          <View style={styles.cardRow}>
            <Ionicons name="location-outline" size={18} color="#30C451" />
            <Text style={styles.cardText}>Phòng 202 - GymXFit Center</Text>
          </View>

          <View style={styles.cardRow}>
            <Ionicons name="person-circle-outline" size={18} color="#30C451" />
            <Text style={styles.cardText}>HLV: Nguyễn Văn Nam</Text>
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: '#30C451',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  headerRight: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#333',
    fontSize: 15,
  },
  filterButton: {
    backgroundColor: '#30C451',
    borderRadius: 10,
    padding: 8,
  },
  dateScroll: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  dateItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E7F8EC',
    marginRight: 8,
  },
  dateItemActive: {
    backgroundColor: '#30C451',
  },
  dateText: {
    color: '#30C451',
    fontWeight: '500',
  },
  dateTextActive: {
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 14,
    marginTop: 14,
    paddingVertical: 8,
    elevation: 2,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#30C451',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#30C451',
  },
  tabTextActive: {
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102615',
  },
  statusBadge: {
    backgroundColor: '#34d399',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#30C451',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
