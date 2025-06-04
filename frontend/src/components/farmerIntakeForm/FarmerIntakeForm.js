import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Divider, CardMedia, FormControlLabel, RadioGroup, Radio, Chip, Paper, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
// /import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewDeposit, submitNewResponse, submitNewResponseIntake ,updateFormFields } from 'src/redux/actions/group.action';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { FaCamera, FaRegCheckCircle } from 'react-icons/fa';
import { TbCurrentLocation } from "react-icons/tb";


import 'react-phone-input-2/lib/style.css';  // Import the library's styles
import PhoneInput from 'react-phone-input-2';


import DEFAULTIMG from 'src/assets/images/rec.png';
import agentConfig from 'src/layouts/dashboard/nav/farmerConfig';

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


export default function FarmerIntakeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();


  const inputContainer2 = {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    marginTop:"-0.2rem"
  };

  
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const {formInFocus} =useSelector((state) => state.group);
  console.log("Form IN FOCUS------->",formInFocus)
 

 

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

const [step1, setStep1] = useState(true);
const [step2, setStep2] = useState(false);
const [step3, setStep3] = useState(false);


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


 const [classo,setClasso] = useState("")

 const [phone, setPhone] = useState('');


 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [otherNames, setOtherNames] = useState('');
 const [gender, setGender] = useState('');
 const [age, setAge] = useState('');
 const [maritalStatus, setMaritalStatus] = useState('');
 const [noOfSpouse, setNoOfSpouse] = useState('');
 const [noOfChildren, setNoOfChildren] = useState('');
 const [hasID, setHasID] = useState(false);
 const [idTpye, setIdTpye] = useState('');
 const [hasSmartphone, setHasSmartphone] = useState(false);
 const [farmingType, setFarmingType] = useState('');
 const [cropsLivestock, setCropsLivestock] = useState([]);
 const [currentCrops, setCurrentCrops] = useState('');
 const [farmSize, setFarmSize] = useState('');

 const [farmSizeUnit, setFarmSizeUnit] = useState('');

 const [farmLocation, setFarmLocation] = useState('');
 const [gpsLocation, setGpsLocation] = useState({ latitude: null, longitude: null });
 const [error, setError] = useState(null);

 const [whereDoYouSell, setWhereDoYouSell] = useState('');
 const [irrigation, setIrrigation] = useState(false);
 const [insurance, setInsurance] = useState(false);
 const [organicFarming, setOrganicFarming] = useState(false);
 const [farmingExperience, setfarmingExperience] = useState('');
 const [previousProduction, setPreviousProduction] = useState('');
 const [previousChemicals, setPreviousChemicals] = useState('');
 const [input, setInput] = useState('');
 const [previousCost, setPreviousCost] = useState('');
 const [challenges, setChallenges] = useState([]);

 console.log("challenges is ---->",challenges)

