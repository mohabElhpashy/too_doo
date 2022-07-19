import {
  ArrowUpOutlined,
  BarChartOutlined,
  CloudDownloadOutlined,
  FileDoneOutlined,
  SyncOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Badge, Button, Card, Col, Empty, Row, Select, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import ChartWidget from "components/shared-components/ChartWidget";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import Flex from "components/shared-components/Flex";
import { COLORS } from "constants/ChartConstant";
import { getPaymentStatus } from "constants/helperFunctions";
import { useFetch } from "hooks";
import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import utils from "utils";
import { customerChartData, weeklyRevenueData } from "./SalesDashboardData";

const { Option } = Select;

// const getPaymentStatus = (status) => {
//   if (status == 2 || 8 || 12 || 10) {
//     return "success";
//   } else if (status == 1 || 4 || 7 || 11) {
//     return "warning";
//   } else if (status == 3 || 5 || 6 || 13 || 9) {
//     return "error";
//   } else return "";
// };
// const getShippingStatus = (status) => {
//   if (status === "Ready") {
//     return "blue";
//   }
//   if (status === "Shipped") {
//     return "cyan";
//   }
//   return "";
// };

const WeeklyRevenue = () => {
  const { direction } = useSelector((state) => state.theme);
  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Flex
            className="h-100"
            flexDirection="column"
            justifyContent="between"
          >
            <div>
              <h4 className="mb-0">Weekly Revenue</h4>
              <span className="text-muted">8 - 15 Jul, 2020</span>
            </div>
            <div className="mb-4">
              <h1 className="font-weight-bold">$27,188.00</h1>
              <p className="text-success">
                <span>
                  <ArrowUpOutlined />
                  <span> 17% </span>
                </span>
                <span>growth from last week</span>
              </p>
              <p>
                Total gross income figure based from the date range given above.
              </p>
            </div>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className="mb-3 text-right">
            <Button icon={<CloudDownloadOutlined />}>Download Report</Button>
          </div>
          <ChartWidget
            card={false}
            series={weeklyRevenueData.series}
            xAxis={weeklyRevenueData.categories}
            title="Unique Visitors"
            height={250}
            type="bar"
            customOptions={{ colors: COLORS }}
            direction={direction}
          />
        </Col>
      </Row>
    </Card>
  );
};

const DisplayDataSet = ({ sellerStatistics }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <DataDisplayWidget
          icon={<FileDoneOutlined />}
          value={!sellerStatistics.orders ? "0" : sellerStatistics.orders}
          title="Total order"
          color="cyan"
          vertical={true}
          avatarSize={55}
        />
        <DataDisplayWidget
          icon={<BarChartOutlined />}
          value={sellerStatistics.products}
          title="Total Products"
          color="gold"
          vertical={true}
          avatarSize={55}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <DataDisplayWidget
          icon={<SyncOutlined />}
          value={sellerStatistics.reservations}
          title="Total Reservation"
          color="blue"
          vertical={true}
          avatarSize={55}
        />
        <DataDisplayWidget
          icon={<UserSwitchOutlined />}
          value={sellerStatistics.visitors}
          title="Total Visitors"
          color="volcano"
          vertical={true}
          avatarSize={55}
        />
      </Col>
      {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
      <DataDisplayWidget
        icon={<SyncOutlined />}
        value="26.9%"
        title="Conversion rate"
        color="blue"
        vertical={false}
        avatarSize={55}
      />
      <DataDisplayWidget
        icon={<UserSwitchOutlined />}
        value="873"
        title="Total Visitors"
        color="volcano"
        vertical={false}
        avatarSize={55}
      />
    </Col> */}
    </Row>
  );
};
const serviceConvertor = (service_id) => {
  switch (service_id) {
    case 1:
      return "Cars";
    case 2:
      return "Hotels";
    case 3:
      return "Doctors";
    case 4:
      return "Beauty Center";
    case 5:
      return "Photographer";
    case 6:
      return "Trips";
    case 7:
      return "Dresses";
    case 8:
      return "MakeUp Artist";
    default:
      break;
  }
};
const trncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};
const TopProduct = ({ sellerTopProductList, service_id }) => (
  <Card
    title="Top 5 Products"
    style={
      sellerTopProductList.length == 0
        ? {
            height: 468,
            maxHeight: 468,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }
        : { height: 468 }
    }
    // extra={
    //   <Select defaultValue="week" size="small" style={{ minWidth: 110 }}>
    //     <Option value="week">This Week</Option>
    //     <Option value="month">This Month</Option>
    //     <Option value="year">This Year</Option>
    //   </Select>
    // }
  >
    {sellerTopProductList?.length == 0 ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    ) : (
      sellerTopProductList?.map((elm) => (
        <Flex
          className="w-100 py-3"
          justifyContent="between"
          alignItems="center"
          key={elm.name}
        >
          <AvatarStatus
            shape="square"
            src={elm.main_image}
            name={trncate(elm.name_en, 30)}
            subTitle={serviceConvertor(service_id)}
          />
          <Flex>
            <div className="mr-3 text-right">
              <span className="text-muted">Total Profit</span>
              <div className="mb-0 h5 font-weight-bold">
                <NumberFormat
                  prefix={"EGP"}
                  value={elm.total_profit}
                  thousandSeparator={true}
                  displayType="text"
                />
                {/* {elm.status === "up" ? (
                <ArrowUpOutlined className="text-success" />
              ) : (
                <ArrowDownOutlined className="text-danger" />
              )} */}
              </div>
            </div>
          </Flex>
        </Flex>
      ))
    )}
  </Card>
);

