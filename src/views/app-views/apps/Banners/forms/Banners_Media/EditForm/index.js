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
Button
} from "antd";import service from "auth/FetchInterceptor";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";

import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import DressVariationField from "./DressVariationField";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";
import { ImageSvg } from "assets/svg/icon";

const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];

const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("dressStore");
  const history = useHistory();
  const tags = useFetch("tags");
  // const genericDetailes = useFetch(`genericDetailsProducts/${DRESS_ID}`);

  const [buttonCheker, setButtonChecker] = useState(true);

  
                 
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleBanner = useFetchSingle(`banners/media/${recordId}`);
  // console.log("single banner",getSingleBanner)
  const singleDress = getSingleBanner.services;
  const refetch = getSingleBanner.refetch;
  const isSuccess = getSingleBanner.isSuccess;
  
  // console.log("mohab",singleDress)
  const [postObject, setPostObject] = useState({eng_img:"",arb_img:"",eng_img_URL:"",arb_img_URL:""});
  const [uploadLoading,setuploadLoading]=useState("")
  const { Dragger } = Upload;


  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  
  const imageUploadProps = {
    name: "file",
    multiple: true,
    listType: "picture-card",
    showUploadList: false,
  
   
  };
  
 
  

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
      await service.put(`web/banners/media/${recordId}`,
      //  {
      //   image_en: postObject.eng_img?postObject.eng_img:null,
         
      //   image_ar:postObject.arb_img?postObject.arb_img:null
      // }
      Banners_media
      ).then(res=>console.log("my response"))
      setSubmitLoading(false);
      refetch();
      openNotificationWithIcon("success");
      history.push("BannersMedia");
    } catch (error) {
      setSubmitLoading(false);
    }
    // console.log("test",postObject)
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
                  {actionType === "view" ? "Read Banners Media" : "Edit Banners Media"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("BannersMedia")}
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
          <div className="container" style={{marginTop:83}}>
          <Row gutter={24 }>
 <Col xs={24} sm={24} md={7}>
        <Card title="Eng Image" style={{ height: 365 }} >
          <Dragger
          disabled={actionType === "view"}
            {...imageUploadProps}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const key = "updatable";
              message.loading({ content: "Loading...", key, duration: 15 });

              const imageObject = { type: "Banners", file: options.file };
              const data = new FormData();
              try {
                for (const key of Object.keys(imageObject)) {
                  data.append(key, imageObject[key]);
                }
                const test = await service.post("/upload_media", data);
                message.success({
                  content: `${test.file_url} Uploaded Successfully!`,
                  key,
                  duration: 2,
                });
                setPostObject({
                  ...postObject,
                  eng_img: test.fileName,
                  eng_img_URL:test.file_url
    
                });
              } catch (error) {
                message.error({ content: `Error!`, key, duration: 2 });
              }
            }}
          >
            {postObject.eng_img? (
              <img
              src={postObject.eng_img_URL}

                // src={singleDress.image_en}
                alt="avatar"
                className="img-fluid"
              />
            ) : (
              <img
              // src={postObject.eng_img}

                src={singleDress.image_en}
                alt="avatar"
                className="img-fluid"
              />
            )}
          </Dragger>
        </Card>
       
      </Col>   
      <Col xs={24} sm={24} md={7}>
        <Card title="Arabic Image" style={{ height: 365 }}>
          <Dragger
                    disabled={actionType === "view"}

            {...imageUploadProps}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const key = "updatable";
              message.loading({ content: "Loading...", key, duration: 15 });

              const imageObject = { type: "Banners", file: options.file };
              const data = new FormData();
              try {
                for (const key of Object.keys(imageObject)) {
                  data.append(key, imageObject[key]);
                }
                const test = await service.post("/upload_media", data);
                // console.log(test)
                message.success({
                  content: `${test.file_url} Uploaded Successfully!`,
                  key,
                  duration: 2,
                });
                setPostObject({
                  ...postObject,
                  arb_img: test.fileName,
                  arb_img_URL:test.file_url
                });
              } catch (error) {
                message.error({ content: `Error!`, key, duration: 2 });
              }
            }}
          >
           {postObject.arb_img? (
              <img
              src={postObject.arb_img_URL}

                // src={singleDress.image_en}
                alt="avatar"
                className="img-fluid"
              />
            ) : (
              <img
              // src={postObject.eng_img}

                src={singleDress.image_ar}
                alt="avatar"
                className="img-fluid"
              />
            )}
          </Dragger>
        </Card>
       
      </Col>  
        </Row>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
