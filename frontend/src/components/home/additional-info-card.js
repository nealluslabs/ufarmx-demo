//import * as React from 'react';
import {useState,useEffect} from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Box, Button, Divider, Grid, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import PieChartOne from './pie-chart-one';
import PieChartTwo from './pie-chart-two';
import redboy from 'src/assets/images/redboy.jpeg';
import fakeMaps from 'src/assets/images/fake-maps.jpeg';

import { fetchSpecificResponse } from 'src/redux/actions/group.action';

// MUI Pencil Icon
import CreateIcon from '@mui/icons-material/Create';

import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import farmer5 from 'src/assets/images/farmer5.jpeg';
import farmer6 from 'src/assets/images/farmer6.jpeg';
import farmer7 from 'src/assets/images/farmer7.jpeg';
import farmer8 from 'src/assets/images/farmer8.jpeg';
import farmer9 from 'src/assets/images/farmer9.jpeg';
import farmer10 from 'src/assets/images/farmer10.jpeg';
import { FaChevronDown, FaEnvelope, FaIdCard, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineMultilineChart, MdOutlineScoreboard } from "react-icons/md";
import { MdSmartphone } from 'react-icons/md';
import axios from 'axios';
import AiSolutionsForm from '../aisolutions/aiSolutionsForm';
import { saveFarmerInFocus, saveTotalPagesAgents } from 'src/redux/reducers/group.slice';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { BsSpeedometer } from 'react-icons/bs';