const getGeolocation = () =>{

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );

    console.log("gps location gotten is-->",gpsLocation)
  } else {
    notifyErrorFxn("cannot get location, please try again!")
    setError('Geolocation is not supported by this browser.');

    console.log("error from gps location is-->",error)
  }
}


  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const [fields, setFields] = useState(formInFocus && formInFocus.fields);


   // Split the array into two halves
   const middleIndex = Math.ceil(formInFocus && formInFocus.fields &&  formInFocus.fields.length / 2);
   const firstHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(0, middleIndex);
   const secondHalf = formInFocus && formInFocus.fields &&  formInFocus.fields.slice(middleIndex);
 
   // Create form objects for each half
   const initialFormObject1 =firstHalf && firstHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   const initialFormObject2 = secondHalf && secondHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   // State to manage form values for both halves
   const [formValues1, setFormValues1] = useState(initialFormObject1);
   const [formValues2, setFormValues2] = useState(initialFormObject2);
   const [bloodInv,setBloodInv] =  useState([])
   const [currentChallenge,setCurrentChallenge] =  useState([])
   const [bloodInvId,setBloodInvId] =  useState([])

  const initialFormObject = formInFocus && formInFocus.fields && formInFocus.fields.reduce((acc, curr) => {
    acc[curr.prompt] = ''; // Initialize each value to an empty string
    return acc;
  }, {});

  // State to manage form values
  const [formValues, setFormValues] = useState(initialFormObject);

  console.log("FORM ID IS ===>",formInFocus &&formInFocus._id)
  const finalObject = 
    
   {
    form_id:formInFocus &&formInFocus._id,
    agent_user_id:null,
    admin_user_id:formInFocus &&formInFocus.user_id,
    last_updated_by:formInFocus &&formInFocus.user_id,
    is_deleted:false,
    responseObject:{
     firstName,
     lastName,
     otherNames,
     gender,
     age,
     maritalStatus,
     noOfChildren,
     noOfSpouse,
     hasID,
     idType:idTpye,
     hasSmartphone,
     farmingType,
     cropsLivestock,
     farmSize,
     farmSizeUnit,
     farmLocation,
     location:`${gpsLocation.latitude},${gpsLocation.longitude}`,
     whereDoYouSell,
     market:whereDoYouSell,
     irrigation,
     insurance,
     organicFarming,
     farmingExperience,
     previousProduction,
     previousChemicals,
     chemicals:previousChemicals,
     input,
     previousCost,
     challenges

    }
   }

  const handleChange1 = (promptKey) => (e) => {
    setFormValues1({
      ...formValues1,
      [promptKey]: e.target.value,
    });
  };

  const handleChange2 = (promptKey) => (e) => {
    setFormValues2({
      ...formValues2,
      [promptKey]: e.target.value,
    });
  };



  

  const handlePromptChange = (id, newPrompt) => {
    
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, name: newPrompt }; 
      }
      return field; 
    });

    
    setFields(updatedFields);
  };


  const submitResponse = (updatedFields) =>{
    console.log("PROCESS BEGUN--->")
    setLoading(true)
   
if(gpsLocation.longitude === null ||gpsLocation.latitude === null ){
 notifyErrorFxn("Please Fetch Co-ordinates, before Submitting!")
}
else{
   dispatch(submitNewResponseIntake(updatedFields,setStep1,setStep2,setStep3))
}
  setTimeout( ()=>{setLoading(false) },2500)
 
  }

  const handleDelete = (tbr,tbrId) => {
    

    let placeholder =   challenges.filter((item)=>(item !== tbr))
   //let placeholder2 =   challengesId.filter((item)=>(item !== tbrId))


     setChallenges([...placeholder])
    //setBloodInvId([...placeholder2])
 };


 const handleDeleteCrops = (tbr,tbrId) => {
    

  let placeholder =   cropsLivestock.filter((item)=>(item !== tbr))
 //let placeholder2 =   challengesId.filter((item)=>(item !== tbrId))


   setCropsLivestock([...placeholder])
  //setBloodInvId([...placeholder2])
};

 

 

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0].name);
};

 



 

  return (
    <>
    {step1 &&

      <form >


<>
 
     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
    
    
    
      <>
     <Grid item xs={12}style={{maxWidth:"1000px",width:"90%",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center"}}>
          <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
            Farmer's Personal Information
          </Typography>


          <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
  </Grid>
  

    </>
  
     
     <Grid item xs={12} spacing={2} style={{marginTop:"-3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
           
          
          
            
           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
              <CardMedia
                style={{ border: '0px solid black', backgroundColor: '#F2F4F7', width: '150px',borderRadius:"50%" }}
                component="img"
                height="150"
                width="150"
                image={file ? file : imageUrl !== "" ? imageUrl : DEFAULTIMG}
                alt="IMG"
              />
              <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#0A6054', marginTop: '15px' }}>
              <FaCamera style={{marginRight:"0.5rem",color:"white"}} /> <b>Take Photo</b>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleselectedFile}
                />
              </Button>
            </div>
    
    
    
            </Grid>

   <>

   <Grid container sx={{display:"flex",justifyContent:"center",flexDirection:{xs:"column",sm:"row"},gap:{md:"3rem"}}}>
     <Grid item sm={fields && fields.length < 2 ?12:5 }  xs={12}   > 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"center",sm:"flex-start"},justifyContent:"center"}}  >
   


          <TextField
          key={"firstName"}
          label={'First Name'}
          value={firstName}
          onChange={(e)=>{setFirstName(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

       <TextField
          key={"promptKey"}
          label={'Other Names'}
          value={otherNames}
          onChange={(e)=>{setOtherNames(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

 
        <TextField
          key={"promptKey"}
          label={'Age'}
          value={age}
          type={'date'}
          onChange={(e)=>{setAge(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true , 
         
         }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'gray',backgroundColor:"#F9FAFB",paddingRight:"1rem", },
          }}
          
          variant="outlined"
          fullWidth
          margin="normal"
        />



      
         <TextField
          key={"promptKey"}
          label={'Number of Spouse'}
          value={noOfSpouse}
          type={'text'}
          onChange={(e)=>{setNoOfSpouse(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true , 
         
         }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'gray',backgroundColor:"#F9FAFB",paddingRight:"1rem", },
          }}
          
          variant="outlined"
          fullWidth
          margin="normal"
        />
        


             <div style={{marginTop:"3.2rem"}}>
                   ID (Government Identification)*
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value={true}  control={<Radio  onChange={(e)=>{setHasID(true)}}  style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value={false} control={<Radio  onChange={(e)=>{setHasID(false)}} style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </div>


                <div style={{marginTop:"1rem"}}>
                   Do you have a smartphone ?*
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue={true}
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value={true} control={<Radio onChange={(e)=>{setHasSmartphone(true)}}  style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value={false}  control={<Radio onChange={(e)=>{setHasSmartphone(false)}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </div>





        
  
      </Stack>
      </Grid> 
      
    
      <Grid item xs={12} sm={5} > 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"center",sm:"flex-start"},justifyContent:"center"}} >
      
        <TextField
          key={"promptKey"}
          label={'Last Name'}
          value={lastName}
          onChange={(e)=>{setLastName(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

{<Select  
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} , color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={gender}
          label="Gender"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Gender</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>Gender</MenuItem>   
  <MenuItem  value={"Male"}>Male</MenuItem>
  <MenuItem   value={"Female"}>Female</MenuItem>
  

       
        </Select>}
 

 
{<Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={maritalStatus}
          label="Marital Status"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Marital Status</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setMaritalStatus(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Single"}>Single</MenuItem>
  <MenuItem   value={"Married"}>Married</MenuItem>
  <MenuItem   value={"Divorced"}>Divorced</MenuItem>

       
        </Select>}
 


        
 {<Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={noOfChildren}
          label="No of Children"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>No of Children</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setNoOfChildren(event.target.value);
          }}
        >
       
  <MenuItem disabled value={"0"}>0</MenuItem>   
  <MenuItem  value={"1"}>1</MenuItem>
  <MenuItem   value={"2"}>2</MenuItem>
  <MenuItem   value={"3"}>3</MenuItem>
  <MenuItem   value={"4"}>4</MenuItem>
  <MenuItem   value={"5"}>5</MenuItem>
  <MenuItem   value={"6"}>6</MenuItem>

       
        </Select>}

 
{<Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={idTpye}
          label="ID type"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>ID type</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setIdTpye(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>Classe et Option</MenuItem>   
  <MenuItem  value={"Passport"}>Passport</MenuItem>
  <MenuItem   value={"National Identification"}>National Identification</MenuItem>
  <MenuItem   value={"Drivers License"}>Drivers License</MenuItem>

       
        </Select>}


        {

<Paper sx={{ width: '100%', maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"}  }}>
<PhoneInput
  country={'us'} // Default country (you can change to any valid country code)
  value={phone}
  onChange={setPhone} // Update the phone number on change
  enableSearch={true} // Allow users to search for countries
  placeholder="Enter phone number"
  inputStyle={{
    backgroundColor: "#F9FAFB", // Match your input background color
    width: '100%',
    height: '3rem',
    borderRadius: '0.1rem',
    paddingLeft: '3rem',
    color: 'black',
  }}
  buttonStyle={{
    backgroundColor: "#FFFFFF", // Match the select button background
    borderRadius: '0.1rem',
    height: '3rem',
  }}
  containerStyle={{
    width: '100%',
   
  }}
/>
</Paper>
        }


        
  
      </Stack>




  
      </Grid> 
   </Grid>
   </>   
 
  
     
      </Grid> 


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
     
      </Stack>
     
   
 
 </>

   




 
<>
     
<Grid item xs={12}style={{maxWidth:"1000px",width:"90%",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center",marginBottom:"2.5rem",marginLeft:"2.5rem"}}>
          <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
            Farm Information
          </Typography>


          <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
  </Grid>

  <Grid container spacing={2} xs={12} sx={{display:"flex",alignItems:"center",flexDirection:{xs:"column",sm:"row"},justifyContent:"center",gap:"2rem"}} > 
    <Grid item xs={5} > 
       <Stack spacing={3}   sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"center",sm:"flex-start"},justifyContent:"center"}} >

  <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB", maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={farmingType}
          label="Farming Type"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Farming type</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setFarmingType(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"manual"}>manual</MenuItem>
  <MenuItem   value={"mechanized"}>mechanized</MenuItem>
 

       
        </Select>

        <div style={{marginTop:"3.2rem"}}>
                   Farm Size (Acre / Hectare) 
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"

                   >


                      <FormControlLabel value="Acre" control={<Radio onClick={(event) => {  setFarmSizeUnit("Acre");}}    style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Acre </Typography>} />
                     <FormControlLabel  value="Hectare" control={<Radio onClick={(event) => {  setFarmSizeUnit('Hectare');}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>Hectare</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

            </div>
 

 
 <Grid container xs={10} style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"2rem"}} >

  <Grid item xs={6}>
  {/*<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={farmLocation}
          label="Marital Status"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Farm Location(GPS)</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setFarmLocation(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Senegal"}>Senegal</MenuItem>
  <MenuItem   value={"Nigeria"}>Nigeria</MenuItem>
  <MenuItem   value={"Cameroon"}>Cameroon</MenuItem>

       
    </Select>*/}

       <TextField
          key={"promptKey"}
          label={'Farm Location(GPS)'}
          value={gpsLocation.latitude===null && gpsLocation.longitude===null?'': gpsLocation.latitude + ", " + gpsLocation.longitude}
         
          style={{ color: 'black' }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
    </Grid>

    <Grid item xs={2}> 
      <Button onClick={()=>{getGeolocation()}}
       component="label" variant="contained" style={{ minHeight: '45px', minWidth: '110px',color:"#0A6054", backgroundColor: 'white', marginTop: '0px',border:"1px solid #0A6054" }}>
              <TbCurrentLocation style={{marginRight:"0.5rem",color:"#0A6054"}} /> Get Gps
               
      </Button>
    </Grid>
  
    
  </Grid>  
    
    


            <div style={{marginTop:"3.2rem"}}>
                   Do you have insurance ?
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value={true} control={<Radio onClick={(event) => {  setInsurance(true);}}   style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value={false} control={<Radio  onClick={(event) => {  setInsurance(false);}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </div>
 
  
                <TextField
          key={"promptKey"}
          label={'Previous Production'}
          value={previousProduction}
          onClick={(event) => {  setPreviousProduction(event.target.value);}} 
          sx={{ color: 'black',maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        
   <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"}}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={whereDoYouSell}
          label="Where do you sell your products?"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Where do you sell your products?</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setWhereDoYouSell(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Market"}>Market</MenuItem>
  <MenuItem   value={"Harbour"}>Harbour</MenuItem>
  <MenuItem   value={"Reseller"}>Reseller</MenuItem>
  

       
        </Select>

 
  <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginLeft:{xs:"50%",sm:"0%"}, maxWidth:{xs:"20rem",sm:"70%",md:"80%",lg:"100%"},height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="his-label"
          id="his"
          value={farmingExperience}
          label="Farming Exp"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Farming Experience</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            farmingExperience(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"1 Year"}>1 Year</MenuItem>
  <MenuItem  value={"2 Years"}>2 Years</MenuItem>
  <MenuItem  value={"3 Years"}>3 Years</MenuItem>
  <MenuItem  value={"4 Years"}>4 Years</MenuItem>
  <MenuItem  value={"5 Years"}>5 Years</MenuItem>
  <MenuItem  value={"6 Years"}>6 Years</MenuItem>
  <MenuItem  value={"7 Years"}>7 Years</MenuItem>
  <MenuItem  value={"8 Years"}>8 Years</MenuItem>
  <MenuItem  value={"9 Years"}>9 Years</MenuItem>
  <MenuItem  value={"10 Years"}>10 Years</MenuItem>
  <MenuItem  value={"11 Years"}>11 Years</MenuItem>
  <MenuItem  value={"12 Years"}>12 Years</MenuItem>
  <MenuItem  value={">12 Years"}> Greater than 12 Years</MenuItem>

       
        </Select>



        
  
      </Stack>

      </Grid> 

      <Grid item sm={5} xs={12} sx={{display:"flex",justifyContent:"flex-start",alignItems:{xs:"flex-start",sm:"center"}}}> 
       <Stack spacing={3} sx={{minWidth:{xs:"144%",sm:"105%"},paddingTop:"0rem", display:"flex", alignItems:{xs:"center" ,sm:"flex-start"},justifyContent:{xs:"flex-start",sm:"flex-start"},marginLeft:{xs:"-3rem",sm:"0rem"}}}  >
  
       <TextField
          key={"promptKey"}
          label={'Crops/Livestock'}
          value={currentCrops}
          placeholder={"Press Enter to add a new produce"}
        


         onChange={(e)=>{
              
          setCurrentCrops(e.target.value)

        }}


        onKeyPress={(e) => {
          if (e.key === "Enter") {
              if (!cropsLivestock.includes(e.target.value)) {
                  setCropsLivestock([...cropsLivestock, e.target.value]);
                  setCurrentCrops('');
              }
          }
      }}
          sx={{ color: 'black',maxWidth:{xs:"30rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


    <Grid item xs={12} style={{width:"100%"}}>
      {
     <Box sx={{maxWidth:{xs:"25rem",sm:"70%",md:"80%",lg:"100%"},padding: '10px', border: '1px solid #00000033' }}>
              <> 
                 &nbsp; 
               {  cropsLivestock.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={()=>{}} onDelete={()=>{handleDeleteCrops(chipItem,bloodInvId[index])}} />
              ))
                }

              </>
     </Box>
              }
       </Grid>



   <TextField
          key={"promptKey"}
          label={'Farm Size'}
          value={farmSize}
          onClick={(e)=>{setFarmSize(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"25rem",sm:"70%",md:"80%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />



        <div style={{marginTop:"3.2rem"}}>
                   Do you Use Irrigation ?
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value="Entry Level(3yrs or less)" control={<Radio onClick={(e)=>{setIrrigation(true)}} style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value="Mid-level (3yrs - 5yrs)" control={<Radio onClick={(e)=>{setIrrigation(false)}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </div>


                <div style={{marginTop:"3.2rem"}}>
                   Organic Farming 
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value="Entry Level(3yrs or less)" control={<Radio onClick={(e)=>{setOrganicFarming(true)}}  style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value="Mid-level (3yrs - 5yrs)" control={<Radio onClick={(e)=>{setOrganicFarming(false)}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </div>
 

 
  <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem',maxWidth:{xs:"25rem",sm:"70%",md:"80%",lg:"100%"}, paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={previousChemicals}
          label="Previous Chemicals used"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Previous Chemicals Used?</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setPreviousChemicals(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"NPK-15-15-15"}>NPK-15-15-15</MenuItem>
  <MenuItem   value={"NPK-30-15-30"}>NPK-30-15-30</MenuItem>
  <MenuItem   value={"NPK-30-30-30"}>NPK-30-30-30</MenuItem>

       
        </Select>


       
 
  

        
 <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",maxWidth:{xs:"28em",sm:"70%",md:"80%",lg:"100%"}, height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={input}
          label="No of Children"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Input</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"NPK-15-15-15"}>NPK-15-15-15</MenuItem>
  <MenuItem   value={"NPK-30-15-15"}>NPK-30-15-15</MenuItem>
  <MenuItem   value={"NPK-15-15-30"}>NPK-15-15-30</MenuItem>

       
        </Select>


        <TextField
          key={"promptKey"}
          label={'Previous Cost'}
          value={previousCost}
          onChange={(e)=>{setPreviousCost(e.target.value)}}
            sx={{ color:'black' ,maxWidth:{xs:"28rem",sm:"70%",md:"80%",lg:"100%"}}}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


        
  
      </Stack>

       </Grid> 
      </Grid> 

     


<Grid container item xs={12} spacing={2} sx={{minWidth:{xs:"105%",sm:"105%"}, display:"flex", alignItems:{xs:"center" ,sm:"flex-start"},justifyContent:{xs:"flex-start",sm:"flex-start"},marginLeft:{xs:"2rem",sm:"3rem"} }}>
<Grid item xs={3}>
  <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
   <div >
 
   </div>

  </Typography>

</Grid>



<Grid item  sm ={10.2} xs={10.5} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
   <TextField
          key={"Challenges"}
          label={'Challenges'}
          placeholder={"Press Enter to add a new challenge"}
          value={currentChallenge}
          onChange={(e)=>{
            
            
            setCurrentChallenge(e.target.value)


          }}


          onKeyPress={(e) => {
            if (e.key === "Enter") {
                if (!challenges.includes(e.target.value)) {
                    setChallenges([...challenges, e.target.value]);
                    setCurrentChallenge('');
                }
            }
        }}
          sx={{ color:'black',maxWidth:{xs:"20rem",sm:"70%",md:"90%",lg:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
 </Grid>


<Grid item sm={10.2} xs={10.5} style={{width:"100%"}}>
      {
     <Box sx={{width:{xs:"20rem",sm:"70%",md:"90%",lg:"100%"},padding: '10px', border: '1px solid #00000033',marginLeft:{xs:"20.5rem",sm:"9rem",md:"3rem",lg:"0rem"} }}>
              <> 
                 &nbsp; 
               {  challenges.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem,bloodInvId[index])}} />
              ))
                }

              </>
     </Box>
              }
  </Grid>



</Grid>


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>


       <Stack sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:{xs:"column",sm:"column",md:"row"},gap:"1rem"}}>

       {<LoadingButton 
        
        onClick={()=>{navigate(-1)}}
        size="large" type="button" variant="contained" disabled={loading} sx={{marginRight:{xs:"0rem",sm:"0rem",md:"0rem"},fontWeight:"500",color: '#21712E',backgroundColor: '#F2F4F7', border:"1px solid #21712E",width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},borderRadius:"0.5rem"}}>
       
        { "Back"}
      </LoadingButton>}
     

       <LoadingButton 
        
        onClick={()=>{ setStep1(false); setStep2(true); setStep3(false) }}
        size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",fontWeight:"500",maxWidth:{xs:"20rem",sm:"29rem"},color: 'white',backgroundColor: '#0A6054',borderRadius:"0.5rem"}}>
       
        {loading ? "Loading..." : "Continue"}
      </LoadingButton>


     
      </Stack>
      
 </>


      </form>
  }




{step2 &&

<form >


<>

<Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  



<>
<Grid item xs={12}style={{maxWidth:"1000px",width:"90%",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center"}}>
    <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
      Farmer's Personal Information
    </Typography>


    <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
</Grid>


</>


<Grid item xs={12} spacing={2} style={{marginTop:"-3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
     
    
    
      
     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <CardMedia
          style={{ border: '0px solid black', backgroundColor: '#F2F4F7', width: '150px',borderRadius:"50%" }}
          component="img"
          height="150"
          width="150"
          image={file ? file : imageUrl !== "" ? imageUrl : DEFAULTIMG}
          alt="IMG"
        />
        {/*<Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#0A6054', marginTop: '15px' }}>
        <FaCamera style={{marginRight:"0.5rem",color:"white"}} /> <b>Take Photo</b>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleselectedFile}
          />
        </Button>*/}
      </div>



      </Grid>

<>

<Grid item xs={12} sm={fields && fields.length < 2 ?12:5 }  style={{display:"flex",alignItems:"center",justifyContent:"center"}}  > 
 <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem",paddingLeft:{xs:"0rem",sm:"1.5rem"},marginLeft:{xs:"-1.5rem",sm:"0rem"}, display:"flex", alignItems:"flex-start",justifyContent:"flex-start"}}  >



          <div style={{display:"inline-flex"}}>Full Name:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{firstName + " " + otherNames + " " + lastName}</span></div>

          <div style={{display:"inline-flex"}}>Age:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{age}</span></div>


            <div style={{display:"inline-flex"}}>No of Spouse:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{noOfSpouse}</span></div>


            <div style={{display:"inline-flex"}}>Smart Phone:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{hasSmartphone?"Yes":"No"}</span></div>

         <div style={{display:"inline-flex"}}>Phone Number:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{phone}</span></div>


</Stack>
</Grid> 


<Grid item xs={12} sm={5} style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
 <Stack  spacing={3} sx={{marginLeft:{xs:"0rem",sm:"-6rem"}}}>
 

 <div style={{display:"inline-flex"}}>Gender :&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{gender}</span></div>

<div style={{display:"inline-flex"}}>Marital Status:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{maritalStatus}</span></div>



  <div style={{display:"inline-flex"}}>No of Children:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{noOfChildren}</span></div>



  
  <div style={{display:"inline-flex"}}>ID:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{hasID?"Yes":"No"}</span></div>


 


  {

<div style={{display:"inline-flex"}}>Farming Experience:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmingExperience}</span></div>
  }


  

</Stack>





</Grid> 

</>   



</Grid> 


<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

</Stack>



</>







<>

<Grid item xs={12} style={{maxWidth:"1000px",width:"90%",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center",marginLeft:"2.5rem"}}>
    <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
      Farm Information
    </Typography>


    <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
</Grid>

<Grid container xs={12} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"3rem",marginTop:"3rem"}} > 
<Grid item  sm={5} xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}} > 
 <Stack spacing={3} >

         <div style={{display:"inline-flex"}}>Farming Type:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{"Crop"}</span></div>

         <div style={{display:"inline-flex"}}>Farm size:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmSize}</span></div>


          <div style={{display:"inline-flex"}}>Irrigation:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{irrigation?"Yes":"No"}</span></div> 




          <div style={{display:"inline-flex"}}>Organic Farming:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{organicFarming?"Yes":"No"}</span></div>


          <div style={{display:"inline-flex"}}>Previous chemicals use:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{previousChemicals}</span></div>

  
          <div style={{display:"inline-flex"}}>Input:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{input}</span></div>


         <div style={{display:"inline-flex"}}>Previous Cost:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{`${previousCost} CFA`}</span></div>



  

</Stack>

</Grid> 

<Grid item  sm={5} xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}} > 
 <Stack spacing={3} sx={{paddingLeft:{xs:"3rem",sm:"0rem"}}} >
 





      <div style={{display:"inline-flex"}}>Crops/Livestock:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{cropsLivestock.map((item)=>(`${item},`))}</span></div>



       <div style={{display:"inline-flex"}}>Farm Location(GPS):&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{" " + gpsLocation.latitude + ", " + gpsLocation.longitude}</span></div>



     <div style={{display:"inline-flex"}}>Insurance:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{"No"}</span></div>


          <div style={{display:"inline-flex"}}>Previous Production:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{previousProduction}</span></div>



          <div style={{display:"inline-flex"}}>Where do you sell your Product:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{whereDoYouSell}</span></div>

 



  
  <div style={{display:"inline-flex"}}>Farming Experience:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmingExperience}</span></div>


  <div style={{display:"inline-flex"}}>Challenges:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{challenges.map((item)=>(`${item},`))}</span></div>


  

</Stack>

 </Grid> 
</Grid> 

<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>

</Stack>






<Stack sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:{xs:"column",sm:"row"},gap:"1rem"}}>

{<LoadingButton 
 
 onClick={()=>{ setStep1(true); setStep2(false); setStep3(false) }}
 size="large" type="button" variant="contained" disabled={loading} sx={{marginRight:{xs:"0rem",sm:"2rem"},color: '#21712E',fontWeight:"500",backgroundColor: '#F2F4F7',width:"100%",maxWidth:{xs:"20rem",sm:"29rem"}, border:"1px solid #21712E",borderRadius:"0.5rem"}}>

 { "Edit"}
</LoadingButton>}


<LoadingButton 
 
 onClick={()=>{ submitResponse(finalObject)  }}
 size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},fontWeight:"500",color: 'white',backgroundColor: '#0A6054',borderRadius:"0.5rem"}}>

 {loading ? "Loading..." : "Submit"}
</LoadingButton>



</Stack>

</>


</form>
}


{step3 &&




<>

<Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  





<Grid item xs={12} spacing={2} style={{marginTop:"-3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
     
    
    
      
     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        
        <div style={{color:"#0A6054"}}>
       <FaRegCheckCircle style={{backgroundColor:"#ECE3D0",fontSize:"7rem",borderRadius:"50%"}} />
       </div>
       
        <b style={{marginTop:"1.1rem",marginBottom:"1.3rem"}}>Form sent successfully</b>
        {
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"1.5rem"}}>
          <Button   onClick={()=>{window.location.reload()}} component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', color: '#21712E',border:"1px solid #21712E",backgroundColor: '#F2F4F7', fontWeight:"500", marginTop: '15px' }}>
        <b>Send Another</b>
         
        </Button>
        
        
          

        <Button component="label" variant="contained"  onClick={()=>{navigate('/dashboard/forms')}}  style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#0A6054',fontWeight:"500", marginTop: '15px' }}>
        <b>Done</b>
         
        </Button>
        
        </div>
        }
      </div>



      </Grid>




</Grid> 







</>



}



    </>
  );
}
