import React, { useState } from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { Button, Tag, message, Table, Badge, Upload, Modal } from "antd";
import service from "auth/FetchInterceptor";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import Loading from "components/shared-components/Loading";
function ProductsByTag() {
  const location = useLocation();
  const tagId = new URLSearchParams(location.search).get("id");
  const serivceId = new URLSearchParams(location.search).get("serviceId");
  const { services, isLoading, isError, refetch, error, isSuccess } = useFetch(
    `tags/${serivceId}/${tagId}`
  );
  const [singleImage, setSingleImage] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Store Name",
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
    // {
    //   title: "Seller Name",
    //   dataIndex: "seller_name",
    //   key: "seller_name",
    //   // sorter: (a, b) => a.seller_name.length - b.seller_name.length,
    //   // render: (name, obj) => (
    //   //   <a
    //   //     onClick={() =>
    //   //       history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
    //   //     }
    //   //   >
    //   //     {name}
    //   //   </a>
    //   // ),
    // },

    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rate) => (
    //     <Rate
    //       allowHalf
    //       disabled
    //       style={{ width: 150 }}
    //       defaultValue={parseFloat(rate)}
    //     />
    //   ),
    //   sorter: (a, b) => a.raiting - b.rating,
    // },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <div style={{ display: "flex" }}>
              <Badge status="success" />
              <span style={{ fontWeight: "bolder" }}>Active</span>
            </div>
          );
        } else {
          return (
            <>
              <Badge status="error" />
              <span>Inactive</span>
            </>
          );
        }
      },
    },
  ];
  return (
    <>
      {isLoading ? (
        <Loading cover="content" align={"center"} loading={true} />
      ) : (
        <>
          <Table
            title={() => <h2>List of Products </h2>}
            dataSource={services}
            columns={columns}
            rowKey={(item) => item.id?.toString()}
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
        </>
      )}
    </>
  );
}

export default ProductsByTag;
