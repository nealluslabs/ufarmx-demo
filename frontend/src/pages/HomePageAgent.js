import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress } from '@mui/material';
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
import jeansfarmer from 'src/assets/images/jeansfarmer.jpeg'
import blank from 'src/assets/images/rec.png'
import noimage from 'src/assets/images/no-image.jpg'


import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import cropcompany from 'src/assets/images/cropcompany.jpeg'

import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import ScrollingCampaignCard from 'src/components/home/scrolling-campaign-card';
import FarmerStats from 'src/components/home/farmer-stats';
import { fetchFarmersFromPage,fetchAgentsFromPage, fetchFarmersForOneAgent } from 'src/redux/actions/group.action';
import ContainerHomeCard from 'src/components/home/container-home-card';

import FeesImg from 'src/assets/images/money_2.png';
import ApexChart from 'src/components/home/splineChart';
import ContainerCardSmall from 'src/components/listcards/container-card-small';


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function HomePageAgent() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loggedInAgent } = useSelector((state) => state.group);

 
  useEffect(()=>{
  console.log("INSIDE AGENT, USER IS",loggedInAgent)
//   if(!user || user && !user.user_id){  DONT UNCOMMENT THIS OUT
//     navigate('/login')
//    }

  },[user])


 
  
 
  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[loading,setLoading] = useState(false)
  const[farmersAddedPerMonth,setFarmersAddedPerMonth] = useState([])
  const[ loadedFarmersPerMonth,setLoadedFarmersPerMonth]= useState(false)
  const[allLandSize,setAllLandSize] = useState(0)
  const[totalLandForCurrentMonth,setTotalLandForCurrentMonth] = useState([])
  const[updatedCropDeposits,setUpdatedCropDeposits] = useState([])

  const { myGroups, isLoading,
          currentFarmersToDisplay,
          allFarmersForThisAgent,
          currentAgentsToDisplay,
          totalPagesFarmers } = useSelector((state) => state.group);



  useEffect(() => {
    if(!loggedInAgent||loggedInAgent &&  !loggedInAgent.user_id){
     return navigate("/login");
    }
   }, [])

  console.log("HOME PAGE, LOGGED IN AGENT IS-->",loggedInAgent)


  useEffect(()=>{
    console.log("logged in agent is-->",loggedInAgent)
 
   setLoading(true)
    dispatch(fetchFarmersForOneAgent(loggedInAgent && loggedInAgent.user_id))
  
   setTimeout(()=>{setLoading(false)},6000)
  },[])


  useEffect(()=>{

    dispatch(fetchAgentsFromPage(1))
   setTimeout(setLoadedFarmersPerMonth(true),0)
  },[])
  


  useEffect(()=>{

    function calculateTotalLandForCurrentMonth(allFarmersForThisAgent) {
      let totalLand = 0;
      const currentMonth = new Date().getMonth(); // Get the current month (0 = January, 11 = December)
    
      allFarmersForThisAgent.forEach(item => {
        // Check if 'farm_size' or 'farmsize' exists in the object
        let farmSizeValue = item.farm_size || item.farmsize||item.size_of_farm ;
    
        // Parse the 'createdAt' property and get the month
        if (item.createdAt) {
          const itemDate = new Date(item.createdAt);
          const itemMonth = itemDate.getMonth();
    
          // Only proceed if the item's month matches the current month
          if (itemMonth === currentMonth && farmSizeValue) {
            // Extract the number from the string, ignoring the non-numeric parts
            let numericValue = parseFloat(farmSizeValue.match(/[0-9]*\.?[0-9]+/));
            if (!isNaN(numericValue)) {
              totalLand += numericValue;
            }
          }
        }
      });
    
      return totalLand;
    }
    
    const totalLand = calculateTotalLandForCurrentMonth(allFarmersForThisAgent);
     setTotalLandForCurrentMonth(totalLand)
    
    },[allFarmersForThisAgent])
    


  useEffect(()=>{


    let farmersFromDBArray = [ ]
  
    allFarmersForThisAgent && allFarmersForThisAgent.slice(0,4).forEach((item,index)=>(
  
     
      farmersFromDBArray.push({
        ...item,
        id:item._id?item._id: "8Gnbs3WPwJ7ZzzvHgORs",
        farmerName:item.name?item.name: "Kayode Moses",
        cropType:"Cash Crops",
        location:index%2==0?"Oyo Nigeria":"Dakar Sénégal",
        lastHarvest:"30",
        image:/*item.photo?item.photo:*/index === 0?farmer1:index=== 1?farmer2:index === 2?farmer3:farmer4,
        onboardDate:item.createdAt && new Date(item.createdAt) ?
        
        `${String(new Date(item.createdAt).getDate()).padStart(2, '0')}-${String(new Date(item.createdAt).getMonth() + 1).padStart(2, '0')}-${new Date(item.createdAt).getFullYear()}`
       
        :
  
        "01-01-2024",
      })
    ))

    setFarmersFromDB(farmersFromDBArray)
  
    console.log("farmers from DB state is now-->",farmersFromDB)
  



  },[allFarmersForThisAgent])


  console.log("current agents  gotten is-->",currentAgentsToDisplay)

  console.log("current farmers  gotten is--->",allFarmersForThisAgent)


  const students = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,class:"Sophomore",paymentStatus:"Clark University",fName:"Norman ",lName:"Steven",amount:"$9,700"},
    {id:"75LPiOJKwtndeC67o5d3",class:"Senior",paymentStatus:"Morehouse College",fName:"Grace ",lName:"Kenneth",amount:"$8,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",class:"Freshman",paymentStatus:"Mercer University",fName:"Chris ",lName:"Stones",amount:"$7,700"},
    {id:"amfootball",class:"Junior",paymentStatus:"Bradley University",fName:"Kennedy ",lName:"Fisher",amount:"$6,500"}
  ]



  const crops = [
    {id:"0S91dTHhu7t0Zc6645Gb", cropName:"Corn",cropType:"Cash Crops",lastHarvest:"20",harvestDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"},
   
  ]



  const farmers = [
    {id:"0S91dTHhu7t0Zc6645Gb", farmerName:"John Jenkins",cropType:"Cash Crops",location:"Dakar Senegal", lastHarvest:"20",onboardDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",farmerName:"Didier Deschamps",cropType:"Cash Crops",location:"Dakar Senegal",lastHarvest:"50",onboardDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",farmerName:"Kayode Moses",cropType:"Cash Crops",location:"Oyo Nigeria",lastHarvest:"30",onboardDate:"01-01-2024"},
   
  ]






  const cropDeposits = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,cropName:"Corn",companyName:"Container #1",depositDate:"01-01-2024",lName:"Steven",earnings:"$90"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",companyName:"Container #2",depositDate:"01-01-2024",lName:"Kenneth",earnings:"$80"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",companyName:"Container #3",depositDate:"01-01-2024",lName:"Stones",earnings:"$70"},
    
  ]



  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  
  useEffect(()=>{


    const data = allFarmersForThisAgent && allFarmersForThisAgent
    
    // Function to count createdAt dates per month
    function countObjectsByMonth(data) {
      const currentDate = new Date();
      const results = new Array(8).fill(0); // Initialize an array with 8 zeros for 8 months
    
      data.forEach((item) => {
        const createdAtDate = new Date(item.createdAt);
        
        // Loop over the last 8 months (including the current month)
        for (let i = 0; i < 8; i++) {
          let comparisonDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          
          if (
            createdAtDate.getFullYear() === comparisonDate.getFullYear() &&
            createdAtDate.getMonth() === comparisonDate.getMonth()
          ) {
            results[i]++;
          }
        }
      });
    
      return results;
    }
    
    const counts = countObjectsByMonth(data);
    const countsReverse = counts.reverse()
    
    console.log("FARMERS ADDED PER MONTH IS --->",countsReverse)
    setFarmersAddedPerMonth(countsReverse)
 

  },[allFarmersForThisAgent])

  useEffect(()=>{


  function calculateTotalLand(allFarmersForThisAgent) {
    let totalLand = 0;
  
    allFarmersForThisAgent.forEach(item => {
      // Check if 'farm_size' or 'farmsize' exists in the object
      let farmSizeValue = item.farm_size || item.farmsize||item.size_of_farm ;
  
      if (farmSizeValue) {
        // Extract the number from the string, ignoring the non-numeric parts
        let numericValue = parseFloat(farmSizeValue.match(/[0-9]*\.?[0-9]+/)); 
        if (!isNaN(numericValue)) {
          totalLand += numericValue;
        }
      }
    });
  
    return totalLand;
  }


  const totalLand = calculateTotalLand(allFarmersForThisAgent);
  setAllLandSize(totalLand)

},[allFarmersForThisAgent])


  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl">
        
        {/* <SearchBox style={{ width: '100%' }} /> */}

        <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem"}}>

         <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
         
         <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Welcome {loggedInAgent && loggedInAgent.firstName?loggedInAgent.firstName:"User"} 👋</h1>
         <div>{new Date().toDateString()}</div>
         
         </div>
         
         </Grid> 
      
        <Grid container spacing={3} style={{marginTop:"1rem",scale:"0.9",position:"relative",left:"-0.5rem",width:"99.5%"}}>
        {/*
          <Grid item xs={12} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
           

       <CampaignCard headerOne={'Statistics'} headerTwo={'Profile'} value={'$1300'} type={'one'} image={noimage} farmName={'Agent'} agentAddedId={loggedInAgent && loggedInAgent.agentId && loggedInAgent.agentId} farmerName={loggedInAgent && loggedInAgent.firstName + " " + loggedInAgent.lastName} city={"Dakar, Senegal"} email={"default@gmail.com"} phoneNumber={loggedInAgent && loggedInAgent.phone_number?` ${loggedInAgent.phone_number}`:loggedInAgent && loggedInAgent.phoneNumber?` ${loggedInAgent.phoneNumber}`:'+234-12345678' } />
            </div>
          </Grid>
        */}

        {/*
          <Grid item xs={12} md={12} lg={6}>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
            <ContainerHomeCard headerOne={'Statistics'} headerTwo={'Container'} value={''} type={'one'} image={cropcompany} farmName={'Jenkins Farm'} farmerName={ "Dakar, Senegal" } city={"Container 1"} email={"jjenkins@gmail.com"} phoneNumber={"+221 555-380-1000"} />
           
            </div>
          </Grid> 
          */}


