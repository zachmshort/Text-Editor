import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// psuedo code
// 1. open the database
// 2. create a transaction in 'readwrite' mode
// 3. retrieve the object store
// 4. put the content into the object store
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Content added:', content);
  console.error('putDb not implemented', result);
};

// TODO: Add logic for a method that gets all the content from the database
// psuedo code
// 1. open the database
// 2. create a transaction in 'readonly' mode
// 3. retrieve the object store
// 4. get all entries from the object store
// 5. return the retrieved content
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = await store.getAll();
  const result = await request;
  console.log('content found:', result);
  console.error('getDb not implemented');
  return result?.value;
}

initdb();
