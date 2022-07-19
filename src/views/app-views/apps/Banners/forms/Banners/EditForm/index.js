// import { Button, Form, message, notification, Tabs } from "antd";
import {
  Card,
Col,
DatePicker,
Form,
notification,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
Button,
Tabs 
} from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Banner from "views/app-views/components/feedback/alert/Banner";
import GeneralField from "./GeneralField";
import ShowIn from '../EditForm/ShowIn'
import General from  '../EditForm/Main'
import References from '../EditForm/GeneralField'


const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const location = useLocation();
const recordId = new URLSearchParams(location.search).get("id");
const actionType = new URLSearchParams(location.search).get("name");
const getSingleBanner = useFetchSingle(`banners/${recordId}`);
const SingleBanner = getSingleBanner.services;
const isSuccess = getSingleBanner.isSuccess;
const refetch = getSingleBanner.refetch;
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const { mode = ADD } = props;
  // const { services } = useFetch("services");
  const emptyState = {
    
    arb_img: "",
    eng_img: "",
    eng_img_URL: "",
    arb_img_URL: "",
    
  };

  const initalState = emptyState;

  const inialOperations = {
    service_id: null,
    store_id: null,
    product_id: null,
    new_price: 0,
    product_name: null,
    Discount:"",
    total_capacity:null,
    available_from:null,
    available_to:null,
    name_en: "",
    name_ar: "",
    name_en_URL: "",
    name_ar_URL: "",
    type:""
 
  };
  const ini={
    name_ar:"",
    name_en:"",
    active:"",
     sort:"",
     type:"",
     banner_media_id:"",
     reference:"",
     screen_id:"",
     screen_service_id:""
     ,types:null
  }
 
  const [Postobject, setPostobject] = useState(ini);

const [ALL_Products,setALL_Products]=useState()
   const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentPackage, setPackage] = useState([]);
  const [listofStores, setStoreList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [ALLL,setALLL]=useState(
    {name_ar:"",name_en:"",type:"",banner_media_id:"",reference:"",screen_id:"",screen_service_id:"",types:null})
    const [allPRODUCTS,setallPRODUCTS]=useState([])
    const [types, settypes] = useState([]);

  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);
  const [state,setstate]=useState()
  const main_array=[]


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 
  const onFinish =     async() => {
    console.log("from my idex=>>>>>>>>>",Postobject)
   
    try {
      await service.put(`/web/banners/${recordId}`, Postobject).then(res=>console.log("my res",res));
      openNotificationWithIcon("success");
      history.push("Banner");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
     
  };

   useEffect(async() => {
     console.log("single banner",SingleBanner)
    if (isSuccess) {
      form.resetFields();
        setPostobject({
        banner_media_id: SingleBanner.banner_media_id,
        name_ar: SingleBanner.name_ar,
        name_en: SingleBanner.name_en,
        reference: SingleBanner.reference,
        screen_id: SingleBanner.screen_id,
        screen_service_id: SingleBanner.screen_service_id,
        sort: SingleBanner.sort,
        type: SingleBanner.type,
        image_ar: SingleBanner.image_ar,
        image_en: SingleBanner.image_en,
        product_image: SingleBanner.product_image,
        screen_name_en: SingleBanner.screen_name_en,
        store_name_en: SingleBanner.screen_name_ar,  
        store_id: SingleBanner.store_id
  })
  const ttypes=SingleBanner.banner_target_types.map((ele)=>{
    return{
      active: true,
banner_id: "",
end_date:ele.end_date,
id: 0,
start_date: ele.start_date,
target_type_id: ele.target_type_id,
showin:ele.type.show_in
    }
  })
 settypes(ttypes)
      // const cleanDetails = SingleBanner?.banner_target_types?.map((element) => {
      //   return {
      //     id: element.id,
      //     target_type: element.type.show_in,
      //     target_type_id: "",
      //     start_date:element.start_date,
      //     end_date:element.end_date,
      //     active:element.active
      //   }
      // });
      // settypes(cleanDetails);
     
      
      //   const data = await service.get(
      //     `web/products/${SingleBanner.screen_service_id}/${SingleBanner.store_id}`
      //  ).then(res=>{
      //   setPostObject({
      //     ...SingleBanner,
      //     products:res.data
           
      //   });
      //  }
        
      //  )
      
       

      
      
    }
  }, [isSuccess]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
         name="advanced_search"
        onFinish={() => {
          onFinish(Postobject);
        }}
        
        // name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
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
                  onClick={() => history.push("Banner")}
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
                    onClick={() =>
                      setPostobject({
                        ...Postobject,
                        types: types
                      
                    })}
                    htmlType="submit"
                    loading={submitLoading}
                  
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
        <Row gutter={24 }>
              <div className="container">

      <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
    
      <TabPane tab="General" key="1">
    <General 
    Postobject={Postobject}  
    setPostobject={setPostobject}
    checkView={actionType === "view"}
 />
      </TabPane>

    <TabPane tab="References" key="2">
    <References
 Postobject={Postobject}  
 setPostobject={setPostobject}
      checkView={actionType === "view"} />
      </TabPane>
      
      <TabPane tab="Show In" key="3">
      <ShowIn 
      checkView={actionType === "view"}  
      Postobject={Postobject}
          types={types}
          settypes={settypes}
/>
    </TabPane> 
      
  </Tabs>
</div>
      
        </Row>
      </Form>
    </>
  );
};

export default ProductForm;
