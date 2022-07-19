import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  Rate,
  Pagination,
} from "antd";
import { useFetch } from "hooks";
import Search from "antd/lib/transfer/search";
import { recordExpression } from "@babel/types";
import Loading from "components/shared-components/Loading";

const ServiceTab = ({
  title,
  serviceId,
  handleLoading,
  setHandleLoading,
  setPostObject,
  postObject,
  form,
}) => {
  const [selected, setSelected] = useState();
  // const [productList, setProductList] = useState([...dummyData]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState([]);
  const { services, isSuccess, isLoading } = useFetch(
    `productsByService/${serviceId}?page=${currentPage}`
  );

  const totalLength = services?.data?.reduce(
    (acc, value) => acc + value.length,
    0
  );

  const handleSelection = (id, index) => {
    setSelected(index);
    setPostObject({ ...postObject, model_id: id });
  };
  const handleInputChange = (value) => {
    setSearch(value);
  };
  const dynamicSearch = () => {
    const newProductList = services?.data?.filter((element) =>
      element?.name_en?.toLowerCase().includes(search.toLowerCase())
    );
    return newProductList;
  };
  useEffect(() => {
    if (isSuccess) {
      setCurrentList(dynamicSearch());
    }
  }, [services?.data, isSuccess]);

  useEffect(() => {
    setSelected("");
  }, [services?.data]);

  useEffect(() => {
    form.resetFields();
    setPostObject({ ...postObject, service_id: serviceId });
  }, [serviceId]);

  return (
    <>
      {!isSuccess ? (
        "Waiting"
      ) : (
        <Row xs={24} sm={24} md={17}>
          <Card title="Select  Product" className="w-100">
            <div
              style={{
                width: "100%",
                height: "10%",
                marginBottom: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input.Search
                style={{ width: "50%" }}
                placeholder="Enter Product Name"
                onChange={(e) => handleInputChange(e.target.value)}
                value={search}
                onSearch={(value) => value}
                enterButton
              />
            </div>

            <Form.Item
              name="tfitle_ar"
              style={{ display: "flex" }}
              onPressEnter={(e) => e.preventDefault()}
              rules={[
                { required: true, message: "Please enter Title in Arabic" },
              ]}
            >
              {currentList.map((element, index) => (
                <div
                  style={{ display: "inline-block", width: "calc(50% - 5px)" }}
                >
                  <div
                    onClick={() => handleSelection(element.id, index)}
                    key={element.id}
                    style={{
                      display: "flex",
                      marginRight: 8,
                      height: 130,
                      border: "solid",
                      borderWidth: 0.01,
                      borderColor: selected === index ? "#3e79f7" : "#f2f2f2",
                      borderRadius: 10,
                      marginBottom: 8,
                      padding: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 10,
                        }}
                        src={element.main_image}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingLeft: 15,
                      }}
                    >
                      <h4
                        style={{
                          fontWeight: "bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        {element.name_en}
                      </h4>
                      <span style={{ color: "gray" }}>
                        <Rate
                          allowHalf
                          disabled
                          style={{ width: 115, fontSize: 14 }}
                          defaultValue={parseFloat(element.rating)}
                        />
                        {element.rating}.0
                      </span>

                      <span
                        style={{
                          alignSelf: "flex-start",
                          paddingTop: 10,
                          fontWeight: "500",
                          fontSize: 16,
                          color: "#3e79f7",
                        }}
                      >
                        {element.price} EGP
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Form.Item>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                defaultCurrent={1}
                total={services?.total}
                onChange={(e) => setCurrentPage(e)}
              />
            </div>
          </Card>
        </Row>
      )}
    </>
  );
};

export default ServiceTab;
