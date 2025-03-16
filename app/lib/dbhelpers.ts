import "server-only";

import { collection, getDocs } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export async function getAllPrices() {
  try {
    let app = initializeApp(firebaseConfig);
    let db = getFirestore(app);

    const pricesCollection = collection(db, "prices");

    const querySnapshot = await getDocs(pricesCollection);

    const prices = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return prices.map((price: any) => ({
      id: price.id,
      name: price.title,
      price: price.price,
      category: price.category,
      image: price.picture,
    }));
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw new Error("Failed to fetch prices");
  }
}
