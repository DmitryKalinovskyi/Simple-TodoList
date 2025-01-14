import { useDispatch } from 'react-redux';
import './App.css'
import TodoPage from './pages/todo/TodoPage.tsx';
import { useEffect } from 'react';
import { appInit } from './state/actions.ts';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appInit())
    }, [])

    return <TodoPage/>
}

export default App
