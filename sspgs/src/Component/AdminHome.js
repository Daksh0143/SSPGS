import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
function AdminHome() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate()

  const onSubmit = (data) => {
    fetch("http://localhost:2909/admin/home", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"

      },
      body: JSON.stringify(data)

    }).then((result) => {
      result.json().then((responce) => {
        console.log(responce.message)
        if(responce.message){
            navigate("/admin/anouncement")
        }
      })
    })
      .catch((error) => {
        console.log("Error", error)
      })


  }


  return (
    <>
    <h1 className='mb-3' style={{color:"blue"}}>Admin Home Page</h1>
    <h2 style={{color:"green"}} className='m-2'>Welcome to the Shree Sorathiya Prajapati gnati Samaj</h2>
    <Container className="d-flex justify-content-center align-items-center mt-5 ">
      <Card className="p-5">
        <h1>Add Anouncement</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Form.Group className="mb-2 mt-3 text-start">
            <Form.Label>Enter Date</Form.Label>
            <Form.Control
              type="Date"
              name="date"
              {...register("date", { required: true })} />
            {errors.date && (<p className='mt-2'>Date is required</p>)}
          </Form.Group>
          <Form.Group className="mb-2 text-start mt-2">
            <Form.Label>Detail</Form.Label>
            <Form.Control as="textarea"
              type="datetime-local"
              placeholder="Enter your address"
              name="detail"
              {...register("detail", { required: true })} />
            {errors.detail && (<p className='mt-2'>Enter a Full Detail</p>)}
          </Form.Group>
          <Button variant="success" className="w-100 mt-3" type='submit'>Anounce</Button>
        </Form>
      </Card>
      <ToastContainer />
      
    </Container>
   
    </>
    
    

  )
}

export default AdminHome