import { Button, Form, message, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import Banner from "views/app-views/components/feedback/alert/Banner";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const { mode = ADD } = props;
  const { services } = useFetch("services");
  const emptyState = {
    
    arb_img: "",
    eng_img: "",
    eng_img_URL: "",
    arb_img_URL: "",
    
  };

  const initalState = emptyState;

  const inialOperations = {
    value:""


  

  };
 
  const [postObject, setPostObject] = useState(initalState);
const [ALL_Products,setALL_Products]=useState()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentPackage, setPackage] = useState([]);
  const [listofStores, setStoreList] = useState([]);
  const [productList, setProductList] = useState([]);

  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);
  const [state,setstate]=useState([])
  const main_array=[]


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
 
  const onFinish =     async() => {
   
 const  targetType={
  show_in:postObject.value
}
console.log("my oob",targetType)


   try {
      await service.post("/web/targetType", targetType).then(res=>console.log("my res",res));
      openNotificationWithIcon("success");
      history.push("targetType");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
 

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        // onSubmitCapture={(e) => {
        //   // e.preventDefault();
        //   onFinish();
        // }}
        name="advanced_search"
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
                {mode === "ADD" ? "Add New Record" : `Edit Record`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("targetType")}
                >
                  Discard
                </Button>
               
                <Button
                  type="primary"
                  // htmlType="submit"
                  loading={submitLoading}
                  onClick={
                    // () =>
                    // setPostObject({
                    //   ...postObject,
                    //   products: [...currentPackage],
                    //   number_of_items: currentPackage.length,
                    // })
                    onFinish
                  }
                >
                  {mode === "ADD" ? "Add" : `Save`}
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
                
                
                postObject={postObject}
                

              />
            </TabPane>
            {/* <TabPane tab="Variation" key="2">
              <VariationField />
            </TabPane>
            */}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
