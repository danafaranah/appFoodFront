import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../config/colors";

export default function Button({ title, onPress = () => {} }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: colors.blue,
        opacity:0.8,
        borderRadius:40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      }}
      onPress={onPress}
    >
      <Text style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
