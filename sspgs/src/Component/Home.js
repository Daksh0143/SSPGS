import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Table } from 'react-bootstrap';

import slider1 from "../Images/Image1.jpg";
import slider2 from "../Images/Image2.jpeg";
import slider3 from "../Images/Image3.jpeg";

function formatDateToDdMmYyyy(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}


function Home() {
  const [detail, setDetail] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:2909/admin/anouncement");
      const result = await response.json();
      console.log(result.anouncment)
      setDetail(result.anouncment)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <h2 style={{ marginTop: 10 }}>Shree Sorathiya Prajapati Gnati Samaj </h2>
      <Slider {...settings}>
        <div>
          <h3>
            <img src={slider1} style={{ width: "100%", objectFit:"cover", maxHeight: "650px" }} alt='Something wrong ' />
          </h3>
        </div>
        <div>
          <img src={slider2} style={{ width: "100%",objectFit:"cover", maxHeight: "650px" }} alt='Something wrong ' />
        </div>
        <div>
          <img src='https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_1280.jpg' style={{ width: "100%", maxHeight: "650px" }} alt='Something wrong ' />
        </div>
        <div>
          <img src='https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg' style={{ width: "100%", maxHeight: "650px" }} alt='Something wrong ' />
        </div>
        <div>
          <h3>
            <img src='https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_1280.jpg' style={{ width: "100%", maxHeight: "650px" }} alt='Something wrong ' />
          </h3>
        </div>
      </Slider>

      <div>
        <h1 className='text-start' style={{color:"#F1EFEF" }}>Anouncement</h1>
        <Table striped bordered hover variant='info'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(detail) ? (
              detail.map((item, index) => (
                <tr key={index}>
                  <td>{formatDateToDdMmYyyy(item.date)}</td>
                  <td>{item.detail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}

          </tbody>

        </Table>
      </div>
      <h1>History</h1>
      <div>
        <p></p>
      </div>
    </>
  )
}

export default Home

