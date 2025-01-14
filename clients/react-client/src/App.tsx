import { useDispatch } from 'react-redux';
import TodoPage from './pages/todo/TodoPage.tsx';
import { useEffect } from 'react';
import { appInit } from './state/actions.ts';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import 'antd/dist/reset.css';
import './App.css'
import useSetting from './shared/features/settings/hooks/useSetting.ts';
import { BookFilled, CalendarFilled, PieChartFilled } from '@ant-design/icons';

function App() {
    const dispatch = useDispatch();
    const [darkTheme] = useSetting<boolean>("darkTheme");
    const [primaryColor] = useSetting<string>("primaryColor");

    useEffect(() => {
        dispatch(appInit())
    }, [])


    return <ConfigProvider theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
            // Seed Token
            colorPrimary: primaryColor,
            borderRadius: 16,
        },
    }}>
        <Layout style={{ minHeight: '100vh', height: "100vh"}}>
            <Layout.Sider >
                <Menu
                    mode="inline"
                    style={{ height: '100%' }}
                    items={[
                        {
                            key: '1',
                            icon: <BookFilled />,
                            label: 'Tasks',
                        },
                        {
                            key: '2',
                            icon: <CalendarFilled />,
                            label: 'Schedule',
                        },
                        {
                            key: '3',
                            icon: <PieChartFilled />,
                            label: 'Activity',
                        },
                    ]}
                />
            </Layout.Sider>
            <Layout.Content style={{ padding: '16px', display: 'flex', justifyContent: 'center', overflow: "auto" }}>
                <TodoPage />
            </Layout.Content>
        </Layout>
    </ConfigProvider>
}

export default App
