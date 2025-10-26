import {
    StyleSheet, Text, View,
    TouchableOpacity,
    Image,
    ScrollView,
    SectionList
} from 'react-native';
import React, { useState } from 'react';

const TabBar = ({ activeTab, setActiveTab }) => (
    <View style={styles.tabBar}>
        <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Reminders' ? styles.activeTab : styles.inactiveTab, { marginRight: 21 }]}
            onPress={() => setActiveTab('Reminders')}
        >
            <Text style={activeTab === 'Reminders' ? styles.activeTabText : styles.inactiveTabText}>Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.tabButton, activeTab === 'System' ? styles.activeTab : styles.inactiveTab]}
            onPress={() => setActiveTab('System')}
        >
            <Text style={activeTab === 'System' ? styles.activeTabText : styles.inactiveTabText}>System</Text>
        </TouchableOpacity>
    </View>
);

const NotificationCard = ({ title, time, icon, color }) => (
    <TouchableOpacity style={styles.cardContainer}>
        <View style={[styles.iconCircle, { backgroundColor: color }]}>
            <Text style={styles.iconText}>{icon}</Text>
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardTime}>{time}</Text>
        </View>
    </TouchableOpacity>
);

const NotificationScreen = () => {
    const [activeTab, setActiveTab] = useState('Reminders');
    const sections = SECTION_LIST_DATA[activeTab];

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerleft}>
                        <Image source={require('@assets/images/Arrow.png')} />
                        <Text style={[styles.poppin]}>Notification</Text>
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image source={require('@assets/images/Seach.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('@assets/images/Notifications.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('@assets/images/User.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

                <SectionList
                    contentContainerStyle={styles.listContentPadding} // Thêm padding cho nội dung list
                    sections={sections}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item }) => (
                        <NotificationCard
                            title={item.title}
                            time={item.time}
                            icon={item.icon}
                            color={item.color}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.sectionHeaderContainer}>
                            <Text style={styles.dateGroupTitle}>{title}</Text>
                        </View>
                    )}
                    // Thêm khoảng trống dưới cùng để không bị BottomNav che khuất
                    ListFooterComponent={<View style={{ height: 100 }} />}
                />
            </ScrollView>
        </View>
    )
};

export default NotificationScreen;

const styles = StyleSheet.create({
    sectionHeaderContainer: {
        marginBottom: 10
    },
    listContentPadding: {
        paddingHorizontal: 0
    },
    // --- Notification Card Styles ---
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 12
    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    iconText: {
        fontSize: 24,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212020',
        marginBottom: 2,
    },
    cardTime: {
        fontSize: 14,
        color: '#666',
    },
    // --- Tab Bar Styles ---
    tabBar: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 16
    },
    tabButton: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#30c451',
        alignItems: 'center'
    },
    activeTab: {
        backgroundColor: '#30c451',
    },
    inactiveTab: {
        backgroundColor: '#fff',
        borderColor: '#212020'
    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 28.5,
        paddingVertical: 3,
        fontSize: 17
    },
    inactiveTabText: {
        color: '#212020',
        fontSize: 17,
        paddingHorizontal: 28.5,
        paddingVertical: 3
    },
    headerleft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 21
    },
    poppin: {
        fontSize: 20,
        color: '#212020',
        fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 35,
        paddingBottom: 0
    }
})

const SECTION_LIST_DATA = {
    Reminders: [
        {
            title: 'Today',
            data: [
                { id: '1', title: 'New Workout Is Available', time: 'June 10 - 10:00 AM', icon: '⭐', color: '#4acb56' },
                { id: '2', title: 'Don\'t Forget To Drink Water', time: 'June 10 - 8:00 AM', icon: '💡', color: '#FFD700' },
            ],
        },
        {
            title: 'Yesterday',
            data: [
                { id: '3', title: 'Upper Body Workout Completed!', time: 'June 09 - 6:00 PM', icon: '🏆', color: '#FFD700' },
                { id: '4', title: 'Remember Your Exercise Session', time: 'June 09 - 3:00 PM', icon: '💡', color: '#4acb56' },
                { id: '5', title: 'New Article & Tip Posted!', time: 'June 09 - 11:00 AM', icon: '📄', color: '#4acb56' },
            ],
        },
        {
            title: 'May 29 - 20XX',
            data: [
                { id: '6', title: 'You Started A New Challenge!', time: 'May 29 - 9:00 AM', icon: '⭐', color: '#4acb56' },
                { id: '7', title: 'New House Training Ideas!', time: 'May 29 - 8:20 AM', icon: '⭐', color: '#4acb56' },
            ],
        },
    ],
    System: [
        {
            title: 'Recent System Activity',
            data: [
                { id: 'A', title: 'App Updated Successfully', time: 'June 10 - 9:30 AM', icon: '⚙️', color: '#6A5ACD' },
                { id: 'B', title: 'Security Alert: New Login Detected', time: 'June 09 - 7:00 PM', icon: '🔒', color: '#FF4500' },
            ],
        },
    ]
};
