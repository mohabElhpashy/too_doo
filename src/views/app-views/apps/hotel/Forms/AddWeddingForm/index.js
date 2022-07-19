import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, notification } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useFetch } from "hooks";
import service from "auth/FetchInterceptor";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("hotels");
  const tags = useFetch("tags");
  const genericOptions = useFetch("weddingHallGenericOption");
  const gerericOptionsList = genericOptions.services;
  const tagsList = tags.services;
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    hotel_id: null,
    main_image: null,
    subImages: [],
    tags: [],
    options: [],
  });
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };

  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      await service.post("/web/weddingHall", data);

      setSubmitLoading(false);
      openNotificationWithIcon("success");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
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
                {mode === "ADD" ? "Add New Product" : `Edit Product`}{" "}
              </h2>
              <div className="mb-3">
                <Button className="mr-2">Discard</Button>
                <Button
                  type="primary"
                  onClick={() => onFinish(postObject)}
                  htmlType="submit"
                  loading={submitLoading}
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
                services={services}
                tagsList={tagsList}
                postObject={postObject}
                setPostObject={setPostObject}
                gerericOptionsList={gerericOptionsList}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
