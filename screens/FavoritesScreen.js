import React, { useState } from "react";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getFavorites } from "../db/database";
import ListComponent from "../components/ListComponent";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const loadFavorites = () => {
    getFavorites()
      .then((favorites) => {
        setFavorites(favorites || []);
      })
      .catch((error) => {
        console.error("Error getting favorites:", error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const goToDetail = async () => {
    navigation.navigate("Detaylar");
  };

  return (
    <View>
      <ListComponent
        data={favorites}
        contactClick={goToDetail}
        favorites={favorites}
      />
    </View>
  );
};

export default FavoritesScreen;
