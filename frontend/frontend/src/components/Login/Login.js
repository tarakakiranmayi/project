import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    let [err,setErr]=useState('')
   
     async function handleFormSubmit(obj)
    {   console.log(obj)
        try {
            const response = await axios.post('http://localhost:5000/login',obj,{

            });
            console.log('Data fetched:', response.data);
            if(response.data.message=='Login successful')
            {
                if(obj.userType=='user')
                {
                    navigate('/home')
                }
                else{
                    navigate('/admin')
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    
    
  return (
    <div className='w-50 border-5 mx-auto border-dark shadow-lg my-5 p-3'>
       <h2 className='text-center m-2'>Login</h2>
       <form onSubmit={handleSubmit(handleFormSubmit)}>
       <div className='mb-3 row mx-3 form-check d-flex'>
    <div className=' col-lg-6'>
        <input
            type="radio"
            name="userType"
            value="user"
            className='form-check-input'
            {...register("userType", { required: true })}
        />
        <label htmlFor="user" className='form-label'>User</label>
    </div>
   
    <div className='col-lg-6'>
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

        <div className=''>
        <lable className="form-lable m-3" htmlFor="email">
        Email
        </lable>
        <input type="text" className='form-control m-3 w-75 ' id="email"
        {
            ...register("email",{required:true,minLength:3})
        } ></input>
        {
            errors.email?.type==='required' && <p className='lead fs-6 text-danger'>Invalid email</p>   
        }
        {
            errors.email?.type==='minLength' && <p className='lead fs-6 text-danger'>minLenght is 3</p> 
        }
        </div>
       <div>
        <label className='form-label m-3' htmlFor='password'>Password</label>
        <input className='form-control m-3 w-75' type='password' id="password"
        {
            ...register("password",{required:true})
        }
       
        
        ></input>
         {
            errors.password?.type==='required' && <p className='lead fs-6 text-danger'>Password is required</p>
        }
       </div>
       <div className='text-center'>
        <button className='btn btn-success mx-auto' type='submit'>Submit</button>
       </div>
      
       </form>
       {
            err.length!=0 && <p>{err}</p>
        }
       <p className='lead fs-5 text-center'>
       
        <Link to="/Register" className='m-3'>New user
        </Link>
       </p>
       
    </div>
  )
}

export default Login