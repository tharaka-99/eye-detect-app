import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Screens/Authentication/Login";
import SigninPage from "./Screens/Authentication/SigninPage";
import HomePage from "./Screens/Pages/HomePage";
import DetailReportView from "./Screens/Pages/DetailReportView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerStyle: { backgroundColor: "#F2F2F2" },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SigninPage"
            component={SigninPage}
            options={{
              title: "SigninPage",
              headerStyle: { backgroundColor: "#F2F2F2" },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              title: "Home",
              headerStyle: { backgroundColor: "red" },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Report"
            component={DetailReportView}
            options={{
              title: "Report",
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              // headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* C:\THARAKA DILSHAN\React_Native Project\Research_App\Doctor_app\assets\LoginDoctorImage.png
      C:\THARAKA DILSHAN\React_Native Project\Research_App\Doctor_app\App.js - ./assets/LoginDoctorImage.png
      C:\THARAKA DILSHAN\React_Native Project\Research_App\Doctor_app\Screens\Authentication\Login.js - .././assets/LoginDoctorImage.png */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
