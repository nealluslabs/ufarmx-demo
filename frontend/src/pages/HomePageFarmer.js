import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import HomeCoolersCard from 'src/components/home/home-coolers-card';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import DashboardCard from 'src/components/home/dashboard-card';

import TeacherImg from '../assets/images/dashboard/teacher.png';
import StudentImg from '../assets/images/dashboard/student.png';
import PieChartCard from 'src/components/home/pie-chart-card';
import CampaignCard from 'src/components/home/campaign-card';
import CustomChart from 'src/components/home/custom-chart';
import { getStudents } from 'src/redux/actions/student.action';
import StudentFinanceStats from 'src/components/home/student-finance-stats';
import redboy from 'src/assets/images/redboy.jpeg'
//import jeansfarmer from 'src/assets/images/jeansfarmer.jpeg'

import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';


import corn from 'src/assets/images/corn.jpeg';
import maize from 'src/assets/images/corn.jpeg';
import potato from 'src/assets/images/potato.jpeg';
import plantain from 'src/assets/images/plantain.jpeg';
import onion from 'src/assets/images/onion.jpeg'
import okra from 'src/assets/images/okra.jpeg'
import gombo from 'src/assets/images/gombo.jpeg'
import bergine from 'src/assets/images/bergine.jpeg'
import eggplant from 'src/assets/images/bergine.jpeg'
import millet from 'src/assets/images/millet.jpeg'
import pepper from 'src/assets/images/pepper.jpeg'
import yam from 'src/assets/images/yam.jpeg'
import cocoyam from 'src/assets/images/cocoyam.jpeg'
import cabbage from 'src/assets/images/cabbage.jpeg'
import tomato from 'src/assets/images/tomato.jpeg'

//animals/produce
import chicken from 'src/assets/images/chicken.jpeg'
import sheep from 'src/assets/images/sheep.jpeg'
import cow from 'src/assets/images/cow.jpeg'
import donkey from 'src/assets/images/donkey.jpeg'
import goat from 'src/assets/images/goat.jpeg'
import horse from 'src/assets/images/horse.jpeg'

import  noimage from 'src/assets/images/no-image.jpg';
import { fetchDepositsForFarmer } from 'src/redux/actions/group.action';
import InputStats from 'src/components/home/input-stats';

const jeansfarmer = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function HomePageFarmer() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

 
 
  useEffect(()=>{

   if(!user || user && !user.user_id){
    navigate('/login')
   }

  },[user])



  const { myGroups, isLoading,loggedInFarmer,currentDepositsToDisplay } = useSelector((state) => state.group);
  
  const [updatedCropDeposits,setUpdatedCropDeposits] = useState([])

