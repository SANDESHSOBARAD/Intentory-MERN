import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';
import { TextField, FormGroup } from '@mui/material';
import Button from '@mui/material/Button';

function Register() {
    const history=useHistory()
const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

async function registerUser(event) {
  event.preventDefault()

  const response = await fetch('http://34.221.6.91:1337/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  const data = await response.json()
  if(data.status=='ok'){
    history.push('/login')
  }
 console.log(data)

}


  return (

    <>
      <NavBar/>

 <div className='container-main'>
    <form onSubmit={registerUser}> 
    <FormGroup sx={{ width: '30%' }}  >
    <div className='header' ><p className='header-text'>Register</p></div>

      <TextField
          id="outlined-textarea"
          label="Name"
          sx={{ mb: '10px' }}
          placeholder="Placeholder"
          multiline
          required
          value={name}
					onChange={(e) => setName(e.target.value)}
        />
         <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Placeholder"
          multiline
          required
          value={email}
					onChange={(e) => setEmail(e.target.value)}
        />
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
         
            <Link to="/login" className='link'> 
            Already have  an account? Sign in here. 
            </Link>
        </div>


     </FormGroup>
     </form> 
     </div>
    </>
  );
}

export default Register;
