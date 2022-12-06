import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import SPACING from "../config/SPACING";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function Recipe({ recipe }) {

  const { width } = Dimensions.get("window");
  const ITEM_WIDTH = width / 2 - SPACING * 3;
  const navigation = useNavigation()
  
  return (
    <View>
      <TouchableOpacity
        style={{ width: ITEM_WIDTH, marginBottom: SPACING }}
        onPress={() => navigation.navigate("DetailScreen", recipe._id)}
      >
        <Image
          style={{
            width: "100%",
            height: ITEM_WIDTH + SPACING * 3,
            borderRadius: SPACING * 2,
          }}
          source={{ uri: recipe.imgUrl }}
        />
        <Text
          style={{
            fontSize: SPACING * 2,
            fontWeight: "700",
            marginTop: SPACING,
            color:colors.white
          }}
        >
          {recipe.name}
        </Text>
        <Text style={{ fontSize: SPACING * 2, fontWeight: "700",    color:colors.yellow}}>
          <Ionicons name="star" size={20}/>{recipe.rate}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
