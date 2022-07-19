import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select, Table, Tooltip } from "antd";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";

const { Column } = Table;
const AddNewCardForm = ({
  visible,
  onCancel,
  services,
  tableList,
  setTableList,
  setModelVisable,
  setTestArray,
  testArray,
  actionType,
  form,
}) => {
  const [selectedId] = useState(null);
  // const [testArray, setTestArray] = useState([]);
  // const [form] = Form.useForm();
  // const handlePaymentSelection = (e, check) => {
  //   // setPostObject({ ...postObject, payment_method: e });

  //   setSelectedId(e);
  // };
  const onSubmitModal = () => {
    const currentObj = services.find((element) => element.id === selectedId);
    let newArray = [];
    for (const iterator of testArray) {
      const objTrasformation = services.find(
        (element) => element.id === iterator
      );
      newArray.push(objTrasformation);
    }
    setTableList(newArray);
    // if (!tableList.find((element) => element.id === selectedId)) {
    //   setTableList(testArray);
    // }
  };
  return (
    <Modal
      title="Add Payment Method"
      visible={visible}
      okText="Save Payment Method"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            if (testArray.length > 0) {
              onSubmitModal();
              setModelVisable(false);
            }
          })
          .catch((info) => {});
      }}
    >
      <Form
        form={form}
        name="addCardForm"
        layout="vertical"
        // initialValues={{ paymentMethodType: testArray }}
      >
        <Form.Item label="Payment Method Type" name="paymentMethodType">
          <Select
            showSearch
            name="paymentMethodType"
            mode="multiple"
            placeholder="Select a Service Name"
            onChange={(e) => setTestArray(e)}
            value={testArray}
            // defaultValue={testArray}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {services?.map((element, index) => (
              <Select.Option key={element.id} value={element.id}>
                {element?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Billing = ({
  postObject,
  setPostObject,
  paymentList,
  checkView,
  actionType,
  paymentMethodList,
}) => {
  let inialState;
  if (paymentList) {
    inialState = paymentList;
  } else {
    inialState = [];
  }
  const [tableList, setTableList] = useState(inialState);
  const [modalVisible, setModelVisable] = useState(false);
  const { services } = useFetch("paymentMethods");
  const [form] = Form.useForm();

  const [testArray, setTestArray] = useState([]);
  console.log(testArray, "TEST Array");
  const locale = {
    emptyText: (
      <div className="text-center my-4">
        <img
          src="/img/others/img-7.png"
          alt="Add credit card"
          style={{ maxWidth: "90px" }}
        />
        <h3 className="mt-3 font-weight-light">Please add a Payment Method!</h3>
      </div>
    ),
  };
  useEffect(() => {
    setPostObject({
      ...postObject,
      payment_method: [...tableList],
    });

    //   setPostObject({
    //     ...postObject,
    //     payment_method: [
    //       ...tableList.map((element) => element.payment_method_id),
    //     ],
    //   });
    // } else {
    //   setPostObject({
    //     ...postObject,
    //     payment_method: [...tableList.map((element) => element.id)],
    //   });
    // }
  }, [tableList]);
  return (
    <>
      <Table
        dataSource={tableList}
        // dataSource={postObject.store.payment_methods}

        rowKey={(element) => element.id}
        locale={locale}
        pagination={false}
      >
        <Column
          title="Payment Method"
          key="icon"
          render={(text, record) => (
            <>
              <img
                src={record.icon}
                alt={record.name}
                style={{ maxWidth: 80 }}
              />
            </>
          )}
        />
        <Column
          title="Type"
          dataIndex="cardNumber"
          key="cardNumber"
          render={(text, record) => (
            <span className="ml-2" style={{ fontWeight: "bold" }}>
              {record.name_en || record.name}
            </span>
          )}
        />
        <Column
          title="Actions"
          key="actions"
          className="text-right"
          render={(text, record) => (
            <Tooltip title="Remove Method">
              <Button
                type="link"
                shape="circle"
                icon={
                  <DeleteOutlined
                    style={{ color: !checkView ? "tomato" : "gray" }}
                  />
                }
                onClick={() => {
                  if (checkView || actionType) {
                    return null;
                  } else {
                    form.resetFields();
                    setTestArray(
                      testArray.filter((element) => element !== record.id)
                    );

                    setTableList(
                      tableList.filter((item) => item.id !== record.id)
                    );
                  }
                }}
              />
            </Tooltip>
          )}
        />
      </Table>
      {tableList?.length < paymentMethodList?.length ? (
        <div className="mt-3 text-right">
          <Button
            disabled={checkView || actionType}
            type="primary"
            onClick={() => setModelVisable(true)}
          >
            Add Payment Method
          </Button>
        </div>
      ) : null}

      <AddNewCardForm
        testArray={testArray}
        form={form}
        setTestArray={setTestArray}
        tableList={tableList}
        services={services}
        setTableList={setTableList}
        visible={modalVisible}
        setModelVisable={setModelVisable}
        onCancel={() => setModelVisable(false)}
      />
    </>
  );
};

export default Billing;
