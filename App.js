// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import ScannerScreen from "./screens/QrScanner";
import GeneratorScreen from "./screens/QrGenerator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#8E3200",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="QR Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: "QR Scanner",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#D7A86E" },
          headerTitleStyle: { color: "black" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QR Generator"
        component={GeneratorScreen}
        options={{
          tabBarLabel: "QR Generator",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#D7A86E" },
          headerTitleStyle: { color: "black" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const Stack = createNativeStackNavigator();
  const defaultHeaderStyle = {
    headerStyle: { backgroundColor: "blue" },
    headerTitleStyle: { color: "white" },
    headerTitleAlign: "center",
  };
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
}

export default App;
