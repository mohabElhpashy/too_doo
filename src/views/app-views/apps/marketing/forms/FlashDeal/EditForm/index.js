import { Button, Form, notification, Tabs, Card, Input, Row, Select, Upload,
  DatePicker,Col } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { languageValidator, numberValidator } from "constants/helperFunctions";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";
import { ImageSvg } from "assets/svg/icon";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";

import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";

import GeneralField from "./GeneralField";
import VariationsS from './Variations'

const { TabPane } = Tabs;
function EditFlashDeal() {
  const [form] = Form.useForm();
  // const { services } = useFetch("services");

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const inialState = {
    service_id: null,
    number: "",
    subject_ar: "",
    subject_en: "",
    body_en: "",
    body_ar: "",
    end_date:"",
    start_date:"",
    capacity:""
  };
  const [buttonCheker, setButtonChecker] = useState(true);
  const [postObject, setPostObject] = useState([]);
  const [Variations, setVariations] = useState([]);
  const [listofStores, setStoreList] = useState([]);
  const [Var,setvar]=useState([])
const [Products_Details,setProducts_Details]=useState([])

  const [MyProducts,setMyProducts]=useState([])
  const servicesListRes = useFetch("services");
  const servicesList = servicesListRes.services;
  const recordId = new URLSearchParams(location.search).get("id");
  const checkViewMode = new URLSearchParams(location.search).get("name");
  const { services, isFetching, isSuccess, refetch } = useFetchSingle(
    `flash_deal/${recordId}`
  );
  var VAR_PRODUCTS
  // useEffect(async () => {
    

  //   // console.log("products=>>>",PRODUCT)
  //   if (postObject.service_id) {
  //     try {
  //       const data = await service.get(`web/stores/${postObject.service_id}`);
  //       setStoreList(data.data);
  //     } catch (error) {
  //       <h2>{error}</h2>;
  //     }
  //   }
    
  // }, [ ]);
  useEffect(() => {
    // postObject.products.map((d)=>{
       console.log("service",services)

    // })
    if (isSuccess) {
      form.resetFields();
      setPostObject({
        end_date:services.end_date,
        id: services.id,
        main_image: services.main_image,
        name_ar: services.name_ar,
        name_en: services.name_en,
        service_name:services.products[0].service_type,
        service_id:"",
        products:services.products,
        
        start_date: services.start_date,
      });
 
      //   VAR_PRODUCTS=services.products.map((product=>{
      //   return {
      //     discount:product.discount,
      //     service_id:product.service_id,
      //     capacity:product.capacity,
      //     variation_id:product.variation_id,
      //     total_capacity:product.total_capacity,
      //     product_id:product.product_id,
      //     available_from:product.available_from,
      //     available_to:product.available_to,
      //     Price:product.Price
      //   }
        
      // }))
      
    
      // const VARIATIONS=services.products.map((element) => {
      //   return {
      //     // down_payment_value: element.variations.down_payment_value,
      //     id: element.variations.id,
      //     image: element.variations.image,
      //     main_image: element.variations.main_image,
      //     name:element.variations.name,
      //     number_of_hours: element.variations.number_of_hours,
      //     price: element.variations.price
      //   };
      // })
      // setVariations(VARIATIONS)
      const cleanDetails = services.products.map((element) => {
        return {
          // id_:element,
          total_capacity:element.total_capacity, 
          discount:element.discount, 
          product_id:element.product_id,
          variation_id:element.variation_id,
          available_from:element.available_from,
          available_to:element.available_to,
          product_name:element.product_name,
          price:element.Price,
        };
      });
      setProducts_Details(cleanDetails)

    }
  }, [isSuccess]);
  console.log("postObjectpostObjectpostObject",postObject)
  console.log("VAR_PRODUCTS",Var)

  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };

  const buttonValidation = () => {
    let count = 0;
    for (const key in inialState) {
      if (postObject !== undefined) {
        if (!postObject[key]) {
          count++;
        }
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onFinish = async (postObject, recordId) => {
    console.log("postObjectpostObjectpostObject",postObject)
    // setLoading(true);
    // try {
    //   await service.put(`/web/service_tips/${recordId}`, postObject);
    //   setLoading(false);
    //   refetch();
    //   openNotificationWithIcon("success");
    //   history.push("increaseProfit");
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => {
            onFinish(postObject, recordId);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
          }}
          className="ant-advanced-search-form"
        >
          <PageHeaderAlt className="border-bottom" overlap>
            <div className="container">
              <Flex
                className="py-2"
                mobileFlex={false}
                justifyContent="between"
                alignItems="center"
              >
                <h2 className="mb-3">
                  {checkViewMode === "view" ? "Read Record" : "Edit Record"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("flashdeals")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    // disabled={!buttonValidation() || checkViewMode === "view"}
                    loading={loading}
                    // disabled={
                    //   !buttonValidation() ||
                    //   !buttonCheker ||
                    //   checkViewMode === "view"
                    // }
                    onClick={() => {
                      setPostObject({
                        ...postObject,
                        products: Products_Details,
                        // paymentMethods:PayMentmethod,
  
                        // details: detailsList.map(
                        //   (element) => element.generic_detail_id
                        // ),
                      });
                    }}
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="General" key="1">
                <GeneralField
                   setPostObject={setPostObject}
                   setMyProducts={setMyProducts}
                   MyProducts={MyProducts}
                   postObject={postObject}              
                      checkViewMode={checkViewMode === "view"}
                      listofStores={listofStores}
                      Products_Details={Products_Details}
                      setProducts_Details={setProducts_Details}
                      category={servicesList}
                      
                      />
              </TabPane>
              {/* <TabPane tab="Variations" key="2">
          <VariationsS 
          Variations={Variations}
          checkViewMode={checkViewMode === "view"}

          />
              </TabPane> */}
            </Tabs>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};


export default EditFlashDeal;
