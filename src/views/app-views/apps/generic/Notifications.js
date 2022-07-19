import { convertingServiceId } from "constants/helperFunctions";
import React from "react";
import CustomTable from "../Components/CustomTable";
const Custom_Notifications = ({ services }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id) => `# ${id}`,
    },
    {
      title: "Title",
      dataIndex: "title_en",
      key: "title_en",
      sorter: (a, b) => a.title_en.length - b.title_en.length,
    },
    {
      title: "Body",
      dataIndex: "body_en",
      key: "body_en",
      sorter: (a, b) => a.body_en.length - b.body_en.length,
    },
    // {
    //   title: "Service",
    //   dataIndex: "service_id",
    //   key: "service_id",
    //   sorter: (a, b) => a.service_id.length - b.service_id.length,
    //   render: (service_id) => <span> {convertingServiceId(service_id)}</span>,
    // },
    {
      title: "Send To",
      dataIndex: "target_notifications",
      key: "target_notifications",
      sorter: (a, b) => a.body_en.length - b.body_en.length,
      render: (_, obj) => (
        <span> {obj.target_notifications[0].target_type}</span>
      ),
    },
    {
      title: "Seen",
      dataIndex: "target_notifications",
      key: "target_notifications",
      sorter: (a, b) => a.body_en.length - b.body_en.length,
      render: (_, obj) => (
        <span>{obj.target_notifications[0].is_read ? "Seen" : "Not Seen"}</span>
      ),
    },
    // {
    //   title: "Service Name",
    //   dataIndex: "service_id",
    //   key: "service_id",
    //   render: (id) => tempConverstion(id),
    //   // sorter: (a, b) => a.service_id - b.service_id,
    // },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Notifications"
        coloumRender={columns}
        dataRender={services}
        noAction
        noAddOption
      />
    </>
  );
};

export default Custom_Notifications;
