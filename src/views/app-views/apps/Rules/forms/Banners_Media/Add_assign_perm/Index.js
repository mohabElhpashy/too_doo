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
    
    name_ar:"",
    name_en:""
    
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


  

  };
 
  const [postObject, setPostObject] = useState([]);
const [ALL_Products,setALL_Products]=useState()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [roles,setroles]=useState([])
  const[permessions,setpermessions]=useState([])
  const[id__,setid]=useState("")

  const history = useHistory();
  


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  console.log("postObject, setPostObject",postObject)
 
  const onFinish =     async() => {
   
    var permissions={permissions:postObject}
// console.log("my oob",Roles)


   try {
      await service.post(`/web/assignPermessionToRole/${id__.id}`,permissions).then(res=>console.log("my res",res));
      openNotificationWithIcon("success");
      history.push("Assign_perm");
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
    }
  };
 
 useEffect(()=>{
const data=service.get(`web/adminRole`).then(res=>{
  console.log("res",res.records)
  setroles(res.records)
  const data_=  service.get(`web/permessions`).then(res=>{
    console.log("res",res.data.data)
    setpermessions(res.data.data)
})
})
 },[])

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
                  onClick={() => history.push("Assign_perm")}
                >
                  Discard
                </Button>
               
               {id__==""||postObject.length==""?
                <Button
                type="primary"
                // htmlType="submit"
                loading={submitLoading}
                disabled
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
              </Button>:
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
             </Button>}
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
               
               setPostObject={setPostObject}
               roles={roles}
                 postObject={postObject}
                 permessions={permessions}
                 setid={setid}
                

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
