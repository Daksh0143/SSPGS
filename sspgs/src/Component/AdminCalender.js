import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from "react-router-dom"
import axios from "../axios"

const localizer = momentLocalizer(moment);

const AdminCalender = () => {

  const navigate = useNavigate()

  
  const [date,setDate] = useState(new Date());
  const [events,setEvents] = useState([]);

  const handleEventClick = (slot) => {
    console.log(slot)
    navigate(`/events`, { state: { slot } })
  }

  

  const getAllBooking = async () => {
      try {
          const {data} = await axios .get("/admin/events");
          setEvents(data.data);
      } catch (error) {
          
      }
  }


  useEffect(()=>{
      getAllBooking();
  },[])


  const handleBookSlot = (slot) => {
    const checkDate = new Date(slot.start.toLocaleString()).getTime();
    if(checkDate < new Date().getTime()){
      alert("you can not select past slot")
    }else{
      navigate("/admin/addEvent", { state: { slot } })
    }
  }

 

  return (
    <div style={{ height: '500px'}}>
      <Calendar 
        localizer={localizer}
        events={events}
        startAccessor="startdate"
        endAccessor="enddate"
        min={date}
        style={{ margin: '20px' }}
        selectable
        onSelectEvent={handleEventClick}
        onSelectSlot={handleBookSlot}


      />
    </div>
  );
};

export default AdminCalender;
