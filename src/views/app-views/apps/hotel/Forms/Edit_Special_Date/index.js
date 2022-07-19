import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
//   import MyProducts from './MY_products'
import Loading from "components/shared-components/Loading";
import GeneralField from "./General";
// import GeneralField from './General'
// import Upload_videos from './Upload'
 
  const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];

const CAR_ID = 1;
const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  // const { services } = useFetch("agencies");

  const history = useHistory();
  // const tags = useFetch("tags");
  // const tagsList = tags.services;
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingle = useFetchSingle(`weddingSpecialDates/${recordId}`);
  const Hotels_Periods = getSingle.services;
  const isSuccess = getSingle.isSuccess;
  const refetch = getSingle.refetch;

 
  const [buttonCheker, setButtonChecker] = useState(true);
 

  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      number_of_hours: "",
    },
  ]);
  const INITAL_STATE = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    agency_id: null,
    main_image: null,
    with_decoration: false,
    with_captain: false,
    no_of_seats: null,
    images: [],
    details: [],
    tags: [],
  };
  const DISABLE_OBJECT = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    agency_id: null,
    main_image: null,
    images: [],
    details: [],
    tags: [],
  };
  const [postObject, setPostObject] = useState([]);
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const [genericDetailsList, setGenericDetials] = useState();
  
  // console.log(postObject, "Post Object");
   
  useEffect(async() => {
    if (isSuccess) {
      // console.log("Hotels_Periods",Hotels_Periods)
      form.resetFields();
      try {
        const data = await service.get(
          `web/weddingHall/listVariations/${Hotels_Periods.product_id}`
        ).then(res=>{
          setPostObject({
            price:Hotels_Periods.price,   
            name_en: Hotels_Periods.name_en,
            wedding_hall_variation_id:Hotels_Periods.wedding_hall_variation_id,
            id:Hotels_Periods.id,
            variations:res.record
      })
        })
    
   
       } catch (error) {
        <h2>{error}</h2>;
      }
    
      
    }
  }, [isSuccess]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  const onFinish =     async() => {
    console.log("from my idex=>>>>>>>>>",postObject)
     
     
 
  //  try {
  //     await service.put("/web/WeddingHallPeriods", postObject);
  //     openNotificationWithIcon("success");
  //     history.push("ListSpecial_date");
  //     setSubmitLoading(false);
  //   } catch (error) {
  //     setSubmitLoading(false);
  //   }
  };
  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => {
            onFinish(postObject);
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
                  {actionType === "view" ? "Read Product" : "Edit Product"}
                </h2>
                <div className="mb-3">
                  
                  <Button className="mr-2" 
                  onClick={() => history.push("ListSpecial_date")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      // !buttonValidation() ||
                      // !detailsButtonValidation() ||
                      // !variationButtonValidation() ||
                      // // detailsList.length === 0 ||
                      // !buttonCheker ||
                      actionType === "view"
                    }
                    // onClick={() =>
                    //   setPostObject({
                    //     ...postObject,
                    //     variations: variationList,
                    //     paymentMethods:PayMentmethod,

                    //     details: detailsList.map(
                    //       (element) => element.generic_detail_id
                    //     ),
                    //   })
                    // }
                    htmlType="submit"
                    loading={submitLoading}
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container" style={{marginTop:'30px'}}>
           <Tabs>
              <TabPane tab="General" key="1">
                <GeneralField
                // services={services}
                // tagsList={tagsList}
                checkView={actionType === "view"}
                postObject={postObject}
                setPostObject={setPostObject}
                
              />:        
              
            </TabPane>
         

             
             
            
            </Tabs>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