const [updatedInputs,setUpdatedInputs] = useState([
{id:"1",amount:"$200",crop:"Corn",estHarvestDate:"01-01-2025",estSalesAmount:"$350",actHarvestDate:"14-03-2025",actSalesAmount:"$320",estReturns:"25%",actual:"23%",gain:true},
{id:"2",amount:"$250",crop:"Potatoes",estHarvestDate:"11-12-2024",estSalesAmount:"$350",actHarvestDate:"01-02-2025",actSalesAmount:"$330",estReturns:"22%",actual:"21%",gain:false},
{id:"3",amount:"$300",crop:"Tomato",estHarvestDate:"03-02-2025",estSalesAmount:"$350",actHarvestDate:"11-03-2025",actSalesAmount:"$360",estReturns:"27%",actual:"26%",gain:true},
])
  

  //useEffect(() => {
  //  if(!loggedInFarmer.firstName){
  //   return navigate("/login");
  //  }
  // }, [])


  useEffect(()=>{


    const inputsReplicated = loggedInFarmer && loggedInFarmer.inputs? loggedInFarmer.inputs.map((item)=>(
      {_id:item._id,
        id:item.id,
        amountSpent:item.amountSpent,
        crop:"Maize",
        estHarvestDate:item.estHarvestDate,
        actHarvestDate:item.actHarvestDate && item.actHarvestDate,
        amountMade:item.amountMade,
        estReturns:item.estReturns,
        actReturns:item.actReturns,
        estSales:item.estSales && item.estSales,
        gain:true
      }
    )):[]

    setUpdatedInputs([
      ...inputsReplicated,
      {id:"1",crop:"Maize",estSales:"$920",estHarvestDate:"11-10-2024",amountSpent:"$900",actHarvestDate:"11-11-2024",amountMade:"$992.51",estReturns:"11%",actual:"19%",actReturns:"19%",gain:true},
    ])


  },[loggedInFarmer])


   useEffect(()=>{
    if(loggedInFarmer.firstName && loggedInFarmer.lastName){
   
      dispatch(fetchDepositsForFarmer(loggedInFarmer.firstName + " " + loggedInFarmer.lastName))

    }else if(loggedInFarmer.firstName ) {

      dispatch(fetchDepositsForFarmer(loggedInFarmer.firstName + " " + loggedInFarmer.lastName))

    } else if(loggedInFarmer.lastName){

      dispatch(fetchDepositsForFarmer(loggedInFarmer.firstName + " " + loggedInFarmer.lastName))
    }



   },[loggedInFarmer])



   useEffect(()=>{

   let newCropDeposits = []

   currentDepositsToDisplay && currentDepositsToDisplay.length &&  currentDepositsToDisplay.forEach((item,index)=>{
 
     newCropDeposits.push({
       ...item,
       id:item._id,
       quality:item.tat?item.tat:item.quality &&item.quality,
       cropName:item.type_de_culture?item.type_de_culture :item.product && item.product ,
       companyName: item.nom_de_lagriculteur?item.nom_de_lagriculteur :item.farmerName && item.farmerName,
       depositDate:item.date_darrive?item.date_darrive :item.dateOfArrival ?item.dateOfArrival: new Date(item.createdAt).toLocaleDateString(),
       earnings:item.quantit?item.quantit:0,
       photo:item.joindre_photo_1?item.joindre_photo_1:item.joindre_photo_2?item.joindre_photo_2:null,
       index:index
 
     })


     setUpdatedCropDeposits(newCropDeposits)
 
   })

  },[currentDepositsToDisplay])
 

  console.log("HOME PAGE, LOGGED IN FARMER IS----->",loggedInFarmer)


  //const { students } = useSelector((state) => state.student);

  const cropsStatic = [

    {id:"0S91dTHhu7t0Zc6645Gb",cropName:"Corn",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"}

  ]





  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [farmersFromDB,setFarmersFromDB] =  useState([]);

  useEffect(()=>{
   
 
    let farmersFromDBArray = [ ]
  
   
    loggedInFarmer && loggedInFarmer.crop_types ? loggedInFarmer.crop_types.split(/\s+/).slice(0,3).forEach((item,index)=>{
   
      farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50"
     ,harvestDate:"01-01-2024",
     image:  item.toLowerCase().includes("maize")?maize :
     item.toLowerCase().includes("potato")?potato :
     item.toLowerCase().includes("corn")?corn :
     item.toLowerCase().includes("gombo")?gombo :
     item.toLowerCase().includes("okra")?okra :
     item.toLowerCase().includes("okro")?okra :
     item.toLowerCase().includes("tomat")?tomato :
     item.toLowerCase().includes("millet")?millet :
     item.toLowerCase().includes("yam")?yam :
     item.toLowerCase().includes("cocoyam")?cocoyam :
     item.toLowerCase().includes("onion")?onion :
     item.toLowerCase().includes("oignon")?onion :
     item.toLowerCase().includes("pepper")?pepper :
     item.toLowerCase().includes("bergine")?bergine :
     item.toLowerCase().includes("cabbage")?cabbage :
     corn
    }

      )

   })
    :
    loggedInFarmer && loggedInFarmer.produce ? loggedInFarmer.produce.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).forEach((item,index)=>{

      
      farmersFromDBArray.push(
        {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
        cropName:item,
        cropType:"Cash Crops",
       lastHarvest:index===0?"20":index===1?"30":"50"
       ,harvestDate:"01-01-2024",
       image:item.toLowerCase().includes("maize")?maize :
       item.toLowerCase().includes("corn")?corn :
       item.toLowerCase().includes("gombo")?gombo :
       item.toLowerCase().includes("okra")?okra :
       item.toLowerCase().includes("okro")?okra :
       item.toLowerCase().includes("tomat")?tomato :
       item.toLowerCase().includes("millet")?millet :
       item.toLowerCase().includes("yam")?yam :
       item.toLowerCase().includes("cocoyam")?cocoyam :
       item.toLowerCase().includes("onion")?onion :
       item.toLowerCase().includes("oignon")?onion :
       item.toLowerCase().includes("pepper")?pepper :
       item.toLowerCase().includes("bergine")?bergine :
       item.toLowerCase().includes("cabbage")?cabbage :
       item.toLowerCase().includes("chicken")?chicken :
       item.toLowerCase().includes("ulet")?chicken :
       item.toLowerCase().includes("mouton")?sheep:
       item.toLowerCase().includes("vacher")?cow :
       item.toLowerCase().includes("ane")?donkey :
       item.toLowerCase().includes("âne")?donkey :
       item.toLowerCase().includes("chiévres")?goat :
       item.toLowerCase().includes("cheval")?horse :
       corn
      }
  
        )


  })
   :
   loggedInFarmer && loggedInFarmer.what_crop_are_you_farming ? loggedInFarmer.what_crop_are_you_farming.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).forEach((item,index)=>(


     
    farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50",
      harvestDate:"01-01-2024",
      image:   item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
      item.toLowerCase().includes("okra")?okra :
      item.toLowerCase().includes("okro")?okra :
      item.toLowerCase().includes("tomat")?tomato :
      item.toLowerCase().includes("millet")?millet :
      item.toLowerCase().includes("yam")?yam :
      item.toLowerCase().includes("cocoyam")?cocoyam :
      item.toLowerCase().includes("onion")?onion :
      item.toLowerCase().includes("oignon")?onion :
      item.toLowerCase().includes("pepper")?pepper :
      item.toLowerCase().includes("bergine")?bergine :
      item.toLowerCase().includes("cabbage")?cabbage :
      corn
     
    }

      )


    ))
   :
   farmersFromDBArray = [ ...cropsStatic]


    setFarmersFromDB(farmersFromDBArray)
  
    console.log("farmers from DB ARRAY, WHICH I AM USING TO POPULATE CROP TABLE IS-->",farmersFromDBArray)
  



  },[loggedInFarmer])


 

  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl" style={{position:"relative",left:"2rem",width:"87%",position:"relative",left:"-1%"}}>
        
        {/* <SearchBox style={{ width: '100%' }} /> */}

      <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem"}}>
       
       <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
       
       <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Welcome {loggedInFarmer && loggedInFarmer.firstName?loggedInFarmer.firstName:"User"} 👋</h1>
       <div>{new Date().toDateString()}</div>
       
       </div>
       
       </Grid> 


      
        <Grid container spacing={3} >
         { /*
         <Grid item xs={12} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
            

       <CampaignCard headerOne={'Statistics'} headerTwo={'Profile'} value={''} type={'one'} image={jeansfarmer} farmName={''} farmerName={loggedInFarmer && loggedInFarmer.firstName + " " + loggedInFarmer.lastName} city={"Dakar, Senegal"} agentId={loggedInFarmer &&loggedInFarmer.agentAddedId}  farmerId={loggedInFarmer &&loggedInFarmer.farmerId} email={"default@gmail.com"} phoneNumber={loggedInFarmer && loggedInFarmer.phone_number?` ${loggedInFarmer.phone_number}`:loggedInFarmer && loggedInFarmer.phone?` ${loggedInFarmer.phone}`:'+234-12345678'  } />
            </div>
          </Grid>
         /*}

        {/*
          <Grid item xs={8} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
              <CampaignCard headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"djibril@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={noimage}/>
            </div>
          </Grid>
            */}



          <Grid container spacing={2} style={{marginTop:"2rem"}}>
          <div style={{ background: 'white ', padding: '10px',width:"100%" }}>
              <AdditionalInfoCard data ={loggedInFarmer && loggedInFarmer} headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'one'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"djibril@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={jeansfarmer}/>
            </div>
          </Grid>

        {/* 
          <Grid container spacing={2} style={{marginTop:"0.5rem"}}>
             First Grid Item 
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borerRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Number of Athletes'} value={'20'} img={TeacherImg} />
            </Paper>
          </Grid>

         Second Grid Item 
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard
                header={'Total Number of Deals'}
                value={students?.length ? students?.length : '0'}
                img={StudentImg}
              />
            </Paper>
          </Grid>

          Third Grid Item 
          { <Grid item xs={12} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 100,
              border: '1px solid #F8F8F8',
              backgroundColor: '#F8F8F8',
              borderRadius: '10px'
            }}
          >
            <DashboardCard header={'Number of Engagements'} value={"2"} img={TeacherImg} />
          </Paper>
        </Grid> }

          Fourth Grid Item 
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 100,
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Expense'} value={'$60,000'} img={TeacherImg}  />
            </Paper>
          </Grid>
        </Grid>
            */}

        <br />


         {/*
          <Grid item style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
            <Box sx={{ width: '100%'}}>
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Crops
              </Button>
              &nbsp; &nbsp;

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Deposits
              </Button>

            </Box>

         
          </Grid>
              */}


          <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px',position:"relative",left:"0.5rem"}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Crops</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedClass}
           onChange={(e) => setSelectedClass(e.target.value)}
           disabled={true}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Type
           </MenuItem>
       <MenuItem value={'JSS 1'}>1</MenuItem>
       <MenuItem value={'JSS 2'}>2</MenuItem>
       <MenuItem value={'JSS 3'}>3</MenuItem>
       <MenuItem value={'SS 1'}>4</MenuItem>
      
         </Select>
       </FormControl>
     </Grid>
  
    <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedSection}
           disabled={true}
           onChange={(e) => setSelectedSection(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Class
           </MenuItem>
           <MenuItem value={1}>1</MenuItem>
           <MenuItem value={2}>2</MenuItem>
           <MenuItem value={3}>3</MenuItem>
          
         </Select>
       </FormControl>
     </Grid>
     &nbsp; &nbsp;

     <Box sx={{ width: '20%', marginTop: '1.2%', display:{xs:"none",sm:"none",md:"inline"}}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1, display:{xs:"none",sm:"none",md:"inline"}}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0, display:{xs:"none",sm:"none",md:"inline"}}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedFilter}
           onChange={(e) => setSelectedFilter(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 120,
             p: 1,
           }}
         >
           <MenuItem value="">
             Filter By
           </MenuItem>
           <MenuItem value={1}>Option 1</MenuItem>
           <MenuItem value={2}>Option 2</MenuItem>
           <MenuItem value={3}>Option 3</MenuItem>
         </Select>
       </FormControl>
     </Grid>
   </Grid>
   {/*here */}

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#F8F8F8',  padding: '10px',marginTop:"-2.5rem"}}>
         {loggedInFarmer && loggedInFarmer.firstName &&
          <CropStats crops={farmersFromDB}/> 
         }
           </div>
           </Grid>
           
         </Grid>




         <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px',marginTop:"2.5rem"}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px',backgroundColor:"white",position:"relative",left:"0.5rem"}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Crop Deposits</p>
        </Grid>
      
      
      
      <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedClass}
           disabled={true}
           onChange={(e) => setSelectedClass(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Type
           </MenuItem>
       <MenuItem value={'JSS 1'}>1</MenuItem>
       <MenuItem value={'JSS 2'}>2</MenuItem>
       <MenuItem value={'JSS 3'}>3</MenuItem>
       <MenuItem value={'SS 1'}>4</MenuItem>
      
         </Select>
       </FormControl>
     </Grid>
     
  

   
    <Grid xs={2} item sx={{mb: 0}}>
    
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedSection}
           disabled={true}
           onChange={(e) => setSelectedSection(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Class
           </MenuItem>
           <MenuItem value={1}>1</MenuItem>
           <MenuItem value={2}>2</MenuItem>
           <MenuItem value={3}>3</MenuItem>
          
         </Select>
       </FormControl>
       
     </Grid>
     

     &nbsp; &nbsp;

     <Box sx={{ width: '20%', marginTop: '1.2%', display:{xs:"none",sm:"none",md:"inline"}}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1, display:{xs:"none",sm:"none",md:"inline"}}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0, display:{xs:"none",sm:"none",md:"inline"}}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedFilter}
           onChange={(e) => setSelectedFilter(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 120,
             p: 1,
           }}
         >
           <MenuItem value="">
             Filter By
           </MenuItem>
           <MenuItem value={1}>Option 1</MenuItem>
           <MenuItem value={2}>Option 2</MenuItem>
           <MenuItem value={3}>Option 3</MenuItem>
         </Select>
       </FormControl>
     </Grid>
   </Grid>
   {/*here */}

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#F8F8F8',  padding: '10px',marginTop:"0.5rem"}}>
        { updatedCropDeposits && updatedCropDeposits.length ?  <CropDepositStats cropDeposits={updatedCropDeposits}/>
          :
          
          <center>
            No Deposits for this farmer
          </center>
      }
           </div>
           </Grid>
           
         </Grid>






         <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px',marginTop:"2.5rem"}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px',backgroundColor:"white",position:"relative",left:"0.5rem"}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Inputs</p>
        </Grid>
      
      
      
      <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedClass}
           disabled={true}
           onChange={(e) => setSelectedClass(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Type
           </MenuItem>
       <MenuItem value={'JSS 1'}>1</MenuItem>
       <MenuItem value={'JSS 2'}>2</MenuItem>
       <MenuItem value={'JSS 3'}>3</MenuItem>
       <MenuItem value={'SS 1'}>4</MenuItem>
      
         </Select>
       </FormControl>
     </Grid>
     
  

   
    <Grid xs={2} item sx={{mb: 0}}>
    
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedSection}
           disabled={true}
           onChange={(e) => setSelectedSection(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Class
           </MenuItem>
           <MenuItem value={1}>1</MenuItem>
           <MenuItem value={2}>2</MenuItem>
           <MenuItem value={3}>3</MenuItem>
          
         </Select>
       </FormControl>
       
     </Grid>
     

     &nbsp; &nbsp;

     <Box sx={{ width: '20%', marginTop: '1.2%', display:{xs:"none",sm:"none",md:"inline"}}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1, display:{xs:"none",sm:"none",md:"inline"}}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0, display:{xs:"none",sm:"none",md:"inline"}}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedFilter}
           onChange={(e) => setSelectedFilter(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 120,
             p: 1,
           }}
         >
           <MenuItem value="">
             Filter By
           </MenuItem>
           <MenuItem value={1}>Option 1</MenuItem>
           <MenuItem value={2}>Option 2</MenuItem>
           <MenuItem value={3}>Option 3</MenuItem>
         </Select>
       </FormControl>
     </Grid>
   </Grid>
   {/*here */}

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#F8F8F8',  padding: '10px',marginTop:"0.5rem"}}>
        { updatedInputs && updatedInputs.length ?  <InputStats inputs={updatedInputs}/>
          :
          
          <center>
            No Inputs for this farmer
          </center>
      }
           </div>
           </Grid>
           
         </Grid>




          
        
        </Grid>
      </Container>
    </>
  );
}
