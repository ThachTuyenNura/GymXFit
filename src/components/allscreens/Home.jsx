import React, { useState } from 'react';
import {
    Text, View, Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

var DATA = [
    {
        "id": 1,
        "image": require('../../media/pictures/tutorial1.jpg'),
        "title": "Các bài tập gym giảm mỡ bụng nam hiệu quả nhất không nên bỏ qua",
        "date": "28/09/2025"
    },
    {
        "id": 2,
        "image": require('../../media/pictures/tutorial2.jpg'),
        "title": "body combat: bí quyết giảm cân đốt mỡ thừa thần tốc",
        "date": "28/09/2025"
    },
    {
        "id": 3,
        "image": require('../../media/pictures/tutorial3.jpg'),
        "title": "bật mí tất tần tật về việc học yoga: bạn có thực sự hiểu về bộ môn này",
        "date": "28/09/2025"
    },
    {
        "id": 4,
        "image": require('../../media/pictures/tutorial3.jpg'),
        "title": "bật mí tất tần tật về việc học yoga: bạn có thực sự hiểu về bộ môn này",
        "date": "28/09/2025"
    },
]

var LESMILLSDATE = [
    {
        "id": 1,
        "image": require('../../media/pictures/lesmils1.jpg'),
        "title": "RPM - Tăng cường sức khỏe tim mạch, săn chắc cơ đùi, chân",
        "date": "28/09/2025"
    },
    {
        "id": 2,
        "image": require('../../media/pictures/lesmils2.jpg'),
        "title": "BODYJAMS - Vũ điệu sôi động, nạp đầy hứng khởi",
        "date": "28/09/2025"
    },
    {
        "id": 3,
        "image": require('../../media/pictures/lesmils3.jpg'),
        "title": "Body Pump - Tăng cường sức khỏe và cơ bắp từ Les Mils - Bộ môn thể dục đa năng",
        "date": "28/09/2025"
    },
    {
        "id": 4,
        "image": require('../../media/pictures/lesmils4.jpg'),
        "title": "Body Compat - Hình thức tập luyện đầy năng lượng",
        "date": "28/09/2025"
    },
]

const HomeHeader = ({ data, renderData }) => {
    return (
        <View >
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

            <View style={styles.recommendCotainer}>
                <View>
                    <Text style={styles.textRecommend}>Hướng dẫn luyện tập</Text>
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

            <View style={styles.tutorialContainer}>
                <FlatList
                    data={data}
                    renderItem={renderData}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <View style={styles.recommendCotainer}>
                <View>
                    <Text style={styles.textRecommend}>Lesmils</Text>
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
        </View>
    )
}

const home = (props) => {
    const [data, setData] = useState(DATA);
    const [lesmillsdata, setLesmillsData] = useState(LESMILLSDATE);

    const renderData = (val) => {
        const { id, title, image, date } = val.item;
        return (
            <View style={styles.itemTutorial}>
                <View>
                    <Image style={styles.imageTutorial} source={image} />
                </View>
                <View style={styles.contentTutorial}>
                    <Text style={styles.titleContent}>{title}</Text>
                    <Text style={styles.dateContent}>{date}</Text>
                </View>
            </View>
        )
    }

    const renderLesmillsData = (val) => {
        const { id, title, image, date } = val.item;
        return (
            <View style={styles.itemLesmills}>
                <View>
                    <Image style={styles.imageLesmills} source={image} />
                </View>
                <View style={styles.contentLesmills}>
                    <Text style={styles.titleContentLesmills} numberOfLines={3}>{title}</Text>
                    <Text style={styles.dateContentLesmills}>{date}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* GIẢI PHÁP TỐI ƯU: Thay thế ScrollView bằng FlatList */}
            <FlatList
                data={lesmillsdata} // Dữ liệu chính (Lesmills)
                renderItem={renderLesmillsData}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                // Tất cả nội dung cuộn được của ScrollView cũ sẽ được đưa vào ListHeaderComponent
                ListHeaderComponent={
                    <HomeHeader data={data} renderData={renderData} />
                }
                ListFooterComponent={
                    <View>
                        <View style={styles.recommendCotainer}>
                            <View>
                                <Text style={styles.textRecommend}>Tin tức GymXFit</Text>
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
                        <View style={styles.tutorialContainer}>
                            <FlatList
                                data={data}
                                renderItem={renderData}
                                keyExtractor={(item) => item.id}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
        // <SafeAreaView style={styles.container}>
        //     <View style={styles.headerContainer}>
        //         <View>
        //             <Text style={styles.headerText}>Xin chào Thạch Tuyển!</Text>
        //         </View>

        //         <View style={styles.headerRight}>
        //             <View>
        //                 <Image source={require('../../media/pictures/Search.png')} />
        //             </View>
        //             <View>
        //                 <Image source={require('../../media/pictures/Notifications.png')} />
        //             </View>
        //         </View>
        //     </View>
        //     <ScrollView
        //         showsHorizontalScrollIndicator={false}
        //         showsVerticalScrollIndicator={false}
        //     >
        //         <View style={styles.tabBarContainer}>
        //             <View style={styles.tabBar}>
        //                 <TouchableOpacity style={styles.itemTabBar}>
        //                     <View style={styles.bgImage}>
        //                         <Image style={[styles.itemImage, { tintColor: '#145724' }]} source={require('../../media/pictures/cucta.png')} />
        //                     </View>
        //                     <View>
        //                         <Text style={styles.itemText}>Tập luyện</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={styles.itemTabBar}>
        //                     <View style={styles.bgImage}>
        //                         <Image style={styles.itemImage} source={require('../../media/pictures/calendar.png')} />
        //                     </View>
        //                     <View>
        //                         <Text style={styles.itemText}>Đặt lịch tập luyện</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={styles.itemTabBar}>
        //                     <View style={styles.bgImage}>
        //                         <Image style={styles.itemImage} source={require('../../media/pictures/pt.png')} />
        //                     </View>
        //                     <View>
        //                         <Text style={styles.itemText}>Đặt lịch HLV</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={styles.itemTabBar}>
        //                     <View style={styles.bgImage}>
        //                         <Image style={styles.itemImage} source={require('../../media/pictures/schedule.png')} />
        //                     </View>
        //                     <View>
        //                         <Text style={styles.itemText}>Lịch học</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={styles.itemTabBar}>
        //                     <View style={styles.bgImage}>
        //                         <Image style={styles.itemImage} source={require('../../media/pictures/cart.png')} />
        //                     </View>
        //                     <View>
        //                         <Text style={styles.itemText}>Mua dịch vụ</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>

        //         <View style={styles.recommendCotainer}>
        //             <View>
        //                 <Text style={styles.textRecommend}>Gợi ý</Text>
        //             </View>
        //             <TouchableOpacity style={styles.allcontainer}>
        //                 <View>
        //                     <Text style={styles.textAll}>Tất cả</Text>
        //                 </View>
        //                 <View>
        //                     <Image source={require('../../media/pictures/arrowright.png')} />
        //                 </View>
        //             </TouchableOpacity>
        //         </View>

        //         <View style={styles.videoContainer}>
        //             <TouchableOpacity style={styles.itemVideo}>
        //                 <View style={styles.aboveVideoContainer}>
        //                     <Image style={styles.imageAboveVideo} source={require('../../media/pictures/womanhelping.png')} />
        //                     <TouchableOpacity style={styles.yellowstarImage}>
        //                         <Image source={require('../../media/pictures/yellowstar.png')} />
        //                     </TouchableOpacity>
        //                     <Image style={styles.playvideoImage} source={require('../../media/pictures/playvideo.png')} />
        //                 </View>

        //                 <View style={styles.belowVideoContainer}>
        //                     <View style={styles.titleBelowVideo}>
        //                         <Text style={styles.textTitleBelowVideo}>Squat Exercise</Text>
        //                     </View>
        //                     <View style={styles.desBelowVideo}>
        //                         <View style={styles.minuteDesBelowVideo}>
        //                             <Image source={require('../../media/pictures/time.png')} />
        //                             <Text style={styles.textMinute}>12 minutes</Text>
        //                         </View>
        //                         <View style={styles.kcalDesBelowVideo}>
        //                             <Image source={require('../../media/pictures/calories.png')} />
        //                             <Text style={styles.textMinute}>120 Kcal</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </TouchableOpacity>

        //             <TouchableOpacity style={styles.itemVideo}>
        //                 <View style={styles.aboveVideoContainer}>
        //                     <Image style={styles.imageAboveVideo} source={require('../../media/pictures/womanhelping2.png')} />
        //                     <TouchableOpacity style={styles.yellowstarImage}>
        //                         <Image source={require('../../media/pictures/whitestar.png')} />
        //                     </TouchableOpacity>
        //                     <Image style={styles.playvideoImage} source={require('../../media/pictures/playvideo.png')} />
        //                 </View>

        //                 <View style={styles.belowVideoContainer}>
        //                     <View style={styles.titleBelowVideo}>
        //                         <Text style={styles.textTitleBelowVideo}>Full body Stretching</Text>
        //                     </View>
        //                     <View style={styles.desBelowVideo}>
        //                         <View style={styles.minuteDesBelowVideo}>
        //                             <Image source={require('../../media/pictures/time.png')} />
        //                             <Text style={styles.textMinute}>10 minutes</Text>
        //                         </View>
        //                         <View style={styles.kcalDesBelowVideo}>
        //                             <Image source={require('../../media/pictures/calories.png')} />
        //                             <Text style={styles.textMinute}>100 Kcal</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </TouchableOpacity>
        //         </View>

        //         <View style={styles.recommendCotainer}>
        //             <View>
        //                 <Text style={styles.textRecommend}>Hướng dẫn luyện tập</Text>
        //             </View>
        //             <TouchableOpacity style={styles.allcontainer}>
        //                 <View>
        //                     <Text style={styles.textAll}>Tất cả</Text>
        //                 </View>
        //                 <View>
        //                     <Image source={require('../../media/pictures/arrowright.png')} />
        //                 </View>
        //             </TouchableOpacity>
        //         </View>

        //         <View style={styles.tutorialContainer}>
        //             <FlatList
        //                 data={data}
        //                 renderItem={renderData}
        //                 keyExtractor={(item) => item.id}
        //                 horizontal={true}
        //                 showsHorizontalScrollIndicator={false}
        //                 showsVerticalScrollIndicator={false}
        //             />
        //         </View>

        //         <View style={styles.recommendCotainer}>
        //             <View>
        //                 <Text style={styles.textRecommend}>Lesmils</Text>
        //             </View>
        //             <TouchableOpacity style={styles.allcontainer}>
        //                 <View>
        //                     <Text style={styles.textAll}>Tất cả</Text>
        //                 </View>
        //                 <View>
        //                     <Image source={require('../../media/pictures/arrowright.png')} />
        //                 </View>
        //             </TouchableOpacity>
        //         </View>

        //         <View style={styles.lesmillsContainer}>
        //             <FlatList
        //                 data={lesmillsdata}
        //                 renderItem={renderLesmillsData}
        //                 keyExtractor={(item) => item.id}
        //                 horizontal={false}
        //                 showsHorizontalScrollIndicator={false}
        //                 showsVerticalScrollIndicator={false}
        //                 numColumns={2}
        //             />
        //         </View>

        //     </ScrollView>
        // </SafeAreaView>
    )
}

export default home;

const styles = StyleSheet.create({
    dateContentLesmills: {
        fontSize: 11,
        marginBottom: 5
    },
    titleContentLesmills: {
        fontSize: 13,
        fontWeight: '500',
        height: 55
    },
    contentLesmills: {
        marginHorizontal: 7,
        marginVertical: 5
    },
    imageLesmills: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    itemLesmills: {
        flex: 1,
        height: 200,
        margin: 7,
        borderRadius: 14,
        backgroundColor: '#fff',
        elevation: 2
    },
    lesmillsContainer: {
        marginVertical: 0
    },
    dateContent: {
        fontSize: 11
    },
    titleContent: {
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '600',
        height: 50
    },
    contentTutorial: {
        margin: 10
    },
    imageTutorial: {
        width: 250,
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    itemTutorial: {
        width: 250,
        marginEnd: 30,
        borderWidth: 0.5,
        borderRadius: 16
    },
    tutorialContainer: {
        marginVertical: 0
    },
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
        justifyContent: 'space-between',
        marginVertical: 20
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
        marginTop: 24
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