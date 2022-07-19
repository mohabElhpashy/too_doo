import { Modal, Tag, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useQuery } from "react-query";
import CustomTable from "../../../../Components/CustomTable";
function Offers_Component({setpostObject,Postobject}) {
  const { services, refetch, isLoading } = useFetch("offers");
  const [singleImage, setSingleImage] = useState("");
  console.log(services);
  // const changeStatus = async (record) => {
  //   try {
  //     await service.put(`/web/sellers/change-status/${record.id}`);
  //     refetch();
  //   } catch (error) {
  //     ;
  //   }
  // };
  const colums = [
    {
      title: "ID",
      key: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    // {
    //   title: "Product ID",
    //   dataIndex: "product_id",
    //   key: "product_id",
    // },
    {
      title: "Service Name ",
      dataIndex: "service_name_en",
      key: "service_name_en",
      sorter: (a, b) => a.service_name_en.length - b.service_name_en.length,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      sorter: (a, b) => a.capacity - b.capacity,
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
      title: "New Price",
      dataIndex: "new_price",
      key: "new_price",
      sorter: (a, b) => a.new_price - b.new_price,
      render: (price) => `${Math.round(price)} EGP`,
    },
    {
      title: "Offer From",
      dataIndex: "offer_from",
      key: "offer_from",
    },
    {
      title: "Offer To",
      dataIndex: "offer_to",
      key: "offer_to",
    },
    // {
    //   title: "Status",
    //   dataIndex: "approve",
    //   align: "center",
    //   key: "approve",
    //   render: (text, record) => {
    //     if (text) {
    //       return (
    //         <div className="d-flex align-items-center justify-content-center">
    //           <Tag
    //             // className="cursor-pointer"
    //             // onClick={() => changeStatus(record)}
    //             color="green"
    //           >
    //             Approve
    //           </Tag>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div className="d-flex align-items-center justify-content-center">
    //           <Tag
    //             // className="cursor-pointer "
    //             // onClick={() => changeStatus(record)}
    //             color="red"
    //           >
    //             unApproved
    //           </Tag>
    //         </div>
    //       );
    //     }
    //   },
    // },
  ];

  return (
    <>
      <CustomTable
          radio={"done"}

        dataRender={services}
        coloumRender={colums}
        isLoading={isLoading}
        refetch={refetch}
        noAddOption
        noAction
        // setPostobject={setPostobject}
        Postobject={Postobject}
        useSELECT={true}
        i_d={Postobject.products}
        
       
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
  );
}

export default Offers_Component;
