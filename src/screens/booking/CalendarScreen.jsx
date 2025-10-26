import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { getMyEnrollments } from '@api/classesApi';

const STATUS_META = {
  active: { label: 'Sắp diễn ra', style: 'badgeActive' },
  completed: { label: 'Hoàn thành', style: 'badgeCompleted' },
  cancelled: { label: 'Đã hủy', style: 'badgeCancelled' },
};

const formatDateLabel = (value) => {
  try {
    return new Date(value).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  } catch {
    return '--/--';
  }
};

const formatTimeRange = (start, end) => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const formatter = (date) =>
      date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return `${formatter(startDate)} - ${formatter(endDate)}`;
  } catch {
    return '--:--';
  }
};

const EnrollmentCard = ({ enrollment }) => {
  const classInfo = enrollment.class || {};
  const statusMeta = STATUS_META[enrollment.status] || STATUS_META.active;

  return (
    <View style={styles.enrollmentCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.className}>{classInfo.name || 'Lớp học GymXFit'}</Text>
        <View style={[styles.badge, styles[statusMeta.style]]}>
          <Text style={styles.badgeText}>{statusMeta.label}</Text>
        </View>
      </View>

      <View style={styles.cardRow}>
        <Icon name="event" size={20} color="#30C451" />
        <Text style={styles.cardText}>
          {formatDateLabel(classInfo.startTime || enrollment.enrolledAt)}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Icon name="schedule" size={20} color="#30C451" />
        <Text style={styles.cardText}>
          {formatTimeRange(classInfo.startTime, classInfo.endTime)}
        </Text>
      </View>

      {classInfo.location ? (
        <View style={styles.cardRow}>
          <Icon name="location-on" size={20} color="#30C451" />
          <Text style={styles.cardText}>{classInfo.location}</Text>
        </View>
      ) : null}

      {classInfo.instructor?.name ? (
        <View style={styles.cardRow}>
          <Icon name="person-outline" size={20} color="#30C451" />
          <Text style={styles.cardText}>{classInfo.instructor.name}</Text>
        </View>
      ) : null}

      <View style={styles.cardFooter}>
        <Text style={styles.capacityText}>
          {classInfo.currentEnrollment}/{classInfo.capacity} học viên
        </Text>
      </View>
    </View>
  );
};

const CalendarScreen = ({ navigation }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadEnrollments = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await getMyEnrollments({ limit: 100 });
      if (response?.success) {
        const sortedEnrollments = [...(response.data || [])].sort((a, b) => {
          const startA = new Date(a.class?.startTime || a.enrolledAt).getTime();
          const startB = new Date(b.class?.startTime || b.enrolledAt).getTime();
          return startA - startB;
        });
        setEnrollments(sortedEnrollments);
      } else {
        setEnrollments([]);
        setError(response?.message || 'Không thể tải lịch học.');
      }
    } catch (err) {
      setEnrollments([]);
      setError(err.message);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEnrollments(false);
    }, [loadEnrollments]),
  );

  const handleRefresh = useCallback(() => loadEnrollments(true), [loadEnrollments]);

  const upcomingEnrollments = useMemo(() => {
    const now = Date.now();
    return enrollments.filter((item) => {
      const startTime = new Date(item.class?.startTime || item.enrolledAt).getTime();
      return startTime >= now || item.status === 'active';
    });
  }, [enrollments]);

  const pastEnrollments = useMemo(() => {
    const now = Date.now();
    return enrollments.filter((item) => {
      const startTime = new Date(item.class?.startTime || item.enrolledAt).getTime();
      return startTime < now && item.status !== 'active';
    });
  }, [enrollments]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#30C451" barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch học của bạn</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#30C451']}
          />
        }
      >
        <View style={styles.heroSection}>
          <Image
            source={require('@assets/images/headercalender.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Theo dõi tiến trình tập luyện</Text>
            <Text style={styles.heroSubtitle}>
              Lịch học được đồng bộ với hệ thống Admin giúp bạn chủ động thời gian tập.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lịch sắp tới</Text>
          {isLoading ? (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#30C451" />
              <Text style={styles.stateText}>Đang tải dữ liệu...</Text>
            </View>
          ) : error ? (
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>{error}</Text>
            </View>
          ) : upcomingEnrollments.length === 0 ? (
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>
                Bạn chưa có lịch học nào sắp diễn ra. Đặt lịch trong mục Đặt lịch nhé!
              </Text>
            </View>
          ) : (
            upcomingEnrollments.map((item) => (
              <EnrollmentCard key={item.enrollmentId} enrollment={item} />
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lịch đã tham gia</Text>
          {isLoading ? (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#30C451" />
            </View>
          ) : pastEnrollments.length === 0 ? (
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>Bạn sẽ thấy lịch đã học tại đây.</Text>
            </View>
          ) : (
            pastEnrollments.map((item) => (
              <EnrollmentCard key={item.enrollmentId} enrollment={item} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#30C451',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  headerRight: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  heroSubtitle: {
    marginTop: 6,
    color: '#f8f8f8',
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#102615',
  },
  stateContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  stateText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  enrollmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  className: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  badgeActive: {
    backgroundColor: '#34d399',
  },
  badgeCompleted: {
    backgroundColor: '#60a5fa',
  },
  badgeCancelled: {
    backgroundColor: '#f97316',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#222',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eef6f0',
    paddingTop: 10,
  },
  capacityText: {
    fontSize: 14,
    color: '#444',
  },
});
