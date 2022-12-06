import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

export function DrawerContent(props){

    return(
        <View style={{flex: 1, backgroundColor: colors.blue}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.DrawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: "row", marginTop:30}}>
                            <Image source={require("../../assets/restaurant/avatar.png")} size={50} style={{width:80, height:80,borderRadius: 80}} />

                            <View style={{marginLeft: 15, flexDirection:"column"}}>
                                <Text style={styles.Title}>
                                    User
                                </Text>
                                <Text style={styles.caption}>
                                    User@admin.com
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.drawerSection}>
                    <DrawerItem icon={({color,size})=>(<Ionicons name="home-outline" 
                    color={colors.yellow} size={30} />)}
                    label="Home" labelStyle={{color:colors.white, fontSize:20, fontWeight: "bold"}}
                    onPress={() => {props.navigation.navigate("HomeScreen")}}/>

                    <DrawerItem icon={({color,size})=>(<Ionicons name="restaurant-outline" 
                    color={colors.redOrange} size={30} />)}
                    label="New Recipe" labelStyle={{color:colors.white, fontSize:20, fontWeight: "bold"}}
                    onPress={() => {props.navigation.navigate("Recipe")}}/>
                    
                    <DrawerItem icon={( {color,size})=>(<Ionicons name="folder-open-outline"
                    color={colors.redOrange} size={30} />)}
                    label="New Category" labelStyle={{color:colors.white, fontSize:20, fontWeight: "bold"}}
                    onPress={() => {props.navigation.navigate("Category")}}/>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
              <DrawerItem icon={( {color,size})=>(<Ionicons name="log-out-outline" color={colors.white} size={30} />)}
              label="Sign Out"
              onPress={() => {() => {signOut}}}
              />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    DrawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    Title: {
      fontSize: 35,
      fontWeight: "bold",
      marginTop: 10,
      color: colors.white
    },
    caption: {
      fontSize: 20,
      lineHeight: 20,
      color: colors.orange
    },
    row: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 15,
    },
    paragraph: {
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: "#f4f4f4",
      borderTopWidth: 1,
    },
  
    bottomDrawerSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 3,
    },
  });
  