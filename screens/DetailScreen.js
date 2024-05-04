import React from "react";
import { View, Text,Button } from "react-native";

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View>
      <Text>Ad Soyad : {item.name}</Text>
      <Text>Telefon : {item.phoneNumber}</Text>
      <Text>Email : {item.email}</Text>
    </View>
  );
};

export default DetailScreen;
