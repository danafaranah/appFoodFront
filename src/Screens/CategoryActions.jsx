import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import Loading from "../components/Form/Loading";
import * as Yup from "yup";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import SPACING from "../config/SPACING";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

DropDownPicker.setListMode("SCROLLVIEW");

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Ingrese el nombre de la categoría"),
});

export default function CategoryActions({ route }) {
  const id = route.params;
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");

  const inputs = {
    name: "",
  };

  const saveCategory = async (values, formikActions) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);

      const { data } = await axios.post("/category", values);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en saveCategory", error.message);
      Alert.alert("Error en Save Category");
    }
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

        <Text
          style={{
            color: colors.redOrange,
            fontSize: 60,
            fontWeight: "italic",
            marginTop: 20,
            marginVertical: 10,
          }}
        >
          𝑪𝒓𝒆𝒂 𝒖𝒏𝒂 𝒄𝒂𝒕𝒆𝒈𝒐𝒓𝒊𝒂
        </Text>

        <View style={{ marginVertical: 30 }}>
          <Formik
            initialValues={inputs}
            validationSchema={validationSchema}
            onSubmit={saveCategory}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => {
              const { name } = values;
              return (
                <>
                  <Input
                    value={name}
                    label="Nombre"
                    iconName="clipboard-outline"
                    placeholder="Ingrese el nombre de la categoría"
                    placeholderTextColor={colors.white}
                    error={touched.name && errors.name}
                    onChangeText={handleChange("name")}
                  />

                  <Button title="Register" onPress={handleSubmit} />
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
  },
});
