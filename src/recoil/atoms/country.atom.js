import { atom } from "recoil";
export const allCountries = atom({
  key: "allCountries", // unique ID (with respect to other atoms/selectors)
  default: {
    id: "",
    icon: "",
    country_code: "",
    name: "",
  }, // default value (aka initial value)
});
