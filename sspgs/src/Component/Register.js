
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const RegistrationForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [selectSurname, setSelectSurname] = useState("")
    const surnameOption = ["Chauhan", "Kukadiya", "Savaniya", "Tank", "Koriya", "Devadiya"]

    const onSubmit = (data) => {
        fetch("http://localhost:2909/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"

            },
            body: JSON.stringify(data)

        }).then((result) => {
            result.json().then((responce) => {
                console.log(responce.messge)
                if (responce.messge === "User already Exists") {
                    toast.error("User Already Exsits", {
                        position: toast.POSITION.TOP_RIGHT
                    });

                } else if (responce.success) {
                    console.log(responce.success)
                    toast.success("Successfully Register", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate("/login")
                }
            })
        })
            .catch((error) => {
                console.log("Error", error)
            })


    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 ">
            <Card className="p-3">
                <h1>Registration Form</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-2">
                        <Form.Label>Enter Your Surname</Form.Label>
                        <Form.Select
                            value={selectSurname}
                            name='surname'
                            {...register("surname", { onChange: (e) => setSelectSurname(e.target.value) })}>
                            <option>Select a Option</option>
                            {surnameOption.map((surname, index) => (
                                <option key={index} value={surname}>{surname}</option>
                            ))}
                            {errors.surname && (<p>Surname is required</p>)}
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Enter Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Name"
                            name="name"
                            {...register("name", { required: true })} />
                        {/* {errors.name && (<p>Name is required</p>)} */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Enter Your Father Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Fathername"
                            name='fatherName'
                            {...register("fatherName", { required: true })} />
                        {errors.name && (<p>Name is required</p>)}
                    </Form.Group>
                    <Form.Group className="mb-2">
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
                            (<p>
                                Mobile Number number is required
                            </p>)}
                        {errors.mobileNumber && errors.mobileNumber.type === "minLength" &&
                            (<p>
                                plz Enter a valid mobile number
                            </p>)
                        }
                        {errors.mobileNumber && errors.mobileNumber.type === "maxLength" &&
                            (<p>
                                Plz Enter a valid mobile number
                            </p>)
                        }
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Enter Your Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your Password"
                            name='password'
                            {...register("password", { required: true })}
                        />
                        {errors.password && (<p>Password is required</p>)}
                    </Form.Group>
                    <Button variant="success" className="w-100" type='submit'>Register</Button>
                </Form>
            </Card>
            <ToastContainer />
        </Container>
    );
};

export default RegistrationForm;
