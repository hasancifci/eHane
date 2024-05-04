import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const ListComponent = ({ data, contactClick }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.contactContainer}
          onPress={() => contactClick(item)}>
          <View style={styles.contactInfo}>
            <Text>{item.name ?? '-'}</Text>
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
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      fontWeight: "bold",
      marginRight: 5,
    },
  });