import { Button, Flex } from "antd";
import CompletedTodayCard from "./ui/CompletedTodayCard";

export default function ActivityPage(){
    return <Flex justify="center" align="center" style={{height: "100%"}}>
        <CompletedTodayCard/>
    </Flex>
} 