import {
  Card,
Col,
DatePicker,
Form,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
notification,
Button,
Tabs
} from "antd";import service from "auth/FetchInterceptor";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";

import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// import DressVariationField from "./DressVariationField";
import GeneralField from "../EditForm/GeneralField";
import Loading from "components/shared-components/Loading";
import { ImageSvg } from "assets/svg/icon";

const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];
const { TabPane } = Tabs;

const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
   const history = useHistory();
   // const genericDetailes = useFetch(`genericDetailsProducts/${DRESS_ID}`);

  const [buttonCheker, setButtonChecker] = useState(true);

  
                 
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleBanner = useFetchSingle(`adminRole/${recordId}`);
  // console.log("single banner",getSingleBanner)
  const singleroles = getSingleBanner.services;
  const refetch = getSingleBanner.refetch;
  const isSuccess = getSingleBanner.isSuccess;
  
  // console.log("mohab",singleDress)
  const [postObject, setPostObject] = useState({
  //   name_ar:"",
  // name_en:""
});
  const [uploadLoading,setuploadLoading]=useState("")
  const { Dragger } = Upload;

 
  useEffect(()=>{
    if(isSuccess)
    {
      // form.resetFields();
    
      setPostObject({
        ...singleroles,
        name_ar:singleroles.name_ar,
        name_en:singleroles.name_en 
      });
    }
     },[isSuccess])
  

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  const  Banners_media={
    image_ar:postObject.arb_img,
    image_en:postObject.eng_img
  
  }
  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    try {
      // const data = new FormData();
      // for (const key of Object.keys(postObject)) {
      //   data.append(key, postObject[key]);
      // }
      await service.put(`web/adminRole/${recordId}`,postObject
      //  {
      //   image_en: postObject.eng_img?postObject.eng_img:null,
         
      //   image_ar:postObject.arb_img?postObject.arb_img:null
      // }
       
      ).then(res=>console.log("my response"))
      setSubmitLoading(false);
      refetch();
      openNotificationWithIcon("success");
      history.push("Roles");
    } catch (error) {
      setSubmitLoading(false);
    }
    // console.log("test",postObject)
  };
  return (
    <>
      {isSuccess ? (
        <>
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
                  {actionType === "view" ? "Read Banners Media" : "Edit Banners Media"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("Roles")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      
                      actionType === "view"
                    }
                    // onClick={() =>
                    //   setPostObject({
                    //     ...postObject,
                    //     variations: variationList,
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
        </Form>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
               
               setPostObject={setPostObject}
                postObject={singleroles}
                 checkView={actionType === "view"}
                

              />
            </TabPane>
            {/* <TabPane tab="Variation" key="2">
              <VariationField />
            </TabPane>
            */}
          </Tabs>
        </div>                   </>

      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
