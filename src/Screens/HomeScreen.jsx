import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../config/SPACING";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import colors from "../config/colors";
import axios from "axios";
import SearchRecipes from "../components/SearchRecipes";
import Recipe from "../components/Recipe";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [recipe, setRecipe] = useState([]);
  const [category, setCategory] = useState([
    {
      _id: "1",
      name: "Todas",
    },
  ]);
  const [refreshing, setIsRefreshing] = useState(false);
  const [input, setInput] = useState("");
  const isFocused = useIsFocused();

  const getRecipes = async () => {
    try {
      const { data } = await axios.get("/recipe");
      setRecipe(data.data);
    } catch (error) {
      console.log("Error en getRecipes");
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get("/category");
      setCategory([...category, ...data.data]);
    } catch (error) {
      console.log("Error en getCategory");
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCategory();
      getRecipes();
    }
  }, [isFocused]);

  // Función de Refrescar
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getRecipes();
    setIsRefreshing(false);
  }, []);

  const onSelectCategory = async (index, categoryId) => {
   
    if (categoryId === "1") {
      setActiveCategory(0);
      getRecipes();

      if(input === null){
        setActiveCategory(0)
        return (<Recipe recipe = {recipe}/>)
      }
  
      if(recipe.name.toLowerCase().includes(input.toLowerCase())){
          return (<Recipe recipe = {recipe}/>)
      }
    }

    setActiveCategory(index);
    const { data } = await axios.get(`/category/${categoryId}`);

      setActiveCategory(index)
      setRecipe(data.data.recipe);

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <View style={{ padding: SPACING }}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        ></View>

        <View style={{ width: "80%", marginTop: SPACING * 2 }}>
          <Text
            style={{
              fontSize: SPACING * 5,
              fontWeight: "900",
              color: colors.redOrange,
            }}
          >
            What are we cooking today?
          </Text>
        </View>

        {/* input de busqueda */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: SPACING,
                padding: SPACING,
                backgroundColor: colors.blue,
                borderRadius: 90,
              }}
            >
              <Ionicons
                name="search"
                color={colors.yellow}
                size={SPACING * 2.5}
              />

              <TextInput
                placeholder="Want to..."
                autoComplete="off"
                placeholderTextColor={colors.white}
                value={input}
                onChangeText={(text) => setInput(text)}
                style={{
                  color: colors.white,
                  fontSize: SPACING * 2,
                  marginLeft: SPACING,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {/* LISTAR CATEGORIAS */}
        <FlatList
          style={{ height: 40 }}
          horizontal={true}
          data={category}
          keyExtractor={(item) => item._id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: category, index }) => (
            <TouchableOpacity
              style={{ marginRight: SPACING * 3 }}
              // onPress={() => setActiveCategory(index)}
              onPress={() => onSelectCategory(index, category._id)}
            >
              <Text
                style={[
                  {
                    fontSize: SPACING * 1.7,
                    fontWeight: "600",
                    color: colors.orange,
                  },
                  activeCategory === index && {
                    color: colors.white,
                    fontWeight: "700",
                    fontSize: SPACING * 1.8,
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* LISTAR TODAS LAS RECETAS */}
        <SearchRecipes data={recipe} input={input} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