<Grid container spacing={2}>
          {/* First Grid Item */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Farmer'} value={ currentFarmersToDisplay ?currentFarmersToDisplay.length :'0'} img={TeacherImg} additions={farmersAddedPerMonth ?farmersAddedPerMonth[farmersAddedPerMonth.length-1]:'0'} />
            </Paper>
          </Grid>

          {/* Second Grid Item */}
          {/*
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard
                header={'Agent'}
                value={ currentAgentsToDisplay ?currentAgentsToDisplay.length :'0'}
                img={StudentImg}
                additions={agentsAddedPerMonth ?agentsAddedPerMonth[0]:'0'} 
              />
            </Paper>
          </Grid>
            */}
        

          {/* Fourth Grid Item */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
              
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Farm'} value={allLandSize?allLandSize.toLocaleString():'0'} additions={totalLandForCurrentMonth &&  totalLandForCurrentMonth} img={FeesImg}  />
            </Paper>
          </Grid>
        </Grid>

        <br />
        <br/>

    {/*

          <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
            <Box sx={{ width: '100%' }}>
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '140px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                
              >
                Farmers
              </Button>
              &nbsp; &nbsp;

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '140px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                
              >
               Deposits
              </Button>

            </Box>

         
          </Grid>
              */}



<Grid  xs={12} container spacing={0} style={{display:"flex",justifyContent:"space-between",gap:"0rem"}}>
          <Grid item md={8} xs={12} style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"transparent",borderRadius:"2rem",padding:"0.5rem",position:"relative" }}>
            <Box sx={{ width: '100%' /*,position:"relative",top:"-1rem",left:"-1rem"*/}}>
             {loadedFarmersPerMonth &&farmersAddedPerMonth && farmersAddedPerMonth.length > 0 &&  <ApexChart pointsData={farmersAddedPerMonth && farmersAddedPerMonth}/>}

            </Box>

         
          </Grid>


          <Grid item md={4} xs={12} style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"transparent",borderRadius:"2rem",padding:"0.5rem",position:"relative"}}>
            
            <Box sx={{ width: '100%' /*,position:"relative",top:"-1rem",left:"-1rem"*/}}>
            <div style={{background: 'white', height:"23.5rem", padding: '10px',display:"flex",flexDirection:"column",gap:"1rem"}}>
            <div>Containers</div>

               <ContainerCardSmall pic={cropcompany} collection={'VELIGNARA'} about={"Dakar, Senegal"} signed={`Last Deposit: ${updatedCropDeposits &&updatedCropDeposits[0] && updatedCropDeposits[0].depositDate.replace(/\//g, '-')}`} containerName={'Velignara'}/>
               <ContainerCardSmall pic={cropcompany} collection={'VELIGNARA'} about={"Dakar, Senegal"} signed={"Last Deposit: 01-01-2024"} containerName={'Velignara'}/>
               
              
              
                </div>

            </Box>

         
          </Grid>
    
     </Grid>




          <Grid container spacing={2} sx={{background: '#F8F8F8', padding: '10px'}}>
       
         {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Farmers</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0"  }}>
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
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0"  }}>
         <Select
           disabled={true}
           value={selectedSection}
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

     <Box sx={{ width: '20%', marginTop: '1.2%',}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%',position:"relative",top:"8px" }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0,display:{xs:"none",md:"flex"}}}>
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
           <div style={{background:'white' /*'#F8F8F8'*/,  padding: '10px',marginTop:"-2.5rem"}}>
        { 
        
        farmersFromDB && farmersFromDB.length?  
        <FarmerStats  farmers={farmersFromDB}/> 
        :
       
        loading?
        <center style={{marginTop:"6rem"}}>
        <CircularProgress/>
        </center>
        : 
        "No farmers fetched for this agent."


          }
           </div>
           </Grid>
           
         </Grid>


        </Grid>
      </Container>
    </>
  );
}
