import { Button, Form, Tabs } from "antd";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Custom_Notifications from "views/app-views/apps/generic/Notifications";
import ClientInfo from "./ClientInfo";
import GeneralField from "./GeneralField";
import StoreInfo from "./StoreInfo";
import Comments from './Comments'

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const [postObject, setPostObject] = useState({
    title: "",
    body: "",
    contact_name: "",
    contact_phone: "",
  });

  const recordId = new URLSearchParams(location.search).get("id");
  const checkViewMode = new URLSearchParams(location.search).get("name");
  const { services, isFetching, isSuccess } = useFetchSingle(
    `beautyCenterServiceReservations/${recordId}`
  );
  let storeObject = {};
  useEffect(() => {
    if (isSuccess) {
      storeObject = services?.product?.store;
      form.resetFields();
      setPostObject(services);
    }
  }, [isSuccess]);
  //Handle Notification
  // Button Disabled
  const disabledObjcet = {
    title: "",
    body: "",
  };
  const buttonValidation = () => {
    let count = 0;
    for (const key in disabledObjcet) {
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

  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
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
                <h2 className="mb-3">Read Reservation</h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("ListRequests")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!buttonValidation() || checkViewMode === "view"}
                    loading={loading}
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
                  postObject={postObject}
                  checkViewMode={checkViewMode === "view"}
                />
              </TabPane>
              <TabPane tab="Client" key="2">
                <ClientInfo
                  setPostObject={setPostObject}
                  postObject={postObject}
                  checkViewMode={checkViewMode === "view"}
                />
              </TabPane>
              <TabPane tab="Store" key="3">
                <StoreInfo
                  setPostObject={setPostObject}
                  postObject={postObject}
                  checkViewMode={checkViewMode === "view"}
                />
              </TabPane>
              <TabPane tab="Notifications" key="4">
                <Custom_Notifications services={services?.notifications} />
              </TabPane>
              <TabPane tab="Comments" key="5">
                <Comments recordId={recordId}/>
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
