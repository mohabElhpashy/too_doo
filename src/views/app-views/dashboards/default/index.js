import {
  EllipsisOutlined,
  FileExcelOutlined,
  PlusOutlined,
  PrinterOutlined,
  ReloadOutlined,
  StopOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Menu, Row } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import ChartWidget from "components/shared-components/ChartWidget";
import GoalWidget from "components/shared-components/GoalWidget";
import Loading from "components/shared-components/Loading";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { apexLineChartDefaultOption, COLOR_2 } from "constants/ChartConstant";
import { convertingServiceId } from "constants/helperFunctions";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import exampleService from "services/ExampleService";
import { Empty } from "antd";

import {
  ActiveMembersData,
  AnnualStatisticData,
  NewMembersData,
  VisitorChartData,
  userImages,
} from "./DefaultDashboardData";

const MembersChart = (props) => <ApexChart {...props} />;

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
};

const pushRoute = () => {
  exampleService.getPost().then((resp) => {});
};

const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <PlusOutlined />
          <span className="ml-2">Add all</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <StopOutlined />
          <span className="ml-2">Disable all</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
);

// const tableColumns = [
//   {
//     title: "Customer",
//     dataIndex: "name",
//     key: "name",
//     render: (text, record) => (
//       <div className="d-flex align-items-center">
//         <Avatar
//           size={30}
//           className="font-size-sm"
//           style={{ backgroundColor: record.avatarColor }}
//         >
//           {utils.getNameInitial(text)}
//         </Avatar>
//         <span className="ml-2">{text}</span>
//       </div>
//     ),
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     key: "date",
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//     key: "amount",
//   },
//   {
//     title: () => <div className="text-right">Status</div>,
//     key: "status",
//     render: (_, record) => (
//       <div className="text-right">
//         <Tag
//           className="mr-0"
//           color={
//             record.status === "Approved"
//               ? "cyan"
//               : record.status === "Pending"
//               ? "blue"
//               : "volcano"
//           }
//         >
//           {record.status}
//         </Tag>
//       </div>
//     ),
//   },
// ];

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData);
  const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);
  const { services, isSuccess } = useFetch("top/sellers");
  const topClientsRes = useFetch("top/clients");
  const topClients = topClientsRes.services;
  const clinetIsSuccess = topClientsRes.isSuccess;
  const [clientList, setClientList] = useState([]);
  const [lastClientsListttt, setLastClientsList] = useState([]);
  const lastClinetsRes = useFetch("latest/clients");
  const lastClientsList = lastClinetsRes.services;
  const lastClientsisSuccess = lastClinetsRes.isSuccess;
  const [newMembersData] = useState(NewMembersData);
  const { direction } = useSelector((state) => state.theme);
  const history = useHistory();
  const[x,setx]=useState([services])
  console.log("services",services)
  useEffect(() => {
    if (clinetIsSuccess && lastClientsisSuccess) {
      if (topClients[0]?.first_name) {
        setClientList(
          topClients?.map((element, index) => {
            for (const key in element) {
              element["main_image"] = userImages[index];
            }
            return element;
          })
        );
      }
      if (lastClientsList[0]?.first_name) {
        setLastClientsList(
          lastClientsList?.map((element, index) => {
            for (const key in element) {
              element["main_image"] = userImages[index];
            }
            return element;
          })
        );
      }
    }
  }, [clinetIsSuccess && lastClientsisSuccess]);
  return (
    <>
      {isSuccess && clinetIsSuccess && lastClientsisSuccess ? (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={18}>
              <Row gutter={16}>
                {annualStatisticData.map((elm, i) => (
                  <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                    <StatisticWidget
                      title={elm.title}
                      value={elm.value}
                      status={elm.status}
                      subtitle={elm.subtitle}
                    />
                  </Col>
                ))}
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <ChartWidget
                    title="Unique Visitors"
                    series={visitorChartData.series}
                    xAxis={visitorChartData.categories}
                    height={"400px"}
                    direction={direction}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <GoalWidget
                title="Monthly Target"
                value={0}
                subtitle="You need abit more effort to hit monthly target"
                extra={
                  <Button type="primary" onClick={() => pushRoute()}>
                    Learn More
                  </Button>
                }
              />
              <StatisticWidget
                title={
                  <MembersChart
                    options={memberChartOption}
                    series={activeMembersData}
                    height={145}
                  />
                }
                value="0"
                status={3.7}
                subtitle="Active members"
              />
            </Col>
          </Row>

          <Row gutter={16} className="d-flex justify-content-between">
            <Col xs={24} sm={24} md={24} lg={7}>
              <Card
                title="Top Sellers"
                style={{
                  width: "100%",
                  minHeight: 425,
                }}
              >
                {services?.length === 0 && (
                  <div
                    style={{
                      display: "fleservices",
                      flexDirection: "column",
                      width: "100%",
                      height: 270,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Empty />
                  </div>
                )}
                <div className="mt-3">
                  {services?.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarStatus
                        id={i}
                        src={elm?.main_image}
                        name={`${elm?.first_name}  ${elm?.last_name}`}
                        subTitle={convertingServiceId(elm?.service_id)}
                      />
                      <div>
                        <Button
                          icon={<LoginOutlined />}
                          type="default"
                          size="small"
                          onClick={() =>
                            history.push(
                              `/app/apps/CRM/veForm?name=view&id=${elm?.id}`
                            )
                          }
                        >
                          Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7}>
              <Card
                title="Top Clients"
                style={{
                  width: "100%",
                  minHeight: 425,
                }}
              >
                {clientList.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: 270,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Empty />
                  </div>
                )}

                <div className="mt-3">
                  {clientList?.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarStatus
                        id={i}
                        src={elm.main_image}
                        name={`${elm.first_name}  ${elm.last_name}`}
                        subTitle={elm.email ? elm.email : "N/A"}
                      />
                      <div>
                        <Button
                          icon={<LoginOutlined />}
                          type="default"
                          size="small"
                          onClick={() =>
                            history.push(
                              `/app/apps/CRM/ReadClient?name=view&id=${elm.id}`
                            )
                          }
                        >
                          Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7}>
              <Card
                title="Last Joined Clients
                 "
                style={{
                  width: "100%",
                  minHeight: 425,
                }}
              >
                {lastClientsListttt?.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: 270,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Empty />
                  </div>
                )}

                <div className="mt-3">
                  {lastClientsListttt.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarStatus
                        id={i}
                        src={elm.main_image}
                        name={`${elm.first_name} ${elm.last_name}`}
                        subTitle={elm.email ? elm.email : "N/A"}
                      />
                      <div>
                        <Button
                          icon={<LoginOutlined />}
                          type="default"
                          size="small"
                          onClick={() =>
                            history.push(
                              `/app/apps/CRM/ReadClient?name=view&id=${elm.id}`
                            )
                          }
                        >
                          Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions" extra={cardDropdown(latestTransactionOption)}>
            <Table 
              className="no-border-last" 
              columns={tableColumns} 
              dataSource={recentTransactionData} 
              rowKey='id' 
              pagination={false}
            />
          </Card>
        </Col> */}
          </Row>
        </>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default withRouter(DefaultDashboard);
