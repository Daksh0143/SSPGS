import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import "../Component/About.css";
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth';


function AddMember() {

  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectSurname, setSelectSurname] = useState("")
  const surnameOption = ["Chauhan", "Kukadiya", "Savaniya", "Tank", "Koriya", "Devadiya"]

  const onSubmit = (data) => {
    fetch("http://localhost:2909/about", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(data)

    }).then((result) => {
      result.json().then((responce) => {
        console.log(responce)
        if (responce) {
          navigate("/admin/member")
        }
      })
    })
      .catch((error) => {
        console.log("Error", error)
      })
  }

  
  return <>
    <Auth>
      <div className='about-container'>
        <h1 className='about-title'>Family Details</h1>
        <form className='xfamily-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label className='form-label'>Select Your Surname:-</label>
            <select
              className='form-input'
              value={selectSurname}
              name='surname'
              {...register("surname", { onChange: (e) => setSelectSurname(e.target.value) })}
              placeholder='Enter your Surname'
            >
              <option value="">Select a Option</option>
              {surnameOption.map((surname, index) => (
                <option key={index} value={surname}>{surname}</option>
              ))}
              {errors.surname && (<p className='error-msg'>Surname is required</p>)}
            </select>
          </div>
          <div className='form-group'>
            <label className='form-label'>Enter Your Name:-</label>
            <input className='form-input'
              type='text'
              placeholder='Enter your Name'
              name='name'
              {...register("name", {
                required: true
              })}
            />
            {errors.name && (<p className='error-msg'>Name is required</p>)}
          </div>
          <div className='form-group'>
            <label className='form-label'>Enter Your Father Name:-</label>
            <input className='form-input'
              type='text'
              placeholder='Enter your Father Name'
              name='fatherName'
              {...register("fatherName", {
                required: true
              })}
            />
            {errors.fatherName && (<p className='error-msg'>Father Name is required</p>)}

          </div>
          <div className='form-group'>
            <label className='form-label'>Enter Your Mobile Number:-</label>
            <input className='form-input'
              type='number'
              placeholder='Enter your Mobile Number'
              name='mobileNumber'
              {...register("mobileNumber", {
                required: true,
                minLength: 10,
                maxLength: 10
              })}
            />
            {errors.mobileNumber && errors.mobileNumber.type === "required" &&
              (<p className='error-msg'>
                Mobile Number number is required
              </p>)}
            {errors.mobileNumber && errors.mobileNumber.type === "minLength" &&
              (<p className='error-msg'>
                plz Enter a valid mobile number
              </p>)
            }
            {errors.mobileNumber && errors.mobileNumber.type === "maxLength" &&
              (<p className='error-msg'>
                Plz Enter a valid mobile number
              </p>)
            }


          </div>

          <div className='form-group'>
            <label className='form-label'>Enter Your Whatsapp Number:-</label>
            <input className='form-input'
              type='number'
              placeholder='Enter your Whatsapp Number'
              name='whatsappNumber'
              {...register("whatsappNumber", {
                required: true,
                minLength: 10,
                maxLength: 10
              })}
            />
            {errors.whatsappNumber && errors.whatsappNumber.type === "required" &&
              (<p className='error-msg'>
                Whatsapp number is required
              </p>)}
            {errors.whatsappNumber && errors.whatsappNumber.type === "minLength" &&
              (<p className='error-msg'>
                Please enter a valid Phone Nnmber
              </p>)
            }
            {errors.whatsappNumber && errors.whatsappNumber.type === "maxLength" &&
              (<p className='error-msg'>
                Please enter a valid Phone Nnmber
              </p>)
            }
            <br /><br />

          </div>
          <div className='form-group'>
            <button className='btn-submit' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Auth>
  </>
}

export default AddMember