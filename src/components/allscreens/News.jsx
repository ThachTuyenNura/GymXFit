import React, { useState, useEffect } from "react";
import {
    View, Text, Image, StatusBar,
    StyleSheet, useColorScheme,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';

const News = (props) => {
    const isDarkMode = useColorScheme() === 'light';
    const [data, setDate] = useState(DATA);

    const renderDate = (val) => {
        const { id, image, title, date } = val.item;
        return (
            <View style={styles.itemContent}>
                <View>
                    <Image style={styles.imageContent} source={image} />
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.textTitleContent} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                    <Text style={styles.textDate}>{date}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backHeader}>
                        <Image style={styles.tintWhiteBack} source={require('../../media/pictures/Arrow.png')} />
                        <Text style={styles.textBack}>Quay lại</Text>
                    </TouchableOpacity>
                    <View style={styles.titleHeader}>
                        <Text style={styles.textTitle}>Tin tức GymXFit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                <View style={styles.contentContainer}>
                    <FlatList
                        data={data}
                        renderItem={renderDate}
                        keyExtractor={(item) => item.id}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    )
}

export default News;

styles = StyleSheet.create({
    textTitleContent: {
        fontSize: 15,
        fontWeight: '600'
    },
    textContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    imageContent: {
        width: '100%',
        height: 150,
        borderRadius: 10
    },
    itemContent: {
        height: 230,
        backgroundColor: '#fff',
        margin: 5,
        elevation: 2,
        borderRadius: 10
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 30,
        marginVertical: 20
    },
    textTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    },
    titleHeader: {
        flex: 2,
        alignItems: 'center'
    },
    textBack: {
        color: '#fff',
        marginStart: 7,
        fontSize: 12
    },
    tintWhiteBack: {
        tintColor: '#fff'
    },
    backHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerContainer: {
        height: 100,
        backgroundColor: '#30C451',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    }
})

var DATA = [
    {
        "id": 1,
        "image": require('../../media/pictures/lesmils1.jpg'),
        "title": "Phòng gym bình thạnh tốt nhất bạn nên biết",
        "date": "06/10/2025"
    },
    {
        "id": 2,
        "image": require('../../media/pictures/lesmils2.jpg'),
        "title": "Phòng tập tiên phong ứng dụng công nghệ face id",
        "date": "07/10/2025"
    },
    {
        "id": 3,
        "image": require('../../media/pictures/lesmils3.jpg'),
        "title": "Crab là gì? Những loại thực phẩm giàu crab tốt cho sức khởe",
        "date": "08/10/2025"
    },
    {
        "id": 4,
        "image": require('../../media/pictures/lesmils4.jpg'),
        "title": "Tất tần tật thực phẩm bổ sung hiệu quả cho người tập gym",
        "date": "09/10/2025"
    },
]