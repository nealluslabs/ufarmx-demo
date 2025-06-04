import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Box, Menu,Paper} from '@mui/material';
import {  LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewDeposit, filterFarmersByName, submitNewResponse, updateFarmerHarvest, updateFarmerInput, updateFormFields } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { saveFarmerInFocus } from 'src/redux/reducers/group.slice';
import uuidv4 from 'src/chat-src/utils/uuidv4';



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


export default function FarmersHarvestCycleForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);



  const { myGroups, isLoading,
    currentFarmersToDisplay,
    currentAgentsToDisplay,
    totalPagesFarmers,
    allFarmers,
    filteredFarmers,
    currentDepositsToDisplay,
    farmerInFocus,
    formInFocus,
    loggedInAgent
   } = useSelector((state) => state.group);


  const {user} =useSelector((state) => state.auth);
  console.log("Form IN FOCUS WHILE FILLING------->",formInFocus)
 
  console.log("logged in agent------->",loggedInAgent)

  console.log("farmer in focus------->",farmerInFocus)

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

  const [selectedFarmer,setSelectedFarmer] = useState('')

  const [fields, setFields] = useState(formInFocus && formInFocus.fields);


   // Split the array into two halves
   const middleIndex = Math.ceil(formInFocus && formInFocus.fields &&  formInFocus.fields.length / 2);
   const firstHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(0, middleIndex);
   const secondHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(middleIndex);
 
   // Create form objects for each half
   const initialFormObject1 =firstHalf && firstHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   const initialFormObject2 =secondHalf && secondHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   // State to manage form values for both halves
   const [formValues1, setFormValues1] = useState(initialFormObject1);
   const [formValues2, setFormValues2] = useState(initialFormObject2);

   console.log("FORM VALUES 1 --->",formValues1)
   console.log("FORM VALUES 2 --->",formValues2)

   
  const modifiedFirstHalf = formValues1 && Object.keys(formValues1)

 modifiedFirstHalf && modifiedFirstHalf.shift()
 /*modifiedFirstHalf && modifiedFirstHalf.shift()
 modifiedFirstHalf && modifiedFirstHalf.shift()
 modifiedFirstHalf && modifiedFirstHalf.shift()*/

 const [anchorEl, setAnchorEl] = useState(null);
 const [searchValue, setSearchValue] = useState("");



 const inputRef = useRef(null);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    dispatch(filterFarmersByName(event.target.value,allFarmers))
    setSelectedFarmer(event.target.value);
    setIsDropdownOpen(event.target.value.trim() !== ""); // Show dropdown when typing
  };


  console.log("FARMER IN FOCUS--->",farmerInFocus)
  

  const handleItemClick = (farmer) => {
    console.log("ABOUT TO SAVE--->",farmerInFocus)
    
    setSelectedFarmer( farmer.name
      ? farmer.name
      : farmer.firstName && farmer.lastName
      ? `${farmer.firstName} ${farmer.lastName}`
      : farmer.firstName || farmer.lastName || "");

    setSelectedFarmer(farmer.user_id);
    setSearchValue(
      farmer.name
        ? farmer.name
        : farmer.firstName && farmer.lastName
        ? `${farmer.firstName} ${farmer.lastName}`
        : farmer.firstName || farmer.lastName || ""
    );
    dispatch(saveFarmerInFocus(farmer))
   setIsDropdownOpen(false);
  
  };

  const handleBlur = (event) => {
    // Close dropdown when clicking outside
    if (!inputRef.current.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };





  const initialFormObject = formInFocus && formInFocus.fields &&formInFocus.fields.reduce((acc, curr) => {
    acc[curr.prompt] = ''; // Initialize each value to an empty string
    return acc;
  }, {});

  // State to manage form values
  const [formValues, setFormValues] = useState(initialFormObject);

  const oldFinalObject = 
    
   {
    form_id:formInFocus &&formInFocus._id,
    agent_user_id:loggedInAgent?loggedInAgent.user_id:user?user.user_id && user.user_id:null,
    admin_user_id:formInFocus &&formInFocus.user_id,
    last_updated_by:formInFocus &&formInFocus.user_id,
    is_deleted:false,
    responseObject:{
      ...formValues1,
      ...formValues2,

    }
   }

 //  const inputObject =
 //  {
 //   id:uuidv4(),
 //   amountSpent:formValues1['Amount Spent'],
 //   estHarvestDate:formValues1['Est. Harvest'],
 //   estSales:formValues2['Est. Sales'],
 //   amountMade:formValues2['Amount Made'],
 //  actHarvestDate:formValues2['Act. Harvest'],
 //  estReturns:formValues2['Act. Returns'],
 // actReturns:formValues2['Act. Returns'],
//
 //  }



   const inputObject =
   {
    id:uuidv4(),
    cropName:formValues1 && formValues1['Crop Name'] && formValues1['Crop Name'],
    harvestStart:formValues1 && formValues1['Harvest Start'] && formValues1['Harvest Start'],
    harvestEnd:formValues2 && formValues2['Harvest End'] && formValues2['Harvest End'],
    harvestQuantity:formValues2 &&formValues2['Harvest Quantity'] && formValues2['Harvest Quantity'],
   
   }


console.log("LOOK FOR INPUT OBJECT HERE --->",inputObject)

   const finalObject = 
    
   {
   ...farmerInFocus,
    harvests:farmerInFocus.harvests?[...farmerInFocus.harvests,inputObject]:[inputObject]
   }



   
 

  const handleChange1 = (promptKey) => (e) => {
    setFormValues1({
      ...formValues1,
      [promptKey]: e.target.value,
    });

    console.log("INPUT OBJECT--->",inputObject)
   console.log("FORM VALUES 1 --->",formValues1)
  };

  const handleChange2 = (promptKey) => (e) => {
    setFormValues2({
      ...formValues2,
      [promptKey]: e.target.value,
    });

    console.log("INPUT OBJECT--->",inputObject)

   console.log("FORM VALUES 2 --->",formValues2)
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
   

   //dispatch(updateFarmerInput(updatedFields))

   dispatch(updateFarmerHarvest(updatedFields))

  setTimeout( ()=>{setLoading(false) },2500)
 
  }
 

 

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
      <form >

   
<>
 
     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
    
    
    {/* <Grid item xs={10}style={{width:"900px",display:"flex",alignItems:"flex-end", justifyContent:"flex-start"}}>
          <Typography color="textPrimary" variant="h4" component="p" style={{ color: '#0A6054',position:"relative" }}>
            Form Fields
          </Typography>
      
  </Grid> */}
    



   { formInFocus && formInFocus.fields ?
   
   <>

     <Grid item sm={fields && fields.length < 2 ?12:5 }  xs={12}  > 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start",marginLeft:{xs:"27.5rem",sm:"0rem"}}}  >
   

 {/* USE THIS WHEN U HAVE TO PUT DATE FIELD FOR DATE OF ARRIVAL
 promptKey === "Date d'Arrivée" ||promptKey === "Date of Arrival"  ?
      
        <TextField
        type="date"
          key={promptKey}
          label={promptKey}
          value={formValues1[promptKey]}
          onChange={handleChange1(promptKey)}
          sx={{ color: 'black',width:{xs:"16rem",sm:"100%"},"& .MuiInputBase-root": { height: '3rem', paddingLeft: '1rem' } }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
        />
        :*/}





{
  <Grid xs={2} item style={{marginBottom: "0rem",marginRight:"1rem",marginBottom:"0rem"}}>
     <Box sx={{ position: "relative", minWidth: "27.2rem" }}>
     <TextField
        fullWidth
        variant="outlined"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        //onBlur={handleBlur}
        placeholder="Search Farmer"
        sx={{ color: "black", maxWidth: { xs: "16rem", sm: "100%" } }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black",fontSize:"0.65rem",fontFamily:"Poppins" },
        }}
        inputRef={inputRef}
      />
      {isDropdownOpen  && (
           <Paper
          elevation={3}
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: 200,
            overflowY: "auto",
            mt: 1,
            zIndex: 10,
            background: "white",
            borderRadius: "5px",
          }}
        >
          {currentFarmersToDisplay.slice(0,10).map((item) => (
            <Box
              key={item.user_id}
              sx={{
                padding: "10px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleItemClick(item)}
              tabIndex={0} // Allows blur detection
            >
              {item.name
                ? item.name
                : item.firstName && item.lastName
                ? `${item.firstName} ${item.lastName}`
                : item.firstName || item.lastName || ""}
            </Box>
          ))}
        </Paper>
        )}
     </Box>
</Grid>
}



{
  <Grid xs={2} item style={{marginBottom: "0rem",marginRight:"1rem",marginBottom:"0rem"}}>
     <Box sx={{ position: "relative", minWidth: "27.2rem" }}>
     <TextField
        fullWidth
        variant="outlined"
        value={farmerInFocus && farmerInFocus.farmerId}
      
        placeholder="Farmer ID"
        sx={{ color: "black", maxWidth: { xs: "16rem", sm: "100%" } }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black",fontSize:"0.65rem",fontFamily:"Poppins" },
        }}
        
      />
     
     </Box>
</Grid>
}




