import { Image, Pressable, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreen(props) {
  const [assets, assetsError] = useAssets([require("../assets/box.jpeg")]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1DEC9",
      }}
    >
      <Text style={{ color: "#CC9544", fontSize: 30, fontWeight: "bold" }}>
        What's In The
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: 28,
          marginBottom: 40,
          fontWeight: "bold",
        }}
      >
        BOX
        <Text
          style={{
            color: "#CC9544",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          ?
        </Text>
      </Text>
      {assets ? (
        <Image source={assets[0]} style={{ width: 300, height: 230 }} />
      ) : null}

      <Pressable
        onPress={() => props.navigation.navigate("QR Scanner")}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: 30,
          backgroundColor: "#9E6F21",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 4,
        }}
      >
        <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        <Text style={{ color: "white", fontSize: 16 }}>Open QR Scanner</Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
