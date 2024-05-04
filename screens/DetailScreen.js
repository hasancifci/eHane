import React from "react";
import { View, Text,Button } from "react-native";
import { removeFavorite } from "../db/database";

const DetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const removeFromFavorites = () => {
    removeFavorite(item.id) 
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>Ad Soyad : {item.name}</Text>
      <Text>Telefon : {item.phoneNumber}</Text>
      <Text>Email : {item.email}</Text>
      <Button title="Favorilerden Kaldır" onPress={removeFromFavorites} />
    </View>
  );
};

export default DetailScreen;
