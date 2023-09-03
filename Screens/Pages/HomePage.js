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
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function HomePage({ route }) {
  const { user } = route.params;
  const [list, setList] = useState("");
  const [reports, setReports] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [patientDetails, setPatientDetails] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      // if (phoneNumber) {
      setIsLoading(true);
      const mobile = user.phoneNumber;
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
        <ScrollView>
          {patientDetails ? (
            <View>
              {patientDetails.map((patient) => (
                <View
                  style={{
                    margin: 10,
                    padding: 10,
                    borderColor: "#000",
                    borderWidth: 2,
                    borderRadius: 10,
                  }}
                  key={patient.id}
                >
                  <Text style={styles.label}>Patient Details</Text>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Full Name:</Text>
                    <Text style={styles.detailText}>{patient.fullName}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Date of Birth:</Text>
                    <Text style={styles.detailText}>{patient.dob}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Gender:</Text>
                    <Text style={styles.detailText}>{patient.gender}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailText}>{patient.email}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Address:</Text>
                    <Text style={styles.detailText}>{patient.address}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>District:</Text>
                    <Text style={styles.detailText}>{patient.district}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Identity Card No:</Text>
                    <Text style={styles.detailText}>
                      {patient.identityCardNo}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailLabel}>Mobile No:</Text>
                    <Text style={styles.detailText}>{patient.mobileNo}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text>No patient details available.</Text>
          )}

          <Text style={{ fontSize: 25, fontWeight: "bold", margin: 10 }}>
            My Eye Reports
          </Text>
          <View style={{ flex: 1 }}>
            <FlatList
              data={reports}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    flex: 1,
                    elevation: 10,
                    margin: 10,
                  }}
                  onPress={() => navigation.navigate("Report", { item })}
                >
                  <Image
                    source={{ uri: item.results[0].imageLink }}
                    style={{ width: "100%", height: 200 }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text style={styles.detailLabel}>Date: {item.date}</Text>
                    <Text style={styles.detailLabel}>
                      Comment: {item.comment}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
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
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 17,
    fontWeight: "bold",
    flex: 1.5,
  },
  detailText: {
    fontSize: 17,
    flex: 2,
  },
});
