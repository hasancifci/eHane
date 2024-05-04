import React from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ListComponent = ({ data, contactClick, favorites }) => {
    const isFavorite = (name) => favorites.some((fav) => fav.name === name);
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactContainer}
            onPress={() => contactClick(item)}
          >
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name ?? "-"}</Text>
              {isFavorite(item.name) && ( 
                <MaterialIcons name="star" size={24} color="red" /> 
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };
  

export default ListComponent;

const styles = StyleSheet.create({
  contactContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactInfo: {
    height:30,
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    flex: 1, 
  },
});
