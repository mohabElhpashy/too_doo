
import { Avatar, Comment, message, Rate, Table, Tag, Tooltip } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
function Complain() {
  const { services, refetch, isLoading, isError } = useFetch("complains");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  if (isError) {
    <TestError />;
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
    },
    {
      title: "User Complain",
      key: "id",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
             
            </span>,
          ]}
          datetime={
            <Tooltip
              title={moment(Obj.created_at).format("YYYY-MM-DD HH:mm:ss")}
            >
              <span>{moment(Obj.created_at).fromNow()}</span>
            </Tooltip>
          }
          content={<p>{Obj.message}</p>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          author={
            <a
              onClick={() =>
                history.push(
                  Obj.type === "seller"
                    ? `/app/apps/CRM/veForm?name=view&id=${Obj.user_id}`
                    : `/app/apps/CRM/ReadClient?name=view&id=${Obj.user_id}`
                )
              }
            >
              {Obj.user_name}
            </a>
          }
        />
      ),
    },

    //   {
    //     title: "Client Name",
    //     dataIndex: "client_name",
    //     key: "client_name",
    //   },
    {
      title: "User Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <span style={{ fontWeight: "bold" }}>{type}</span>,
    },

    //   {
    //       title: "Rating",
    //       dataIndex: "rating",
    //       key: "rating",
    //       render:(rate)=>  <Rate allowHalf disabled defaultValue={rate} />
    //       ,
    //       sorter: (a, b) => a.rating - b.rating,
    //     },
    //   {
    //       title: "Review",
    //       dataIndex: "review",
    //       key: "review",
    //     },
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
    //           Active
    //         </Tag>
    //       );
    //     } else {
    //       return (
    //         <Tag
    //           className="cursor-pointer "
    //           onClick={() => changeStatus(record)}
    //           color="red"
    //         >
    //           InActive
    //         </Tag>
    //       );
    //     }
    //   },
    // },

    {
      title: "Viewed",
      key: "Seen",
      render: (test, record) => (record.viewed ? "Seen" : "Not Seen"),
    },

    ,
  ];
  return (
    <>
      <Table
        tableLayout="auto"
        rowKey={(item) => item.id?.toString()}
        columns={columns}
        bordered
        dataSource={services}
        title={() => <h2> Complain </h2>}
      ></Table>
    </>
  );
}

export default Complain;
