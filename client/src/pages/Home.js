import React,{useEffect,useContext,useState} from 'react'
import jwt from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import NavBarIn from '../components/NavBarIn'
import DataTableBase from '../components/DataTableBase'
import MainContext from '../context/MainContext'




function Home() {
    const history=useHistory()	
   // const [user,setUser]=useState(true) 
    const {userState,setUserState,inventory,setInventory}=useContext(MainContext)
    
   // const [inventory,setInventory]=useState([])

useEffect( ()=>{
    const token=localStorage.getItem('token')
    if(token){
        const user=jwt(token)
        if(!user){
            localStorage.removeItem('token')
            history.replace('/login')
        }
        else{
            //setUser(user)
            setUserState(user)
           
        }
    }
    else{
        history.push('/login')
    }

},[]);

useEffect(()=>{
    fetch(`http://34.221.6.91:1337/api/data/${userState.name}`).then((response)=>{
        return response.json()
         }
        ).then((data)=>{
          const invent=[...data.userInfo[0].inventory]
         setInventory((prev)=>invent) 
        }).catch((err)=>{
            console.log(err)
        })
},[userState,inventory])


  return (
    <>
    <NavBarIn/>
    
    <div className='data-table'>
        {inventory && <DataTableBase data={inventory}/>}
     </div>
     </>
  )
}

export default Home