import {
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import db from "../../config/firebaseConfig";
import type { DraftPlantType, PlantType } from "../../types";
import { addPlantToGarden } from "./garden";

const plantsRef = collection(db, "plants");

export async function addPlant(draftPlant: DraftPlantType, userId: string) {
  try {
    const plantData = {
      ...draftPlant,
      userId,
    };
    
    const docRef = await addDoc(plantsRef, plantData);
    await addPlantToGarden(draftPlant.gardenId, docRef.id);

    return {
      id: docRef.id,
    };
  } catch (error) {
    console.error("Error adding plant:", error);
    throw error;
  }
}

export async function fetchPlants(): Promise<PlantType[]> {
  try {
    const plants: PlantType[] = [];
    const q = query(plantsRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((plant) => {
      plants.push({
        id: plant.id,
        ...plant.data(),
      } as PlantType);
    });

    return plants;
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
}

export async function fetchPlantsByUserId(userId: string): Promise<PlantType[]> {
  try {
    const plants: PlantType[] = [];
    const q = query(plantsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((plant) => {
      plants.push({
        id: plant.id,
        ...plant.data(),
      } as PlantType);
    });

    return plants;
  } catch (error) {
    console.error("Error fetching user plants:", error);
    throw error;
  }
}

export async function fetchPlantsByGardenId(gardenId: string): Promise<PlantType[]> {
  try {
    const plants: PlantType[] = [];
    const q = query(plantsRef, where("gardenId", "==", gardenId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((plant) => {
      plants.push({
        id: plant.id,
        ...plant.data(),
      } as PlantType);
    });

    return plants;
  } catch (error) {
    console.error("Error fetching plants by garden:", error);
    throw error;
  }
}

export async function fetchPlantsByGardenIdAndUserId(gardenId: string, userId: string): Promise<PlantType[]> {
  try {
    const plants: PlantType[] = [];
    const q = query(
      plantsRef, 
      where("gardenId", "==", gardenId),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((plant) => {
      plants.push({
        id: plant.id,
        ...plant.data(),
      } as PlantType);
    });

    return plants;
  } catch (error) {
    console.error("Error fetching plants by garden and user:", error);
    throw error;
  }
}

export async function fetchPlantById(
  plantId: string
): Promise<PlantType | null> {
  try {
    const plantDoc = doc(db, "plants", plantId);
    const plantSnapshot = await getDoc(plantDoc);

    if (plantSnapshot.exists()) {
      return {
        id: plantSnapshot.id,
        ...plantSnapshot.data(),
      } as PlantType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching plant:", error);
    throw error;
  }
}

export async function fetchPlantByIdAndUserId(
  plantId: string,
  userId: string
): Promise<PlantType | null> {
  try {
    const plantDoc = doc(db, "plants", plantId);
    const plantSnapshot = await getDoc(plantDoc);

    if (plantSnapshot.exists()) {
      const plantData = plantSnapshot.data() as PlantType;
      
      if (plantData.userId !== userId) {
        console.log("Plant does not belong to user");
        return null;
      }
      
      return {
        ...plantData,
        id: plantSnapshot.id,
      } as PlantType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching plant:", error);
    throw error;
  }
}
