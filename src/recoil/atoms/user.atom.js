import { atom } from "recoil";
export const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: {
    loggedIn: false,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  }, // default value (aka initial value)
});
