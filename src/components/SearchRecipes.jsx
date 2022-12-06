import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import SPACING from "../config/SPACING";
import Recipe from './Recipe';


export default function SearchRecipes({data, input}) {

  return (
    <View>
      <FlatList
          style={{ marginTop: SPACING * 2, marginBottom: 280 }}
          data={data}
          renderItem={({item}) => {            
            if(input === null){
              return (<Recipe recipe = {item}/>)
            }

            if(item.name.toLowerCase().includes(input.toLowerCase())){
                return (<Recipe recipe = {item}/>)
            }
            }}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          />
    </View>
  )
}

const styles = StyleSheet.create({})