"use client";
import React, { useState } from "react";
import { AppstoreOutlined, HomeOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        key: "group",
        label: <Link href="/dashboard">Item 1</Link>,
      },
      {
        key: "group",
        label: <Link href="/dashboard">Item 2</Link>,
      },
    ],
  },
  {
    label: <Link href="">Navigation Four - Link</Link>,
    key: "alipay",
  },
];

const TopNav: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default TopNav;
