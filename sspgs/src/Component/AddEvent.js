import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Fade, Form, ToastContainer } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { json, useLocation } from 'react-router-dom';
import axios from "../axios";

const AddEvent = () => {

    const location = useLocation();
    console.log("test", location)
    const [startDateDefaultValue, setStartDateDefaultValue] = useState("")
    const [image, setImage] = useState()
    const { register, handleSubmit,setValue, formState: { errors } } = useForm({
        startdate: ""
    }); 

    useEffect(()=>{
        if(location.state && location.state.slot){
            setStartDateDefaultValue(new Date(new Date(location.state.slot.start).getTime() - new Date(location.state.slot.start).getTimezoneOffset() * 60000).toISOString().substr(0, 16))
        }
    },[location])
    
    const handleMySubmit =async (data) => {
        try {
            const file = data.file[0];

            const formData = new FormData()
            formData.append("image", file)
            delete data.file;
            formData.append("data",JSON.stringify(data))

            const res = await axios.post("/admin/addEvent",formData);
            if(res.message){
                
            }

            console.log(res);

            
        } catch (error) {
            
        }
    };




    return (
        <Container className="d-flex justify-content-center  align-items-start mt-5 vh-90 ">
            <Card className="p-3 w-50">
                <h1>Add Your Event</h1>
                <Form onSubmit={handleSubmit(handleMySubmit)}>
                    <Form.Group className="mb-2 text-start mt-2">
                        <Form.Label>Enter Event Title</Form.Label>
                        <Form.Control
                            name='title'
                            type="text"
                            placeholder="Enter Event Title"
                            {...register("title", { required: true })}>
                        </Form.Control>
                        {errors.title && (<p className='text-danger text-start'>event title is required</p>)}

                    </Form.Group>
                    <Form.Group className="mb-2 text-start mt-2">
                        <Form.Label>Enter Your Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Full Name"
                            name="username"
                            {...register("username", { required: true })} />
                    </Form.Group>
                    {errors.username && (<p className='text-danger text-start'>Full Name is required</p>)}
                    <Form.Group className="mb-2 text-start mt-2">
                        <Form.Label>Enter Your Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Mobile Number"
                            name='mobileNumber'
                            {...register("mobileNumber", {
                                required: true,
                                minLength: 10,
                                maxLength: 10
                            })} />
                        {errors.mobileNumber && errors.mobileNumber.type === "required" &&
                            (<p className='text-danger text-start'>
                                Mobile Number number is required
                            </p>)}
                        {errors.mobileNumber && errors.mobileNumber.type === "minLength" &&
                            (<p className='text-danger text-start'>
                                plz Enter a valid mobile number
                            </p>)
                        }
                        {errors.mobileNumber && errors.mobileNumber.type === "maxLength" &&
                            (<p className='text-danger text-start'>
                                Plz Enter a valid mobile number
                            </p>)
                        }
                    </Form.Group>
                    <Container className='d-flex p-0 mt-4 justify-content-between'>
                        <div>
                            <Form.Group className="mb-2 text-start mt-2">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    placeholder="Start Date"
                                    name="startdate"
                                    defaultValue={startDateDefaultValue}
                                    {...register("startdate", { required: true })} />
                            </Form.Group>
                            {errors.startdate && (<p className='text-danger text-start'>Start Date is required</p>)}
                        </div>
                        <div>
                            <Form.Group className="mb-2 text-start mt-2">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    placeholder="End Date"
                                    name="enddate"
                                    {...register("enddate", { required: true })} />
                            </Form.Group>
                            {errors.enddate && (<p className='text-danger text-start'>End Date is required</p>)}
                        </div>
                    </Container>
                    <Form.Group className="mb-2 text-start mt-2">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea"
                            type="datetime-local"
                            className='m-0'
                            placeholder="Enter your address"
                            name="address"
                            {...register("address", { required: true })} />
                    </Form.Group>
                    {errors.address && (<p className='text-danger text-start'>Address is required</p>)}
                    <Form.Group className="mb-2 mt-4 text-start mt-2">
                        <Form.Label>Upload File</Form.Label>
                        <Form.Control
                            type="file"
                            className='m-0'
                            name="file"
                            accept='image/*'
                            {...register("file", {
                                required: true,
                                onChange: (e) => { setImage(e.target.files[0]) }

                            })} />
                    </Form.Group>
                    <Button variant="success" className=" mt-4 w-100" type='submit'>Add Event</Button>
                </Form>
            </Card>
            <ToastContainer />
        </Container>
    )
}

export default AddEvent