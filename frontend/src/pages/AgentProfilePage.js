import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate, useParams } from 'react-router-dom';
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
import cropcompany from 'src/assets/images/cropcompany.png'

import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import ScrollingCampaignCard from 'src/components/home/scrolling-campaign-card';
import FarmerStats from 'src/components/home/farmer-stats';
import { fetchFarmersFromPage,fetchAgentsFromPage, sectionFarmersFromPageForThisAgent } from 'src/redux/actions/group.action';
import ContainerHomeCard from 'src/components/home/container-agent-card';
import ContainerAgentCard from 'src/components/home/container-agent-card';
import FarmerStatsLong from 'src/components/home/farmer-stats-long';
import PaginateFarmersForThisAgent from 'src/components/buttons/PaginateFarmersForThisAgent';
import ResponsesStatsLong from 'src/components/home/responses-stats-long';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function AgentProfilePage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();

  const { user } = useSelector((state) => state.auth);


 
  useEffect(()=>{

   if(!user || user && !user.user_id){
    navigate('/login')
   }

  },[user])


  const { agentInFocus } = useSelector((state) => state.group);
  
 
  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[responsesFromDB,setResponsesFromDB] = useState([])

  const[loading,setLoading] = useState(false)


  const { myGroups,
          isLoading,
         currentFarmersForThisAgent,
         currentAgentsToDisplay,
         totalPagesFarmersForThisAgent,
         allResponsesAdmin,
         allFarmersForThisAgent,
         filteredFarmersForThisAgent 
        } = useSelector((state) => state.group);

  //const { students } = useSelector((state) => state.student);


  //useEffect(() => {
  //  if(!agentInFocus||agentInFocus &&  !agentInFocus.firstName){
  //   return navigate("/dashboard/deposits");
  //  }
  // }, [])

  console.log("AGENT PROFILE PAGE,  AGENT IN FOCUS IS-->",agentInFocus)




//  useEffect(() => {
//
//   
//     
//      dispatch(fetchFarmersFromPage(1))
//      dispatch(fetchAgentsFromPage(1))
//     
//
//  }, [])


//useEffect(()=>{
//  /**THIS USE EFFECT IS FOR INITIAL LOAD, USUALLY AFTER LOGIN, WITHOUT HAVING SELECTED A PAGE */
//if(!page){
//  dispatch(sectionFarmersFromPageForThisAgent(1,allFarmersForThisAgent,filteredFarmersForThisAgent))
//}else{
//  dispatch(sectionFarmersFromPageForThisAgent(page,allFarmersForThisAgent,filteredFarmersForThisAgent))
//}
//
//},[page])


  useEffect(()=>{


    let responsesFromDBArray = [


    ]
  
    allResponsesAdmin && allResponsesAdmin.forEach((item,index)=>(
  
     
      responsesFromDBArray.push({...item,

        id:item._id?item._id:item.id?item.id: item.OriginalResponseId?item.OriginalResponseId :Math.random(),
      
      })
    ))

    setResponsesFromDB(responsesFromDBArray)

    if(!responsesFromDBArray){
      setLoading(true)

      setTimeout(()=>{
        setLoading(false)
      },4000)
    }
  
    console.log("responses from DB FOR THIS PARTICULAR AGENT state is now-->",responsesFromDB)
  

  },[allResponsesAdmin])



  useEffect(()=>{


    let farmersFromDBArray = [


    ]
  
    currentFarmersForThisAgent && currentFarmersForThisAgent.forEach((item,index)=>(
  
     
      farmersFromDBArray.push({...item,

        id:item._id?item._id:item.id?item.id: item.OriginalResponseId?item.OriginalResponseId :Math.random(),
      
      })
    ))

    setFarmersFromDB(farmersFromDBArray)

    if(!farmersFromDBArray){
      setLoading(true)

      setTimeout(()=>{
        setLoading(false)
      },4000)
    }
  
    console.log("farmers from DB FOR THIS PARTICULAR AGENT state is now-->",farmersFromDB)
  

  },[currentFarmersForThisAgent])





  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


 


  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container style={{scale:"0.9",position:"relative",top:"0rem"}} maxWidth="xl">
        
       
  
      
        <Grid container spacing={3}>


        <Grid container spacing={2} sx={{background:'white' /*'#F8F8F8'*/, padding: '10px'}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Responses</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedClass}
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
       <MenuItem value={'1'}>1</MenuItem>
       <MenuItem value={'2'}>2</MenuItem>
       <MenuItem value={'3'}>3</MenuItem>
       <MenuItem value={'4'}>4</MenuItem>
      
         </Select>
       </FormControl>
     </Grid>
  
    <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
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
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0}}>
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

        responsesFromDB && responsesFromDB.length ?
        
          <ResponsesStatsLong  farmers={responsesFromDB}/> 

          :
          
          <center style={{marginTop:"6rem",marginTop:"2rem"}}>
       {
        loading?  
          <CircularProgress/>
          : 
          "No Responses for this agent!"
        }
          </center>
          
          }
           </div>
           </Grid>
           
         </Grid>
        
      
        <br />
        <br />
        <br />


          <Grid container spacing={2} sx={{background:'white' /*'#F8F8F8'*/, padding: '10px'}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Farmers</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedClass}
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
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
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
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0}}>
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

        farmersFromDB && farmersFromDB.length ?
        
          <FarmerStatsLong  farmers={farmersFromDB}/> 

          :
          
          <center style={{marginTop:"6rem",marginTop:"2rem"}}>
       {
        loading?  
          <CircularProgress/>
          : 
          "No Farmers for this agent!"
        }
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
