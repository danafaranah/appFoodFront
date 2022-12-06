import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SPACING from "../config/SPACING";
const { height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios"
import Loading from "../components/Form/Loading.jsx";


const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params;
  const[isLoading,setIsLoading]=useState(true) 
  const[isRemoving,setIsRemoving]=useState(false)
  const [recipe,setRecipe]=useState({})
  const [categories, setCategories] = useState(); 
  const isFocused=useIsFocused()

  // Obtener Recetas
  const getRecipe = async() =>{
    try {
      setIsLoading(true)
      const {data} = await axios.get(`/recipe/${id}`)
      setRecipe(data.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log("Error en getPost: "+ error.message);
    }
  }


    const deleteRecipe=async()=>{
    try {
      setIsRemoving(true)

      const {data}=await axios.delete(`/recipe/${recipe._id}`)

      setIsRemoving(false)
      navigation.navigate("HomeScreen")
    } catch (error) {
      setIsRemoving(false)
      console.log("error en deleteRecipe",error.message)
    }
  }

  useEffect(() => {
    isFocused && getRecipe()
  }, [isFocused])

  if (isLoading || isRemoving) {
    return (
      <Loading/>
    );
  }

  return (
    <>
      <ScrollView>
        <View>
          <ImageBackground
            style={{
              padding: SPACING * 2,
              height: height / 2.5,
              padding: SPACING * 2,
              paddingTop: SPACING * 4,
            }}
            source={{uri:recipe.imgUrl}} 
          >
            <TouchableOpacity
              style={{
                height: SPACING * 4.5,
                width: SPACING * 4.5,
                backgroundColor: colors.darkBlue,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={SPACING * 2.5}
                color={colors.white}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              padding: SPACING * 2,
              paddingTop: SPACING * 3,
              marginTop: -SPACING * 3,
              borderTopLeftRadius: SPACING * 3,
              borderTopRightRadius: SPACING * 3,
              backgroundColor: colors.blue,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING * 3,
                alignItems: "center",
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: SPACING * 3,
                    color: colors.white,
                    fontWeight: "900",
                  }}
                >
                  {recipe.name}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 3,
                  backgroundColor: colors.yellow,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="star"
                  color={colors.redOrange}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.black,
                  }}
                >
                  {recipe.rate}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.blue,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="restaurant-outline"
                  color={colors.white}
                  size={SPACING * 2}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "700",
                    marginLeft: SPACING / 2,
                    color: colors.white,
                  }}
                >
                  {recipe.time}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.blue,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="bicycle-outline"
                  color={colors.white}
                  size={SPACING * 2}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "700",
                    marginLeft: SPACING / 2,
                    color: colors.white,
                  }}
                >
                  {recipe.calories}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: SPACING * 3 }}>
              <Text
                style={{
                  fontSize: SPACING * 3,
                  fontWeight: "900",
                  color: colors.black,
                }}
              >
                Ingredients
              </Text>
              {recipe.ingredients.map((ingredient,i) => (
                <View
                  style={{
                    marginVertical: SPACING,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={i}
                >
                  <View
                    style={{
                      width: SPACING,
                      height: SPACING,
                      backgroundColor: colors.white,
                      borderRadius: SPACING,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: SPACING * 2,
                      fontWeight: "700",
                      color: colors.white,
                      marginLeft: SPACING,
                    }}
                  >
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={{
                fontSize: SPACING * 3,
                fontWeight: "900",
                color: colors.black,
                marginBottom: SPACING,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.white,
              }}
            >
              {recipe.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView>
        <View
          style={{
            padding: SPACING * 2,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.blue,
          }}
        >
          <TouchableOpacity
            style={{
              width: "45%",
              padding: SPACING * 2,
              backgroundColor: colors.orange,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
              opacity:0.8,
            }}
            onPress={() => navigation.navigate("ActionScreen", recipe._id)}
          >
            <Ionicons
              name="create-outline"
              color={colors.white}
              size={SPACING * 2.5}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "45%",
              padding: SPACING * 2,
              backgroundColor: colors.redOrange,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
              opacity:0.8,
            }}
            onPress={() => deleteRecipe()}
          >
            <Ionicons
              name="trash-bin-outline"
              color={colors.white}
              size={SPACING * 2.5}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
