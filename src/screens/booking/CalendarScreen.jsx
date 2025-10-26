import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = ({ navigation }) => {
    const [selectedSchedule, setSelectedSchedule] = useState('LỊCH HỌC TỪ NGÀY 22/09 - 28/09');
    const [selectedSubject, setSelectedSubject] = useState('');

    const subjects = [
        'Yoga',
        'Aerobic',
        'Zumba',
        'Boxing',
        'Pilates',
        'Body Combat',
        'Body Pump',
        'Spinning',
        'Kick Boxing',
        'Dance Fitness',
        'Crossfit',
        'Cardio'
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#30C451" barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lịch học</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.heroSection}>
                    <Image
                        source={require('@assets/images/headercalender.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.scheduleTabsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.scheduleTab,
                            selectedSchedule === 'LỊCH HỌC TỪ NGÀY 22/09 - 28/09' && styles.activeScheduleTab
                        ]}
                        onPress={() => setSelectedSchedule('LỊCH HỌC TỪ NGÀY 22/09 - 28/09')}
                    >
                        <Text style={[
                            styles.scheduleTabText,
                            selectedSchedule === 'LỊCH HỌC TỪ NGÀY 22/09 - 28/09' && styles.activeScheduleTabText
                        ]}>
                            LỊCH HỌC TỪ NGÀY 22/09 - 28/09
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.scheduleTab,
                            selectedSchedule === 'LỊCH HỌC TỪ NGÀY 29/09 - 05/10' && styles.activeScheduleTab
                        ]}
                        onPress={() => setSelectedSchedule('LỊCH HỌC TỪ NGÀY 29/09 - 05/10')}
                    >
                        <Text style={[
                            styles.scheduleTabText,
                            selectedSchedule === 'LỊCH HỌC TỪ NGÀY 29/09 - 05/10' && styles.activeScheduleTabText
                        ]}>
                            LỊCH HỌC TỪ NGÀY 29/09 - 05/10
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.subjectSection}>
                    <View style={styles.subjectHeader}>
                        <Text style={styles.subjectTitle}>CHỌN MÔN HỌC</Text>
                        <TouchableOpacity style={styles.searchButton}>
                            <Icon name="search" size={24} color="#30C451" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subjectGrid}>
                        {subjects.map((subject, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.subjectButton,
                                    selectedSubject === subject && styles.selectedSubjectButton
                                ]}
                                onPress={() => setSelectedSubject(subject)}
                            >
                                <Text style={[
                                    styles.subjectButtonText,
                                    selectedSubject === subject && styles.selectedSubjectButtonText
                                ]}>
                                    {subject}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.scheduleImageSection}>
                    <View style={styles.scheduleImageContainer}>
                        <View style={styles.scheduleImageHeader}>
                            <Text style={styles.scheduleImageTitle}>GROUP X SCHEDULES</Text>
                            <Text style={styles.scheduleImageSubtitle}>GYMXFIT - FITNESS</Text>
                        </View>

                        <View style={styles.scheduleTable}>
                            <View style={styles.scheduleTableHeader}>
                                <Text style={styles.tableHeaderText}>Thứ 2</Text>
                                <Text style={styles.tableHeaderText}>Thứ 3</Text>
                                <Text style={styles.tableHeaderText}>Thứ 4</Text>
                                <Text style={styles.tableHeaderText}>Thứ 5</Text>
                                <Text style={styles.tableHeaderText}>Thứ 6</Text>
                                <Text style={styles.tableHeaderText}>Thứ 7</Text>
                                <Text style={styles.tableHeaderText}>CN</Text>
                            </View>

                            <View style={styles.timeSlotRow}>
                                <Text style={styles.timeSlotText}>6:00</Text>
                                <Text style={styles.timeSlotText}>6:30</Text>
                                <Text style={styles.timeSlotText}>7:00</Text>
                                <Text style={styles.timeSlotText}>7:30</Text>
                                <Text style={styles.timeSlotText}>8:00</Text>
                                <Text style={styles.timeSlotText}>8:30</Text>
                                <Text style={styles.timeSlotText}>9:00</Text>
                            </View>

                            <View style={styles.scheduleContent}>
                                <Text style={styles.scheduleContentText}>
                                    📅 Lịch học chi tiết sẽ hiển thị tại đây
                                </Text>
                            </View>
                        </View>
                    </View>
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
    },
    heroSection: {
        margin: 16,
        marginBottom: 0,
        borderRadius: 15,
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: 180,
        resizeMode: 'contain',
    },
    scheduleTabsContainer: {
        flexDirection: 'row',
        margin: 16,
        marginTop: 8,
        gap: 8,
    },
    scheduleTab: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#30C451',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    activeScheduleTab: {
        backgroundColor: '#30C451',
    },
    scheduleTabText: {
        fontSize: 12,
        color: '#30C451',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    activeScheduleTabText: {
        color: 'white',
    },
    subjectSection: {
        margin: 16,
        marginTop: 8,
    },
    subjectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    subjectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    searchButton: {
        padding: 8,
    },
    subjectGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    subjectButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#30C451',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 8,
        width: '48%',
        alignItems: 'center',
    },
    selectedSubjectButton: {
        backgroundColor: '#30C451',
        borderColor: '#30C451',
    },
    subjectButtonText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    selectedSubjectButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scheduleImageSection: {
        margin: 16,
        marginTop: 8,
    },
    scheduleImageContainer: {
        backgroundColor: '#30C451',
        borderRadius: 15,
        overflow: 'hidden',
    },
    scheduleImageHeader: {
        backgroundColor: '#2BA944',
        padding: 16,
        alignItems: 'center',
    },
    scheduleImageTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    scheduleImageSubtitle: {
        color: 'white',
        fontSize: 14,
    },
    scheduleTable: {
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 8,
    },
    scheduleTableHeader: {
        flexDirection: 'row',
        backgroundColor: '#30C451',
        paddingVertical: 8,
    },
    tableHeaderText: {
        flex: 1,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timeSlotRow: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        paddingVertical: 6,
    },
    timeSlotText: {
        flex: 1,
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
    scheduleContent: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    scheduleContentText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});