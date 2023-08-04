import axios from "axios";

import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";


export const filters = [
  { id: 2, name: "Jasp", value: "jasp" },
  { id: 3, name: "Rock", value: "rock" },
  { id: 4, name: "Melody", value: "melody" },
  { id: 5, name: "Karoke", value: "karoke" },
];

export const filterByLanguage = [
  { id: 1, name: "Việt Nam", value: "vietnam" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Korea", value: "korea" },
  { id: 4, name: "Japan", value: "Japan" },
  { id: 5, name: "China", value: "china" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};