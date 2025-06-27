import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "../../config/firebaseConfig";
import type { UserType, UserDataType } from "../../types";

export async function getUserByEmail(
  email: string
): Promise<UserDataType | null> {
  try {
    if (!email) throw new Error("Email parameter is undefined or empty");

    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data() as UserType;
    return {
      ...userData,
      id: userDoc.id,
    };
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

export async function createUser(userData: UserType): Promise<UserDataType> {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);

    return {
      id: docRef.id,
      ...userData,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function validateUserCredentials(
  email: string,
  password: string
): Promise<UserDataType | null> {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const user = await getUserByEmail(email);
    if (!user || password !== user.password) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error validating user credentials:", error);
    throw error;
  }
}
