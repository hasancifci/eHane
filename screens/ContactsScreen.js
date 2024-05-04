import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setContacts, setLoading } from "../src/actions/contactsActions";
import * as Contacts from "expo-contacts";
import { addFavorite, setupDatabase, truncateTable } from "../db/database";
import ListComponent from "../components/ListComponent";

// Şu an eklenen datalar üzerinde testler yaptığım için kullanıyorum kaldırılmalı!
truncateTable();

setupDatabase();

const ContactsScreen = ({ contacts, setContacts, setLoading }) => {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setLoading(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails,
          ],
        });
        if (data) {
          setContacts(data);
        } else {
          setContacts([]);
        }
        setLoading(false);
      }
    })();
  }, []);

  const addToLocalDb = async (contact) => {
    try {
      const name = contact.name ?? "-";
      const phoneNumber = contact.phoneNumbers?.[0]?.number ?? "-";
      const email = contact.emails?.[0]?.email ?? "-";
      await addFavorite(name, phoneNumber, email);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <ListComponent contacts={contacts} contactClick={addToLocalDb} />
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = {
  setContacts,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);


