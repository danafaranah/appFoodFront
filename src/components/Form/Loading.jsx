import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import colors from "../../config/colors";

export default function Loading() {
  const { height, width } = Dimensions.get("window");

  return (
    <View style={[styles.container, { height, width }]}>
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={colors.blue} />
        <Text style={{ marginRight: 10, fontSize: 16 }}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },

  loader: {
    height: 70,
    backgroundColor: colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
