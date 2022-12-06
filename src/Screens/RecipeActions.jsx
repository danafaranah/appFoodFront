import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import colors from "../config/colors";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import Loading from "../components/Form/Loading";
import * as Yup from "yup";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import SPACING from "../config/SPACING";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


DropDownPicker.setListMode("SCROLLVIEW");

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Ingrese el nombre de la receta"),

  rate: Yup.number()
    .positive()
    .min(0.5)
    .max(5)
    .required("Ingrese el rating de la receta"),

  time: Yup.number()
    .positive()
    .required("Ingrese el tiempo promedio que toma cocinar esta receta"),

  calories: Yup.number()
    .positive()
    .required(
      "Ingrese el tiempo que se necesita para eliminar las calorias de la receta"
    ),

  ingredients: Yup.string()
    .trim()
    .required("Ingrese los ingredientes de la receta"),

  description: Yup.string()
    .trim()
    .required("Ingrese la descripción de la receta"),
});

export default function RecipeActions({ route }) {
  const recipe = route.params;
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(recipe?.imgUrl || "");
  const [category, setCategory] = useState(null);

  let dropData = [
    {
      label: "",
      value: "",
    }
  ]

  const [categories, setCategories] = useState([]);

  const [data, setData] = useState(dropData);

  const inputs = {
    name: "",
    rate: "",
    time: "",
    calories: "",
    ingredients: "",
    description: "",
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/category");
      setCategories(data.data);
      dropData = data.data.map((item) => {
         return {
            label: item.name,
            value: item._id,
          }
      })
      setData(dropData)
    } catch (error) {
      console.log("Error en getCategory");
    }
  };


  useEffect(() => {
    getCategories();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveRecipe = async (formData) => {
    try {
      setIsLoading(true);
      await axios.post("/recipe", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en saveRecipe", error.message);
    }
  };

  const updateRecipe = async (formData) => {
    try {
      setIsLoading(true);
      await axios.put(`/recipe/${recipe._id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en updateRecipe", error.message);
    }
  };

  const actions = async (values, formikActions) => {

    const { name, rate, time, calories, ingredients, description, category } = values

    const formData = new FormData();

    if (recipe) {
      if (recipe.imgUrl !== image) {
        formData.append("img", {
          name: image.split("/")[9],
          uri: image,
          type: "image/jpg",
        });
      }
    } else {
      if (image) {
        formData.append("img", {
          name: image.split("/")[9],
          uri: image,
          type: "image/jpg",
        });
      }
    }

    formData.append("name", name);
    formData.append("rate", rate);
    formData.append("time", time);
    formData.append("calories", calories);
    formData.append("ingredients", ingredients);
    formData.append("description", description);
    formData.append("category", category);

    recipe ? await updateRecipe(formData) : await saveRecipe(formData);

    formikActions.resetForm();
    formikActions.setSubmitting(false);

    navigation.goBack();

    // console.log(values);
    // console.log(category);
    // setIsLoading(true);

    // // este setTimeout me sirve para simular un tiempo de 3 segundos despues de darle click al boton registrar/actualizar para cambiar el estado isLoading de true a false
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.darkBlue, flex: 1 }}>
      {isLoading && <Loading />}
      <ScrollView
        decelerationRate={"fast"}
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={SPACING * 3.5}
            color={colors.white}
          />
        </TouchableOpacity>

        <Text style={{ color: colors.redOrange, fontSize: 60, fontWeight: "italic", marginTop: 20, marginVertical: 10 }}>
          {recipe ? "𝑨𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒓" : "𝑪𝒓𝒆𝒂 𝒖𝒏𝒂 𝒓𝒆𝒄𝒆𝒕𝒂"}
        </Text>

        <View style={{ marginVertical: 30 }}>
          <Formik
            initialValues={inputs}
            validationSchema={validationSchema}
            onSubmit={actions}
          >
            {({ values, errors, touched, handleChange, isSubmitting, handleBlur, handleSubmit }) => {

              const {
                name,
                rate,
                time,
                calories,
                ingredients,
                description,
                category
              } = values;
              return (
                <>
                  <Input
                    value={name}
                    label="Nombre de la receta"
                    iconName="clipboard-outline"
                    placeholder="Ingrese el nombre de la receta"
                    placeholderTextColor={colors.white}
                    error={touched.name && errors.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}

                  />

                  <Input
                    keyboardType="numeric"
                    value={rate}
                    label="Rate"
                    iconName="star-outline"
                    placeholder="Ingrese el rating de la receta"
                    placeholderTextColor={colors.white}
                    error={touched.rate && errors.rate}
                    onChangeText={handleChange("rate")}
                    onBlur={handleBlur("rate")}
                  />

                  <Input
                    numberOfLines={4}
                    multiline={true}
                    keyboardType="numeric"
                    value={time}
                    label="Tiempo para realizar receta en minutos"                    
                    placeholderTextColor={colors.white}
                    iconName="restaurant-outline"
                    placeholder="Ingrese el tiempo promedio que toma cocinar la receta"
                    error={touched.time && errors.time}
                    onChangeText={handleChange("time")}
                    onBlur={handleBlur("time")}
                  />

                  <Input
                    numberOfLines={4}
                    multiline={true}
                    keyboardType="numeric"
                    value={calories}
                    label="Tiempo para eliminar calorías en minutos"
                    iconName="bicycle-outline"
                    placeholder="Ingrese el tiempo que se necesita para eliminar las calorías de la receta"
                    placeholderTextColor={colors.white}
                    error={touched.calories && errors.calories}
                    onChangeText={handleChange("calories")}
                    onBlur={handleBlur("cocinar")}
                  />

                  <Input
                    multiline={true}
                    value={ingredients}
                    label="Ingredientes"
                    iconName="ellipsis-horizontal-circle-outline"
                    placeholderTextColor={colors.white}
                    placeholder="Ingrese los ingredientes"
                    error={touched.ingredients && errors.ingredients}
                    onChangeText={handleChange("ingredients")}
                    onBlur={handleBlur("ingredients")}
                  />

                  <Input
                    multiline={true}
                    value={description}
                    label="Descripción"
                    iconName="book-outline"
                    placeholder="Ingrese la descripción de la receta"
                    placeholderTextColor={colors.white}
                    error={touched.description && errors.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                  />

                  <Text style={styles.label}>Categoría</Text>
                  <DropDownPicker
                    open={open}
                    value={category}
                    items={data}
                    setOpen={setOpen}
                    setItems={setData}
                    setValue={setCategory}             
                    style={{
                      backgroundColor: colors.white,
                    }}
                    labelStyle={{
                      color: colors.blue,
                    }}
                  />

                  <View>
                    <TouchableOpacity
                      style={styles.uploadBtnContainer}
                      onPress={() => pickImage()}
                    >
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={{ with: "100%", height: "100%" }}
                        />
                      ) : (
                        <Text style={styles.uploadBtn}>Seleccionar Imagen</Text>
                      )}
                    </TouchableOpacity>
                  </View>


                  <Button
                    submitting={isSubmitting}
                    onPress={handleSubmit}
                    title={recipe ? "Update" : "Register"}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 25,
    color: colors.orange,
    fontWeight:"bold"
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderColor: colors.redOrange,
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 25,
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.8,
    fontWeight: "bold",
    color: colors.white,
  },


});
