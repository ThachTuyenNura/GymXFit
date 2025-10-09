import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import profilePic from "../../assets/images/Frame 17.png";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="#2e7d32" />
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* Profile info */}
        <View style={styles.profileSection}>
        
         <Image source={profilePic} style={styles.avatar} />
          <Text style={styles.name}>Madison Smith</Text>
          <Text style={styles.email}>madisons@example.com</Text>
          <Text style={styles.birthday}>
            <Text style={{ fontWeight: "600" }}>Birthday:</Text> April 1st
          </Text>

          {/* Thông tin chỉ số */}
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>75 Kg</Text>
              <Text style={styles.infoLabel}>Weight</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>28</Text>
              <Text style={styles.infoLabel}>Years Old</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoValue}>1.65 CM</Text>
              <Text style={styles.infoLabel}>Height</Text>
            </View>
          </View>
        </View>

        {/* Danh sách menu */}
        <View style={styles.menuSection}>
          <MenuItem icon="person-outline" text="Profile" />
          <MenuItem icon="star-outline" text="Favorite" />
          <MenuItem icon="lock-closed-outline" text="Privacy Policy" />
          <MenuItem icon="settings-outline" text="Settings" />
          <MenuItem icon="help-circle-outline" text="Help" />
          <MenuItem icon="log-out-outline" text="Logout" />
        </View>
      </ScrollView>

      {/* Thanh điều hướng dưới */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="stats-chart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Component nhỏ cho từng dòng menu
const MenuItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Ionicons name={icon} size={24} color="#2e7d32" />
      <Text style={styles.menuText}>{text}</Text>
    </View>
    <Ionicons name="chevron-forward-outline" size={20} color="#333" />
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#C8F79B",
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1b5e20",
    marginLeft: 10,
  },

  // Profile info
  profileSection: {
    alignItems: "center",
    backgroundColor: "#C8F79B",
    paddingBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  email: {
    fontSize: 14,
    color: "#444",
  },
  birthday: {
    fontSize: 13,
    color: "#333",
    marginTop: 3,
  },

  // Dòng thông tin chỉ số
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
  },
  infoBox: {
    alignItems: "center",
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#bde0a8",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2e7d32",
  },
  infoLabel: {
    fontSize: 12,
    color: "#333",
  },

  // Menu list
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },

  // Bottom navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2e7d32",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
