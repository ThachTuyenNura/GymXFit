// screens/HelpScreen2.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const HelpScreen2 = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Contact');

  const contactMethods = [
    {
      name: 'Dịch vụ khách hàng',
      icon: require('../../media/pictures/customerserviceicon.png'),
      onPress: () => navigation.navigate('OnlineSupport'),
    },
    {
      name: 'Trang web',
      icon: require('../../media/pictures/websiteicon.png'),
    },
    {
      name: 'WhatsApp',
      icon: require('../../media/pictures/whatsappicon.png'),
    },
    {
      name: 'Facebook',
      icon: require('../../media/pictures/facebookicon.png'),
    },
    {
      name: 'Instagram',
      icon: require('../../media/pictures/instagramicon.png'),
    },
  ];

  const handleFaqPress = () => {
    navigation.navigate('HelpScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../media/pictures/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trợ giúp & Câu hỏi thường gặp</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Text style={styles.subtitle}>Chúng tôi có thể giúp gì cho bạn?</Text>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'FAQ' && styles.tabButtonActiveOutline,
              ]}
              onPress={handleFaqPress}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'FAQ' && styles.tabTextOutline,
                ]}
              >
                Câu hỏi thường gặp
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'Contact' && styles.tabButtonActive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Contact' && styles.tabTextActive,
                ]}
              >
                Liên hệ với chúng tôi
              </Text>
            </TouchableOpacity>
          </View>

          {/* Danh sách liên hệ */}
          <View style={styles.contactContainer}>
            {contactMethods.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={item.onPress}
                style={styles.contactItem}
              >
                <View style={styles.contactLeft}>
                  <View style={styles.iconWrapper}>
                    <Image source={item.icon} style={styles.contactIcon} />
                  </View>
                  <Text style={styles.contactName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 35 : 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: '#0EBE7E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  tabButtonActive: {
    backgroundColor: '#0EBE7E',
  },
  tabButtonActiveOutline: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#0EBE7E',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextOutline: {
    color: '#000',
  },
  contactContainer: {
    marginTop: 25,
    paddingHorizontal: 25,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F9F2',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#0EBE7E',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  contactName: {
    marginLeft: 12,
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
});
