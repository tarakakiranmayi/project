import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';


function Register() {
    let{register,handleSubmit,formState:{errors}}=useForm()
    let navigator=useNavigate()
    let [err,setErr]=useState('')
    let res
    function change()
    {
        navigator('/Login')
    }
    async function handleFormSubmit(obj)
   
    {   
        console.log(obj)
        try {
            const response = await axios.post('http://localhost:5000/register', obj
            );
            console.log('Data fetched:', response.data);
            if(response.data.message=='Data inserted successfully')
                {
                    navigator('/login')
                }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        
        if(obj.userType=='user')
    {    
        //  res= await axios.post('http://localhost:4000/user-api/user',obj)
    }
    else{
        //  res= await axios.post('http://localhost:4000/author-api/authorNewUser',obj)
      }
        // if(res.data.message==='user created')
        // {
        //     navigator('/Login')
        // }
        // else{
        //      setErr(res.data.message)
        // }
        
    }
  return (
    <div className="border p-3 m-3 h-100 w-50 mx-auto mt-5 shadow-lg">
            <h1 className='fs-2 text-primary text-center mb-3'>Register</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className=''>
          <div className='mb-3 row mx-3 form-check d-flex'>
    <div className='col lg-col-6'>
        <input
            type="radio"
            name="userType"
            value="user"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="user" className='form-label'>User</label>
    </div>
   
    <div className='col lg-col-6'>
        <input
            type="radio"
            name="userType"
            value="admin"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="admin" className='form-label'>Admin</label>
    </div>
</div>
{errors.userType && <p className='lead fs-4 text-danger'>Please select a user type</p>}

        <div className='mb-3'>
            <label htmlFor='username' className='form-label mx-3'>
                Username
                 
            </label>
            <input id="username" className='form-control w-75 mx-3' type="text" {
                ...register("username",{required:true,minLength:4,maxLength:8})
            }/>
            {
                errors.username?.type==='required' && <p className='lead fs-4 text-danger'>Invalid Username</p>}
               { errors.username?.type==='minLength' && <p className='lead fs-4 text-danger'>minLenght is 4</p>}
               { errors.username?.type==='maxLength' && <p className='lead fs-4 text-danger'>maxLenght is 8</p>}
            
        </div>
        <div>
        <label className='form-label mx-3' htmlFor='password'>Password</label>
        <input className='form-control mx-3 w-75' type='password' id="password"
        {
            ...register("password",{required:true})
        }
       
        
        ></input>
         {
            errors.password?.type==='required' && <p className='lead fs-6 text-danger'>Password is required</p>
        }
       </div>
       <div>
        <label className='form-label mx-3' htmlFor='email'>Email</label>
        <input className='form-control mx-3 w-75' type='email' id="email"
        {
            ...register("email",{required:true})
        }
       
        
        ></input>
         {
            errors.email?.type==='required' && <p className='lead fs-6 text-danger'>email is required</p>
        }
       </div>

     
        <div className='text-center'>
        <button className='btn btn-danger mx-auto mt-3' type="submit">Submit</button></div>
         
          </form>
          {
               err.length!==0 && <p>{err}</p>
          }
          <p className='lead fs-5 text-center '>
           <Link style={{textDecoration:"none"}} onClick={change}>Already Registered</Link>
          </p>
        </div>
  )
}

export default Register