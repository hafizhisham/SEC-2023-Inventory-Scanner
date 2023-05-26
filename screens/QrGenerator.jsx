import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-root-toast";
import QRCode from "react-native-qrcode-svg";
import { useState, useEffect } from "react";

function GeneratorScreen() {
  const [QR, setQR] = useState("");
  const [input, setInput] = useState("");
  const [QRref, setQRref] = useState();
  const [hasPermissions, setHasPermissions] = useState(false);

  const generateQRCode = () => {
    setQR(input);
  };

  useEffect(() => {
    (async () => {
      setHasPermissions((await MediaLibrary.requestPermissionsAsync()).granted);
    })();
  }, []);

  const saveQRCode = () => {
    if (!hasPermissions || !QRref) return;

    QRref.toDataURL(async (data) => {
      const QRCodeImg = FileSystem.documentDirectory + "QRCode.png";
      await FileSystem.writeAsStringAsync(QRCodeImg, data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      MediaLibrary.saveToLibraryAsync(QRCodeImg)
        .then(() =>
          Toast.show("QR Code saved to gallery", Toast.durations.LONG)
        )
        .catch(console.error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.icon}>QR</Text> Code Generator
      </Text>
      <View style={styles.field}>
        <TextInput
          editable
          multiline
          numberOfLines={7}
          maxLength={120}
          style={styles.input}
          cursorColor={"#9E6F21"}
          selectionColor={"#9E6F21"}
          onChangeText={setInput}
          placeholder="e.g Books, Tools etc"
        />
        <Pressable onPress={generateQRCode}>
          <Text style={styles.button}>Generate</Text>
        </Pressable>
      </View>
      <View style={styles.qr}>
        <Pressable onPress={saveQRCode}>
          {QR && (
            <QRCode
              size={240}
              value={QR}
              getRef={setQRref}
              backgroundColor="#fff"
            />
          )}
        </Pressable>
      </View>
      {QR && (
        <Text style={styles.instraction}>
          Click the <Text style={styles.instraicon}>QR</Text> Code to save it
        </Text>
      )}
    </View>
  );
}

export default GeneratorScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  icon: {
    color: "#7E370C",
  },

  field: {
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 240,
    borderWidth: 1.5,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "gray",
  },

  button: {
    padding: 12,
    borderRadius: 10,
    color: "white",
    backgroundColor: "#9E6F21",
  },

  qr: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 250,
  },

  instraction: {
    marginTop: 40,
    color: "#adadad",
  },

  instraicon: {
    color: "#7E370C",
  },
});
