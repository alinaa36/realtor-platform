import { RealEstate } from "./realEstate";

export type User = {
  role: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  realEstates: RealEstate[]
};
