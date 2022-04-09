import React, { useEffect, useState } from 'react';
import './time.scss';

export function Time(props) {
    const [time, setTime] = useState(new Date);

    function formatMonth(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return months[month];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    const dateString = time.getDate() + ' ' + formatMonth(time.getMonth()) + ' ' + time.getFullYear()
    return <div className="time">{dateString} <span className="current-time">{time.getHours()}:{time.getMinutes()}</span></div>
}