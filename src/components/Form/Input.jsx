import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Input({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, sethidePassword] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.blue
              : colors.white,
          },
        ]}
      >
        <Ionicons
          name={iconName}
          style={{ fontSize: 22, color: colors.yellow, marginRight: 10 }}
        />

        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: colors.white, flex: 1 , fontWeight:"bold"}}
          {...props}
        />

        {password && (
          <Ionicons
            onPress={() => sethidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ fontSize: 22, color: colors.dark }}
          />
        )}
      </View>

      {error && (
        <Text style={{ color: colors.red, fontSize: 15, marginTop: 7, fontWeight:"bold" }}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 25,
    color: colors.orange,
    fontWeight:"bold"
  },

  inputContainer: {
    height: 55,
    backgroundColor: colors.darkBlue,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 80
  },
});
