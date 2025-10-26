import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const HelpFaqScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Liên hệ');

  const contacts = [
    {
      name: 'Dịch vụ khách hàng',
      icon: require('@assets/images/customerserviceicon.png'),
    },
    {
      name: 'Trang web',
      icon: require('@assets/images/websiteicon.png'),
    },
    {
      name: 'WhatsApp',
      icon: require('@assets/images/whatsappicon.png'),
    },
    {
      name: 'Facebook',
      icon: require('@assets/images/facebookicon.png'),
    },
    {
      name: 'Instagram',
      icon: require('@assets/images/instagramicon.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('@assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trợ giúp & Câu hỏi thường gặp</Text>
      </View>

      <Text style={styles.subtitle}>Chúng tôi có thể giúp gì cho bạn?</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Câu hỏi' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('Câu hỏi')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Câu hỏi' && styles.tabTextActive,
            ]}
          >
            Câu hỏi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Liên hệ' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('Liên hệ')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Liên hệ' && styles.tabTextActive,
            ]}
          >
            Liên hệ
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách liên hệ */}
      <ScrollView
        style={styles.contactList}
        showsVerticalScrollIndicator={false}
      >
        {contacts.map((contact, index) => (
          <TouchableOpacity key={index} style={styles.contactItem}>
            <View style={styles.contactLeft}>
              <View style={styles.iconWrapper}>
                <Image source={contact.icon} style={styles.contactIcon} />
              </View>
              <Text style={styles.contactName}>{contact.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HelpFaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000',
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: '#0EBE7E',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  tabActive: {
    backgroundColor: '#0EBE7E',
  },
  tabText: {
    color: '#0EBE7E',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  contactList: {
    paddingHorizontal: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F9F2', // nền xanh nhạt như mẫu 2
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10, // bo viền vuông mềm
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
