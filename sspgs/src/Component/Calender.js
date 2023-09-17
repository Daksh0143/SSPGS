import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "../axios.js"
import { useNavigate } from "react-router-dom"

const localizer = momentLocalizer(moment);

function Calender() {
    const navigate = useNavigate()
    

    const [events,setEvents] = useState([]);

    const getAllBooking = async () => {
        try {
            const {data} = await axios .get("/admin/events");
            setEvents(data.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        getAllBooking();
    },[])

    const handleEventClick = (slot) => {
        console.log(slot)
        navigate(`/events`, { state: { slot } })
    }
    const today = new Date();

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                
                startAccessor="startdate"
                endAccessor="enddate"
                min={today}
                style={{ margin: '20px' }}
                selectable
                onSelectEvent={handleEventClick}
            />
        </div>
    )
}

export default Calender