import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Container } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useParams,useNavigate } from 'react-router-dom';



function Update() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [selectSurname, setSelectSurname] = useState("")
    const surnameOption = ["Chauhan", "Kukadiya", "Savaniya", "Tank", "Koriya", "Devadiya"]
    const [data, setData] = useState()
    const [name, setName] = useState("")
    const [fatherName, setfatherName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [whatsappNumber, setWhatsappNumber] = useState("")
    const params = useParams()
    const navigate=useNavigate()
    const getData = async (data) => {
        let result = await fetch(`http://localhost:2909/member/${params.id}`)
        result=await result.json();
        console.log(result)
        setSelectSurname(result.result.surname)
        setName(result.result.name)
        setfatherName(result.result.fatherName)
        setMobileNumber(result.result.mobileNumber)
        setWhatsappNumber(result.result.whatsappNumber)
    }

    const onSubmit=async()=>{
        const result=await fetch(`http://localhost:2909/member/${params.id}`,{
            method:"put",
            body:JSON.stringify({selectSurname,name,fatherName,mobileNumber,whatsappNumber}),
            headers:{
                "Content-type":"application/json"
            }
        })
        if(result){
            navigate("/")
        }
    }


useEffect(() => {
    getData()
}, [])


return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-3">
            <h1>Update Member</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-2">
                    <Form.Label>Enter Your Surname</Form.Label>
                    <Form.Select
                        value={selectSurname}
                        name='surname'
                        {...register("surname", { onChange: (e) => setSelectSurname(e.target.value) ,})}>
                        <option>Select your Surname</option>
                        {surnameOption.map((surname, index) => (
                            <option key={index}>{surname}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Name"
                        name='name'
                        value={name}
                        {...register("name", {onChange:(e)=>setName(e.target.value)  ,required: true })} />
                    {errors.name && (<p>Name is required</p>)}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter Your Father Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Fathername"
                        name='fatherName'
                        value={fatherName}
                        {...register("fatherName", {onChange:(e)=>setfatherName(e.target.value) ,required: true })} />
                    {errors.fatherName && (<p>Father name is required</p>)}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter Your Mobile Number</Form.Label>
                    <Form.Control
                        type="number"
                        name='mobileNumber'
                        placeholder="Enter your Mobile Number"
                        value={mobileNumber}
                        {...register("mobileNumber", {
                            onChange:(e)=>setMobileNumber(e.target.value),
                            required: true,
                            minLength: 10,
                            maxLength: 10
                        })} />
                    {errors.mobileNumber && errors.mobileNumber.type === "required" && (<p>Mobile number is required</p>)}
                    {errors.mobileNumber && errors.mobileNumber.type === "minLength" && (<p>Please enter a valid Number</p>)}
                    {errors.mobileNumber && errors.mobileNumber.type === "maxLength" && (<p>PLease enter a valid number</p>)}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Enter Your Whatsapp Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Whatsapp Number"
                        name='whatsappNumber'
                        value={whatsappNumber}
                        {...register("whatsappNumber", {
                            onChange:(e)=>setWhatsappNumber(e.target.value),
                            required: true,
                            minLength: 10,
                            maxLength: 10
                        })} />
                    {errors.whatsappNumber && errors.whatsappNumber.type === "required" && (<p>Whatsapp number is required</p>)}
                    {errors.whatsappNumber && errors.whatsappNumber.type === "minLength" && (<p>Enter a Valid whatsappNumber</p>)}
                    {errors.whatsappNumber && errors.whatsappNumber.type === "maxLength" && (<p>Enter a Valid whatsappNumber</p>)}
                </Form.Group>
                <Button variant="success" className="w-100" type='submit'>Update</Button>
            </Form>
        </Card>
    </Container>
)
}

export default Update
