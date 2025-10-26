import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserContext } from '@context/UserContext';
import { getAllVideos } from '@api/userApi';
import { searchAvailableClasses } from '@api/classesApi';

const formatDateLabel = (date) => {
  try {
    return new Date(date).toLocaleDateString('vi-VN', {
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
    const formatter = (value) =>
      value.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return `${formatter(startDate)} - ${formatter(endDate)}`;
  } catch {
    return '--:--';
  }
};

const getViewCount = (video) => {
  if (!video) return 0;
  const possibleKeys = [
    'viewCount',
    'views',
    'totalViews',
    'total_view',
    'view_count',
    'watchCount',
  ];
  for (const key of possibleKeys) {
    const value = video[key];
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.trim() !== '') return Number(value) || 0;
  }
  if (video.metrics && typeof video.metrics === 'object') {
    const metricKeys = ['viewCount', 'views', 'totalViews'];
    for (const key of metricKeys) {
      const metricValue = video.metrics[key];
      if (typeof metricValue === 'number') return metricValue;
      if (typeof metricValue === 'string' && metricValue.trim() !== '') {
        return Number(metricValue) || 0;
      }
    }
  }
  return 0;
};

const QuickActions = ({ navigation }) => (
  <View style={styles.tabBarContainer}>
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.itemTabBar}
        onPress={() => navigation.navigate('WorkoutScreen')}
      >
        <View style={styles.bgImage}>
          <Image style={[styles.itemImage, { tintColor: '#145724' }]} source={require('@assets/images/cucta.png')} />
        </View>
        <Text style={styles.itemText}>Tập luyện</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemTabBar}
        onPress={() => navigation.navigate('SearchCalendarScreen')}
      >
        <View style={styles.bgImage}>
          <MaterialCommunityIcons name="calendar-plus" size={26} color="#08843a" />
        </View>
        <Text style={styles.itemText}>Đặt lịch tập</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemTabBar}
        onPress={() => navigation.navigate('SearchCalendarScreen')}
      >
        <View style={styles.bgImage}>
          <MaterialCommunityIcons name="account-tie" size={26} color="#08843a" />
        </View>
        <Text style={styles.itemText}>Đặt lịch HLV</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemTabBar}
        onPress={() => navigation.navigate('CalendarScreen')}
      >
        <View style={styles.bgImage}>
          <MaterialCommunityIcons name="calendar-check" size={26} color="#08843a" />
        </View>
        <Text style={styles.itemText}>Lịch học</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemTabBar}
        onPress={() => navigation.navigate('CardMembershipScreen')}
      >
        <View style={styles.bgImage}>
          <Image style={styles.itemImage} source={require('@assets/images/cart.png')} />
        </View>
        <Text style={styles.itemText}>Mua dịch vụ</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const TutorialCarousel = ({ title, data, onPressItem, onPressSeeAll }) => (
  <View style={styles.sectionWrapper}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.sectionAction} onPress={onPressSeeAll}>
        <Text style={styles.sectionActionText}>Tất cả</Text>
        <Image source={require('@assets/images/arrowright.png')} />
      </TouchableOpacity>
    </View>

    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemTutorial}
          activeOpacity={0.85}
          onPress={() => onPressItem(item)}
        >
          <View>
            {item.thumbnail ? (
              <Image style={styles.imageTutorial} source={{ uri: item.thumbnail }} />
            ) : (
              <Image style={styles.imageTutorial} source={require('@assets/images/tutorial1.jpg')} />
            )}
          </View>
          <View style={styles.contentTutorial}>
            <Text style={styles.titleContent} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.dateContent}>
              {item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'Tập luyện'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const HighlightClasses = ({ classes, onPressClass }) => {
  if (!classes.length) return null;

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lớp sắp diễn ra</Text>
        <TouchableOpacity style={styles.sectionAction} onPress={() => onPressClass()}>
          <Text style={styles.sectionActionText}>Đặt lịch</Text>
          <Image source={require('@assets/images/arrowright.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={classes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.classCard}
            activeOpacity={0.85}
            onPress={() => onPressClass(item)}
          >
            <View style={styles.classTimeBadge}>
              <Text style={styles.classTimeText}>{formatDateLabel(item.startTime)}</Text>
            </View>
            <Text style={styles.className}>{item.name}</Text>
            <Text style={styles.classSchedule}>{formatTimeRange(item.startTime, item.endTime)}</Text>
            {item.location ? (
              <View style={styles.classLocationRow}>
                <MaterialIcons name="location-on" size={16} color="#30C451" />
                <Text style={styles.classLocationText}>{item.location}</Text>
              </View>
            ) : null}
            <Text style={styles.classSpots}>
              {item.availableSpots} chỗ trống • PT {item.instructor?.name || 'GymXFit'}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.classId}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const VideoCard = ({ video, onPress }) => (
  <TouchableOpacity
    style={styles.videoCard}
    activeOpacity={0.85}
    onPress={() => onPress(video)}
  >
    <View>
      {video.thumbnail ? (
        <Image style={styles.videoCardImage} source={{ uri: video.thumbnail }} />
      ) : (
        <Image style={styles.videoCardImage} source={require('@assets/images/lesmils1.jpg')} />
      )}
    </View>
    <View style={styles.videoCardContent}>
      <Text style={styles.videoCardTitle} numberOfLines={2}>
        {video.title}
      </Text>
      <Text style={styles.videoCardMeta} numberOfLines={1}>
        {video.estimated_calories ? `${video.estimated_calories} Kcal • ` : ''}
        {video.subcategory || video.category || 'Bài tập'}
      </Text>
    </View>
  </TouchableOpacity>
);

const MostWatchedSection = ({ videos, onPressVideo }) => {
  if (!videos.length) return null;

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Xem nhiều nhất</Text>
      </View>
      <FlatList
        horizontal
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} onPress={onPressVideo} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
        ItemSeparatorComponent={() => <View style={styles.horizontalSpacer} />}
      />
    </View>
  );
};

const CategorySection = ({ title, videos, onPressVideo }) => {
  if (!videos.length) return null;

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <FlatList
        horizontal
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} onPress={onPressVideo} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
        ItemSeparatorComponent={() => <View style={styles.horizontalSpacer} />}
      />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const userName = user?.name || user?.phone || 'hội viên';

  const [tutorials, setTutorials] = useState([]);
  const [videos, setVideos] = useState([]);
  const [highlightClasses, setHighlightClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHomeData = useCallback(async (isPullToRefresh = false) => {
    if (isPullToRefresh) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const [videosResponse, classesResponse] = await Promise.all([
        getAllVideos({ limit: 12 }),
        searchAvailableClasses({ limit: 6, sortBy: 'startTime', sortOrder: 'asc' }),
      ]);

      if (videosResponse?.success) {
        const fetchedVideos = videosResponse.videos || [];
        setVideos(fetchedVideos);
        setTutorials(fetchedVideos.slice(0, 6));
      } else {
        setVideos([]);
        setTutorials([]);
        setError(videosResponse?.message || 'Không thể tải bài tập.');
      }

      if (classesResponse?.success) {
        setHighlightClasses(classesResponse.data || []);
      } else {
        setHighlightClasses([]);
      }
    } catch (err) {
      setError(err.message);
      setTutorials([]);
      setVideos([]);
      setHighlightClasses([]);
    } finally {
      if (isPullToRefresh) {
        setRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchHomeData(false);
  }, [fetchHomeData]);

  const handleRefresh = useCallback(() => fetchHomeData(true), [fetchHomeData]);

  const handlePressVideo = useCallback(
    (video) => {
      if (!video?.id) return;
      navigation.navigate('WorkoutVideo', { videoId: video.id });
    },
    [navigation],
  );

  const handlePressClass = useCallback(
    (classItem) => {
      if (classItem?.classId) {
        navigation.navigate('SearchCalendarScreen', { highlightClassId: classItem.classId });
      } else {
        navigation.navigate('SearchCalendarScreen');
      }
    },
    [navigation],
  );

  const mostWatchedVideos = useMemo(() => {
    if (!videos.length) return [];
    return [...videos]
      .sort((a, b) => getViewCount(b) - getViewCount(a))
      .slice(0, Math.min(6, videos.length));
  }, [videos]);

  const categorizedVideos = useMemo(() => {
    if (!videos.length) return {};
    const topIds = new Set(mostWatchedVideos.map((video) => video.id));
    return videos.reduce((acc, video) => {
      if (topIds.has(video.id)) return acc;
      const categoryKey = video.category || 'Khác';
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(video);
      return acc;
    }, {});
  }, [videos, mostWatchedVideos]);

  const categoryEntries = useMemo(
    () =>
      Object.entries(categorizedVideos)
        .map(([categoryName, categoryVideos]) => [
          categoryName,
          [...categoryVideos].sort((a, b) => getViewCount(b) - getViewCount(a)),
        ])
        .sort((a, b) => a[0].localeCompare(b[0], 'vi', { sensitivity: 'base' })),
    [categorizedVideos],
  );

  const listHeader = (
    <View>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerText}>Xin chào {userName}!</Text>
          <Text style={styles.headerSubText}>Cùng GymXFit hoàn thành mục tiêu hôm nay nhé.</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('WorkoutScreen')}>
            <Image source={require('@assets/images/Search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Image source={require('@assets/images/Notifications.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <QuickActions navigation={navigation} />
      <HighlightClasses classes={highlightClasses} onPressClass={handlePressClass} />
      <TutorialCarousel
        title="Hướng dẫn luyện tập"
        data={tutorials}
        onPressItem={handlePressVideo}
        onPressSeeAll={() => navigation.navigate('WorkoutScreen')}
      />
      <MostWatchedSection videos={mostWatchedVideos} onPressVideo={handlePressVideo} />
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#30C451" />
        <Text style={styles.loadingText}>Đang tải nội dung...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchHomeData(false)}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={categoryEntries}
          keyExtractor={([categoryName]) => categoryName}
          renderItem={({ item: [categoryName, categoryVideos] }) => (
            <CategorySection
              title={categoryName}
              videos={categoryVideos}
              onPressVideo={handlePressVideo}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#30C451']}
            />
          }
          ListHeaderComponent={listHeader}
          ListEmptyComponent={() =>
            videos.length ? null : (
              <View style={styles.sectionWrapper}>
                <View style={styles.stateContainer}>
                  <Text style={styles.stateText}>
                    Dữ liệu đang được cập nhật. Vui lòng quay lại sau ít phút.
                  </Text>
                </View>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  headerSubText: {
    marginTop: 6,
    color: '#4f4f4f',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  tabBarContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    backgroundColor: '#e9f8ef',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  itemTabBar: {
    alignItems: 'center',
    width: '20%',
  },
  bgImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  itemImage: {
    width: 24,
    height: 24,
    tintColor: '#08843a',
  },
  itemText: {
    fontSize: 12,
    color: '#145724',
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionWrapper: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#102615',
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionActionText: {
    color: '#08843a',
    fontWeight: '600',
  },
  itemTutorial: {
    width: 200,
    marginRight: 16,
    borderRadius: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  imageTutorial: {
    width: '100%',
    height: 120,
  },
  contentTutorial: {
    padding: 12,
    gap: 6,
  },
  titleContent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  dateContent: {
    fontSize: 12,
    color: '#666',
  },
  classCard: {
    width: 240,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  classTimeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#30C451',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  classTimeText: {
    color: '#fff',
    fontWeight: '600',
  },
  className: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  classSchedule: {
    fontSize: 14,
    color: '#333',
  },
  classLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  classLocationText: {
    fontSize: 13,
    color: '#555',
  },
  classSpots: {
    fontSize: 12,
    color: '#08843a',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 40,
  },
  horizontalListContent: {
    paddingRight: 4,
  },
  horizontalSpacer: {
    width: 16,
  },
  videoCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  videoCardImage: {
    width: '100%',
    height: 120,
  },
  videoCardContent: {
    padding: 12,
    gap: 6,
  },
  videoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  videoCardMeta: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#d14343',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#30C451',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
  stateContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  stateText: {
    color: '#555',
    textAlign: 'center',
  },
});
