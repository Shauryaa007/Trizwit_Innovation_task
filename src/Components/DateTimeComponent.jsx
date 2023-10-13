// DateTimeComponent.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';


const DateTimeComponent = () => {
  const [clicked, setClicked] = useState(true);
  const Days=["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const [day,setDay]=useState();
  const [date,setDate]=useState();
  const [mon,setMon]=useState();
  const [year,setYear]=useState();
  const [timee,setTimee]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        setDay(Days[response.data.day_of_week-1])
        const dateArray = response.data.datetime.substr(0,10).split("-");
        setMon(Months[dateArray[1]-1]);
        setDate(dateArray[2]);
        setYear(dateArray[0]);

        const timeArray= response.data.datetime.substr(11,8).split(":");
        setTimee(timeArray);

      } catch (error) {
        console.error('Error fetching date and time:', error);
      }

    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  
  const changeDesign=(e)=>{
    e.preventDefault();
    if(clicked===true){
      setClicked(false)
    }
    else{
      setClicked(true)
    }
  }

  return (
    <main>
      {/* heading div which contains the heading React Ninja */}
      <div className='heading-div'>
        <h1 className='heading'>REACT 
        <br />
        <span className='purple'>NINJA</span>
        {/* separate div for bottom heading line */}
        <div className='heading-line'/>
        </h1>
      </div>
      <div className='purple-bar'>
      <div className={`dateandtime ${clicked?'changed':'notchanged'}`}>
          <div className="date-container">
          <div className="date">
              <h2>DATE</h2>
              <p>{day},</p>
              <p>{date} {mon} {year}</p>
            </div>
          </div>
            <div className={`time-container `}>
            <div className='time'>
              <h2>TIME</h2>
              <p>{timee[0]}.{timee[1]}</p>
              <p>{timee[2]}s</p>
            </div>
            </div>
            
      </div>
      </div>
      <button onClick={changeDesign}>CLICK ME</button>

    </main>
  );
};

export default DateTimeComponent;
