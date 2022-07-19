import { Button, Form, Tabs } from "antd";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import HelperComponent from "./HelperComponent";
const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const [postObject, setPostObject] = useState({
    changes: {},
    new: {},
    old: {
      name_ar: "",
      name_en: "",
      description_ar: "",
      description_en: "",
      agency_id: null,
      main_image: null,
      images: [],
      details: [],
      tags: [],
    },
  });

  // Store List
  const serviceListRes = useFetch("services");
  const serviceList = serviceListRes.services;
  // const dressSoreListSuccess = serviceListRes.isSuccess;
  const recordId = new URLSearchParams(location.search).get("id");

  const checkViewMode = new URLSearchParams(location.search).get("name");
  const { services, isFetching, isSuccess } = useFetchSingle(
    `sellerChanges/${recordId}`
  );

  const [newChanges, setNewChanges] = useState();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setNewChanges({
        ...services?.changes,
      });

      setPostObject({
        ...services?.old,
      });
    }
  }, [isSuccess]);

  // Button Disabled
  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={{
            prefix: "+02",
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
                <h2 className="mb-3">Read Seller Changes</h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("sellerChanges")}
                  >
                    Go Back
                  </Button>
                  {/* <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation() || checkViewMode === "view"}
                  loading={loading}
                >
                  Save
                </Button> */}
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs
              defaultActiveKey={postObject.new ? "1" : "2"}
              style={{ marginTop: 30 }}
            >
              {services.new && (
                <TabPane tab="New Changes" key="1">
                  <HelperComponent
                    newChange={true}
                    services={serviceList}
                    postObject={newChanges}

                    // setPostObject={setPostObject}
                    // postObject={postObject.changes.information}
                    // checkView={checkViewMode === "view"}
                  />
                </TabPane>
              )}
              <TabPane tab={postObject.new ? "Old Seller" : "General"} key="2">
                <HelperComponent
                  services={serviceList}
                  postObject={postObject}
                  newChange={false}
                />
              </TabPane>

              {/* <TabPane tab="Store Information" key="4">
                <GeneralField
                  checkView={true}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  setVariationList={setVariationList}
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

export default ProductForm;
