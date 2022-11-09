
import DataTable,{createTheme} from 'react-data-table-component';
import MainContext from '../context/MainContext'
import {useContext, useState} from 'react'
import {FaTrashAlt,FaPen} from 'react-icons/fa'
import { useConfirm } from "material-ui-confirm";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { storage } from "../firebase";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import CircularProgress from '@mui/material/CircularProgress';
import { v4 } from "uuid";


createTheme('dark', {
    background: {
      default: 'transparent',
    },
  });
function DataTableBase(props) {
  const confirm = useConfirm();
  const {userState,setInventory}=useContext(MainContext)
  const [open, setOpen] = useState(false);
    const [name,setName]=useState('')
    const [desc,setDesc]=useState('')
    const [date,setDate]=useState(new Date())
    const [val,setVal]=useState(0)
    const [ival,setIval]=useState(0)
    const [photo,setPhoto]=useState('')
    const [rowId,setRowId]=useState('')
    const [loading,setLoading]=useState(false)



  const handleDelete= async(id)=>{
    
    const token = localStorage.getItem('token')  

  fetch(`http://34.221.6.91:1337/api/delete/${userState.name}/${id}`,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
  }
  ).then((response)=>{
    return response.json()
     }
    ).then((data)=>{
    //console.log(data)
    if(data.inventory)
      setInventory((prev)=>data.inventory) 

    }).catch((err)=>{
        console.log(err)
    })


  
  }




  
  const columns = [
    
      {
          name: 'Name',
          selector: row => row.inventory_name,
          sortable: true,
      },
      {
          name: 'Description',
          selector: row => row.desc,
      },
      {
          name: 'Date Added',
          selector: row => row.date,
          sortable: true,
      },
      {
          name: 'Approximate Value($)',
          selector: row => row.approx_val,
          sortable: true,
      },
      {
          name: 'Insurance Value($)',
          selector: row => row.insurance_val,
          sortable: true,
      },
      {
          name: 'Image',
          selector: row => <img width={50} height={50} src={row.photo}/>
      },
      {
        name:'Actions',
        cell: (row)=>(
          <>
            <FaPen style={{ color: 'orange',margin:'0px 15px 0px 0px ',cursor:'pointer' }} size='20'
             onClick={(e)=>{
               e.preventDefault();
                handleClickOpen(row)
              }
            }
            />
            <FaTrashAlt style={{ color: 'red',cursor:'pointer' }} className='delete-btn' size='20'
             onClick={(e)=>{
              e.preventDefault()

              confirm({ 
                description: "This action is permanent!",
                title	: "Are you sure you want to delete this record?",
                confirmationText: "Delete",
                confirmationButtonProps: { autoFocus: true ,
                color:'error',
              } ,
                transitionDuration	:{enter: 1000, exit: 1000},
                titleProps:{color:'yellow'} ,

              })
                .then(() => {
                  handleDelete(row._id)
                })
                .catch(() => {
     
                  });
               }
              }
            />
          </>
  
        )
      }
  ];
  const handleClickOpen = (row) => {
    setRowId(row._id)
    setName(row.inventory_name)
    setDesc(row.desc)
    setDate(row.date)
    setVal(row.approx_val)
    setIval(row.insurance_val)
    setPhoto(row.photo)
    setOpen(true);
  };
  const uploadImage=async ()=>{
    if(photo==null)
        return;
    setLoading(true)
    const imageRef =await ref(storage, `images/${photo.name + v4()}`);
    uploadBytes(imageRef,photo).then(()=>{
        getDownloadURL(imageRef).then((url)=>{
            setPhoto(url)
            setLoading(false)
        })
    })        


}

  const handleUpdate= (event)=>{
    event.preventDefault()
    const token = localStorage.getItem('token')
   
    const response = fetch(`http://34.221.6.91:1337/api/update/${userState.name}/${rowId}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
    name,
    desc,
    date,
    val,
    ival,
    photo
})
}).then((response)=>{
  return response.json()
   }
  ).then((data)=>{
  //console.log(data)
  if(data.inventory)
    setInventory((prev)=>data.inventory) 

  }).catch((err)=>{
      console.log(err)
  })

    
    
  handleClose()
}

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
     
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Inventory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is permanent. Make sure you are entering right values.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Inventory Name"
            variant="standard"
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
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            value={desc}
            variant="standard"
            sx={{ mb: '15px' }}

            fullWidth
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
            autoFocus
            type="number"
            margin="dense"
            id="val"
            label="Approximate Value"
            variant="standard"
            sx={{ mx: '10px' }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            
          />
           <TextField
            autoFocus
            type="number"
            margin="dense"
            id="ival"
            label="Insurance Value"
            variant="standard"
            value={ival}
            onChange={(e) => setIval(e.target.value)}
            sx={{ mr: '75px'  }}
            
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      
        <DataTable 
         title='Table Inventory'
         columns={columns}
         data={props.data}
         theme='dark'
         fixedHeader
         highlightOnHover
         pagination
         />
    </>
  )
}

export default DataTableBase