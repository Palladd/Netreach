import React from "react";
import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";

const Time = (props) => {

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())

    setInterval(() => {
        let time1 = new Date().toLocaleString()
        setCurrentTime(time1)
    }, 1000)

    let timezoneOffset = new Date().getTimezoneOffset() / -60; // konwertujemy minut do godzin
    let timezone = `UTC${timezoneOffset >= 0 ? '+' : '-'}${Math.abs(timezoneOffset)}`; 

    return (
        <div>
            <Card className="bg-zinc-900">
                <CardBody>
                    <p className="flex justify-center font-medium text-2xl text-white">{currentTime}</p>
                    <p className="flex justify-center font-normal text-lg text-zinc-300">{timezone}</p>
                </CardBody>
            </Card>
        </div>
    )
}

export default Time; 