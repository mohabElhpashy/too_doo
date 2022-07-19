import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import VariationField from "./VariationField";
import ShippingField from "./ShippingField";
import ProductListData from "assets/data/product-list.data.json";
import { useFetch } from "hooks";
import { useHistory, useLocation } from "react-router-dom";
import service from "auth/FetchInterceptor";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const { mode = ADD, param } = props;
  const { services } = useFetch("services");
  const location = useLocation();
  const emptyState = {
    name_ar: "",
    name_en: "",
    available_from: "",
    number_of_items: "",
    available_to: "",
    products: [],
  };

  let initalState;
  if (location.state !== undefined) {
    if (location.state.viewMode !== undefined) {
      var { viewMode } = location.state;
      initalState = viewMode;
    } else {
      const { record } = location.state;
      for (const key in record) {
        if (
          key === "updated_at" ||
          key === "created_at" ||
          key === "deleted_at"
        ) {
          delete record[key];
        }
      }
      initalState = record;
    }
  } else {
    initalState = emptyState;
  }
  const inialOperations = {
    service_id: null,
    store_id: null,
    product_id: null,
    newPrice: 0,
    product_name: null,
  };
  const [postObject, setPostObject] = useState(initalState);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentPackage, setPackage] = useState([]);
  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);
  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      const produtId = parseInt(id);
      const productData = ProductListData.filter(
        (product) => product.id === produtId
      );
      const product = productData[0];
      form.setFieldsValue({
        comparePrice: 0.0,
        cost: 0.0,
        taxRate: 6,
        description:
          "There are many variations of passages of Lorem Ipsum available.",
        category: product.category,
        name: product.name,
        price: product.price,
        comparePrice: operations.newPrice,
      });
      setImage(product.image);
    }
  }, [form, mode, param, props]);

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  const onFinish = async () => {
    setPostObject({
      ...postObject,
      products: [...postObject.products, ...currentPackage],
      number_of_items: currentPackage.length,
    });
    try {
      await service.post("/web/packages", postObject);
    } catch (error) {}
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onSubmitCapture={(e) => {
          e.preventDefault();
          onFinish();
        }}
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
                  onClick={() => history.push("packages")}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
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
                setPackage={setPackage}
                currentPackage={currentPackage}
                category={services}
                setPostObject={setPostObject}
                postObject={postObject}
                uploadedImg={uploadedImg}
                uploadLoading={uploadLoading}
                handleUploadChange={handleUploadChange}
                setRequestedData={setRequestedData}
                requestedData={requestedData}
                operations={operations}
                setOperation={setOperation}
                inialOperations={inialOperations}
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
