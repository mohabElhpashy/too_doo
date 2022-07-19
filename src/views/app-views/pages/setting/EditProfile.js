import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, message, Row, Upload } from "antd";
import service from "auth/FetchInterceptor";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { ROW_GUTTER } from "constants/ThemeConstant";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
const EditProfile = () => {
  const currentUserr = localStorage.getItem("user");
  const admin = JSON.parse(currentUserr);
  const [form] = Form.useForm();

  const { data, isSuccess, refetch } = useQuery(
    `admin/${admin.id}`,
    async () => {
      try {
        const res = await service.get(`${admin.id}`);
        return res.record;
      } catch (error) {}
    }
  );
  const avatarEndpoint =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const onChangeInput = (value, key) => {
    setUser({ ...user, [key]: value });
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setUser(data);
    }
  }, [isSuccess]);
  const handleSubmit = async () => {
    const key = "Updatabl!";
    message.loading({ content: "Loading...", key });

    try {
      await service.put(`/${admin.id}`, user);
      message.success({ content: "Done!", key, duration: 2 });
      refetch();
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  {
    return (
      <>
        {isSuccess ? (
          <>
            <Flex
              alignItems="center"
              mobileFlex={false}
              className="text-center text-md-left"
            >
              <Avatar size={90} src={avatarEndpoint} icon={<UserOutlined />} />
              <div className="ml-3 mt-md-0 mt-3">
                <Upload showUploadList={false}>
                  <Button type="primary">Change Avatar</Button>
                </Upload>
                <Button className="ml-2">Remove</Button>
              </div>
            </Flex>
            <div className="mt-4">
              <Form
                form={form}
                onFinish={handleSubmit}
                name="basicInformation"
                layout="vertical"

                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={16}>
                    <Row gutter={ROW_GUTTER}>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Frist Name"
                          name="first_name"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please input your name!",
                          //   },
                          // ]}
                        >
                          <Input
                            onChange={(e) =>
                              onChangeInput(e.target.value, "first_name")
                            }
                            defaultValue={user.first_name}
                            placeholder="Please enter your First Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Last Name"
                          name="last_name"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please input your username!",
                          //   },
                          // ]}
                        >
                          <Input
                            onChange={(e) =>
                              onChangeInput(e.target.value, "last_name")
                            }
                            defaultValue={user.last_name}
                            placeholder="Please enter your Last Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please enter a valid email!",
                          //   },
                          // ]}
                        >
                          <Input
                            onChange={(e) =>
                              onChangeInput(e.target.value, "email")
                            }
                            defaultValue={user.email}
                            placeholder="Please enter your Email"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          required
                          label="Phone Number"
                          name="phoneNumber"
                        >
                          <Input
                            onChange={(e) =>
                              onChangeInput(e.target.value, "phoneNumber")
                            }
                            defaultValue={user.phone}
                            placeholder="Please enter your Phone Number"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                      Save Change
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </>
        ) : (
          <Loading cover="content" align={"center"} loading={true} />
        )}
      </>
    );
  }
};

export default EditProfile;
