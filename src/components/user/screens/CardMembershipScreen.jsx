import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const CardMembershipScreen = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const membershipCards = [
    {
      id: 1,
      type: 'CLASSIC MEMBERSHIP',
      image: require('../../../media/pictures/cardmemberclassic.png'),
      description: 'TẬP LUYỆN TẠI CLB BAN YÊU THÍCH NHẤT',
      color: '#30C451'
    },
    {
      id: 2,
      type: 'CLASSIC PLUS',
      image: require('../../../media/pictures/cardmemberplus.png'),
      description: 'TẬP LUYỆN TẠI CÁC CLB CĂN BẢN',
      color: '#6B9596'
    },
    {
      id: 3,
      type: 'PREMIUM MEMBERSHIP',
      image: require('../../../media/pictures/cardmembervip.png'),
      description: 'TẬP LUYỆN KHÔNG GIỚI HẠN TẤT CẢ CLB',
      color: '#2F2F2F'
    }
  ];

  const handlePrevCard = () => {
    setCurrentCard(currentCard > 0 ? currentCard - 1 : membershipCards.length - 1);
  };

  const handleNextCard = () => {
    setCurrentCard(currentCard < membershipCards.length - 1 ? currentCard + 1 : 0);
  };

  const currentMembership = membershipCards[currentCard];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back-ios-new" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chính sách giá</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.heroSection}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>HỆ THỐNG PHÒNG TẬP CÔNG KHAI</Text>
          <Text style={styles.heroSubtitle}>MINH BẠCH GIÁ TẬP LUYỆN</Text>
        </View>
      </View>

      <View style={styles.cardSection}>
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={[styles.navButton, styles.leftNav]} 
            onPress={handlePrevCard}
          >
            <Icon name="chevron-left" size={50} color="#000000ff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.rightNav]} 
            onPress={handleNextCard}
          >
            <Icon name="chevron-right" size={50} color="#000000ff" />
          </TouchableOpacity>

          <Text style={styles.cardType}>{currentMembership.type}</Text>
          
          <View style={styles.membershipCardWrapper}>
            <Image 
              source={currentMembership.image}
              style={styles.membershipCardImage}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.cardDescription}>
            {currentMembership.description}
          </Text>

          <TouchableOpacity 
            style={[styles.detailButton, { backgroundColor: currentMembership.color }]}
          >
            <Text style={styles.detailButtonText}>Xem Chi Tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardMembershipScreen;

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
    padding: 12,
    width: 50,
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
  heroSection: {
    backgroundColor: '#30C451',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroOverlay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSection: {
    marginTop: 50,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  navButton: {
    position: 'absolute',
    top: '45%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftNav: {
    left: -25,
  },
  rightNav: {
    right: -25,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  membershipCardWrapper: {
    width: width * 0.7,
    height: 200,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  membershipCardImage: {
    width: '100%',
    height: '100%',
  },
  cardDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  detailButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  detailButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});