import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const OBScreen1 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/onboarding_2.jpg")} // đổi thành ảnh của bạn
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Nút Skip */}
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>

        {/* Khối nội dung giữa */}
        <View style={styles.contentBox}>
          <Text style={styles.icon}>🥗</Text>
          <Text style={styles.title}>
            Find Nutrition Tips That Fit{"\n"}Your Lifestyle
          </Text>

          {/* Thanh chỉ báo */}
          <View style={styles.indicator}>
            <View style={styles.bar} />
            <View style={styles.barActive} />
            <View style={styles.bar} />
          </View>

          {/* Nút Next */}
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OBScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  skipBtn: {
    position: "absolute",
    top: 40,
    right: 25,
  },
  skipText: {
    color: "#CFF09E",
    fontSize: 16,
    fontWeight: "500",
  },
  contentBox: {
    backgroundColor: "#A8E063",
    marginHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.95,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  indicator: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 25,
  },
  bar: {
    width: 15,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d0f0b6",
    marginHorizontal: 3,
  },
  barActive: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#76c893",
    marginHorizontal: 3,
  },
  nextButton: {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
