import {
  Button,
  Form,
  Input,
  message,
  Upload,
  Rate,
  Switch,
  Select,
} from "antd";
import service from "auth/FetchInterceptor";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";
import { useFetch } from "hooks";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";

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
const { Option } = Select;
const AddCheckUPs = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const { services } = useFetch("clinics");
  const [error, setError] = useState(false);
  const location = useLocation();
  const emptyState = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    main_image: null,
    rating: 0,
    clinic_id: null,
    status: null,
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
    if (postObject.name_ar && postObject.name_en && postObject.description_ar)
      return true;
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
        await service.post("/web/checkups", data);
      } else {
        await service.put(`/web/checkups/${postObject.id}`, data);
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
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
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="doctors/AddCheckUPs"
          tablePage="doctors/checkup"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New CheckUp"
              : "Editing Record"}
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

            <Form.Item
              name="description_ar"
              label={
                <span>
                  Description in Arabic:&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    description_ar: e.target.value,
                  })
                }
                placeholder="Please enter your Description in Arabic"
                defaultValue={postObject.description_ar}
                value={postObject.description_ar}
                name="description_ar"
              />
            </Form.Item>

            <Form.Item name={"description_en"} label="Descritpion in English">
              <Input.TextArea
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    description_en: e.target.value,
                  })
                }
                placeholder="Please enter your Description in English"
                value={postObject.description_en}
                defaultValue={postObject.description_en}
                name="description_en"
              />
            </Form.Item>
            <Form.Item name={"main_image"} label="Upload a Dress Image">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload an Image</Button>
              </Upload>
              {/* <input raiting="file" name="main_image" onChange={imageUpload} /> */}
            </Form.Item>

            <Form.Item name={"price"} label="Price">
              <Input
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({ ...postObject, price: e.target.value })
                }
                placeholder="Please enter your Price"
                value={postObject.price}
                defaultValue={postObject.price}
                name="price"
              />
            </Form.Item>
            <Form.Item name={"rating"} label="Rating">
              <Rate
                style={{ width: 150 }}
                onChange={(e) => setPostObject({ ...postObject, rating: e })}
                defaultValue={parseFloat(postObject.rating)}
                allowHalf
                name="Rating"
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
            <Form.Item
              name="clinic_id"
              required
              label={<span>Clinic Name&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a Clinic"
                optionFilterProp="children"
                defaultValue={postObject.clinic_id}
                onChange={(e) => setPostObject({ ...postObject, clinic_id: e })}
                value={postObject.clinic_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {services?.map((element) => (
                  <Option value={element.id}>{element.name_en}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("checkup")}
              >
                Cancel
              </Button>
              <Button
                loading={isloading}
                type="primary"
                htmlType="submit"
                onClick={() => setLoading(true)}
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
export default AddCheckUPs;
