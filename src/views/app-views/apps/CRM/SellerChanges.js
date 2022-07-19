import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Form, Input, message, Modal, Select } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";
const DEFULT_STATUS = [
  {
    id: 1,
    statusName: "Accept",
    name: "accepted",
  },
  {
    id: 2,
    statusName: "Reject",
    name: "rejected",
  },
];
const INITAL_STATE = {
  reason: "",
  status: null,
};
const ListUnApproved = () => {
  const { services, isLoading, refetch } = useFetch("approvedChanges");
  const [recordId, setRecordId] = useState(null);
  const [singleImage, setSingleImage] = useState("");
  const [form] = Form.useForm();
  const [statusVisible, setStatusVisible] = useState(false);
  const { direction } = useSelector((state) => state.theme);
  const [postObject, setPostObject] = useState(INITAL_STATE);
  const history = useHistory();

  // const dropdownMenu = (row) => (
  //   <Menu>
  //     <span className=" d-flex align-items-center justify-content-center">
  //       <h5 className="mt-1">Status</h5>
  //     </span>

  //     <Menu.Item>
  //       <Flex alignItems="center">
  //         <Badge status="error" />

  //         <span className="ml-2">Declined By Seller</span>
  //       </Flex>
  //     </Menu.Item>

  //     <Menu.Item>
  //       <Flex alignItems="center">
  //         <Badge status="error" />
  //         <span className="ml-2">Declined By Client</span>
  //       </Flex>
  //     </Menu.Item>
  //   </Menu>
  // );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      // render: (name, obj) => (
      //   <a
      //     onClick={() =>
      //       history.push(`/app/apps/dresses/editProduct?name=view&id=${obj.id}`)
      //     }
      //   >
      //     {name}
      //   </a>
      // ),
    },

    // {
    //   title: "Description ",
    //   dataIndex: "description_en",
    //   key: "description_en",
    //   render: (text) => {
    //     return trncate(text, 40);
    //   },
    //   sorter: (a, b) => a.description_en.length - b.description_en.length,
    // },

    {
      title: "Store",
      dataIndex: "store_name_en",
      key: "store_name_en",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      // render: (name, obj) => (
      //   <a
      //     onClick={() =>
      //       history.push(
      //         `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
      //       )
      //     }
      //   >
      //     {name}
      //   </a>
      // ),
    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return (
          <>
            <Badge status="warning" />
            <span style={{ fontWeight: "bold" }}>Pending</span>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisOutlined
            onClick={() => {
              setRecordId(elm.id);
              setStatusVisible(true);
            }}
            style={{ fontSize: 30, cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];
  const okButtonValidation = () => {
    if (!postObject.status || !postObject.reason) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <CustomTable
        pageTitle={"List Seller Changes"}
        dataRender={services}
        coloumRender={columns}
        noAddOption
        noEditAction
        editEndPoint="CRM/readSellerChanges"
        noDeleteAction
      />
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>

      {/* Status Modal*/}
      <Modal
        title="Change Status"
        visible={statusVisible}
        destroyOnClose={true}
        okText="Save"
        // afterClose={() => }
        onCancel={() => {
          form.resetFields();
          setPostObject(INITAL_STATE);
          setStatusVisible(false);
        }}
        okButtonProps={{ disabled: okButtonValidation() }}
        onOk={async () => {
          const key = "Updateable!";
          message.loading({ content: "Loading...", key, duration: 15 });

          try {
            await service.post(
              `web/confirmSellerChanges/${recordId}`,
              postObject
            );
            setStatusVisible(false);
            refetch();
            message.success({ content: "Done!", key, duration: 2 });
          } catch (error) {
            message.error({ content: "Error Occured!", key, duration: 2 });
          }
        }}
      >
        <Form form={form} name="addCardForm" layout="vertical">
          <Form.Item required label="Seller Status" name="sellerStatus">
            <Select
              showArrow
              placeholder="Select a Status"
              value={postObject.status}
              onChange={(e) => setPostObject({ ...postObject, status: e })}
            >
              {DEFULT_STATUS?.map((element, index) => (
                <Select.Option key={element.id} value={element.name}>
                  <Badge status={element.id === 1 ? "success" : "error"} />
                  <span className="ml-2">{element.statusName}</span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item required name="reason" label="Reason">
            <Input.TextArea
              name="reason"
              onChange={(e) =>
                setPostObject({ ...postObject, reason: e.target.value })
              }
              placeholder="Enter the Reason for the Status"
              value={postObject.reason}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListUnApproved;
