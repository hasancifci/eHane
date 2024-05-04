import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setContacts, setLoading } from "../src/actions/contactsActions";
import * as Contacts from "expo-contacts";
import { addFavorite, setupDatabase, truncateTable, getFavorites } from "../db/database";
import ListComponent from "../components/ListComponent";


// Şu an eklenen datalar üzerinde testler yaptığım için kullanıyorum kaldırılmalı!
//truncateTable();

setupDatabase();

const ContactsScreen = ({ contacts, setContacts, setLoading }) => {
  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    getFavorites().then(favorites => setFavorites(favorites));
  }, []);


  const addToLocalDb = async (contact) => {
    try {
      const name = contact.name ?? "-";
      const phoneNumber = contact.phoneNumbers?.[0]?.number ?? "-";
      const email = contact.emails?.[0]?.email ?? "-";

      // Eğer favoride yoksa ekle
      if (!favorites.some(fav => fav.name === name && fav.phoneNumber === phoneNumber && fav.email === email)) {
        console.log("Bura çalıştı")
        await addFavorite(name, phoneNumber, email);
        setFavorites([...favorites, { name, phoneNumber, email }]);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <ListComponent data={contacts} contactClick={addToLocalDb} favorites={favorites} />
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
