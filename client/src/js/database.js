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
// 1. Open the database
// 2. Create a transaction in 'readwrite' mode
// 3. Retrieve the object store
// 4. Put the content into the object store
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
  console.log('Content added:', content);console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
// psuedo code
// 1. Open the database
// 2. Create a transaction in 'readonly' mode
// 3. Retrieve the object store
// 4. Use getAll() to get all entries from the object store
// 5. Return the retrieved content
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  await tx.done;
  console.log('content found:', allContent);
  console.error('getDb not implemented');
  return allContent.map(entry => entry.content);
}

initdb();
