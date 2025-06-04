import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { updateResponse } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { saveResponseInFocus } from 'src/redux/reducers/group.slice';


const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '1px solid #00000026',
      padding: '0px',
      borderRadius: '8px',
      // marginRight: theme.spacing(2),
      width: '100%',
      minWidth: '100%',
      '& .MuiInputBase-input': {
       
        color:"black"
      },
      '& .MuiInputBase-input::placeholder': {
      
        color:"black"
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'grey',
        color:"black"
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'grey',
        color:"black"
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
        color:"black"
      },

    },
    searchButton: {
      color: '#fff',
      padding: '15px',
      minWidth: '45%',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }));


export default function AddResponseForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);

  const {responseInFocus,currentAgentsToDisplay} =useSelector((state) => state.group);
const [selectedAgent, setSelectedAgent] = useState(responseInFocus.agent_user_id && responseInFocus.agent_user_id);
  console.log("RESPONSE IN FOCUS---->",responseInFocus)

  const [age, setAge] = useState('');

  /*
  age: "50"
do_you_have_identification: "no"
do_you_sell_to_who: "market"
do_you_use_chemicals_what_chemical: "yes"
family_size: "8"
name_first__last: "Baba Aregbe"
phone_number: "8144057649"
size_of_farm: "8 acres"
take_a_picture: ""
typical_harvest_size: "45 bags"
what_crop_are_you_farming: "maize"
what_do_you_do_with_your_harvest: "sale and family use"
would_you_be_interested_in_organic_farming_and_training:"yes"
*/


  const [sname, setSName] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [countryState, setCountryState] = useState('');

  const [quality,setQuality]=  useState('');
  const [quantity,setQuantity]=  useState('');
  const [containerNumber,setContainerNumber]=  useState('');
  const [containerName,setContainerName]=  useState('');
  const [farmerName,setFarmerName]=  useState('');
  const [product,setProduct]=  useState('');

  const [cost,setCost]=  useState('');
  const [dateOfArrival,setDateOfArrival]=  useState('');
  const [additionalInfo,setAdditionalInfo]=  useState('');
  

  
  const [picture, setPicture] = useState('');

 const [part1, setPart1] = useState(true);
 const [part2, setPart2] = useState(false);



  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0].name);
};


