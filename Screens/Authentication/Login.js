import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import Lightbox from "react-native-lightbox";

export default function Login() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#64B5F6",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <View style={styles.top}>
          <View style={styles.box}>
            <Svg
              height={200}
              width={Dimensions.get("screen").width}
              viewBox="0 0 1440 320"
              style={styles.topWavy}
            >
              <Path
                fill="#2471A3"
                d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              />
            </Svg>
          </View>
        </View> */}
      <View>
        <Image
          style={{ height: "80%", resizeMode: "contain" }}
          source={require("../../assets/LoginDoctorImage.png")}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.box}>
          <Svg
            height={350}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.bottomWavy}
          >
            <Path
              fill="#2196F3"
              fill-opacity="1"
              d="M0,96L80,85.3C160,75,320,53,480,74.7C640,96,800,160,960,176C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </Svg>
          <View>
            <Text
              style={{
                // textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
                paddingHorizontal: 30,
              }}
            >
              Doctor' Helpline Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor Incididunt ut labore et
              dolore magna.
            </Text>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              // width: "70%",
              backgroundColor: "#fff",
              paddingVertical: 10,
              marginHorizontal: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#2196F3" }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {},
  bottom: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    bottom: 0,
  },
  box: {
    backgroundColor: "#2196F3",
    height: 170,
  },
  bottomWavy: {
    position: "absolute",
    bottom: 20,
  },
});
