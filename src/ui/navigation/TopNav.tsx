"use client";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import React, { useState } from "react";

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
        key: "1",
        label: <Link href="/dashboard/?suppliers">Item 1</Link>,
      },
      {
        key: "2",
        label: <Link href="/dashboard/?categories">Item 2</Link>,
      },
    ],
  },
  {
    label: <Link href="/contact">Navigation Four - Link</Link>,
    key: "contact",
  },
];

const TopNav: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default TopNav;
