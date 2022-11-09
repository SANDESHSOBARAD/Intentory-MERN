import NavBarIn from "../components/NavBarIn"
import { useContext, useEffect, useState } from "react";
import { TextField,FormHelperText, FormGroup } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import jwt from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import MainContext from "../context/MainContext";
import { storage } from "../firebase";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import CircularProgress from '@mui/material/CircularProgress';
import { v4 } from "uuid";


import Button from '@mui/material/Button';
function Add() {
    const history=useHistory()	
    const {userState,setUserState}=useContext(MainContext)

    const [name,setName]=useState('')
    const [desc,setDesc]=useState('')
    const [date,setDate]=useState(new Date())
    const [val,setVal]=useState(0)
    const [ival,setIval]=useState(0)
    const [photo,setPhoto]=useState('')
    const [success,setSuccess]=useState('')
    const [loading,setLoading]=useState(false)
    const [upload,setUpload]=useState(false)
    useEffect(()=>{

    const token=localStorage.getItem('token')
    if(token){
        const user=jwt(token)
        if(!user){
            localStorage.removeItem('token')
            history.replace('/login')
        }
        else{
            setUserState(user)
        }
      
    }
    else{
        history.push('/login')
    }

    },[])

    async function addInventory(event){
        event.preventDefault()

        if(photo=='' || upload==false){
            alert("all the fields must be filled, Remember to upload the photo")
            return;
        }
        const token = localStorage.getItem('token')
         fetch(`http://34.221.6.91:1337/api/add/${userState.name}`, {
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
        name,
        desc,
        date,
        val,
        ival,
        photo
    }),
  }).then((response)=>{
    if(response.status==201)
     window.location.href='/home'
    else
     setSuccess('something went wrong')
  })
 
  
}



const uploadImage=async (e)=>{
    e.preventDefault()

    if(photo==null)
        return;
    setLoading(true)
    const imageRef =await ref(storage, `images/${photo.name + v4()}`);
    uploadBytes(imageRef,photo).then(()=>{
        getDownloadURL(imageRef).then((url)=>{
            setPhoto(url)
            setLoading(false)
            setUpload(true)
        })
    })        


}


  return (
    <>
    <NavBarIn/>
     <div className='container-main'>
     <div>{success}</div>

    <form onSubmit={addInventory}> 
    <FormGroup sx={{ width: '30%' }}  >
    <div className='header'><p className="header-text">Add Item</p></div>

      <TextField
          id="outlined-textarea"
          label="Inventory Name"
          placeholder="Placeholder"
          multiline
          value={name}
	      onChange={(e) => setName(e.target.value)}
        />
        <div id="img-upload">
        < input type="file" accept="image/*" name="photo" placeholder="choose image"
	      onChange={(e) => setPhoto(e.target.files[0])}
        /> 
        <button  onClick={uploadImage}>upload</button>  
        {loading && (<CircularProgress/>)}
        </div>
      <TextField
          id="outlined-textarea"
          multiline
          label="Description"
          rows={3}
          sx={{ my: '10px' }}
          value={desc}
		  onChange={(e) => setDesc(e.target.value)}
          
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={(newVal)=>setDate(newVal)}
          renderInput={(params) => <TextField {...params} />}
          sx={{ my: '10px' }}
        />
        </LocalizationProvider>
       

        <TextField
          id="outlined-textarea"
          label="Approximate Value"
          type="number"
          
          InputProps={{
            inputProps: { min: 0 }
          }}
          value={val}
	      onChange={(e) => setVal(e.target.value)}
          sx={{ my: '10px' }}
        />

        <TextField
          id="outlined-textarea"
          label="Insurance Value"
          type="number"
          
          InputProps={{
            inputProps: { min: 0 }
          }}
          value={ival}
	      onChange={(e) => setIval(e.target.value)}
          sx={{ my: '10px' }}
        />


          
        <Button type='submit' variant="contained" size="large"  sx={{ my: '10px' }} >
          Add Inventory
        </Button>

     </FormGroup>
     </form> 
     <success/>
     </div>
    </>
  )
}

export default Add