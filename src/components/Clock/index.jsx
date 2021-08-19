import { useState, useEffect, useRef } from "react";

export const Clock = () => {
    const [clockState, setClockState] = useState();
    const firstInit = useRef(true);

    const setTimeObj = (currentTime) => {
        const hours = currentTime.slice(0, 2);
        const minuts = currentTime.slice(3, 5);
        const seconds = currentTime.slice(6, 8);

        var time = {
            hours: hours,
            minuts: minuts,
            seconds: seconds,
        };
        return time;
    };

    const setTimeOnState = () => {
        const currentTime = new Date().toLocaleTimeString();

        const time = setTimeObj(currentTime);

        setClockState((t) => time);
    };

    const initClock = () => {
        if (firstInit.current === true) {
            setTimeOnState();
        }

        firstInit.current = false;
    };

    useEffect(() => {
        if (firstInit.current === false) {
            setTimeout(() => {
                setTimeOnState();
            }, 1000);
        }
        return () => {
            firstInit.current = false;
        };
    });
    return (
        <div className='container'>
            <div className='clock'>
                {clockState ? (
                    <>
                        <span className='hours'> {clockState.hours} : </span>
                        <span className='minuts'> {clockState.minuts} : </span>
                        <span className='seconds'> {clockState.seconds} </span>
                    </>
                ) : (
                    initClock()
                )}
            </div>
        </div>
    );
};