{modifiedFirstHalf.map((promptKey) => (
      
    
promptKey === "What is Your Phone Number?"?

<TextField
          key={promptKey}
          label={promptKey}
          value={farmerInFocus && farmerInFocus.phone?farmerInFocus.phone:farmerInFocus && farmerInFocus.phone_number?farmerInFocus.phone_number:farmerInFocus && farmerInFocus.phoneNumber?farmerInFocus.phoneNumber:formValues1[promptKey]}
          onChange={handleChange1(promptKey)}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />




:

      <TextField
          key={promptKey}
          label={promptKey}
          value={formValues1[promptKey]}
          onChange={handleChange1(promptKey)}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

      ))
      }

        
  
      </Stack>
      </Grid> 
      
    
      <Grid item xs={12} sm={5}> 
       <Stack spacing={3}  sx={{position:"relative",top:"-2.2rem",minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start",gap:"0.05rem",marginLeft:{xs:"27.5rem",sm:"0rem"}}}  >
       
      


       {/*fields.slice(Math.floor(fields.length/2), fields.length   ).map((item) => (
        <TextField 
        style={{color:"black"}}
        InputLabelProps={{ shrink: true }} 
        InputProps={{ style:{height:"3rem",paddingLeft:"1rem",color:"black"}}}
        onChange={(e) => handlePromptChange(item.id, e.target.value)}
           key={item.prompt}
          label={item.prompt}
          value={item.name}
          variant="outlined"
        />
      ))*/}



  
{
Object.keys(formValues2).map((promptKey) => (
        <TextField
          key={promptKey}
          label={promptKey}
          value={formValues2[promptKey]}
          onChange={handleChange2(promptKey)}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      ))

        }


        
  
      </Stack>
      </Grid> 

   </>   
   
     :

     <Grid item xs={12} > 
       <Stack spacing={3} >
       
     No form Fields.
  
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
        size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},color: '#21712E', border:"1px solid #21712E",backgroundColor: '#F2F4F7',borderRadius:"0.5rem",marginRight:"1rem",fontWeight:"400"}}>
       
        
       { "Back"}
      </LoadingButton>



      {<LoadingButton 
        
        onClick={()=>{ submitResponse(finalObject) }}
        size="large" type="button" variant="contained" disabled={loading} sx={{marginRight:{xs:"0rem",sm:"0rem",md:"0rem"},color: 'white',backgroundColor: '#0A6054',width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},borderRadius:"0.5rem",fontWeight:"400"}}>
       
       {loading ? "Loading..." : "Submit"}
      </LoadingButton>}
     

      </center>

      
 </>

  }  


      </form>
    </>
  );
}