const handleChange = (e) => {
  
 
 //setPicture(e.target.value)

}
  

  const userSignup = (e) => {
   /* e.preventDefault();
    setLoading(true);
    const deposit = {
     dateOfArrival,
     additionalInfo, 
     farmerName,
      containerNumber,
      product,
      containerName,
       quality,
       quantity,
         cost};
    dispatch(addNewDeposit(deposit, navigate, setLoading)); */
  }


 

  return (
    <>
      <form onSubmit={userSignup}>


<>
    
     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
     
   { responseInFocus && responseInFocus.responseObject ?
   
   <>

     <Grid item xs={5}    > 
       <Stack spacing={3}  style={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start"}}  >
       
      


       {Object.keys(responseInFocus.responseObject).slice(0,Math.floor(Object.keys(responseInFocus.responseObject).length/2)).map((key) => (
        <TextField style={{minWidth:"100%",color:"black"}}
        InputLabelProps={{ shrink: true }} 
        InputProps={{ style:{height:"3rem",paddingLeft:"1rem",color:"black"}}}
        onChange={(e)=>{dispatch(saveResponseInFocus({...responseInFocus,responseObject:{...responseInFocus.responseObject,[key]:e.target.value  }} ))  }}
          key={key}
          label={key}
          value={responseInFocus.responseObject[key]}
          variant="outlined"
        />
      ))}

      


{   /**JOSHUA DO NOT MAKE CHANGES */
          <Grid xs={2} item style={{marginBottom: "0rem",marginRight:"1rem"}}>
             <FormControl sx={{ minWidth: 440,width:"100%" ,background: 'white' }}>
                  <Select
                    value={responseInFocus.agent_user_id}
                    onChange={(e)=>{ dispatch(saveResponseInFocus({...responseInFocus,agent_user_id:e.target.value,agentName:`${currentAgentsToDisplay.filter((item)=>(item.user_id === e.target.value))[0].firstName} ${currentAgentsToDisplay.filter((item)=>(item.user_id === e.target.value))[0].lastName}`  } ))  }}
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 440,
                      p: 1,
                    }}
                  >
                    <MenuItem value="" disabled={true}>
                      Select From
                    </MenuItem>
                  
                {
                  currentAgentsToDisplay &&  currentAgentsToDisplay.map( (item,index)=>(  

                    <MenuItem value={item.user_id}>{item.firstName + " " + item.lastName }</MenuItem>
                   
                  ))
                  }
                   
                   
                  </Select>
                </FormControl>
              </Grid>
              /**JOSHUA DO NOT MAKE CHANGES  - END*/
          }
        
  
      </Stack>
      </Grid> 
      
    
      <Grid item xs={5} > 
       <Stack spacing={3} >
       
      


       {Object.keys(responseInFocus.responseObject).slice(Math.floor(Object.keys(responseInFocus.responseObject).length/2), Object.keys(responseInFocus.responseObject).length ).map((key) => (
        <TextField 
        style={{color:"black"}}
        InputLabelProps={{ shrink: true }} 
        InputProps={{ style:{height:"3rem",paddingLeft:"1rem",color:"black"}}}
           onChange={(e)=>{console.log("CHANGING NOW!--->",`${responseInFocus.responseObject[key]}`);dispatch(saveResponseInFocus({...responseInFocus,responseObject:{...responseInFocus.responseObject,[key]:e.target.value  }} ))  }}
          key={key}
          label={key}
          value={responseInFocus.responseObject[key]}
          variant="outlined"
        />
      ))}

   
      </Stack>
      </Grid> 

   </>   
   
     :

     <Grid item xs={12} > 
       <Stack spacing={3} >
       
     No Response Recorded.
  
      </Stack>
      </Grid> 
  }
     
      </Grid> 


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>
     
     {/*
       <center>
      <LoadingButton  size="large" type="button" 
       onClick={()=>{setPart2(true);setPart1(false)}}
      variant="contained" disabled={loading} style={{ width:"33rem",color: 'white',backgroundColor: '#21712E',borderRadius:"5rem",}}>
        {loading ? "Loading..." : "Register"}
      </LoadingButton>
      </center>
        */} 
 
 </>

   




{ 
<>
   {/*

     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
      
     <Grid item xs={12} > 
       <Stack spacing={3} >
       
        

       <label for="Produce" style={{marginBottom:"0.6rem",position:"relative",left:"5%"}}> Produce</label>
       <textarea  name="Produce" rows={12} style={{width:"90%",margin:"0 auto",padding:"2rem",border:"1px solid lightgrey"}} value={additionalInfo}  onChange={(e) => setAdditionalInfo(e.target.value)} >

       </textarea>

      
        
      </Stack>
      </Grid> 

     
     
     
     
      </Grid> 
  */}


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>
  
     
       <center>
     
       <LoadingButton 
        
        onClick={()=>{navigate(-1)}}
        size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},color: '#0A6054',backgroundColor: '#F2F4F7', border:"1px solid #21712E",borderRadius:"0.5rem",marginRight:"1rem",fontWeight:"400"}}>
       
        
       { "Back"}
      </LoadingButton>


      <LoadingButton 
        
        onClick={()=>{
          dispatch(updateResponse(responseInFocus));
          setTimeout( () => {
            navigate(-1);
          }, 2000 )
        }}
        size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},color: 'white',backgroundColor:'#0A6054',borderRadius:"0.5rem",marginRight:"1rem",fontWeight:"400",}} >
       
        
       { "Update"}
      </LoadingButton>

      </center>
      
 </>

  }  


      </form>
    </>
  );
}