// const SalesByCategory = () => (
//   <DonutChartWidget
//     series={sessionData}
//     labels={sessionLabels}
//     title="Sales by Category"
//     customOptions={{ colors: sessionColor }}
//     bodyClass="mb-2 mt-3"
//     extra={
//       <Row justify="center">
//         <Col xs={20} sm={20} md={20} lg={24}>
//           <div className="mt-4 mx-auto" style={{ maxWidth: 200 }}>
//             {conbinedSessionData?.map((elm) => (
//               <Flex
//                 alignItems="center"
//                 justifyContent="between"
//                 className="mb-3"
//                 key={elm.label}
//               >
//                 <div>
//                   <Badge color={elm.color} />
//                   <span className="text-gray-light">{elm.label}</span>
//                 </div>
//                 <span className="font-weight-bold text-dark">{elm.data}</span>
//               </Flex>
//             ))}
//           </div>
//         </Col>
//       </Row>
//     }
//   />
// );

const Customers = ({ sellerid }) => {
  const { direction } = useSelector((state) => state.theme);
  const { services } = useFetch(`statistics/clients/${sellerid}`);
  console.log(services, "Services");
  return (
    <Card
      title="Customers"
      extra={
        <Select
          defaultValue="This Year"
          size="small"
          style={{ minWidth: 110 }}
          showArrow={false}
        >
          <Option value="year">This Year</Option>
        </Select>
      }
    >
      <Flex>
        <div className="mr-5">
          <h2 className="font-weight-bold mb-1">
            {services?.all?.totalOfflineClient}
          </h2>
          <p>
            <Badge color={COLORS[1]} />
            Offline Clients
          </p>
        </div>
        <div>
          <h2 className="font-weight-bold mb-1">
            {services?.all?.totalClient}
          </h2>
          <p>
            <Badge color={COLORS[0]} />
            Online Clients
          </p>
        </div>
      </Flex>
      <div>
        <ChartWidget
          card={false}
          series={[
            {
              name: "Offline Customers",
              data: services?.data
                ?.map((element) => element.offline_client)
                .reverse(),
            },
            {
              name: "Online Customers",
              data: services?.data
                ?.map((element) => element.online_client)
                .reverse(),
            },
          ]}
          xAxis={weeklyRevenueData.categories}
          height={280}
          direction={direction}
          customOptions={{
            colors: [COLORS[1], COLORS[0]],
            legend: {
              show: false,
            },
            stroke: {
              width: 2.5,
              curve: "smooth",
            },
          }}
        />
      </div>
    </Card>
  );
};

const tableColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Product",
    render: (_, record) => (
      <Flex>
        <AvatarStatus
          size={30}
          src={record.newProduct.main_image}
          name={record.newProduct.name_en}
        />
      </Flex>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
  },
  {
    title: "Date",
    dataIndex: "created_at",
    render: (_, record) => <span>{record.created_at.split(" ")[0]}</span>,
    sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
  },
  // {
  //   title: "Order status",
  //   dataIndex: "orderStatus",
  //   render: (_, record) => (
  //     <>
  //       <Tag color={getShippingStatus(record.orderStatus)}>
  //         {record.orderStatus}
  //       </Tag>
  //     </>
  //   ),
  //   sorter: (a, b) => utils.antdTableSorter(a, b, "orderStatus"),
  // },
  {
    title: "Reservation Status",
    dataIndex: "type",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.type)} />
        <span>
          {record.type
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
        {record.type === "REFUSED" && (
          <>
            <span style={{ marginLeft: 5, marginRight: 5 }}>By</span>
            <span>
              {record.action_by
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
        )}
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
  },
  {
    title: "Total",
    dataIndex: "total_price",
    render: (_, record) => (
      <span className="font-weight-semibold">
        <NumberFormat
          displayType={"text"}
          value={(Math.round(record.total_price * 100) / 100).toFixed(2)}
          prefix={"EGP"}
          thousandSeparator={true}
        />
      </span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "total_price"),
  },
];

const ORDER_LIST = [
  {
    title: "ID",
    dataIndex: "id",
    render: (id) => `# ${id}`,
  },
  {
    title: "Date",
    dataIndex: "created_at",
    render: (_, record) => <span>{record.created_at.split(" ")[0]}</span>,
    sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
  },
  {
    title: "Order Status",
    dataIndex: "type",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.type)} />
        <span>
          {record.type
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
        {record.type === "REFUSED" && (
          <>
            <span style={{ marginLeft: 5, marginRight: 5 }}>By</span>
            <span>
              {record.action_by
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
        )}
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
  },
  {
    title: "Total",
    dataIndex: "total_amount",
    render: (_, record) => (
      <span className="font-weight-semibold">
        <NumberFormat
          displayType={"text"}
          value={(Math.round(record.total_amount * 100) / 100).toFixed(2)}
          prefix={"EGP"}
          thousandSeparator={true}
        />
      </span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "total_amount"),
  },
];
const RecentReservation = ({
  name,
  sellerReservationList,
  sellerOrder,
  columns,
}) => {
  const cleanArray = sellerReservationList?.map((element) => {
    return { ...element, newProduct: JSON.parse(element.product) };
  });
  // const productObj = JSON.parse(sellerReservationList[0].product);
  return (
    <Card title={name}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={sellerOrder || cleanArray}
        rowKey={(item) => item.id}
      />
    </Card>
  );
};

const SalesDashboard = ({
  sellerStatistics,
  sellerTopProductList,
  service_id,
  sellerReservationList,
  sellerOrderList,
  sellerid,
}) => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={15} xxl={14}>
          <WeeklyRevenue />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={10}>
          <DisplayDataSet sellerStatistics={sellerStatistics} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={7}>
          <TopProduct
            service_id={service_id}
            sellerTopProductList={sellerTopProductList}
          />
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={7}>
          <SalesByCategory />
        </Col> */}
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={17}>
          <Customers sellerid={sellerid} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <RecentReservation
            sellerOrder={sellerOrderList}
            columns={ORDER_LIST}
            name="Recent Orders"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <RecentReservation
            sellerReservationList={sellerReservationList}
            columns={tableColumns}
            name="Recent Reservations"
          />
        </Col>
      </Row>
    </>
  );
};

export default SalesDashboard;
