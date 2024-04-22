import { encoded, translations } from "./data.js";

console.log("Let's rock");
// console.log(encoded, translations);

const decodeFields = (encoded, translations) => {
  const uniqueIds = new Set();

  const decoded = encoded.map((item) => {
    const newItem = {};
    for (const key in item) {
      if (key.endsWith("Id") && item[key] !== null) {
        uniqueIds.add(item[key]);
        if (!["groupId", "service", "formatSize", "ca"].includes(key)) {
          newItem[key] = translations[item[key]] || item[key];
        } else {
          newItem[key] = item[key];
        }
      } else {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });

  console.log("Уникальные ID:", Array.from(uniqueIds));
  return decoded;
};
const decoded = decodeFields(encoded, translations);

console.log(decoded);
