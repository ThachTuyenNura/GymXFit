import React from "react";
import {
    Text, View, Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const home = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerText}>Xin chào Thạch Tuyển!</Text>
                </View>

                <View style={styles.headerRight}>
                    <View>
                        <Image source={require('../../media/pictures/Search.png')} />
                    </View>
                    <View>
                        <Image source={require('../../media/pictures/Notifications.png')} />
                    </View>
                </View>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.tabBarContainer}>
                    <View style={styles.tabBar}>
                        <TouchableOpacity style={styles.itemTabBar}>
                            <View style={styles.bgImage}>
                                <Image style={[styles.itemImage, { tintColor: '#145724' }]} source={require('../../media/pictures/cucta.png')} />
                            </View>
                            <View>
                                <Text style={styles.itemText}>Tập luyện</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTabBar}>
                            <View style={styles.bgImage}>
                                <Image style={styles.itemImage} source={require('../../media/pictures/calendar.png')} />
                            </View>
                            <View>
                                <Text style={styles.itemText}>Đặt lịch tập luyện</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTabBar}>
                            <View style={styles.bgImage}>
                                <Image style={styles.itemImage} source={require('../../media/pictures/pt.png')} />
                            </View>
                            <View>
                                <Text style={styles.itemText}>Đặt lịch HLV</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTabBar}>
                            <View style={styles.bgImage}>
                                <Image style={styles.itemImage} source={require('../../media/pictures/schedule.png')} />
                            </View>
                            <View>
                                <Text style={styles.itemText}>Lịch học</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTabBar}>
                            <View style={styles.bgImage}>
                                <Image style={styles.itemImage} source={require('../../media/pictures/cart.png')} />
                            </View>
                            <View>
                                <Text style={styles.itemText}>Mua dịch vụ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.recommendCotainer}>
                    <View>
                        <Text style={styles.textRecommend}>Gợi ý</Text>
                    </View>
                    <TouchableOpacity style={styles.allcontainer}>
                        <View>
                            <Text style={styles.textAll}>Tất cả</Text>
                        </View>
                        <View>
                            <Image source={require('../../media/pictures/arrowright.png')} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.videoContainer}>
                    <TouchableOpacity style={styles.itemVideo}>
                        <View style={styles.aboveVideoContainer}>
                            <Image style={styles.imageAboveVideo} source={require('../../media/pictures/womanhelping.png')} />
                            <TouchableOpacity style={styles.yellowstarImage}>
                                <Image source={require('../../media/pictures/yellowstar.png')} />
                            </TouchableOpacity>
                            <Image style={styles.playvideoImage} source={require('../../media/pictures/playvideo.png')} />
                        </View>

                        <View style={styles.belowVideoContainer}>
                            <View style={styles.titleBelowVideo}>
                                <Text style={styles.textTitleBelowVideo}>Squat Exercise</Text>
                            </View>
                            <View style={styles.desBelowVideo}>
                                <View style={styles.minuteDesBelowVideo}>
                                    <Image source={require('../../media/pictures/time.png')} />
                                    <Text style={styles.textMinute}>12 minutes</Text>
                                </View>
                                <View style={styles.kcalDesBelowVideo}>
                                    <Image source={require('../../media/pictures/calories.png')} />
                                    <Text style={styles.textMinute}>120 Kcal</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemVideo}>
                        <View style={styles.aboveVideoContainer}>
                            <Image style={styles.imageAboveVideo} source={require('../../media/pictures/womanhelping2.png')} />
                            <TouchableOpacity style={styles.yellowstarImage}>
                                <Image source={require('../../media/pictures/whitestar.png')} />
                            </TouchableOpacity>
                            <Image style={styles.playvideoImage} source={require('../../media/pictures/playvideo.png')} />
                        </View>

                        <View style={styles.belowVideoContainer}>
                            <View style={styles.titleBelowVideo}>
                                <Text style={styles.textTitleBelowVideo}>Full body Stretching</Text>
                            </View>
                            <View style={styles.desBelowVideo}>
                                <View style={styles.minuteDesBelowVideo}>
                                    <Image source={require('../../media/pictures/time.png')} />
                                    <Text style={styles.textMinute}>10 minutes</Text>
                                </View>
                                <View style={styles.kcalDesBelowVideo}>
                                    <Image source={require('../../media/pictures/calories.png')} />
                                    <Text style={styles.textMinute}>100 Kcal</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default home;

const styles = StyleSheet.create({
    textMinute: {
        fontSize: 12,
        marginStart: 3
    },
    kcalDesBelowVideo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    minuteDesBelowVideo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    desBelowVideo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitleBelowVideo: {
        fontSize: 14,
        fontWeight: '500'
    },
    belowVideoContainer: {
        marginTop: 4,
        marginHorizontal: 11
    },
    playvideoImage: {
        position: 'absolute',
        bottom: -10,
        right: 7
    },
    yellowstarImage: {
        position: 'absolute',
        right: 6,
        top: 6
    },
    imageAboveVideo: {
        width: 160
    },
    aboveVideoContainer: {
        position: 'relative',
        height: 92
    },
    itemVideo: {
        width: 160,
        height: 140,
        borderWidth: 0.5,
        borderRadius: 16
    },
    videoContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textAll: {
        fontSize: 15,
        fontWeight: '500',
        marginEnd: 7
    },
    textRecommend: {
        fontSize: 18,
        fontWeight: '600'
    },
    allcontainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    recommendCotainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bgImage: {
        backgroundColor: '#9eeaaeff',
        padding: 8,
        borderRadius: 50
    },
    itemText: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600',
        fontSize: 13,
        color: '#212020'
    },
    itemImage: {
        width: 38,
        height: 38
    },
    itemTabBar: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    tabBar: {
        flexDirection: 'row',
        gap: 10
    },
    tabBarContainer: {
        marginTop: 24,
        marginBottom: 16
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 21
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 35
    }
})