import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table, Upload } from "antd";
import Loading from "components/shared-components/Loading";
import { useFetchSingle } from "hooks";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useLocation } from "react-router";
import { invoiceData } from "./invoiceData";
import { convertingServiceId } from "constants/helperFunctions";
const { Column } = Table;

const Invoice = () => {
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const { services, isSuccess } = useFetchSingle(`order/details/${recordId}`);
  const [singleImage, setSingleImage] = useState("");
  console.log(services, "Product");
  const productColumn = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => ` # ${id} `,
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Product Name",
      dataIndex: "product_name_en",
      key: "product_name_en",
      sorter: (a, b) => a.product_name_en.length - b.product_name_en.length,
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Service Type",
      dataIndex: "service_id",
      key: "service_id",
      render: (serviceId) => convertingServiceId(serviceId),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price} EGP`,
    },
    {
      title: "Order Date",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];
  const total = () => {
    let total = 0;
    invoiceData.forEach((elm) => {
      total += elm.price;
    });
    return total;
  };
  return (
    <>
      {isSuccess ? (
        <div className="container">
          <Card>
            <div className="d-md-flex justify-content-md-between">
              <div>
                <img
                  src="/image.ico"
                  alt="Logo"
                  style={{ height: 60, marginBottom: 20 }}
                />
                <address className="mt-4">
                  <p>
                    <span className="font-weight-semibold text-dark font-size-md">
                      Client Info
                    </span>
                    <br />

                    <span className="mr-1">Client Name:</span>
                    <span>{services?.client_name}</span>
                    <br />
                    <span className="mr-1">Client Email:</span>
                    <span>{services?.client_email}</span>
                    <br />
                    <span className=" mr-1" title="Phone">
                      Client Phone:
                    </span>
                    <span> {services?.client_phone}</span>
                  </p>
                </address>
              </div>
              <div className="mt-3 text-right">
                <h2 className="mb-1 font-weight-semibold">
                  Invoice #{recordId}
                </h2>
                <p style={{ margin: 0 }}>
                  Order Date: {services?.created_at.split("T")[0]}
                </p>
                <p>Payment Method: Cash</p>
                <address>
                  <p>
                    <span className="font-weight-semibold text-dark font-size-md">
                      Store Info
                    </span>
                    <br />
                    <span className="mr-1">Store Name: </span>
                    <span>{services?.order_products[0]?.store_name_en}</span>
                    <br />
                    <span className="mr-1">Store Address:</span>
                    <span>{services?.order_products[0]?.store_address_en}</span>
                    <br />
                    <span className="mr-1">Store Phone:</span>
                    <span>{services?.order_products[0]?.store_phone}</span>
                  </p>
                </address>
              </div>
            </div>
            <div className="mt-4">
              <Table
                dataSource={invoiceData}
                pagination={false}
                className="mb-5"
              >
                <Column title="No." dataIndex="key" key="key" />
                <Column title="Product" dataIndex="product" key="product" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column
                  title="Price"
                  render={(text) => (
                    <NumberFormat
                      displayType={"text"}
                      value={(Math.round(text.price * 100) / 100).toFixed(2)}
                      prefix={"$"}
                      thousandSeparator={true}
                    />
                  )}
                  key="price"
                />
                <Column
                  title="Total"
                  render={(text) => (
                    <NumberFormat
                      displayType={"text"}
                      value={(
                        Math.round(text.price * text.quantity * 100) / 100
                      ).toFixed(2)}
                      prefix={"$"}
                      thousandSeparator={true}
                    />
                  )}
                  key="total"
                />
              </Table>
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
              <div className="d-flex justify-content-end">
                <div className="text-right ">
                  {/* <div className="border-bottom">
                <p className="mb-2">
                  <span>Sub - Total amount: </span>
                  <NumberFormat
                    displayType={"text"}
                    value={(Math.round(total() * 100) / 100).toFixed(2)}
                    prefix={"$"}
                    thousandSeparator={true}
                  />
                </p>
                <p>
                  vat (10%) :{" "}
                  {(Math.round((total() / 100) * 10 * 100) / 100).toFixed(2)}
                </p>
              </div> */}
                  <h2 className="font-weight-semibold mt-3">
                    <span className="mr-1">Total Price: </span>
                    <NumberFormat
                      displayType={"text"}
                      value={(
                        Math.round(total() * 100) / 100 -
                        (total() / 100) * 10
                      ).toFixed(2)}
                      prefix={"$"}
                      thousandSeparator={true}
                    />
                  </h2>
                </div>
              </div>
              {/* <h2 className="font-weight-semibold mt-3">
            <span>Payment Method</span>
          </h2>
          <span>Cash</span> */}
              {/* <span>Payment Method</span> */}
            </div>
            <hr className="d-print-none" />
            <div className="text-right d-print-none">
              <Button type="primary" onClick={() => window.print()}>
                <PrinterOutlined type="printer" />
                <span className="ml-1">Print</span>
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default Invoice;
