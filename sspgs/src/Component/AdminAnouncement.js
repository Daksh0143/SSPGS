import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function formatDateToDdMmYyyy(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function AdminAnouncement() {
  const [detail, setDetail] = useState([]);
  const [refresh, setRefresh] = useState(0);
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



  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:2909/admin/anouncement/${id}`);
      console.log(id)

      if (response.status === 201) {

        setRefresh(Math.random() * 600000000000);
      }
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    fetchData();
  }, [refresh]);
  console.log(detail)
  return (
    <div>
      <h1 className='mb-3 mt-5 font-weight-bold' style={{ color: "green" }}>Anouncement Detail</h1>
      <Table striped bordered hover variant='info'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(detail) ? (
            detail.map((item, index) => (
              <tr key={index}>
                <td>{formatDateToDdMmYyyy(item.date)}</td>
                <td>{item.detail}</td>
                <td><button onClick={()=>deleteItem(item._id)}>Delete</button></td>
              </tr>
            ))

          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}

        </tbody>

      </Table>
    </div >
  );
}

export default AdminAnouncement;
