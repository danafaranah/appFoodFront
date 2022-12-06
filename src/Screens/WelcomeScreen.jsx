import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import SPACING from "../config/SPACING";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/pexels-william-choquette-2641886.jpeg")}
    >
      <View style={{ flex: 1, backgroundColor: colors.black, opacity: 0.3 }} />
      <View
        style={{
          position: "absolute",
          height: "100%",
          zIndex: 2,
          width: "100%",
          justifyContent: "flex-end",
          paddingHorizontal: SPACING * 2,
          paddingBottom: SPACING * 5,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.blue,
              textShadowRadius: 15,
              textShadowColor: colors.black,
              fontWeight: "800",
              fontSize: SPACING * 4.5,
              textTransform: "capitalize",
            }}
          >
            Deja que tu comida favorita te encuentre
          </Text>
          <Text
            style={{
              color: colors.white,
              textShadowRadius: 15,
              textShadowColor: colors.black,
              fontWeight: "600",
              fontSize: SPACING * 1.7,
            }}
          >
            Aquí aprenderás y amarás cocinar, ve más allá de tus límites.
          </Text>
          <TouchableOpacity
            style={{
              padding: SPACING * 2,
              backgroundColor: colors.orange,
              borderRadius: SPACING * 4,
              opacity: 0.9,
              alignItems: "center",
              marginTop: SPACING * 3,
            }}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text
              style={{
                color: colors.black,
                fontSize: SPACING * 2,
                fontWeight: "700",
              }}
            >
              Explorar Ahora
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
