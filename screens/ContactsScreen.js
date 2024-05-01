import React, { useEffect } from 'react';
import { View, Text, ScrollView,StyleSheet  } from 'react-native';
import { connect } from 'react-redux';
import { setContacts, setLoading } from '../src/actions/contactsActions';
import * as Contacts from 'expo-contacts';

const ContactsScreen = ({ contacts, isLoading, setContacts, setLoading }) => {
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          setLoading(true);
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name],
          });
          setContacts(data);
          setLoading(false);
        }
      })();
    }, []);
  
    return (
      <ScrollView>
        {contacts.map(contact => (
          <View key={contact.id} style={styles.contactContainer}>
            <View style={styles.contactInfo}>
              <Text>{contact.name ?? '-'}</Text>
            </View>
          </View>
        ))}
        {isLoading && <Text>Loading...</Text>}
      </ScrollView>
    );
  };
  
  const mapStateToProps = state => ({
    contacts: state.contacts.contacts,
    isLoading: state.contacts.isLoading,
  });
  
  const mapDispatchToProps = {
    setContacts,
    setLoading,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
  
  const styles = StyleSheet.create({
    contactContainer: {
      marginBottom: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    contactInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
    },
  });