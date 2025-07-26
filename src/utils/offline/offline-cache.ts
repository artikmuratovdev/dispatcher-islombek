import { openDB } from "idb";

const DB_NAME = "offline-db";
const STORE_NAME = "requests";

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function saveRequestOffline(request: any) {
  const db = await getDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  await transaction.store.add(request);
}

export async function getAllRequests() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function deleteRequest(id: string) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
