import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eHane.db');

//Tablomuzu burada oluşturuyoruz. Mevcutta tablo var ise oluşturmuyor.
export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, email TEXT);`
      ,
      [],
    );
  });
};

//Tabloya veri ekleme işlemlerini gerçekleştiriyoruz.
export const addFavorite = (name, phoneNumber, email) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO favorites (name, phoneNumber, email) VALUES (?, ?, ?)`,
          [name, phoneNumber, email],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Failed added'));
            }
          }
        );
      },
      error => reject(error)
    );
  });
};

//Tablodan favoriler listesini çekiyoruz
export const getFavorites = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `SELECT * FROM favorites`,
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      },
    );
  });
};

//Tablodan favori silme işlemi.
export const removeFavorite = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM favorites WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error("Failed delete"));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const truncateTable = () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `DELETE FROM favorites`,
            [],
            (_, { rows }) => resolve(rows._array),
            (_, error) => reject(error)
          );
        },
        error => reject(error)
      );
    });
  };

export default setupDatabase;
