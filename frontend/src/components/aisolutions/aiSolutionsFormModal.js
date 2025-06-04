
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import { useDispatch, useSelector } from 'react-redux';
import { PiCaretRight } from 'react-icons/pi';
import { fetchChatGptAnswer } from 'src/redux/actions/group.action';

//import { makeStyles } from '@mui/styles/node';



//const useStyles = makeStyles((theme) => ({
//    root: {
//      display: 'flex',
//      alignItems: 'center',
//      paddingLeft: '4rem',
//      paddingRight: '4rem',
//    },
//    searchInput: {
//      background: 'white',
//      border: '1px solid #00000026',
//      padding: '0px',
//      borderRadius: '8px',
//      // marginRight: theme.spacing(2),
//      width: '100%',
//      minWidth: '100%',
//      '& .MuiInputBase-input': {
//        color: 'grey',
//      },
//      '& .MuiInputBase-input::placeholder': {
//        color: 'grey',
//      },
//      '& .MuiInput-underline:before': {
//        borderBottomColor: 'grey',
//      },
//      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
//        borderBottomColor: 'grey',
//      },
//      '& .MuiInput-underline:after': {
//        borderBottomColor: 'grey',
//      },
//    },
//    searchButton: {
//      color: '#fff',
//      padding: '15px',
//      minWidth: '45%',
//      backgroundColor: 'black',
//      '&:hover': {
//        backgroundColor: theme.palette.primary.dark,
//      },
//    },
//  }));


export default function AiSolutionsFormModal({handleClose}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 // const classes = useStyles();

  const inputContainer = {
    display: 'flex',
    alignItems: 'center',
  
  };


  const inputContainerBig = {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%',
   
  };

  const { loggedInFarmer, chatGptAnswer } = useSelector((state) => state.group);

  const [answered,setAnswered]=  useState(false)

  const [questionAsked,setQuestionAsked]=  useState('')

  const [questionAnswered,setQuestionAnswered]=  useState('..Loading')

  console.log("CHAT GPT ANSWER IS -->",chatGptAnswer)

  useEffect(()=>{
setQuestionAnswered(chatGptAnswer)
  },[chatGptAnswer])

  return(

   

  <div>

    <div onClick={(e)=>{e.stopPropagation()}} 
     style={{position:"absolute",top:"-0%",left:"0%",backgroundColor:'#F5F5F5',/*backgroundColor:"#40255F",*/color:"black",zIndex:"200",width:"100%",height:"100%",paddingLeft:"20px",paddingRight:"10px",paddingTop:"20px",paddingBottom:"18px",fontFamily:"Poppins",border:"3px #F5F5F5 solid"}}> 

       
    
              <div style={{width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"flex-start",marginBottom:"0rem" }}>
              
              <Typography  onClick={handleClose} 
              variant="p" gutterBottom style={{cursor:"pointer",marginTop:"1rem",fontFamily:"Poppins, sans-serif", color:"black",display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",left:"-1rem"}}>
               <PiCaretRight style={{marginRight:"1rem"}} />  Close
             </Typography>
              
              
              
           </div>




           <Grid container direction="row" sx={{mt:1}}>
            <Grid item xs={12} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column"}}>
              <p style={{ fontSize: '10px', width: '98%',position:"relative",top:"-0.3rem",marginBottom:"0.6rem",paddingLeft:"20px"  }}>
                
              Quickly find solutions to your agricultural questions. 
              Whether it's about crop management or market trends,
               the chatbot serves as your reliable resource for
                up-to-date farming insights.
              </p>
             {/* <div style={inputContainerBig}>
                <TextField
                  name="email"
                  required
                  type="email"
                  placeholder=''
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />

                <textarea rows={2} 
                name="How well did the candidate align to the requirements for the role"
                placeholder='Ask Anything...'
                value={''}
                style={{borderRadius:"0.3rem",width:"100%",border:"1px solid #E0E0E0",padding:"1.5rem",fontFamily:"Arial",fontSize:"0.7rem",marginBottom:"1rem",color:"black"}}
                onChange={(e) => console.log(e.target.value)}
                
                >
                </textarea>





              </div>
              */}
            </Grid>

          </Grid>



          
            {answered && 

<Grid container direction="row" sx={{mt:0}}>
<Grid item xs={12} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column"}}>
  
  <div  style={{fontSize:"10px",width:"90%",overflowY:"scroll",position:"relative",left:"1rem",height:"10rem"}}>
  Answer: {" "}{
    questionAnswered !== "loading..." && questionAnswered
  } 

  





  </div>
</Grid>
</Grid>

            }

       

       
          
       
         <Grid container sx={{position:"fixed",top:"20rem"}}>
          <Grid container direction="row">
            <Grid item xs={12} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column"}}>
              
              <div >
                {/*<TextField
                  name="email"
                  required
                  type="email"
                  placeholder=''
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />*/}

                <textarea rows={2} 
                name="Do you recomend hiring this candidate ?"
                placeholder='Ask Anything...'
                value={questionAsked}
                style={{backgroundColor:"#EBEBED",borderRadius:"0.3rem",width:"95%",border:"1px solid #E0E0E0",padding:"1.5rem",fontFamily:"Poppins",fontSize:"0.7rem",marginBottom:"1rem",marginLeft:"1.5rem",color:"black"}}
                onChange={(e) => setQuestionAsked(e.target.value)}
                
                >
                </textarea>





              </div>
            </Grid>

          </Grid>
         


          <Grid item  xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem"}} >
              
              <Button onClick={()=>{setAnswered(true);
              setQuestionAnswered("loading...");
              setQuestionAsked(" ");
                dispatch(fetchChatGptAnswer(questionAsked,

                loggedInFarmer && loggedInFarmer.location?loggedInFarmer.location:loggedInFarmer && loggedInFarmer.locationName?loggedInFarmer.locationName :"-",
                
                (loggedInFarmer.farming_crop && loggedInFarmer.farming_crop ||
                loggedInFarmer.crop_types && loggedInFarmer.crop_types ||
                loggedInFarmer.what_crop_are_you_farming && loggedInFarmer.what_crop_are_you_farming ||
                loggedInFarmer.produce && loggedInFarmer.produce|| "-")
              
              )) 
                }} style={{width:"8rem",color:"black",paddingLeft:"0.8rem",paddingRight:"0.8rem",backgroundColor:"#e0dcdc", boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",fontFamily:"Public Sans, sans-serif",fontSize:"0.7rem"}}>Send</Button>

             </Grid>

          </Grid>





    </div>


</div>
)
   }

