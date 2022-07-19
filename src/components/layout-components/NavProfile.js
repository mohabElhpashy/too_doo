import {
  EditOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import Icon from "components/util-components/Icon";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "redux/constants/Auth";
const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/",
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/",
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  const history = useHistory();
  const signOut = async () => {
    try {
      // await service.get('http://dev.farahymall.com/api/admin/logout')
      localStorage.removeItem(AUTH_TOKEN);
    } catch (error) {
    } finally {
      history.push("/auth/login");
    }
  };
  const handleClick = (key) => {
    if (key === "Edit Profile") {
      history.push("/app/pages/setting/edit-profile");
    } else return;
  };
  // const [user, setUser] = useRecoilState(userState);
  const currentUser = localStorage.getItem("user");

  const [nowUser, setNowUser] = useState({
    first_name: "",
  });
  const user = JSON.parse(currentUser);
  useEffect(() => {
    setNowUser(user);
  }, [user?.first_name]);
  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0" style={{ textTransform: "capitalize" }}>
              {nowUser?.first_name}
            </h4>
            <span className="text-muted">Account Manager</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i} onClick={() => handleClick(el.title)}>
                <Icon className="mr-3" type={el.icon} />
                <span className="font-weight-normal">{el.title}</span>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={signOut}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null)(NavProfile);
