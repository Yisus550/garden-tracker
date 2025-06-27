export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type UserDataType = UserType & {
  id: string;
};

export type LoginActionType = "Login" | "Register";

export type PlantType = {
  id: string;
  name: string;
  species: string;
  variety?: string;
  gardenId: string;
  userId: string;
  plantedDate: string;
  notes?: string;
};

export type DraftPlantType = Omit<PlantType, "id" | "userId">;

export type GardenType = {
  id: string;
  name: string;
  status: "active" | "inactive" | "planning";
  description: string;
  userId: string;
  plants: PlantType[];
};

export type DraftGardenType = Omit<GardenType, "id" | "plants" | "userId">;
