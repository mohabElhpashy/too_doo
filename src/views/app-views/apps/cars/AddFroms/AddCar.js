import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Select, Switch, Upload } from "antd";
import service from "auth/FetchInterceptor";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";
const { Option } = Select;
const formItemLayout = {};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddCar = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const emptyState = {
    name_ar: "",
    name_en: "",
    main_image: null,
    status: null,
    type_id: "",
    price: "",
    agency_id: null,
  };
  let initalState;
  if (location.state !== undefined) {
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
  } else {
    initalState = emptyState;
  }
  const [postObject, setPostObject] = useState(initalState);

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.name_ar && postObject.name_en) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      if (initalState === emptyState) {
        await service.post("/web/cars", data);
      } else {
        await service.put(`/web/cars/${postObject.id}`, data);
      }
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  //Handel Upload Image

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      const img = info.fileList[0];
      setPostObject({ ...postObject, main_image: img });
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setPostObject({
          ...postObject,
          main_image: info.fileList[0].originFileObj,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      {error || isSuccess ? (
        <CustomSubmittion
          type={isSuccess ? "success" : "error"}
          samePage="cars/AddCar"
          tablePage="/cars/cars"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState ? "Adding New Car" : "Editing Record"}
          </h2>
          <Form
            {...formItemLayout}
            form={form}
            onSubmitCapture={(e) => {
              e.preventDefault();
              handelSubmit(postObject);
            }}
            name="register"
            // onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name_ar"
              label={
                <span>
                  Name in Arabic&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your name in Arabic"
                value={postObject.name_ar}
                defaultValue={postObject.name_ar}
                name="name_ar"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_ar: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="name_en"
              label={
                <span>
                  Name in English&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your name in English"
                value={postObject.name_en}
                defaultValue={postObject.name_en}
                name="name_en"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_en: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item name={"price"} label="Price">
              <Input
                type="number"
                onChange={(e) =>
                  setPostObject({ ...postObject, price: e.target.value })
                }
                placeholder="Please enter your Price in EGP"
                value={postObject.price}
                defaultValue={postObject.price}
                addonAfter="EGP"
                name="price"
              />
            </Form.Item>

            <Form.Item name={"type_id"} label="Type Id">
              <Input
                onChange={(e) =>
                  setPostObject({ ...postObject, type_id: e.target.value })
                }
                placeholder="Please enter your Type Id"
                value={postObject.type_id}
                name="type"
              />
            </Form.Item>

            <Form.Item name={"agency_id"} label="Agency Id">
              <Input
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    agency_id_id: parseInt(e.target.value),
                  })
                }
                placeholder="Please enter your Agancy Id"
                defaultValue={postObject.agency_id_id}
                value={postObject.agency_id_id}
                name="agency_id"
              />
            </Form.Item>
            <Form.Item name={"status"} label="Status">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) => {
                  if (e) setPostObject({ ...postObject, status: 1 });
                  else {
                    setPostObject({ ...postObject, status: 0 });
                  }
                }}
                defaultChecked
              />
            </Form.Item>
            <Form.Item name={"main_image"} label="Upload a Car Image">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload an Image</Button>
              </Upload>
              {/* <input type="file" name="main_image" onChange={imageUpload} /> */}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("/app/apps/cars/cars")}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!buttonValidation()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
export default AddCar;
