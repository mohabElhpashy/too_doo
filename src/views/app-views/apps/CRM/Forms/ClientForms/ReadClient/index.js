import {
  DollarCircleOutlined,
  FacebookOutlined,
  GoogleOutlined,
  LoginOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, Row, Table, Tabs, Tag } from "antd";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { Icon } from "components/util-components/Icon";
import {
  convertingServiceId,
  getPaymentStatus,
} from "constants/helperFunctions";
import { useFetch, useFetchSingle } from "hooks";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import utils from "utils";
import CustomTable from "views/app-views/apps/Components/CustomTable";
import { groupList } from "./profileData";

const WishListCOLOUM = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `# ${id}`,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    title: "Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (date) => date.split("T")[0],
    sorter: (a, b) => a.updated_at - b.updated_at,
  },

  {
    title: "Number Of Products",
    align: "center",
    render: (number, record) => {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <Link
            to={{
              pathname: `/app/apps/CRM/wishListProducts`,
              state: {
                products: record.products,
              },
            }}
          >
            <Button
              disabled={
                record?.products?.length == 0 || record?.products?.length === 0
                  ? true
                  : false
              }
              className="ant-btn-lg"
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
                {record?.products?.length === 0
                  ? "0"
                  : record?.products?.length}
              </span>
              {record?.products?.length === 1 ? "Product" : `Products`}
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
];

const NotificationList = [
  {
    title: "ID",
    dataIndex: "notification_id",
    key: "notification_id",
    sorter: (a, b) => a.notification_id - b.notification_id,
    render: (notification_id) => `# ${notification_id}`,
  },
  {
    title: "Title",
    key: "title_en",
    render: (_, obj) => obj?.notification?.title_en,
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
    title: "Body",
    key: "body_en",
    render: (_, obj) => obj?.notification?.body_en,

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
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (_, obj) => obj?.notification?.created_at.split("T")[0],
    sorter: (a, b) => a.created_at - b.created_at,
  },

  {
    title: "Seen",
    dataIndex: "is_read",
    key: "is_read",
    render: (is_read) => (is_read ? "Seen" : "Not Seen"),
  },
];
const clientResrvationRes = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `#${id}`,
  },
  {
    title: "Product Name",
    dataIndex: "product_name_en",
    key: "product_name_en",
    sorter: (a, b) => a.product_name_en.length - b.product_name_en.length,
  },
  {
    title: "Store Name",
    dataIndex: "store_name_en",
    key: "store_name_en",
    sorter: (a, b) => a.store_name_en.length - b.store_name_en.length,
  },
  {
    title: "Resrvation Date",
    dataIndex: "reservation_date",
    key: "reservation_date",
    render: (_, obj) =>
      obj.pickup_date
        ? obj.pickup_date.split(" ")[0]
        : obj.reservation_date.split(" ")[0],
    sorter: (a, b) =>
      a.reservation_date
        ? a.reservation_date - b.reservation_date
        : a.pickup_date - b.pickup_date,
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method_name_en",
    key: "payment_method_name_en",
    sorter: (a, b) =>
      a.payment_method_name_en.length - b.payment_method_name_en.length,
  },
  {
    title: "Resrvation Status",
    dataIndex: "status_id",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(parseInt(record.status_id))} />
        <span style={{ fontWeight: "bold" }}>{record.status_name_en}</span>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "status_name_en"),
  },
  {
    title: "Total Price",
    dataIndex: "total_price",
    key: "total_price",
    render: (price) => <span>{price} EGP</span>,
  },
];

