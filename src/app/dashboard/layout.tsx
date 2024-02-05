import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
