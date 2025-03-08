import { useDispatch } from 'react-redux';
import TodoPage from './pages/todo/TodoPage.tsx';
import { useEffect } from 'react';
import { appInit } from './state/actions.ts';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import './App.css'
import useSetting from './shared/features/settings/hooks/useSetting.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchedulePage from './pages/schedule/SchedulePage.tsx';
import ActivityPage from './pages/activity/ActivityPage.tsx';
import RootLayout from './shared/ui/root-layout/RootLayout.tsx';
import CategoriesPage from './pages/categories/CategoriesPage.tsx';

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
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route index element={<TodoPage />} />
                    <Route path='/categories' element={<CategoriesPage />} />
                    <Route path='/schedule' element={<SchedulePage />} />
                    {/* <Route path='/activity' element={<ActivityPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    </ConfigProvider>
}

export default App