const CLIENT_FOLLOWERS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `#${id}`,
  },
  {
    title: "Seller Name",
    dataIndex: "seller_name",
    key: "seller_name",
    sorter: (a, b) => a.seller_name.length - b.seller_name.length,
  },
  {
    title: "Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (date) => date.split(" ")[0],
    sorter: (a, b) => a.updated_at - b.updated_at,
  },

  {
    title: "Status",
    dataIndex: "active",
    key: "active",
    render: (_, obj) => (
      <Tag color={obj.active ? "green" : "red"}>
        {obj.active ? "Active" : "Unactive"}
      </Tag>
    ),
  },
];
const CLIENT_FAVOURITE = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `#${id}`,
  },
  {
    title: "Product Name",
    dataIndex: "product_name_en",
    key: "product_name_en",
    sorter: (a, b) => a.product_name_en.length - b.product_name_en.length,
  },
  {
    title: "Date",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (date) => date.split(" ")[0],

    sorter: (a, b) => a.updated_at - b.updated_at,
  },
  {
    title: "Store Name",
    dataIndex: "store_name_en",
    key: "store_name_en",
    sorter: (a, b) => a.store_name_en - b.store_name_en,
  },
  {
    title: "Service Name",
    dataIndex: "service_name_en",
    key: "service_name_en",
    sorter: (a, b) => a.service_name_en - b.service_name_en,
  },
];
const CLIENT_ORDERS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    render: (id) => `#${id}`,
  },

  {
    title: "Client Name",
    dataIndex: "client_name",
    key: "client_name",

    sorter: (a, b) => a.client_name - b.client_name,
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => date.split("T")[0],

    sorter: (a, b) => a.created_at - b.created_at,
  },
  {
    title: "Order Status",
    dataIndex: "status_type",
    key: "status_type",
    sorter: (a, b) => a.status_type - b.status_type,
    render: (status) => (
      <>
        <Badge status={getPaymentStatus(status)} />
        <span>
          {status
            .split("")
            .map((element, index) => {
              if (index > 0) {
                return element.toLowerCase();
              } else {
                return element;
              }
            })
            .join("")}
        </span>
      </>
    ),
  },
  {
    title: "Total Price",
    dataIndex: "total_amount",
    key: "total_amount",
    sorter: (a, b) => a.total_amount - b.total_amount,
    render: (price) => <span>{price} EGP</span>,
  },
];
const ProfileInfo = (props) => (
  <Card>
    <Row justify="center">
      <Col sm={24} md={24}>
        <div className="d-md-flex">
          <div
            className="rounded p-2 bg-white shadow-sm mx-auto"
            style={{
              marginTop: "-3.5rem",
              maxWidth: `${props.avatarSize + 16}px`,
            }}
          >
            <Avatar
              shape="square"
              size={props.avatarSize}
              src="/img/avatars/thumb-15.jpg"
            />
          </div>
          <div className="ml-md-4 w-100 " style={{ paddingLeft: 20 }}>
            <Flex
              alignItems="center"
              mobileFlex={false}
              className="mb-3 text-md-left text-center"
            >
              <h2 className="mb-0">
                {props.clientObject?.first_name} {props.clientObject?.last_name}
              </h2>
              <div
                className="ml-md-3 mt-3 mt-md-0"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button size="small" type="primary" className="ml-3">
                  Follow
                </Button>
                <Button size="small" className="ml-2">
                  Message
                </Button>
              </div>
            </Flex>
            <Row gutter={16}>
              {/* <Col sm={24} md={8}>
                <p className="mt-0 mr-3 text-muted text-md-left text-center">
                  It is a long established fact that a reader will be
                  distracted.
                </p>
              </Col> */}
              <Col xs={24} sm={24} md={15}>
                <Row className="mb-2">
                  <Col xs={18} sm={18} md={20} lg={8}>
                    <Icon
                      type={MailOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Email:</span>
                  </Col>
                  <Col xs={18} sm={18} md={15} lg={8}>
                    <span className="font-weight-semibold">
                      {props.clientObject?.email}
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col xs={18} sm={18} md={20} lg={8}>
                    <Icon
                      type={PhoneOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Phone:</span>
                  </Col>
                  <Col xs={18} sm={18} md={15} lg={8}>
                    <span className="font-weight-semibold">
                      {props.clientObject?.phone}
                    </span>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={18} sm={18} md={20} lg={8}>
                    <Icon
                      type={ManOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Gender:</span>
                  </Col>
                  <Col xs={18} sm={18} md={15} lg={8}>
                    <span className="font-weight-semibold">
                      {props.clientObject?.gender
                        ? props.clientObject?.gender
                        : "N/A"}
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} sm={24} md={8} xl={8}>
                <Row className="mb-2">
                  <Col xs={18} sm={18} md={20} lg={24} xl={12}>
                    <Icon
                      type={SmileOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Marital Status:</span>
                  </Col>
                  <Col xs={18} sm={18} md={15} lg={18} xl={12}>
                    <span className="font-weight-semibold">
                      {props.clientObject?.marital_status
                        ? props.clientObject?.marital_status
                        : "N/A"}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={18} sm={18} md={20} xl={12}>
                    <Icon
                      type={LoginOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Social Login:</span>
                  </Col>
                  <Col xs={18} sm={18} md={15} xl={12}>
                    <span className="font-weight-semibold mr-3">
                      {!props.clientObject?.facebook_login &&
                        !props.clientObject?.google_login &&
                        "N/A"}
                      {props.clientObject?.facebook_login && (
                        <FacebookOutlined />
                      )}
                    </span>
                    <span className="font-weight-semibold">
                      {props.clientObject?.google_login && <GoogleOutlined />}
                    </span>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={18} sm={18} md={20} xl={12}>
                    <Icon
                      type={DollarCircleOutlined}
                      className="text-primary font-size-md "
                    />
                    <span className="text-muted ml-2">Price Range:</span>
                  </Col>
                  <Col xs={18} sm={18} md={15} xl={12}>
                    <span className="font-weight-semibold ">
                      {props.clientObject?.range_from &&
                      props.clientObject?.range_to
                        ? `${props.clientObject?.range_from} - ${props.clientObject?.range_to} EGP`
                        : "N/A"}
                    </span>
                  </Col>
                </Row>
              </Col>

              {/* <Col xs={24} sm={24} md={8}>
                <Row className="mb-2 mt-2 mt-md-0 ">
                  <Col xs={12} sm={12} md={9}>
                    <Icon
                      type={HomeOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Address:</span>
                  </Col>
                  <Col xs={12} sm={12} md={15}>
                    <span className="font-weight-semibold">
                      Los Angeles, CA
                    </span>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={12} sm={12} md={9}>
                    <Icon
                      type={GlobalOutlined}
                      className="text-primary font-size-md"
                    />
                    <span className="text-muted ml-2">Website:</span>
                  </Col>
                  <Col xs={12} sm={12} md={15}>
                    <span className="font-weight-semibold">ellarbae.io</span>
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  </Card>
);

const Experiences = () => (
  <Card title="List f Orders">
    {/* <Table
        pagination={false}
        columns={tableColumns}
        dataSource={cleanArray}
        rowKey={(item) => item.id}
      /> */}
  </Card>
);

const TableList = ({ mainList, title, columns, read }) => {
  return (
    <Card title={title}>
      {/* <Row gutter={30}>
        <Col sm={24} md={12}>
          {interestedList
            .filter((_, i) => i < 4)
            .map((elm, i) => {
              return (
                <div className="mb-3" key={`interested-${i}`}>
                  <h4 className="font-weight-semibold">{elm.title}</h4>
                  <p>{elm.desc}</p>
                </div>
              );
            })}
        </Col>
        <Col sm={24} md={12}>
          {interestedList
            .filter((_, i) => i >= 4)
            .map((elm, i) => {
              return (
                <div className="mb-3" key={`interested-${i}`}>
                  <h4 className="font-weight-semibold">{elm.title}</h4>
                  <p>{elm.desc}</p>
                </div>
              );
            })}
        </Col>
      </Row> */}
      <CustomTable
        coloumRender={columns}
        dataRender={mainList}
        noAddOption
        noDeleteAction
        noEditAction
        editEndPoint="generic/readOrder"
        noViewAction={read ? false : true}
        noAction={read ? false : true}
      />
    </Card>
  );
};

// const Connection = () => (
//   <Card title="Connection">
//     {connectionList.map((elm, i) => {
//       return (
//         <div
//           className={`${i === connectionList.length - 1 ? "" : "mb-4"}`}
//           key={`connection-${i}`}
//         >
//           <AvatarStatus src={elm.img} name={elm.name} subTitle={elm.title} />
//         </div>
//       );
//     })}
//   </Card>
// );

const Group = () => (
  <Card title="Group">
    {groupList.map((elm, i) => {
      return (
        <div
          className={`${i === groupList.length - 1 ? "" : "mb-4"}`}
          key={`connection-${i}`}
        >
          <AvatarStatus src={elm.img} name={elm.name} subTitle={elm.desc} />
        </div>
      );
    })}
  </Card>
);

const Profile = () => {
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const { services, isSuccess, refetch } = useFetchSingle(
    `clients/${recordId}`
  );
  const clientReservationListRES = useFetch(
    `clients/profile/reservation/${recordId}`
  );

  const clientReservation = clientReservationListRES.services;
  const clientOrdersRES = useFetch(`clientOrders/${recordId}`);
  const clientOrders = clientOrdersRES.services;
  const clientFollowersRes = useFetch(`clients/follow/${recordId}`);
  const clientFollowers = clientFollowersRes.services;
  const clientFavouritsRes = useFetch(`clients/favourite/${recordId}`);
  const clientFavourits = clientFavouritsRes.services;
  const clientWishListRes = useFetch(`clients/wish_list/${recordId}`);
  const clientNotificationsRes = useFetch(`clientNotifications/${recordId}`);
  const clientNotificationsList = clientNotificationsRes.services;
  const clientWishList = clientWishListRes.services;
  const cleanArray = clientReservation?.map((element) => {
    return { ...element, newProduct: JSON.parse(element.product) };
  });
  const avatarSize = 150;
  return (
    <>
      {isSuccess ? (
        <>
          <PageHeaderAlt
            background="/img/others/img-12.jpg"
            cssClass="bg-primary"
            overlap
          >
            <div className="container text-center">
              <div className="py-5 my-md-5"></div>
            </div>
          </PageHeaderAlt>
          <div className="container my-4">
            <ProfileInfo clientObject={services} avatarSize={avatarSize} />
            <Row gutter="16">
              {/* <Col xs={24} sm={24} md={8}>
            <Connection />
            <Group />
          </Col> */}
              <Col xs={24} sm={24} md={24}>
                <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
                  <Tabs.TabPane tab="List of Orders" key="1">
                    <TableList
                      title="List of Orders"
                      columns={CLIENT_ORDERS}
                      mainList={clientOrders}
                      read={true}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="List of Reservation" key="2">
                    <TableList
                      title="List of Reservation"
                      mainList={cleanArray}
                      columns={clientResrvationRes}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="List of Followers" key="3">
                    <TableList
                      title="List of Followers"
                      mainList={clientFollowers}
                      columns={CLIENT_FOLLOWERS}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="List of Favourites" key="4">
                    <TableList
                      title="List of Favourite"
                      mainList={clientFavourits}
                      columns={CLIENT_FAVOURITE}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="List of WishLists" key="5">
                    <TableList
                      title="List of WishLists"
                      mainList={clientWishList}
                      columns={WishListCOLOUM}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="List of Notifications" key="6">
                    <TableList
                      title="List of Notifications"
                      mainList={clientNotificationsList}
                      columns={NotificationList}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="List of SMS" key="7">
                    <TableList
                      title="List of SMS"
                      mainList={clientWishList}
                      columns={WishListCOLOUM}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default Profile;
