import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function HomePage({ route }) {
  // const { user } = route.params;
  const [list, setList] = useState("");
  const [reports, setReports] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [patientDetails, setPatientDetails] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      // if (phoneNumber) {
      setIsLoading(true);
      // const mobile = user.phoneNumber;
      const mobile = "+94702050322";
      const cleanedMobile = "0" + mobile.slice(-10).substring(1);
      console.log(cleanedMobile);
      try {
        const q = query(
          collection(db, "patientDetails"),
          where("mobileNo", "==", cleanedMobile)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          fetchReports(document.id);
          const detailsArray = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            detailsArray.push({ id, ...data });
          });
          setPatientDetails(detailsArray);
        } else {
          console.log("No patient found");
        }
      } catch (error) {
        console.error("Error searching for patient:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
        // Set isLoading to false when the data is loaded or an error occurs.
      }
    };
    handleSearch();
  }, []);

  const fetchReports = async (patientId) => {
    if (patientId) {
      const q = query(
        collection(db, "reports"),
        where("pationID", "==", patientId)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const reportData = [];
        querySnapshot.forEach((doc) => {
          const report = doc.data();
          reportData.push({
            id: doc.id,
            pationID: report.pationID,
            comment: report.comment,
            results: report.results,
            date: report.date,
          });
        });

        setReports(reportData);
      } else {
        console.log("No documents found");
      }
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"#2196F3"} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              resizeMode: "contain",
            }}
            source={require("../../assets/16404766_v870-tang-37(3).jpg")}
          >
            {patientDetails ? (
              <View style={{ padding: 10 }}>
                {patientDetails.map((patient) => (
                  <View key={patient.id}>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 15,
                        paddingTop: 35,
                      }}
                    >
                      Hello! Welcome 👋
                    </Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        paddingLeft: 20,
                      }}
                    >
                      {patient.fullName}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: "auto",
                        padding: 5,
                      }}
                      onPress={() => console.log("Do something")}
                    >
                      <Text
                        style={{
                          color: "#607D8B",
                          fontWeight: "700",
                          fontSize: 17,
                        }}
                      >
                        See Profile
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        marginHorizontal: 15,
                        marginVertical: 15,
                        maxHeight: 100,
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 10,
                          resizeMode: "contain",
                        }}
                        source={require("../../assets/Doctor_Ad_Image.png")}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        backgroundColor: "#fff",
                        borderRadius: 5,
                      }}
                    >
                      {/* <Icon name="search" type="font-awesome" /> */}
                      <TextInput
                        style={{ flex: 1, marginLeft: 10 }}
                        placeholder="Search..."
                        // value={searchText}
                        // onChangeText={(text) => setSearchText(text)}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No patient details available.</Text>
            )}

            <View
              style={{
                borderTopEndRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  margin: 10,
                }}
              >
                My Eye Reports
              </Text>

              <View>
                {reports.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderRadius: 5,
                      backgroundColor: "#D2EBE7",
                      marginHorizontal: 20,
                      marginVertical: 7,
                      elevation: 5,
                    }}
                    onPress={() => navigation.navigate("Report", { item })}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        source={{ uri: item.results[0].imageLink }}
                        style={{
                          width: "50%",
                          height: 170,
                          resizeMode: "contain",
                          margin: 7,
                        }}
                      />
                      <View style={{ padding: 10, flex: 1 }}>
                        <Text
                          style={{
                            marginLeft: "auto",
                            marginBottom: 10,
                            backgroundColor: "#8ED7F0",
                            padding: 3,
                            paddingHorizontal: 6,
                            borderRadius: 5,
                            fontSize: 15,
                          }}
                        >
                          {item.date}
                        </Text>
                        <View>
                          <Text numberOfLines={5} style={styles.detailLabel}>
                            {item.comment}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 23,
    fontWeight: "bold",
    // marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  detailText: {
    fontSize: 17,
    flex: 2,
  },
});
