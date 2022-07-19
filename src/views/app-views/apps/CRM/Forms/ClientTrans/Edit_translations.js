import { Button, Form, message, Tabs, notification } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
 
 
const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ProductForm = () => {
  

 
  // const dummyData = [
  //   {
  //     id: 1,
  //     seller_id: 1,
  //     product_id: 1,
  //     lock_date: "2021-08-23 14:40:00+02",
  //     active: true,
  //     approve: false,
  //     subscribed: true,
  //     created_at: null,
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  //   {
  //     id: 2,
  //     seller_id: 1,
  //     product_id: 1,
  //     lock_date: "2021-08-24 17:50:00+02",
  //     active: true,
  //     approve: false,
  //     subscribed: true,
  //     created_at: null,
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  //   {
  //     id: 3,
  //     seller_id: 1,
  //     product_id: 1,
  //     lock_date: "2021-08-26 19:20:00+02",
  //     active: true,
  //     approve: false,
  //     subscribed: true,
  //     created_at: null,
  //     updated_at: null,
  //     deleted_at: null,
  //   },
  // ];
//   useEffect(() => {
//     if (manualLockList?.data.length > 0) {
//       const newCreatedArray = manualLockList?.data?.map((element) => {
//         return { ...element, newLockDate: element.lock_date?.split(" ")[0] };
//       });
//       setCorrectArray(
//         newCreatedArray?.map((element) => {
//           return {
//             ...element,
//             date: element.newLockDate,
//             event: [
//               {
//                 title: element.product_name_en,
//                 bullet: "red",
//               },
//             ],
//           };
//         })
//       );
//     }
//   }, [manualLockSuccess]);
  const inialState = {
    first_name: "",
    id: "",
    last_name: "",
    password: "",
    email: "",
    country_code: null,
    phone: "",
    service_id: null,
    store_name_ar: "",
    store_name_en: "",
    store_address_ar: "",
    store_address_en: "",
    // store_lat: "",
    // store_long: "",
    open_at: "10:10",
    close_at: "10:10",
    store_phone: "",
    store_lat: 30.04720230873402,
    store_long: 31.240386415272962,
    country_id: null,
    city_id: null,
    payment_method: [],
    status: true,
    is_forget_password: true,
    defaultImage: false,
    instagram_link: "",
    facebook_link: "",
    seller_type:""
  };
  
   
//   const passwordChecker = () => {
//     let checker = false;
//     if (postObject.password) {
//       if (postObject.password.length < 6) {
//         checker = true;
//       } else {
//         checker = false;
//       }
//     }
//     return checker;
//   };
//   const openNotificationWithIcon = (type) => {
//     notification[type]({
//       message: "Process Feedback",
//       description: "Your Process has been Done Successfully!",
//     });
//   };
//   const buttonValidationObject = {
//     service_id: null,
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     payment_method: [],
//   };
//   // Button Disabled
//   const buttonValidation = () => {
//     let count = 0;
//     for (const key in buttonValidationObject) {
//       if (!postObject[key] || postObject["payment_method"].length == 0) {
//         count++;
//       }
//     }
//     if (count == 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const handleUploadChange = (info) => {
//     if (info.file.status === "uploading") {
//       setUploadLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       getBase64(info.file.originFileObj, (imageUrl) => {
//         setImage(imageUrl);
//         setUploadLoading(true);
//       });
//     }
//   };

//   const onFinish = async (postObject, recordId) => {
//     setLoading(true);
//     if (!postObject["password"]) {
//       delete postObject["password"];
//     }

//     try {
//       // const koanfa = { ...postObject, ...postObject?.store };
//       await service.put(`/web/sellers/${recordId}`, {
//         ...postObject,
//         main_image: postObject.defaultImage
//           ? SELLER_LOGO
//           : postObject.main_image.split("/")[4]
//           ? postObject.main_image.split("/")[4]
//           : postObject.main_image,
//       });
//       setLoading(false);
//       openNotificationWithIcon("success");
//       refetch();
//       history.push("seller");
//     } catch (error) {
//       setLoading(false);
//     }
//   };
//   const paymentMethodConvert = () => {
//     if (
//       postObject?.payment_method?.find((element) => element.active === true)
//     ) {
//       setPostObject({
//         ...postObject,
//         payment_method: postObject.payment_method.map(
//           (element) => element.payment_method_id
//         ),
//       });
//     } else {
//       setPostObject({
//         ...postObject,
//         payment_method: postObject.payment_method.map((element) => element.id),
//       });
//     }
//   };
// useEffect(()=>{
// console.log("postObjectpostObjectpostObject",postObject)
// },[postObject])
  // useEffect(() => {
  //   if (
  //     postObject?.payment_method?.find((element) => element.active === true)
  //   ) {
  //     setPostObject({
  //       ...postObject,
  //       payment_method: postObject?.payment_method?.map(
  //         (element) => element.payment_method_id
  //       ),
  //     });
  //   // } else  {
  //   //   setPostObject({
  //   //     ...postObject,
  //   //     payment_method: postObject?.payment_method?.map(
  //   //       (element) => element.id
  //   //     ),
  //   //   });
  //   // }
  // }, [postObject?.payment_method]);
  return (
    <>
     
    </>
  );
};

export default ProductForm;
