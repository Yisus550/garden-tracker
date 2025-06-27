import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../config/firebaseConfig";
import type { DraftGardenType, GardenType } from "../../types";

export async function addGarden(garden: DraftGardenType, userId: string): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "gardens"), {
      ...garden,
      plants: [],
      userId,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding garden: ", error);
    throw error;
  }
}

export async function getGarden(gardenId: string): Promise<GardenType | null> {
  try {
    const docRef = doc(db, "gardens", gardenId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as GardenType;
    } else {
      console.log("No such garden!");
      return null;
    }
  } catch (error) {
    console.error("Error getting garden: ", error);
    throw error;
  }
}

export async function fetchGardens(): Promise<GardenType[]> {
  try {
    const gardensCollection = collection(db, "gardens");
    const snapshot = await getDocs(gardensCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GardenType[];
  } catch (error) {
    console.error("Error fetching gardens: ", error);
    throw error;
  }
}

export async function fetchGardensByUserId(userId: string): Promise<GardenType[]> {
  try {
    const gardensCollection = collection(db, "gardens");
    const q = query(gardensCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GardenType[];
  } catch (error) {
    console.error("Error fetching user gardens: ", error);
    throw error;
  }
}

export async function addPlantToGarden(gardenId: string, plantId: string) {
  try {
    const docRef = doc(db, "gardens", gardenId);
    await updateDoc(docRef, {
      plants: arrayUnion(plantId),
    });
  } catch (error) {
    console.error("Error adding plant to garden: ", error);
    throw error;
  }
}

export async function fetchGardenById(gardenId: string): Promise<GardenType | null> {
  try {
    const docRef = doc(db, "gardens", gardenId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as GardenType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching garden:", error);
    throw error;
  }
}

export async function fetchGardenByIdAndUserId(gardenId: string, userId: string): Promise<GardenType | null> {
  try {
    const docRef = doc(db, "gardens", gardenId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const gardenData = docSnap.data() as GardenType;
      
      if (gardenData.userId !== userId) {
        console.log("Garden does not belong to user");
        return null;
      }
      
      return {
        ...gardenData,
        id: docSnap.id,
      } as GardenType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching garden:", error);
    throw error;
  }
}
