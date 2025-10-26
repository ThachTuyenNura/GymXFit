import React, { useState, useContext, useMemo } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
    FlatList,
    Modal, // <<< 1. Import Modal
    Pressable,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { UserContext } from '@context/UserContext';

// --- Bắt buộc: Kích hoạt LayoutAnimation cho Android ---
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const generate31Days = () => {
    const days = [];
    const today = new Date(); // Lấy ngày hiện tại
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    for (let i = 0; i < 31; i++) {
        // Tạo một ngày mới bằng cách cộng thêm 'i' ngày vào ngày hôm nay
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        let dayName = dayNames[date.getDay()]; // Lấy tên thứ (T2, T3...)

        // Xử lý đặc biệt cho "Hôm nay"
        if (i === 0) {
            dayName = 'Hôm nay';
        }
        // --- TẠO CHUỖI dd/mm ---
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        days.push({
            id: date.toISOString(),
            dayName: dayName,
            dateString: `${day}/${month}`, // <<< Dùng chuỗi này để hiển thị
            fullDateString: date.toISOString().split('T')[0]
        });
    }
    return days;
};

const ExpandableItem = ({ item, onTimePress }) => {
    // 1. State để quản lý việc mở/đóng
    const [isExpanded, setIsExpanded] = useState(false);

    // 2. Hàm để bật/tắt
    const toggleExpand = () => {
        // 3. Kích hoạt animation "easeInEaseOut" cho lần render tiếp theo
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // 4. Thay đổi state để re-render
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.itemContainer}>
            {/* 5. Header (Phần luôn hiển thị, có thể nhấn vào) */}
            <TouchableOpacity style={styles.itemHeader} onPress={toggleExpand} activeOpacity={0.7}>
                <Text style={styles.itemHeaderText}>{item.class}</Text>
                <View style={styles.distanceContainer}>
                    {/* <Icon name="location-on" size={14} color="#007AFF" />
                    <Text style={styles.distanceText}>{item.distance}</Text> */}
                    {/* Icon mũi tên sẽ xoay dựa trên state */}
                    <Icon name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#666" />
                </View>
            </TouchableOpacity>

            {/* 6. Body (Phần nội dung xổ xuống, chỉ render khi isExpanded là true) */}
            {isExpanded && (
                <View style={styles.itemBody}>
                    {item.schedules.map(schedule => (
                        <View key={schedule.id} style={styles.scheduleBlock}>
                            <Text style={styles.scheduleTitle}>{schedule.title}</Text>
                            <View style={styles.timeSlotsContainer}>
                                {schedule.times.map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        style={styles.timeSlot}
                                        onPress={() => onTimePress({
                                            ptName: item.ptName,
                                            time: time,
                                            currentEnrollment: item.currentEnrollment,
                                            capacity: item.capacity,
                                            className: item.class
                                        })}
                                    >
                                        <Text style={styles.timeText}>{time}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const renderSeparator = () => <View style={styles.separator} />;

const SearchCalendarScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Danh sách lớp');
    const { user } = useContext(UserContext);

    // Lấy tên người dùng, nếu không có tên thì dùng SĐT
    const userName = user?.name || user?.phone || 'Bạn';
    // --- Tạo danh sách ngày ---
    // Dùng useMemo để chỉ tính toán 1 lần
    const days = useMemo(() => generate31Days(), []);

    // <<< SỬA: State selectedDate giờ sẽ lưu ID (ISO string) >>>
    const [selectedDateId, setSelectedDateId] = useState(days.length > 0 ? days[0].id : null);
    // <<< THÊM: State để quản lý modal >>>
    const [selectedSlot, setSelectedSlot] = useState(null);
    // Hàm render cho FlatList, trả về một component ExpandableItem
    const renderItem = ({ item }) => (
        <ExpandableItem
            item={item}
            // Truyền hàm callback vào item
            onTimePress={(slotDetails) => setSelectedSlot(slotDetails)}
        />
    );

    // Hàm xử lý khi nhấn nút Đăng ký
    const handleEnroll = () => {
        // TODO: Thêm logic gọi API đăng ký (sử dụng selectedSlot.className, selectedSlot.time)
        Alert.alert('Thành công', `Đã đăng ký lớp ${selectedSlot.className} lúc ${selectedSlot.time}`);
        setSelectedSlot(null); // Đóng modal sau khi đăng ký
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#30C451" barStyle="light-content" />

            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.greeting}>Xin chào {userName}</Text>
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
                    {days.map((item) => {
                        const isSelected = item.id === selectedDateId;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.dayContainer,
                                    isSelected ? styles.selectedDayContainer : styles.dayContainerDefault
                                ]}
                                onPress={() => {
                                    setSelectedDateId(item.id);
                                    console.log('Ngày được chọn:', item.fullDateString);
                                    // TODO: Gọi API tải danh sách lớp học cho ngày item.fullDateString
                                }}
                            >
                                <Text style={[
                                    styles.dayText,
                                    isSelected ? styles.selectedDayText : styles.dayTextDefault
                                ]}>
                                    {item.dayName}
                                </Text>
                                <Text style={[
                                    styles.dateText,
                                    isSelected ? styles.selectedDateText : styles.dateTextDefault
                                ]}>
                                    {item.dateString}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={classData} // Dữ liệu của bạn (danh sách các rạp/lớp)
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.listContainer} // Style mới cho FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContentPadding}
                    ItemSeparatorComponent={renderSeparator} // Đường kẻ phân cách
                // Hiển thị nếu danh sách rỗng (khi gọi API thật)
                // ListEmptyComponent={() => (
                //     <View style={styles.emptyState}>
                //         <Text style={styles.emptyText}>Chưa có lớp nào trong ngày này</Text>
                //     </View>
                // )}
                />

                <Modal
                    transparent={true}
                    visible={selectedSlot !== null}
                    animationType="fade"
                    onRequestClose={() => setSelectedSlot(null)}
                >
                    <Pressable
                        style={styles.modalBackdrop}
                        onPress={() => setSelectedSlot(null)}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Xác nhận đăng ký</Text>

                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Lớp:</Text>
                                <Text style={styles.modalValue}>{selectedSlot?.className}</Text>
                            </View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Tên PT:</Text>
                                <Text style={styles.modalValue}>{selectedSlot?.ptName}</Text>
                            </View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Giờ mở lớp:</Text>
                                <Text style={styles.modalValue}>{selectedSlot?.time}</Text>
                            </View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Sĩ số:</Text>
                                <Text style={styles.modalValue}>
                                    {selectedSlot?.currentEnrollment} / {selectedSlot?.capacity}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.enrollButton,
                                    // Vô hiệu hóa nút nếu lớp đầy
                                    selectedSlot?.currentEnrollment >= selectedSlot?.capacity && styles.buttonDisabled
                                ]}
                                onPress={handleEnroll}
                                disabled={selectedSlot?.currentEnrollment >= selectedSlot?.capacity}
                            >
                                <Text style={styles.enrollButtonText}>
                                    {selectedSlot?.currentEnrollment >= selectedSlot?.capacity ? 'Lớp đã đầy' : 'Đăng ký lớp'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        margin: 5
    },
    itemHeader: { // Tiêu đề (Galaxy Quang Trung...)
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    itemHeaderText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceText: {
        fontSize: 14,
        color: '#007AFF', // Màu xanh dương
        marginHorizontal: 4,
    },
    separator: { // Đường kẻ mỏng giữa các item
        height: 3,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 20,
    },
    itemBody: { // Nội dung xổ xuống
        paddingHorizontal: 20,
        paddingBottom: 16,
        paddingTop: 10,
    },
    scheduleBlock: {
        marginBottom: 10,
    },
    scheduleTitle: { // Chữ "2D PHỤ ĐỀ"
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    timeSlotsContainer: { // Khung chứa các ô giờ
        flexDirection: 'row',
        flexWrap: 'wrap', // Cho phép các ô giờ tự xuống hàng
    },
    timeSlot: { // Từng ô giờ
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb', // Viền xám nhạt
        marginRight: 10,
        marginBottom: 10,
    },
    timeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111',
    },
    // Style cho thanh lịch cuộn ngang
    calendarWrapper: {
        // Bỏ margin, marginTop để nó sát vào header
        backgroundColor: 'white',
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
        paddingHorizontal: 16, // Lề 2 đầu
    },
    listContentPadding: {
        paddingBottom: 100,
    },
    dayContainer: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginHorizontal: 4,
        minWidth: 50,
    },
    dayContainerDefault: { // Nút thường
        backgroundColor: '#f3f4f6',
    },
    selectedDayContainer: { // Nút được chọn
        backgroundColor: '#30C451', // Màu xanh lá cây
    },
    dayText: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
    },
    dayTextDefault: { color: '#4b5563' },
    dayTextSelected: { color: '#fff' },
    selectedDayText: { color: '#fff' },
    dateText: {
        fontSize: 18,
        fontWeight: '700',
    },
    selectedDateText: { color: '#fff' },
    dateTextDefault: { color: '#1f2937' },
    dateTextSelected: { color: '#fff' },
    monthText: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 2,
    },
    monthTextDefault: { color: '#30C451' }, // Màu xanh lá
    monthTextSelected: { color: '#fff' },
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
        fontWeight: '600'
    },
    // --- Styles cho Modal ---
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        width: '100%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    modalLabel: {
        fontSize: 16,
        color: '#555',
    },
    modalValue: {
        fontSize: 16,
        color: '#111',
        fontWeight: '600',
    },
    enrollButton: {
        backgroundColor: '#30C451', // Màu xanh lá
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 10,
    },
    enrollButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A5D6A7', // Màu xanh lá mờ
    },

    // Style cho contentContainer (nếu bạn muốn giữ lại)
    contentContainer: {
        height: 500,
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
    }
});

export default SearchCalendarScreen;

const classData = [
    {
        id: '1',
        class: 'Lớp Yoga',
        ptName: 'Nguyễn Văn A',
        capacity: 20,
        currentEnrollment: 5,
        schedules: [
            { id: 't1', title: 'Khung giờ mở lớp', times: ['08:00', '09:30', '18:30', '19:30', '21:45', '22:45'] }
        ]
    },
    {
        id: '2',
        class: 'Lớp Boxing',
        ptName: 'Trần Thị B',
        capacity: 15,
        currentEnrollment: 12,
        schedules: [
            { id: 't2', title: 'Khung giờ mở lớp', times: ['17:00', '19:00', '21:00'] }
            // { id: 't3', title: '3D PHỤ ĐỀ', times: ['18:00', '20:30'] }
        ]
    },
    {
        id: '3',
        class: 'Lớp Dance',
        ptName: 'Lê Văn C',
        capacity: 25,
        currentEnrollment: 25, // Ví dụ lớp đầy
        schedules: [
            { id: 't4', title: 'Khung giờ mở lớp', times: ['19:15', '20:45', '22:15'] }
        ]
    },
];
