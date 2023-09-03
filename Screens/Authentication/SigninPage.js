import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase/firebase-config";
import { getApp } from "firebase/app";
import { db } from "../../firebase/firebase-config";
import firebase from "firebase/compat/app";
import PhoneInput from "react-native-phone-number-input";
import Svg, { Path } from "react-native-svg";

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const phoneInput = useRef();
  const [value, setValue] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const auth = getAuth();
  //   const sunscribe = auth.onAuthStateChanged((user) => {
  //     console.log(user.uid);
  //     if (user) {
  //       const getData = async (id) => {
  //         const docRef = await getDoc(doc(db, "users", id));

  //         if (docRef.exists()) {
  //           const docRef = await getDoc(doc(db, "users", id));
  //           const myData = docRef.data();
  //           console.log("Document data:", myData.role);
  //           if (myData.role === "admin") {
  //             console.log("ok");
  //             navigation.navigate("Home", { id });
  //           } else {
  //             navigation.navigate("Register");
  //           }
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       };
  //       getData(user.uid);
  //     }
  //   });

  //   return sunscribe;
  // }, []);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     // console.log(user.uid);
  //     if (user) {
  //       // User is authenticated, navigate to "Home"
  //       // const uid = user.uid;
  //       // const registeredMobileNumber = user.phoneNumber;
  //       navigation.navigate("Home", { user });
  //       console.log(user.phoneNumber);
  //     } else {
  //       // No user is authenticated, navigate to "Register"
  //       navigation.navigate("SigninPage");
  //     }
  //   });

  //   // return unsubscribe; // Unsubscribe from the auth state change listener when the component unmounts
  // }, []);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        setCode("");
        const user = userCredential.user;
        console.log("uid", user.phoneNumber);
        navigation.navigate("Home", { user });
      })
      .catch((error) => {
        // show an alert in case of error
        alert(error);
      });
    Alert.alert("Login Successful. Welcome to Dashboard.");
    // navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.top}>
        <View style={styles.box}>
          <Svg
            height={170}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.topWavy}
          >
            <Path
              fill="#2196F3"
              d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
      {!verificationId ? (
        <View style={{ top: 120 }}>
          <Text style={styles.otpText}>Verify your </Text>
          <Text style={styles.otpText}>phone number</Text>
          <Text
            style={{
              color: "gray",
              fontSize: 17,
              marginLeft: 30,
              paddingBottom: 50,
            }}
          >
            We have send you an One Time Password(OTP) on this mobile number.
          </Text>
          {/* <TextInput
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.textInput}
      /> */}
          <View
            style={{
              marginHorizontal: 20,
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: 5,
              padding: 2.5,
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 17,
                marginLeft: 10,
              }}
            >
              Enter Mobile Number:
            </Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="LK"
              layout="first"
              // onChangeText={(text) => {
              //   setValue(text);
              // }}
              // onChangeFormattedText={(text) => {
              //   setFormattedValue(text);
              // }}
              // withDarkTheme
              // withShadow
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              autoFocus
            />
          </View>
          <TouchableOpacity
            style={styles.sendVerification}
            onPress={sendVerification}
          >
            <Text style={styles.buttonText}>Send Verification</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {verificationId ? (
        <View style={{ top: 120 }}>
          <Text style={styles.otpText}>OTP Verification </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 17,
              marginLeft: 30,
              paddingBottom: 50,
            }}
          >
            Enter the code from the sms we sent your phone number.
          </Text>
          <TextInput
            placeholder="Enter the Confirmation Code"
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
            <Text style={styles.buttonText}>Confirm Verification</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* <TextInput
        placeholder="Confirmation Code"
        onChangeText={setCode}
        keyboardType="number-pad"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Verification</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  top: {},
  bottom: {
    position: "relative",
    width: Dimensions.get("screen").width,
    bottom: 0,
  },
  box: {
    backgroundColor: "#2196F3",
    height: 50,
  },
  bottomWavy: {
    position: "absolute",
    bottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  sendVerification: {
    marginTop: 50,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 10,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  otpText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    // margin: 20,
    marginLeft: 30,
  },
});
