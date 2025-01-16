import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { createCategory } from "../../../shared/features/categories/state/categoriesSlice";

export default function CategoriesInput(){
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleClick = () => {
        if(text.length >= 1 && text.length <= 200){
            dispatch(createCategory({name: text}));
            setText("");
        }
    }

    return <Flex gap={12}>
        <Input placeholder="Enter category name..." value={text} onChange={(event) => setText(event.target.value)}/>
        <Button onClick={handleClick}><PlusOutlined/></Button>
    </Flex>
}