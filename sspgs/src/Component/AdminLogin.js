import React from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';

function AdminLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        fetch("http://localhost:2909/admin/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        }).then((result) => {
            result.json().then((responce) => {
                console.log(responce)

                if (responce.message === "Incorrect Mobile Number") {
                    toast.error("Mobile Number or Password is Incorrect ", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else if (responce.message === "Incorrect Password") {
                    toast.error("Mobile Number or Password is Incorrect", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                
                else if (responce.message === "User Logged in Successfully") {
                    console.log(responce.success)
                    toast.success("Successfully Register", {    
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate("/admin/home")
                }
            })
        })
            .catch((error) => {
                console.log("Error", error)
            })

    }

    const rendering=()=>{
        navigate("/admin/register")
    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-5">
                <h1 className="mb-4 text-center">Login</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter your Mobile Number</Form.Label>
                        <Form.Control type="number"
                            placeholder="Enter your Mobile number"
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
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Your Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name='password'
                            {...register("password", { required: true })}
                        />
                        {errors.password && (<p>Password is required</p>)}
                    </Form.Group>
                    <Button variant="success" className="w-100" type='submit'>Login</Button>
                    <Button variant="success" className="w-100 mt-2" onClick={rendering} >Register</Button>
                </Form>
            </Card>
            <ToastContainer />
        </Container>
    )
}

export default AdminLogin