function preventDefault(event) {
  event.preventDefault();
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "85%",
  height:"85%",

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AdditionalInfoCard({data,type,image,agentId,agentAddedId,farmerId,farmerName,farmName,phoneNumber,email,city,index,setAiForm,aiForm}) {
  const { user } = useSelector((state) => state.auth);
  console.log("data in farmer-->",data)
  const navigate = useNavigate()

  const dispatch = useDispatch()

 
console.log("IMAGE IN ADDITIONAL CARD IS__>",image)


  const [mapsLocation,setMapsLocation] = useState(' ')
 const [open,setOpen] =useState(false)

 const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
 //   const fetchLocationData = async () => {
 //     try {
 //       const response = await axios.get(
 //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.gps.split(',')[0]}&lon=${data.gps.split(',')[1]}&zoom=8&addressdetails=3`
 //       );
 //       const returnData = await response.data;
 //   
 //       console.log("data from nominatim is --> ",returnData)  
//
 //   if (returnData && returnData.display_name) {
 //     
 //     setMapsLocation(
 //      
 //       returnData.display_name
 //     );
 //   }
 // } catch (error) {
 //   console.error('Error fetching location data from nominatim:', error);
 // }
//};
//
//
 // fetchLocationData();

   console.log("GPS 0-->",data.gps && data.gps.split(',')[0])
   console.log("GPS 1-->",data.gps && data.gps.split(',')[1])

  }, []);




  return (
    <>
      <Grid container alignItems="center" style={{ padding: '10px',backgroundColor:"transparent" }} onClick={()=>{setAiForm(false)}}>

     {aiForm &&
        <AiSolutionsForm setAiForm={setAiForm} />
         }



      <Grid xs={12} sm={12}  container alignItems="center" sx={{borderRadius:"1rem",display:"flex",gap:"1rem",width:"100%",alignItems:"center"}}>
       
      <Grid xs={6.7} sm={6.7} style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#FFF",borderRadius:"1rem"}}>
        <Grid item xs={12} sm={12} style={{ textAlign: 'center',height:"10.5rem",display:"flex" ,justifyContent:"flex-start",position:"relative",bottom:"0.3rem",left:"-1rem"}}>
          
          <img src={image && image}

           onError={({ currentTarget }) => {
             currentTarget.onerror = null; 
             currentTarget.src=index === 0 ? farmer1 : index === 1 ? farmer2: index === 2 ? farmer3: index === 3 ?farmer4 : index === 4 ?farmer5 : index === 5 ?farmer6 : index === 6 ?farmer7 : index === 7 ? farmer8: index === 8 ? farmer9: index === 9 ?farmer10 :farmer10 ;
           }} 
          
          style={{position:"relative",top:"1.3rem",marginLeft:"2rem",marginBottom:"1rem",height:"8rem",width:"8rem",borderRadius:"50%"}} alt="farmer image"/>
       
         
         
        </Grid>


       <Grid xs={8} sm={8} style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#FFF"}}>

       <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"flex-start",justifyContent:"center",gap:"1rem",position:"relative"}}>
           
           <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",textAlign:"left",color:"lightgray"}}>
           
        


           <Typography variant="h4" sx={{fontFamily:"Poppins",fontWeight:"500",color:"black"}}> 
          {data.name}
           </Typography>

           <div style={{fontSize:"0.8rem",color:"#000000",position:"relative",top:"-0.2rem",marginBottom:"0.5rem"}}>
           Onboard Date: <b>{data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())?new Date(data.onboardDate).toDateString():data.createdAt && !isNaN(new Date(data.createdAt).getTime())?new Date(data.createdAt).toDateString():"Sept 23rd, 2024"}</b> 7:16PM
           </div>


           {agentAddedId &&
           <div> 
          {agentAddedId}
           </div>
         }


           {/*
           farmerId &&
           <div> 
            <FaIdCard style={{fontSize:"1.1rem"}}/>
            &nbsp;&nbsp;
           {agentId}&nbsp;&nbsp;{farmerId}
           </div>
          */}
      
        {type==="one" &&
           <div>
          {farmName}
           </div>
        }
           <div>
           {/*<MdSmartphone style={{fontSize:"1.1rem"}} />*/}
           <FaIdCard style={{fontSize:"1.1rem",cursor:"pointer"}}/>
           &nbsp;&nbsp;
           {/*phoneNumber*/}
           {agentId}&nbsp;&nbsp;{farmerId}
           </div>


          

         {type==="one" &&
          
           <div  style={{display:"flex",gap:"0rem",marginTop:"0rem",marginBottom:"0rem",justifyContent:"flex-start"}}>
            <FaMapMarker sx={{fontSize:"1.1rem",position:"relative",top:"0.3rem",cursor:"pointer"}}/>
            &nbsp;&nbsp;
           

              <div style={{maxWidth:"16rem"}}>
             {data.locationName?data.locationName:"N/A"}
             </div>
           </div>
         }



           <div>
           <FaEnvelope className="iconHover" /*onClick={(e)=>{e.stopPropagation();setAiForm(true)}}*/  style={{fontSize:"1.1rem",cursor:"pointer"}} />
           &nbsp;&nbsp;
           {/*email*/}
             - {/*data && data.riskScore && data.riskScore*/}
           </div>

           </div>

           

          
       {type!=="one" &&
           <Button
               variant={'contained'}
               style={{
                 minHeight: '30px',
                 minWidth: '120px',
                 backgroundColor: '#2DA840',
                 color: '#fff',
                 border: 'none',
                 borderRadius: '5px',
                 marginRight: '4px',
               }}
              onClick={()=>{/*navigate('/dashboard/individual-campaign')*/}}
             >
              Contact
             </Button>
          }


         </div>




         </Grid>


         <Grid xs={12} sm={12} style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",backgroundColor:"#FFF"}}>

             <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",gap:"0rem",position:"relative",top:"-1.55rem"}}>
                 
                 <div
                 onClick={()=>{
                  dispatch(saveFarmerInFocus(data));
                  setTimeout(()=>{navigate('/dashboard/credit-score')},1300)
                 }}
                 
                 style={{cursor:"pointer",display:"flex",flexDirection:"row",width:"100%",justifyContent:"flex-start",alignItems:"center",gap:"1rem",textAlign:"left",color:"black",position:"relative",left:"0.9rem"}}>
                 
              
                 
                 <BsSpeedometer 
                 
                 
                 style={{fontSize:"1.5rem",top:"-14px",position:"relative",left:"0.5rem"}} /> 
                 
                 <div style={{display:"flex",flexDirection:"column"}}> 
                  Credit Score:
                  
                   <b> 
                    <Box flex={1} display="flex" flexDirection="row" alignItems="center" sx={{position:"relative",top:"-0.3rem",gap:"0rem"}}>
                    <Typography variant="h3" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins",
                    scale:"0.7",
                       color: data && data.riskScore?
                          
                       (data.riskScore< 4?
                       "#DF2007"
                       :
                     data.riskScore >=4 && data.riskScore <7?
                      "#ED9E0B"
                      :
                     "#0A9C36"
                        )
                       :
                       '#0A9C36',
                    }}>
                     { data && data.riskScore?data.riskScore:"7.5"}
                    </Typography>
                   
                    <Button
                      variant="contained"
                      sx={{
                        scale:"0.7",
                        position:"relative",
                        left:"-0.5rem",
                        fontFamily:"Poppins",
                        backgroundColor: data && data.riskScore?
                          
                        (data.riskScore< 4?
                        "#DF200733"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B33"
                       :
                      "#0A9C3633"
                         )
                        :
                        '#0A9C3633',
                        borderRadius: '2rem',
                        color: 'white',
                        textTransform: 'none',
                        paddingX: 3,
                        fontWeight: 400,
                        fontSize: '0.675rem',
                        '&:hover': {
                          backgroundColor: data && data.riskScore?
                          
                          (data.riskScore< 4?
                          "#DF200733"
                          :
                        data.riskScore >=4 && data.riskScore <7?
                         "#ED9E0B33"
                         :
                        "#0A9C3633"
                           )
                          :
                          '#0A9C3633', // prevent background color change
                          color: 'inherit',           // prevent text color change
                          cursor: 'default',          // optional: don't show pointer cursor
                          boxShadow: 'none',          // prevent elevation
                        },
                     
                      }}
                    >
                      {
                     data && data.riskScore?
                    ( data.riskScore< 4?
                      <span style={{opacity:1,
                        color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"

                      }}>Poor</span>
                      :
                    data.riskScore >=4 && data.riskScore <7?
                    <span style={{opacity:1,
                      
                      color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"



                     }}>Good</span>
                     :
                     <span style={{opacity:1,
                      color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"

                     }}>Excellent</span>
                     
                    )
                     : 
                     <span style={{opacity:1,
                      color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"

                     }}>Good</span>
                      }
                    </Button>
                  </Box>
                  
                  </b>
                   
                   </div>    
                   
                   <FaChevronDown  style={{fontSize:"1rem",top:"-14px",left:"-18px",position:"relative"}}/>
                 
             
            
             
                 </div>
             
         
             
               </div>




  </Grid>
       </Grid>


       <Grid item xs={5} sm={5} style={{ textAlign: 'center',height:"10.5rem",display:"flex" ,justifyContent:"center",background:"white",borderRadius:"1rem"}}>
          

         <Box sx={{display:"flex",justifyContent:"center", alignItems:"center",width:"100%",flexDirection:"column"}}> 
            <Box  sx={{width:"80%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.1rem"}}}>Farm Size/ha </Box>   <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.6rem"},fontWeight:"1rem",color:"#000000"}}>{data && data.farmSize?data.farmSize.slice(0,3):0}{/*data.farmSize && !data.farmSize.includes("hect") && " Hectares"*/} </Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"center",alignItems:"flex-start",width:"100%",flexDirection:"column"}}> 
            <Box  sx={{width:"30%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.1rem"}}}>Crops/Livestock </Box>   <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.6rem"},fontWeight:"1rem",color:"#000000"}}> 1 </Box> 
           </Box>


         
         <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",flexDirection:"column"}}> 
            <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.1rem"}}}>Harvests </Box>   <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.6rem"},fontWeight:"1rem",color:"#000000"}}>{data && data.lastHarvest? data.lastHarvest:2}</Box> 
           </Box>

          
       
         
         
        </Grid>

      </Grid>





      <br/>
      {/*<Divider style={{width:"100%"}} />*/}
      <br/>


     <Grid container  sx={{borderRadius:"1rem",background:"#FFF",color:"black",marginTop:"2rem",padding:"20px",/*display:"flex",alignItems:"flex-start",justifyContent:"flex-start",flexDirection:{sm:"row",xs:"column"}*/  }}>
        <Grid item xs={6}>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '22.23px',fontWeight:"300" }}>
            {/*headerOne*/'Information'}
          </Typography>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '24.33px' }}>
            <b>{/*headerTwo*/}</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            border: '0px solid red',
            minHeight: '25px',
            minWidth: '100px',
          }}
        >
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
           {/* THESE USED TO BE THE WORDS AT THE FAR RIGHT OF THE CARD BUT I AM NOT USING THEM ANYMORE
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#9291A5', fontSize: '16.23px' }}
            >
              Deal Expense
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#000000', fontSize: '20.33px' }}
            >
              <b>{value}</b>
            </Typography>
           */
           }
          </Grid>
        </Grid>
      
     
       <br />







      <Grid container  sx={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",flexDirection:{sm:"row",xs:"column"}}}>
        
        <Grid  item xs={12} sm={7.5} sx={{ textAlign: 'center',height:"36rem",display:"flex",justifyContent:"center",alignItems:"center",gap:"1.5rem",width:"100%",fontSize:{sm:"1rem",xs:"0.6rem"} ,paddingLeft:"1rem"}}>
         
          
            <Box sx={{scale:"1",display:"flex",width:"47%",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:"1.5rem"}}>
            
            <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>Age</Box>   <Box  sx={{width:"50%",textAlign:"left"}}>{data && data.age && data.age}</Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>Gender</Box>   <Box  sx={{width:"50%",textAlign:"left"}}>{data && data.gender && data.gender}</Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>Phone</Box>  
            
             <Box  sx={{width:"50%",maxWidth:"50%",textAlign:"left"}}>
              {data && data.phone && !data.phone.includes('/')?
            
              data && data.phone
              :
              data.phone && data.phone.split('/').map((item,index)=>(
             <span sx={{marginRight:"0rem"}}> {item}{index !== data.phone.split('/').length ? ',':'.'} </span>

             ))

             }
              
              
              </Box> 
          
           </Box>



           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>Wife </Box>   <Box  sx={{width:"50%",textAlign:"left"}}>2</Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>Children </Box>   <Box  sx={{width:"50%",textAlign:"left"}}>{5} </Box> 
           </Box>


              
           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
           
           <Box  sx={{width:"50%",textAlign:"left"}}> GPS Stamp:&nbsp;&nbsp;&nbsp;  </Box> 
            
           <Box  sx={{width:"50%",textAlign:"left"}}> 
             {data && data.gps
             && data.gps.split(',').map((item,index)=>(
             <span sx={{marginRight:"0rem"}}> {item}{index !== data.gps.split(',').length ? ',':'.'} </span>

             ))

             }

             </Box> 
        
             </Box>  


             <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>FarmingType </Box>   <Box  sx={{width:"50%",textAlign:"left"}}>  {data.organicFarmingInterest?"Organic" :"Non-Organic"} </Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>Distribution Method </Box>   <Box  sx={{width:"50%",textAlign:"left"}}>{data.productSoldTo?data.productSoldTo:"Reseller"}</Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"30%",textAlign:"left"}}>Pre. Retailer </Box>   <Box  sx={{width:"50%",textAlign:"left"}}>{data.pre_retailer?data.pre_retailer:"Fertilizer Seller"}</Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"50%",textAlign:"left"}}>ID Type </Box>   <Box  sx={{width:"50%",textAlign:"left"}}>-</Box> 
           </Box>


         

        </Box>
      
         {/*THIS IS THE BoxIDER LINE, DONT DELETE */}
        <Box sx={{display:"flex",width:"1%",height:"32rem",borderLeft:"1px solid lightgrey",position:"relative"}}>
        </Box> 

         
        <Box sx={{scale:"1",display:"flex",width:"49%",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:"1.5rem"}}>
            
            <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Insurance</Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data && data.insurance ?data.insurance:"none"}</Box> 
           </Box>


              
           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
           
           <Box  sx={{width:"60%",textAlign:"left"}}> Irrigation:&nbsp;&nbsp;&nbsp;  </Box> 
            
           <Box  sx={{width:"40%",textAlign:"left"}}> 
             {'No'}

             </Box> 
        
             </Box>  
          

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}><span>Crops {'/'}Livestock</span> </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data && data.produce? data.produce:data && data.crop_types? data.crop_types:data && data.what_crop_are_you_farming? data.what_crop_are_you_farming:''  } </Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Farm Size </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data.farmSize && data.farmSize}{data.farmSize && !data.farmSize.includes("hect") && " Hectares"} </Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Inputs </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data && data.chemicals &&  data.chemicals !== 'no'?'Fertilizer':'None'} </Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Pre Production </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data.production_level?data.production_level:data.productionSize?data.productionSize:"2 Tons"} </Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Prev. Chemicals Used</Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data && data.chemicals && data.chemicals !== 'yes' && data.chemicals !== 'no'? data.chemicals:'NPX-15-15-15'} </Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Prev. Costs </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data.cost?data.cost.toLocaleString():"450,000"} </Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left"}}>Farming Experience </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data && data.experience?data.experience:"5 years"} </Box> 
           </Box>


           <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}> 
            <Box  sx={{width:"60%",textAlign:"left",color:"red"}}>Challenges </Box>   <Box  sx={{width:"40%",textAlign:"left"}}>{data && data.challenges? data.challenges:data && data.problem? data.problem:"none for now" } </Box> 
           </Box>


        </Box>
      

        </Grid>

        {/* <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>Hello</Box> */}
        


        <Grid  item xs={12} sm={4}  sx={{ textAlign: 'center',height:"10rem",display:"flex",justifyContent:"center",alignItems:"flex-start",gap:"1rem",flexDirection:"row",fontSize:{sm:"1rem",xs:"0.6rem"} ,paddingLeft:"3rem"}}>
         {/*<img src={fakeMaps} sx={{borderRadius:"0.5rem",height:"16rem",position:"relative"}} alt="gps stamp google maps" />*/}
        {
        !data.gps ?
       
        <div
        sx={{
          textDecoration: 'none',
          overflow: 'hidden',
          maxWidth: '100%',
          width: '400px',
          height: '500px',
          borderRadius:"1.3rem",
          borderBottomRadius:"1.3rem"
        }}
      >
        <div
          id="canvas-for-googlemap"
          sx={{
            height: '70%',
            width: '100%',
            maxWidth: '100%',
            
          }}
        >
          <iframe
            style={{
              height: '100%',
              width: '100%',
              border: 0,
            }}
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?q=+13.1383064,-14.1242743&zoom=11&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
            allowFullScreen
          ></iframe>

        </div>

   
              
       
         </div>
          :
          <div
      style={{
        textDecoration: 'none',
        overflow: 'hidden',
        maxWidth: '100%',
        width: '400px',
        height: '500px',
        borderRadius:"1.3rem",
        borderBottomRadius:"1.3rem"
      }}
    >
      <div
        id="canvas-for-googlemap"
        style={{
          height: '70%',
          width: '100%',
          maxWidth: '100%',
          
        }}
      >
        <iframe
          style={{
            height: '100%',
            width: '100%',
            border: 0,
          }}
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?q=${data.gps.split(',')[0]},${data.gps.split(',')[1]}&zoom=11&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
          allowFullScreen
        ></iframe>
      </div>

         
      <div>
         <Button onClick={()=>{setOpen(true)} } sx={{marginTop:"2rem",padding:"0.5rem",backgroundColor: '#0A6054',color:"#FFF"}}>
             View Live Location
           </Button>
        </div>   

            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        >      
        <Box sx={style}>
        <iframe
            style={{
              height: '100%',
              width: '100%',
              border: 0,
            }}
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/streetview?location=${data.gps.split(',')[0]},${data.gps.split(',')[1]}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
            allowFullScreen
            ></iframe>
        </Box>
     </Modal>
     
     
       </div>
       }

        </Grid>


       <Box 
        sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        onClick={ () => {
          const username = data.name_first__last || data.name;
          // console.log(username);
          dispatch(fetchSpecificResponse(username));
          // dispatch(fetchSpecificResponse(username)) // Put username/Id
          setTimeout(() => {
            navigate("/dashboard/view-response")
          }, 2000);
        } }
       >
        <Box sx={{ justifySelf: "flex-end", marginRight: "10%", marginTop: "-5%", cursor: "pointer" }}>
          <CreateIcon />
        </Box>
       </Box>

      </Grid>
    </Grid>

    </Grid>

      <br />
    </>
  );
}
