// import { BookFilled, CalendarFilled, PieChartFilled, TagFilled, TagOutlined } from "@ant-design/icons";
// import { Layout, Menu } from "antd";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// export default function RootLayout() {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleMenuClick = (info: {key: string}) => {
//         navigate(info.key);
//     }

//     return <Layout style={{ minHeight: '100vh', height: "100vh" }}>
//         <Layout.Sider>
//             <Menu
//                 mode="inline"
//                 selectedKeys={[location.pathname]}
//                 onClick={handleMenuClick}
//                 style={{ height: '100%' }}
//                 items={[
//                     {
//                         key: '/',
//                         icon: <BookFilled />,
//                         label: 'Tasks',
//                     },
//                     {
//                         key: '/categories',
//                         icon: <TagFilled />,
//                         label: 'Categories',
//                     },
//                     {
//                         key: '/schedule',
//                         icon: <CalendarFilled />,
//                         label: 'Schedule',
//                     },
//                     {
//                         key: '/activity',
//                         icon: <PieChartFilled />,
//                         label: 'Activity',
//                     },
//                 ]}
//             />
//         </Layout.Sider>
//         <Layout.Content >
//             <Outlet />
//         </Layout.Content>
//     </Layout>
// }