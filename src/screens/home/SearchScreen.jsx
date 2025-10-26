import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ImageBackground
} from 'react-native';

// 1. Định nghĩa các tab trong một mảng để dễ quản lý
const TABS = ['All', 'Circuit', 'Split', 'Legs', 'Cardio', 'Arm'];

const mockData = [
    {
        id: '1',
        type: 'workout-full',
        title: 'Squat Exercise',
        duration: 12,
        calories: 120,
        image: require('@assets/images/womanhelping.png'),
    },
    {
        id: '2',
        type: 'workout-full',
        title: 'Full Body Stretching',
        duration: 12,
        calories: 120,
        image: require('@assets/images/womanhelping2.png'),
    },
    {
        id: '3',
        type: 'workout-split',
        title: 'Circuit Training',
        duration: 50,
        calories: 1300,
        exercises: 5,
        image: require('@assets/images/gym1.png'),
    },
    {
        id: '4',
        type: 'nutrition-split',
        title: 'Delights With Greek Yogurt',
        duration: 6,
        calories: 200,
        image: require('@assets/images/gym2.png'),
    },
    {
        id: '5',
        type: 'workout-split',
        title: 'Split Strength Training',
        duration: 12,
        calories: 1250,
        exercises: 5,
        image: { uri: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=80' },
    },
    {
        id: '6',
        type: 'nutrition-split',
        title: 'Turkey And Avocado Wrap',
        duration: 10,
        calories: 350,
        image: require('@assets/images/gym3.png'),
    },
];

const renderContentItem = ({ item }) => {
    // Card Style 1: Ảnh nền toàn bộ
    if (item.type === 'workout-full') {
        return (
            <TouchableOpacity style={styles.cardFullContainer}>
                <ImageBackground source={item.image} style={styles.cardFullBackground} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.cardOverlay}>
                        <Image source={require('@assets/images/whitestar.png')} style={styles.starIcon} />
                        <View style={styles.cardFullContent}>
                            <Text style={styles.cardTitleWhite}>{item.title}</Text>
                            <View style={styles.cardInfoRow}>
                                <Image source={require('@assets/images/time.png')} />
                                <Text style={styles.cardInfoWhite}> {item.duration} Minutes</Text>
                                <Image source={require('@assets/images/calories.png')} />
                                <Text style={styles.cardInfoWhite}> {item.calories} Kcal</Text>
                            </View>
                        </View>
                        <Image source={require('@assets/images/playvideo.png')} style={styles.playIcon} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    // Card Style 2: Chữ bên trái, ảnh bên phải
    if (item.type.includes('-split')) {
        const isWorkout = item.type.startsWith('workout');
        return (
            <TouchableOpacity style={styles.cardSplitContainer}>
                <View style={styles.cardSplitTextContainer}>
                    <Text style={styles.cardTitleBlack}>{item.title}</Text>
                    <View style={styles.cardInfoRow}>
                        <Text style={styles.cardInfoGray}>⏰ {item.duration} Minutes</Text>
                        <Text style={styles.cardInfoGray}>🔥 {item.calories} {isWorkout ? 'Kcal' : 'Cal'}</Text>
                        {isWorkout && <Text style={styles.cardInfoGray}>🤸 {item.exercises} Exercises</Text>}
                    </View>
                </View>
                <View style={styles.cardSplitImageContainer}>
                    <Image source={item.image} style={styles.cardSplitImage} />
                    <Image source={require('@assets/images/whitestar.png')} style={[styles.starIcon, { top: 8, right: 8 }]} />
                </View>
            </TouchableOpacity>
        );
    }

    return null;
};

const TabBar = ({ activeTab, setActiveTab }) => (
    <View style={styles.tabBar}>
        {TABS.map((tab) => (
            <TouchableOpacity
                key={tab}
                style={[
                    styles.tabButton,
                    activeTab === tab ? styles.activeTab : styles.inactiveTab
                ]}
                onPress={() => setActiveTab(tab)}
            >
                <Text style={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}>
                    {tab}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

// const TabBar = ({ activeTab, setActiveTab }) => (
//     <View style={styles.tabBar}>
//         <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'All' ? styles.activeTab : styles.inactiveTab]}
//             onPress={() => setActiveTab('All')}
//         >
//             <Text style={activeTab === 'All' ? styles.activeTabText : styles.inactiveTabText}>All</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'Circuit' ? styles.activeTab : styles.inactiveTab]}
//             onPress={() => setActiveTab('Circuit')}
//         >
//             <Text style={activeTab === 'Circuit' ? styles.activeTabText : styles.inactiveTabText}>Circuit</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'Split' ? styles.activeTab : styles.inactiveTab]}
//             onPress={() => setActiveTab('Split')}
//         >
//             <Text style={activeTab === 'Split' ? styles.activeTabText : styles.inactiveTabText}>Split</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'Legs' ? styles.activeTab : styles.inactiveTab]}
//             onPress={() => setActiveTab('Legs')}
//         >
//             <Text style={activeTab === 'Legs' ? styles.activeTabText : styles.inactiveTabText}>Legs</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'Cardio' ? styles.activeTab : styles.inactiveTab]}
//             onPress={() => setActiveTab('Cardio')}
//         >
//             <Text style={activeTab === 'Cardio' ? styles.activeTabText : styles.inactiveTabText}>Cardio</Text>
//         </TouchableOpacity>
//     </View>
// );

const SearchScreen = () => {
    const [keyword, setKeyword] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowSearchContainer}>
                    <Image source={require('@assets/images/Arrow.png')} />
                    <Text style={styles.txtsize20bold}>Search</Text>
                </TouchableOpacity>
                <View style={styles.headerIcon}>
                    <TouchableOpacity>
                        <Image style={{ marginEnd: 21 }} source={require('@assets/images/Notifications.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('@assets/images/User.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search'
                    value={keyword}
                    onChangeText={setKeyword}
                />
            </View>

            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            <FlatList
                data={mockData}
                renderItem={renderContentItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    // Card Style 1: Full Background
    cardFullContainer: {
        height: 180,
        marginBottom: 20,
        borderRadius: 20,
    },
    cardFullBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 15,
    },
    starIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 16,
        height: 16
    },
    playIcon: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 24,
        height: 24
    },
    cardFullContent: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    },
    cardTitleWhite: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardInfoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center'
    },
    cardInfoWhite: {
        color: '#fff',
        fontSize: 12,
    },
    // Card Style 2: Split
    cardSplitContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        // Elevation for Android
        // elevation: 5,
        borderWidth: 0.5
    },
    cardSplitTextContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    cardTitleBlack: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardInfoGray: {
        color: '#888',
        fontSize: 12,
    },
    cardSplitImageContainer: {
        width: 120,
        height: 120
    },
    cardSplitImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    // --- Tab Bar Styles ---
    tabBar: {
        flexDirection: 'row',
        gap: 7,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20
    },
    tabButton: {
        width: '31%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#30c451',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#30c451',
    },
    inactiveTab: {
        backgroundColor: '#fff',
        borderColor: '#212020',
        borderWidth: 1
    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 3,
        fontSize: 17
    },
    inactiveTabText: {
        color: '#212020',
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 3
    },
    searchInput: {
        borderColor: '#212020',
        borderWidth: 1,
        borderRadius: 30,
        fontSize: 13,
        paddingStart: 12
    },
    searchContainer: {
        marginVertical: 13
    },
    txtsize20bold: {
        fontSize: 20,
        fontWeight: 'bold',
        marginStart: 12
    },
    headerIcon: {
        flexDirection: 'row'
    },
    arrowSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 35,
        paddingBottom: 0
    }
})
