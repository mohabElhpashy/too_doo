import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tag, Upload, Tooltip } from "antd";
import service from "auth/FetchInterceptor";
import { convertingServiceId } from "constants/helperFunctions";
import ServiceIdConstants from "constants/ServiceIdConstants";
import { useFetch } from "hooks";
import { lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomTable from "../../../../Components/CustomTable";

const handleSelection = (service_id) => {
  switch (service_id) {
    case 8:
      return `makeup/AddMakeupService`;
    case 7:
      return `dresses/AddDress`;
    case 6:
      return `trips/AddTripForm`;

    case 5:
      return `photographer/AddPhotoSession`;

    case 4:
      return `beauty/AddBeautyCenterServices`;

    case 3:
      return `doctors/AddCheckUPs`;

    case 2:
      return `hotel/addWedding`;

    case 1:
      return `cars/AddCar`;

    default:
      break;
  }
};
const SellersComponents = ({setPostobject,Postobject}) => {
  const { services, refetch, error, isSuccess } = useFetch("sellers");
  const [singleImage, setSingleImage] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const history = useHistory();
  useEffect(() => setCurrentList(services), [services]);

  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.put(`/web/sellers/change-status/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });
      refetch();
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  let filteredServiceName = [];
  for (const key in ServiceIdConstants) {
    filteredServiceName.push({
      value: ServiceIdConstants[key],
      text: key
        .split("_")[0]
        .split("")
        .map((element, index) => {
          if (index > 0) {
            return lowerCase(element);
          }
          if (index === 0) {
            return element;
          }
        })
        .join(""),
    });
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: " Name ",
      dataIndex: "first_name",
      key: "first_name",
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Seller Name"}
      //     prevousState={services}
      //     url="seller/search?seller_search"
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Service Name",
      // sorter: (a, b) => a.service_id - b.service_id,
      // filters:  [{ text: "test", value: "Woa" }],
      filters: filteredServiceName,
      filterMultiple: false,
      onFilter: (value, record) => record.service_id === value,
      render: (_, obj) => {
        return convertingServiceId(obj.service_id);
      },
    },

    {
      title: "Number Of Followers",
      key: "number_of_followers",
      align: "center",
      dataIndex: "number_of_followers",
      render: (number, record) => {
        return (
          <div className=" d-flex align-items-center justify-content-center">
            <Link
              to={{
                pathname: `/app/apps/social/followers`,
                state: {
                  record_id: record.id,
                },
              }}
            >
              <Button
                disabled={number == 0 || !number ? true : false}
                className="ant-btn-lg "
                style={{
                  fontSize: 12,
                  backgroundColor: "transparent",
                  borderColor: "#699dff",
                }}
              >
                <span
                  style={{ fontWeight: "400", fontSize: 18 }}
                  className=" mr-1"
                >
                  {!number ? "0" : number}
                </span>
                {number == 1 ? "Follower" : `Followers`}
              </Button>
            </Link>
          </div>
        );
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "active",
    //   key: "active",
    //   render: (text, record) => {
    //     if (text) {
    //       return (
    //         <Tag
    //           className="cursor-pointer"
    //           onClick={() => changeStatus(record)}
    //           color="green"
    //         >
    //           Approve
    //         </Tag>
    //       );
    //     } else {
    //       return (
    //         <Tag
    //           className="cursor-pointer "
    //           onClick={() => changeStatus(record)}
    //           color="red"
    //         >
    //           UnApproved
    //         </Tag>
    //       );
    //     }
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "actions",
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <Tooltip title="Add Product to This Seller">
    //         <Link
    //           to={{
    //             pathname: `/app/apps/${handleSelection(elm.service_id)}`,
    //             search: `?store_id=${elm?.store_id}&seller_id=${elm.id}`,
    //           }}
    //         >
    //           <Button
    //             icon={<PlusOutlined />}
    //             style={{ justifyContent: "center", alignItems: "center" }}
    //           />
    //         </Link>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
  ];
  console.log("seller",services)
  return (
    <div>
      <CustomTable
          radio={"done"}

        dataRender={currentList}
        coloumRender={columns}
        isLoading={!isSuccess}
        prevousState={services}
        setCurrentList={setCurrentList}
        refetch={refetch}
        error={error}
        endPoint="sellers"
        addEndPoint="CRM/addForm"
        editEndPoint="CRM/veForm"
        setPostobject={setPostobject}
        Postobject={Postobject}
        useSELECT={true}
        // searchUrl="seller/search?seller_search"
        // hasNotification={"Seller"}
        noAction
        noAddOption
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
    </div>
  );
};

export default SellersComponents;
