import { message } from "antd";
import service from "auth/FetchInterceptor";
import { NUMBER_CONSTANTS } from "./LanguagesConstent";
import SERVICE_ID from "./ServiceIdConstants";
export const egyptianPhoneValidation = (value) => {
  let resultCheck = false;
  if (value == "1" || value == "2" || value == "0" || value == "5") {
    resultCheck = true;
  }
  return resultCheck;
};
export const numberValidator = (value) => {
  const arrayOfChar = value.split("");
  let checker;
  for (let index = 0; index < arrayOfChar.length; index++) {
    if (NUMBER_CONSTANTS.find((element) => element === arrayOfChar[index])) {
      checker = true;
    } else {
      checker = false;
      break;
    }
  }

  return checker;
};
export const getPaymentStatus = (status) => {
  switch (status) {
    case "WAITING":
      return "warning";
    case "PICKUP":
      return "success";
    case "FITTING":
      return "processing";
    case "DOWNPAYMENT":
      return "processing";
    case "ACCEPTED":
      return "processing";
    case "NOTPAID":
      return "processing";
    case "VISIT":
      return "processing";
    case "REFUSED":
      return "error";
    default:
      break;
  }
  // if (status === 2 || 8) {
  //   return "success";
  // }

  // if (status === 1 || 4 || 7) {
  //   return "warning";
  // }
  // if (status === 3 || 5 || 9 || 6) {
  //   return "error";
  // }
  // return "";
};

export const languageValidator = (value, lang) => {
  const arrayOfChar = value.split("");
  let checker;
  for (let index = 0; index < arrayOfChar.length; index++) {
    if (lang.find((element) => element === arrayOfChar[index])) {
      checker = true;
    } else {
      checker = false;
      break;
    }
  }
  return checker;
};
export const convertingServiceId = (serviceId) => {
  switch (serviceId) {
    case SERVICE_ID.CAR_ID:
      return "Car";

    case SERVICE_ID.BEAUTRY_CENTER_ID:
      return "Beauty Center";
    case SERVICE_ID.DOCTOR_ID:
      return "Doctor";
    case SERVICE_ID.DRESS_ID:
      return "Dress";
    case SERVICE_ID.MAKEUP_ID:
      return "MakeUp Artist";
    case SERVICE_ID.Photographers_Id:
      return "Photographer";
    case SERVICE_ID.TRIP_ID:
      return "Trip";
    case SERVICE_ID.HOTEL_ID:
      return "Hotel";

    default:
      break;
  }
};
export const handleChange_cLIENT=async(id, urlName, type, refetch)=>{
  const key = "updatable";
  message.loading({ content: "Loading...", key, duration: 15 });
  try {
    await service.put(`/web/${urlName}/changeStatus/${id}`, {
      status_type: type,
      action_by:"CLIENT",
    });
    refetch();
    message.success({ content: "Done!", key, duration: 2 });
  } catch (error) {
    message.error({ content: "Error Occured!", key, duration: 2 });
  }
};
export const handleChange = async (id, urlName, type, refetch) => {
  const key = "updatable";
  message.loading({ content: "Loading...", key, duration: 15 });
  try {
    await service.put(`/web/${urlName}/changeStatus/${id}`, {
      status_type: type,
      action_by:"SELLER",
    });
    refetch();
    message.success({ content: "Done!", key, duration: 2 });
  } catch (error) {
    message.error({ content: "Error Occured!", key, duration: 2 });
  }
};
