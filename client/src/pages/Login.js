import { useState, useEffect, useContext} from 'react'
import {Link,useHistory} from 'react-router-dom';
import NavBar from '../components/NavBar';
import { TextField,FormHelperText, FormGroup } from '@mui/material';
import Button from '@mui/material/Button';
import jwt from 'jwt-decode'




function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');
  const history=useHistory()	
  useEffect( ()=>{
    const token=localStorage.getItem('token')
    if(token){
        const user=jwt(token)
        if(!user){
            localStorage.removeItem('token')
            history.replace('/login')
        }
        else{
           history.push('/home')
        }
      
    }
    else{
        history.push('/login')
    }
    //Get the inventory table
},[])





async function loginUser(event) {
  event.preventDefault()
  const response = await fetch('http://34.221.6.91:1337/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()
  if(data.user){
    localStorage.setItem('token',data.user)    
    window.location.href='/home'
  }
  else{
     alert('Please Check your username and password')
  }
 console.log(data)

}


  return (
    <>
    <NavBar/>
    
   
    <div className='container-main'>
    <form onSubmit={loginUser}> 
    <FormGroup sx={{ width: '30%' }}  >
    <div className='header'><p className="header-text">Login</p></div>

      <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Placeholder"
          multiline
          required
          value={email}
					onChange={(e) => setEmail(e.target.value)}
        />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ my: '10px' }}
          value={password}
					onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type='submit' variant="contained" size="large"  sx={{ my: '10px' }} >
          Submit
        </Button>
        <div> 
            <Link to="/register" className='link'> 
                Not have an account ? Sign up here 
            </Link>
        </div>


     </FormGroup>
     </form> 
     </div>

    </>
  );
  
}

export default Login;



