import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup, saveEmployeer,
   saveGroupMembers, saveMyGroup, 
  savePrivateGroup, savePublicGroup,
  saveCurrentFarmersToDisplay,
  clearCurrentFarmersToDisplay,

  saveTotalPagesFarmers,
  saveSpecificResponseToDisplay,
  saveResponseInFocus,

  saveCurrentResponsesToDisplay,
  saveCurrentResponsesToDisplayAdmin,
  clearAllResponsesToDisplayAdmin,
  saveTotalPagesResponses,
  saveTotalPagesResponsesAdmin,
  saveTotalPagesForms,
  saveCurrentAgentsToDisplay,
  saveTotalPagesDeposits,
  saveCurrentDepositsToDisplay,
  clearCurrentDepositsToDisplay,
  saveTotalPagesAgents,
  saveTotalPagesFilteredFarmers,
  saveTotalPagesFilteredResponses,
  saveTotalPagesFilteredAgents,
  saveAllFarmers,
  saveAllFarmersForThisAgent,
  saveAllResponses,
  saveAllResponsesAdmin,
  saveAllForms,
  saveAllAgents,

  saveFilteredFarmers,
  saveFilteredForms,
  clearFilteredFarmers,

  saveFilteredFarmersForThisAgent,
  saveFilteredResponses,
  saveFilteredResponsesAdmin,

  saveCurrentCropFilter,
  saveCurrentLocationFilter,
  saveCurrentCropTypeFilter,

  saveCurrentFormFilter,
  saveCurrentFarmersForThisAgent,
  clearCurrentFarmersForThisAgent,
  saveTotalPagesFarmersForThisAgent,
  clearCurrentResponsesToDisplay,
  clearFilteredResponses,
  clearFilteredForms,


  saveLoggedInAgent,
  saveLoggedInFarmer,
  saveCurrentFormsToDisplay,
  saveAllAdmins,
  saveAllSuperAdmins,
  saveAgentInFocus,
  saveFarmerInFocus,
  saveAllProducts,
  saveCurrentProductsToDisplay,
  saveProductInFocus,
  saveChatGptAnswer,


} from '../reducers/group.slice';
import axios from 'axios';
import baseUrl from './baseUrl';
import { useSelector } from 'react-redux';



export const addNewDeposit = (deposit) => async (dispatch) => {

  axios.post(`${baseUrl}/api/deposits`,deposit)
  .then(()=>{
    console.log("we would have fetched all deposits here, but we're not doing that now!")
   //dispatch(fetchAllDeposits())
  }).then(()=>{
    notifySuccessFxn('Deposit Successfully Added!')
  })

}



export const addNewFarmer = (farmerInfo) => async (dispatch) => {
  
  console.log("ADDING NEW FARMERS")
  axios.post(`${baseUrl}/api/farmers`,farmerInfo)
  .then(()=>{
    console.log("we have refetched all farmers")
   dispatch(fetchAllFarmers())
  }).then(()=>{
    notifySuccessFxn('Farmer Successfully Added!')
  })

}


export const addNewAgent = (farmerInfo) => async (dispatch) => {
  
  console.log("ADDING NEW Agent")
  axios.post(`${baseUrl}/api/agents`,farmerInfo)
  .then(()=>{
    console.log("we have refetched all agents")
   dispatch(fetchAgentsFromPage())
  }).then(()=>{
    notifySuccessFxn('Agent Successfully Added!')
  })

}


export const addNewAdmin = (adminInfo) => async (dispatch) => {
  
  console.log("ADDING NEW Admin")
  axios.post(`${baseUrl}/api/admins`,adminInfo)
  .then(()=>{
    console.log("we have refetched all admins")
   dispatch(fetchAllAdmins())
  }).then(()=>{
    notifySuccessFxn('Admin Successfully Added!')
  })

}


export const fetchAllDeposits = () => async (dispatch) => {
  




 axios.get(`${baseUrl}/api/deposits/all`)
   .then((results) => {
     const pageDeposits = results.data
  
      console.log("results from first page of Deposits-->",pageDeposits)

   if (pageDeposits.deposits.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", pageDeposits);
     dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits));
     dispatch(saveTotalPagesDeposits(pageDeposits.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentDepositsToDisplay(pageDeposits));
       dispatch(saveTotalPagesDeposits(pageDeposits.pages))
       console.log("No Deposits returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}


export const fetchDepositsForContainer = (containerName,navigate) => async (dispatch) => {
  
  dispatch(saveCurrentDepositsToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/deposits?containerName=${containerName}`)
   .then((results) => {
     const pageDeposits = results.data
  
      console.log("results from  Deposits FOR THIS CONTAINER ARE-->",pageDeposits)

   if (pageDeposits.deposits.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Deposits Data:", pageDeposits);
     dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits))
      setTimeout(()=>{navigate('/dashboard/container-profile')},1000)
     
    
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits));
       notifyErrorFxn('no depostits for this container!')
       console.log("No Deposits returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}



export const fetchDepositsForFarmer = (farmerName) => async (dispatch) => {
  
  dispatch(saveCurrentDepositsToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/deposits?farmerName=${farmerName}`)
   .then((results) => {
     const pageDeposits = results.data
  
      console.log("results from  Deposits FOR THIS farmer ARE-->",pageDeposits)

   if (pageDeposits.deposits.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Deposits Data:", pageDeposits);
     dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits))
      //setTimeout(()=>{navigate('/dashboard/farmer-profile')},1000)
     
    
   } else {
       dispatch(isItLoading(false));
       //dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits));
       dispatch(clearCurrentDepositsToDisplay(pageDeposits.deposits));
      // notifyErrorFxn('no depostits for this farmer!')
       console.log("No Deposits returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}


export const fetchLastThreeDeposits = () => async (dispatch) => {
  
  dispatch(saveCurrentDepositsToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/deposits/lastthree`)
   .then((results) => {
     const pageDeposits = results.data
  
      console.log("results from LATESt  Deposits ARE-->",pageDeposits)

   if (pageDeposits.deposits.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Deposits Data:", pageDeposits);
     dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits))
     
     
    
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits));
      /* notifyErrorFxn('no depostits for this container!')
       console.log("No Deposits returned!");*/
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}




export const fetchFarmersFromPage = (pageNumber,keyword,vendorName) => async (dispatch) => {
  
  dispatch(saveCurrentFarmersToDisplay([]));
  dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/farmers?keyword=${keyword}&pageNumber=${pageNumber}&vendorName=${vendorName}`)
   .then((results) => {
     const pageFarmers = results.data
  
      console.log("results from first page of farmers-->",pageFarmers)

   if (pageFarmers.farmers.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", pageFarmers);
     dispatch(saveCurrentFarmersToDisplay(pageFarmers.farmers));
     dispatch(saveTotalPagesFarmers(pageFarmers.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentFarmersToDisplay(pageFarmers.farmers));
       dispatch(saveTotalPagesFarmers(pageFarmers.pages))
       console.log("No farmers returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}


export const sectionFarmersFromPage = (pageNumber,allFarmers,filteredFarmers,location) => async (dispatch) => {

 // const { allFarmers,filteredFarmers,totalPagesFarmers } = useSelector((state) => state.group);
  console.log("USE SELECTOR WORKS HERE ALL FARMERS!",allFarmers)
  console.log("USE SELECTOR WORKS HERE FILTERED FARMERS!",filteredFarmers)
  if(location && location === "home"){

    if(filteredFarmers && filteredFarmers.length){
      /*allFarmersToDisplay may not be the best array, and a filtered one is presenting problems - sep 5 2024 */
    dispatch(saveCurrentFarmersToDisplay(filteredFarmers/*.slice(filteredFarmers.length-10,filteredFarmers.length )*/ ));
    }
    else{

  if(allFarmers.length){
      dispatch(saveCurrentFarmersToDisplay(allFarmers/*.slice(allFarmers.length-10,allFarmers.length )*/ ));
      }
     /* else{

      dispatch(clearCurrentFarmersToDisplay(allFarmers.slice(filteredFarmers.length-10,filteredFarmers.length ) )); 
      }*/


    }

  }
 else{
    if(filteredFarmers.length){
      /*allFarmersToDisplay may not be the best array, and a filtered one is presenting problems - sep 5 2024 */
    dispatch(saveCurrentFarmersToDisplay(filteredFarmers/*.slice(10*(pageNumber-1),(10*(pageNumber-1))+10 )*/  ));
    }
    else{

      if(allFarmers.length){
      dispatch(saveCurrentFarmersToDisplay(allFarmers/*.slice(10*(pageNumber-1),(10*(pageNumber-1))+10 )*/ )  );
        }
       /* else{
  
        dispatch(clearCurrentFarmersToDisplay(allFarmers.slice(filteredFarmers.length-10,filteredFarmers.length ) )); 
        }*/
  

    }

}

}


export const sectionFarmersFromPageForThisAgent = (pageNumber,allFarmers,filteredFarmers) => async (dispatch) => {

  // const { allFarmers,filteredFarmers,totalPagesFarmers } = useSelector((state) => state.group);
   console.log("USE SELECTOR WORKS HERE ALL FARMERS!",allFarmers)
   console.log("USE SELECTOR WORKS HERE FILTERED FARMERS!",filteredFarmers)
 
     if(filteredFarmers.length){
       /*allFarmersToDisplay may not be the best array, and a filtered one is presenting problems - sep 5 2024 */
     dispatch(saveCurrentFarmersForThisAgent(filteredFarmers/*.slice(10*(pageNumber-1),(10*(pageNumber-1))+10 )*/  ));
     }
     else{
 
     dispatch(saveCurrentFarmersForThisAgent(allFarmers/*.slice(10*(pageNumber-1),(10*(pageNumber-1))+10 )*/ ));
 
     }
 }


export const sectionResponsesFromPage = (pageNumber,allResponses,filteredResponses) => async (dispatch) => {

  // const { allResponses,filteredResponses,totalPagesResponses } = useSelector((state) => state.group);
   console.log("USE SELECTOR WORKS HERE ALL Responses!",allResponses)
   console.log("USE SELECTOR WORKS HERE FILTERED Responses!",filteredResponses)
 
     if(filteredResponses.length){
       /*allResponsesToDisplay may not be the best array, and a filtered one is presenting problems - sep 5 2024 */
     dispatch(saveCurrentResponsesToDisplay(filteredResponses/*.slice(10*(pageNumber-1),(10*(pageNumber-1))+10)*/ ));
     }
     else{
 
      // dispatch(saveCurrentResponsesToDisplay(allResponses.slice(10*(pageNumber-1),(10*(pageNumber-1))+10 )));
 
     }
 }


export const fetchAllFarmers = () => async (dispatch) => {
 

  const farmer1 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863974/farmer8_l3ewpm.png"
  const farmer2 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863990/farmer2_icjojq.png"
  const farmer3 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863997/farmer5_ip0m4q.png"
  const farmer4 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"
  const farmer5 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863996/farmer3_ngfl1i.png"
  const farmer6 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866493/farmer1_ijfjvu.png"
  const farmer7 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866568/farmer10_bnpjqc.png"
  const farmer8 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866571/farmer9_l6pqj5.png"
  const farmer9 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer4_mp8ffo.png"
  const farmer10 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer6_fnwxhj.png"
  


  //dispatch(clearCurrentFarmersToDisplay());
  //dispatch(saveTotalPagesFarmers(0))





 axios.get(`${baseUrl}/api/farmers/all`)
   .then((results) => {
     const pageFarmers = results.data
  
      console.log("results from ALLLLLLLLLL of farmers-->",pageFarmers)

let farmersFromDBArray = []


     pageFarmers.farmers && pageFarmers.farmers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).filter((item)=>(item.farmsize||item.farm_size||item.farmSize||item.size_of_farm )).forEach((item,index)=>{
      
        //console.log("ITEM'S PHOTO IS -->",item.photo && item.photo)
    
   
    
        return  farmersFromDBArray.push({
       ...item,
       id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
       farmerName:item.name?item.name:item.nom_de_lagriculteur?item.nom_de_lagriculteur:item.name_first__last?item.name_first__last:item.what_is_your_name?item.what_is_your_name :item.firstName && item.lastName?item.firstName + " " + item.lastName: "No Name",
       cropType:"Cash Crops",
       location:item.location ? item.location:index%2==0?"Oyo Nigeria":"Dakar Sénégal", /**LOCATIONS IN DB ARE IN GEOGRAPHICAL CODE */
       gps:item.location?item.location:" ",
       lastHarvest:"30",
       index:index,
       age: item.age?item.age:"45",
       farmSize: item.farm_size?item.farm_size:item.size_of_farm?item.size_of_farm  :"7",
       market:item.market?item.market:"Local Market",
       typeOfChemical:item.typeOfChemical?item.typeOfChemical:"Yes, Ire",
       organicFarmingInterest:item.organicFarmingInterest?item.organicFarmingInterest:"Yes",

       id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",

       photo:item.photo?item.photo:item.take_a_picture?item.take_a_picture :index === 0?farmer1:index=== 1?farmer2:index === 2?farmer3:index === 3?farmer4:index === 4?farmer5:index === 5?farmer6:index === 6?farmer7:index === 7?farmer8:index === 8?farmer9:index === 9?farmer10:farmer10 ,
       onboardDate:item.createdAt && new Date(item.createdAt) ?
       
       `${String(new Date(item.createdAt).getDate()).padStart(2, '0')}-${String(new Date(item.createdAt).getMonth() + 1).padStart(2, '0')}-${new Date(item.createdAt).getFullYear()}`
      
       :
 
       "01-01-2024",
     })



  })


   if (farmersFromDBArray.length > 0) {
     dispatch(isItLoading(false));
     console.log("All FARMERS Data:", farmersFromDBArray);
  
     dispatch(saveAllFarmers(farmersFromDBArray));
     dispatch(saveFilteredFarmers(farmersFromDBArray));

   dispatch(saveCurrentFarmersToDisplay(farmersFromDBArray/*.slice(farmersFromDBArray.length-10,farmersFromDBArray.length)*/  ) );
     dispatch(saveTotalPagesFarmers(pageFarmers.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentFarmersToDisplay(farmersFromDBArray/*.slice(farmersFromDBArray.length-10,farmersFromDBArray.length)*/  ));
       dispatch(saveTotalPagesFarmers(pageFarmers.pages))
       console.log("No farmers returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}



export const fetchAllAdmins = () => async (dispatch) => {

let users =[]

 await axios.get(`${baseUrl}/api/users/`)
  .then((results) => {
    console.log("results from all USERS AND ADMINS",results)
     users = results.data
    
  })



 await axios.get(`${baseUrl}/api/admins/`)
   .then((results) => {
     const pageAdmins = results.data
  
     console.log("results from all  SUPERADMINS AND ADMINS",results)
      

     let farmersFromDBArray = []
     let superAdminsFinal;
     let adminsFinal ;



   let admins =  pageAdmins && pageAdmins.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      
        //console.log("ITEM'S PHOTO IS -->",item.photo && item.photo)
        
        // Sample data

// Empty array to store admins with roles
const adminsWithRoles = [];

// Step 1: Match admins with users and add the role
admins && admins.forEach(admin => {
  const matchingUser = users.find(user => user._id === admin.user_id);
  if (matchingUser) {
      adminsWithRoles.push({
          ...admin,
          role: matchingUser.role
      });
  }
});

console.log("admins LOOK HERE-->",adminsWithRoles)

// Step 2: Separate adminsWithRoles into superAdminsFinal and adminsFinal based on role
 superAdminsFinal = adminsWithRoles.filter((admin) => (admin.role === "SuperAdmin"));
 adminsFinal = adminsWithRoles.filter((admin) =>( admin.role === "Admin"));




console.log("adminsWithRoles:", adminsWithRoles);
console.log("superAdminsFinal:", superAdminsFinal);
console.log("adminsFinal:", adminsFinal);

console.log("results from ALLLLLLLLLL of admins-->",pageAdmins)
console.log("USERS FROM FETCH ALL ADMINS-->",users)






   if (superAdminsFinal > 0 && adminsFinal > 0) {
     dispatch(isItLoading(false));
   
  
     dispatch(saveAllAdmins(adminsFinal));
     dispatch(saveAllSuperAdmins(superAdminsFinal));
   
     
   } else {
       dispatch(isItLoading(false));

       dispatch(saveAllAdmins(adminsFinal));
       dispatch(saveAllSuperAdmins(superAdminsFinal));

       console.log("No admins returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}


export const fetchAgentById = (id) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))


 await axios.get(`${baseUrl}/api/agents/byid?id=${`${id}`}`)
   .then((results) => {

    console.log("results from ffetching agent by id--->",results)
    let pageAgents  = {}

     pageAgents = results.data
  
      console.log("results from ffetching agent by id DATA--->",pageAgents)

   if (pageAgents) {
     dispatch(isItLoading(false));
     console.log("Agent with this id-->:", pageAgents);
     dispatch(saveAgentInFocus(pageAgents));

    
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAgentInFocus(pageAgents));
      
       console.log("ERROR HERE, No agents returned, by id!");
      
   }
 }).catch((error) => {
   console.log("Error getting document of agent by id:", error);
   //notifyErrorFxn("Please Check your number and try again!");
   dispatch(isItLoading(false));
 });

}





export const fetchAgentByPhone = (phone,navigate,setLoading) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))


 axios.get(`${baseUrl}/api/agents/byphone?phone=${`${phone}`}`)
   .then((results) => {

    console.log("results from ffetching agent by phone--->",results)
    let pageAgents  = {}

     pageAgents = results.data
  
      console.log("results from ffetching agent by phone DATA--->",pageAgents)

   if (pageAgents) {
     dispatch(isItLoading(false));
     console.log("Agent with this number-->:", pageAgents);
     dispatch(saveLoggedInAgent(pageAgents));

   
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home-agent', { replace: true });
    
     //dispatch(saveTotalPagesFarmers(pageAgents.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveLoggedInAgent(pageAgents));
       //dispatch(saveTotalPagesFarmers(pageAgents.pages))
       console.log("No farmers returned, by phone!");
       notifyErrorFxn("Please Check your number and try again!");
   }
 }).catch((error) => {
   console.log("Error getting document of farmer by phone:", error);
   notifyErrorFxn("Please Check your number and try again!");
   dispatch(isItLoading(false));
 });

}

export const fetchFarmerByPhone = (phone,navigate,setLoading) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/farmers/byphone?phone=${phone}`)
   .then((results) => {

    console.log("results from ffetching farmer by phone--->",results)

     const pageFarmers = results.data
  
      console.log("results from ffetching farmer by phone DATA--->",pageFarmers)

   if (pageFarmers) {
     dispatch(isItLoading(false));
     console.log("Farmer with this number-->:", pageFarmers);
     dispatch(saveLoggedInFarmer(pageFarmers));

   
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home-farmer', { replace: true });
    
     //dispatch(saveTotalPagesFarmers(pageFarmers.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveLoggedInFarmer(pageFarmers));
       //dispatch(saveTotalPagesFarmers(pageFarmers.pages))
       console.log("No farmers returned, by phone!");
       notifyErrorFxn("Please Check your number and try again!");
   }
 }).catch((error) => {
   console.log("Error getting document of farmer by phone:", error);
   dispatch(isItLoading(false));
 });


}



export const fetchFarmerById = (farmer) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/farmers/${farmer._id}`)
   .then((results) => {

    console.log("results from fetching farmer by his/her id--->",results)

     const pageFarmers = results.data
  
      console.log("results from ffetching farmer by id DATA--->",pageFarmers)

   if (pageFarmers) {
    
     console.log("Farmer with this id is-->:", pageFarmers);
     dispatch(saveFarmerInFocus(pageFarmers));

  
   } else {
      
       dispatch(saveFarmerInFocus(pageFarmers));
       
       console.log("No farmers returned, by FOR THIS ID!");
       //notifyErrorFxn("Please Check your number and try again!");
   }
 }).catch((error) => {
   console.log(" Overall Error getting document of farmer by ID:", error);
   
 });


}



export const fetchFarmersForOneAgent = (agentId) => async (dispatch) => {
 

  const farmer1 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863974/farmer8_l3ewpm.png"
  const farmer2 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863990/farmer2_icjojq.png"
  const farmer3 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863997/farmer5_ip0m4q.png"
  const farmer4 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"
  const farmer5 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863996/farmer3_ngfl1i.png"
  const farmer6 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866493/farmer1_ijfjvu.png"
  const farmer7 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866568/farmer10_bnpjqc.png"
  const farmer8 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866571/farmer9_l6pqj5.png"
  const farmer9 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer4_mp8ffo.png"
  const farmer10 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer6_fnwxhj.png"
  


  
 await dispatch(clearCurrentFarmersForThisAgent([]));
 await dispatch(saveTotalPagesFarmersForThisAgent(0))





 await axios.get(`${baseUrl}/api/farmers/oneagent?agentId=${agentId}`)
   .then((results) => {
     const pageFarmers = results.data
  
      console.log("results from ALLLLLLLLLL of farmers FOR THIS AGENT-->",pageFarmers)

let farmersFromDBArray = []


     pageFarmers.farmers && pageFarmers.farmers.sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt))).filter((item)=>(item.farmsize||item.farm_size||item.farmSize||item.size_of_farm  )).forEach((item,index)=>{
      
        //console.log("ITEM'S PHOTO IS -->",item.photo && item.photo)
    
   
    
        return  farmersFromDBArray.push({
       ...item,
       id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
       farmerName:item.name?item.name:item.name_first__last?item.name_first__last:item.what_is_your_name?item.what_is_your_name:item.firstName && item.lastName?item.firstName + " " + item.lastName: "No Name",
       cropType:"Cash Crops",
       location:item.location ? item.location:index%2==0?"Oyo Nigeria":"Dakar Sénégal", /**LOCATIONS IN DB ARE IN GEOGRAPHICAL CODE */
       gps:item.location?item.location:" ",
       lastHarvest:"30",
       index:index,
       age: item.age?item.age:"45",
       farmSize: item.farm_size?item.farm_size:"7",
       market:item.market?item.market:"Local Market",
       typeOfChemical:item.typeOfChemical?item.typeOfChemical:"Yes, Ire",
       organicFarmingInterest:item.organicFarmingInterest?item.organicFarmingInterest:"Yes",

       id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",

       photo:item.photo?item.photo :index === 0?farmer1:index=== 1?farmer2:index === 2?farmer3:index === 3?farmer4:index === 4?farmer5:index === 5?farmer6:index === 6?farmer7:index === 7?farmer8:index === 8?farmer9:index === 9?farmer10:farmer10 ,
       onboardDate:item.createdAt && new Date(item.createdAt) ?
       
       `${String(new Date(item.createdAt).getDate()).padStart(2, '0')}-${String(new Date(item.createdAt).getMonth() + 1).padStart(2, '0')}-${new Date(item.createdAt).getFullYear()}`
      
       :
 
       "01-01-2024",
     })



  })


   if (farmersFromDBArray.length > 0) {
     dispatch(isItLoading(false));
     console.log("All FARMERS Data FOR THIS AGENT:", farmersFromDBArray);
      
     dispatch(clearCurrentFarmersForThisAgent([]));
     dispatch(saveAllFarmersForThisAgent(farmersFromDBArray));
     dispatch(saveFilteredFarmersForThisAgent(farmersFromDBArray));

   dispatch(saveCurrentFarmersForThisAgent(farmersFromDBArray/*.slice(0,10)*/ ));
  // dispatch(saveCurrentFarmersToDisplay(farmersFromDBArray ));
     dispatch(saveTotalPagesFarmersForThisAgent(pageFarmers.pages))
   } else {
       dispatch(isItLoading(false));
      // dispatch(saveCurrentFarmersForThisAgent(farmersFromDBArray.slice(0,10)));

  dispatch(clearCurrentFarmersForThisAgent([]));
       dispatch(saveTotalPagesFarmersForThisAgent(0))
       console.log("No farmers returned FOR THIS AGENT!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}

// Fetch a specific response
export const fetchSpecificResponse = (username) => async (dispatch) => {

  // console.log("This should show propely", baseUrl, username);

  await axios.post(`${baseUrl}/api/responses/specific`, { username })
    .then( result => {
      // console.log("Here is the get Specific input respinse: ", result.data.data);
      // dispatch(saveSpecificResponseToDisplay(result.data.data))
      dispatch(saveResponseInFocus(result.data.data));
      console.log("Data sent successfully!");
    } )
    .catch( err => console.log("The get specific input error ended") )

}




// Fetch chat gpt answer 
export const fetchChatGptAnswer = (question, location,product) => async (dispatch) => {


  const apiEndpoint =`https://pmserver.vercel.app/api/om/chatgpt`


  const prompt = ` As a farmer located in - ${location}, who harvests, ${product} ,${question}?`


  const jobResponse = await axios.post(apiEndpoint,{prompt:prompt})

     console.log("OUR RESPONSE FROM OUR BACKEND, WHICH CALLS CHAT GPT-->",/*JSON.parse(*/jobResponse.data.text/*)*/)

     const fullJobDetailsResponse = /*JSON.parse(*/jobResponse.data.text/*)*/

 

     if(fullJobDetailsResponse){
      dispatch(saveChatGptAnswer(fullJobDetailsResponse && fullJobDetailsResponse))
     }

}


export const fetchAllResponses = () => async (dispatch) => {
 


  dispatch(saveCurrentResponsesToDisplay([]));
  dispatch(saveTotalPagesResponses(0))

  let allForms ;
  let allAgents;


   await  axios.get(`${baseUrl}/api/forms/all`).then((results)=>{

   allForms  = results.data.forms
   console.log("ALL FORMS GOTTEN BACK-->",allForms)
  })


   await axios.get(`${baseUrl}/api/agents/all`).then((results)=>{

    allAgents  = results.data.agents
    console.log("ALL AGENTS GOTTEN BACK-->",allAgents)
  })

 await axios.get(`${baseUrl}/api/responses/all`)
   .then((results) => {
     const pageResponses = results.data
  
      console.log("results from ALLLLLLLLLL of Responses-->",pageResponses)

  let responsesFromDBArray = []


     pageResponses.responses && pageResponses.responses.sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt) )).forEach((item,index)=>{

     const matchingForm = allForms.filter((form)=>( form._id === item.form_id))


     const matchingAgent = allAgents.filter((agent)=>(agent.user_id === item.agent_user_id))
      
  
    // console.log('MATCHING AGENT IS--->',matchingAgent)
    // console.log('MATCHING FORM IS--->',matchingForm)

      return  responsesFromDBArray.push({
        ...item,
        id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
        agentName:matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName && matchingAgent[0].lastName  ?matchingAgent[0].firstName + " " + matchingAgent[0].lastName :matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName ?matchingAgent[0].firstName  :"Djibril Cisse",
        formName:matchingForm && matchingForm[0]?matchingForm[0].title:null,
        index:index
 
      })






    /*  TRIED TO FETCH AGENT NAMES AND FORM NAMES FOR EACH RESPONSE , BUT IT FREEZES THE SERVER
        let agentName;
        
    if(item.agent_user_id !== null){
        axios.get(`${baseUrl}/api/agents:${item.agent_user_id}`)
        .then((res) => {

      agentName =(res.data.firstName && res.data.firstName )+ " " + (res.data.lastName && res.data.lastName )
    
      axios.get(`${baseUrl}/api/forms:${item.form_id}`)
      .then((resp) => {
       
        return  responsesFromDBArray.push({
       ...item,
       id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
       agentName:agentName,
       formName:resp.data.title,
       index:index

     })

        })

    })

  }
  else{


    axios.get(`${baseUrl}/api/forms?formId=${item.form_id}`)
    .then((resp) => {
     
      return  responsesFromDBArray.push({
     ...item,
     id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
     agentName:"none",
     formName:resp.data.title,
     index:index

   })

      })



  }
 */


  })


   if (responsesFromDBArray.length > 0) {
     dispatch(isItLoading(false));
     console.log("All RESPONSES, AFTER BEING CUSTOMIZED WITH AGENT NAME AND FORM NAME ARE--> :", responsesFromDBArray);
  
     dispatch(saveAllResponses(responsesFromDBArray));
     dispatch(saveFilteredResponses(responsesFromDBArray));

     dispatch(saveCurrentResponsesToDisplay(responsesFromDBArray/*.slice(0,10)*/));
     dispatch(saveTotalPagesResponses(pageResponses.pages))
   } else {
       dispatch(isItLoading(false));
   dispatch(saveCurrentResponsesToDisplay(responsesFromDBArray/*.slice(0,10)*/));
       dispatch(saveTotalPagesResponses(pageResponses.pages))
       console.log("No responses returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}







export const fetchAllResponsesForOneAgent = (agentId) => async (dispatch) => {
 
console.log("FETCHING RESPONSES FOR ONE AGENT IS--->",agentId)

  dispatch(saveCurrentResponsesToDisplay([]));
  dispatch(saveTotalPagesResponses(0))

  let allForms ;
  let allAgents;


   await  axios.get(`${baseUrl}/api/forms/all`).then((results)=>{

   allForms  = results.data.forms
   console.log("ALL FORMS GOTTEN BACK-->",allForms)
  })


   await axios.get(`${baseUrl}/api/agents/all`).then((results)=>{

    allAgents  = results.data.agents
    console.log("ALL AGENTS GOTTEN BACK-->",allAgents)
  })

 await axios.get(`${baseUrl}/api/responses/all`)
   .then((results) => {
     const pageResponses =agentId === '66d8b0ad661d989dc6815e5a'? //djibirl cisse is the fallback here and so collects all users who have agent id as null
                           results.data.responses ? results.data.responses.filter((item)=>(null === item.agent_user_id)):[]
                           :
                       
                         results.data.responses ? results.data.responses.filter((item)=>(agentId === item.agent_user_id)):[]
                      
  
     console.log("results from ALLLLLLLLLL of Responses-->",pageResponses)

  let responsesFromDBArray = []


     pageResponses && pageResponses.sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt) )).forEach((item,index)=>{

     const matchingForm = allForms.filter((form)=>( form._id === item.form_id))


     const matchingAgent = allAgents.filter((agent)=>(agent.user_id === item.agent_user_id))
      
  
     console.log('MATCHING AGENT IS--->',matchingAgent)
     console.log('MATCHING FORM IS--->',matchingForm)

      return  responsesFromDBArray.push({
        ...item,
        id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
        agentName:matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName && matchingAgent[0].lastName  ?matchingAgent[0].firstName + " " + matchingAgent[0].lastName :matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName ?matchingAgent[0].firstName  :"Djibril Cisse",
        formName:matchingForm && matchingForm[0]?matchingForm[0].title:null,
        index:index
 
      })

  })


   if (responsesFromDBArray.length > 0) {
     dispatch(isItLoading(false));
     console.log("All RESPONSES, AFTER BEING CUSTOMIZED WITH AGENT NAME AND FORM NAME ARE--> :", responsesFromDBArray);
  
     dispatch(saveAllResponses(responsesFromDBArray));
     dispatch(saveFilteredResponses(responsesFromDBArray));

     dispatch(saveCurrentResponsesToDisplay(responsesFromDBArray/*.slice(0,10)*/));
     dispatch(saveTotalPagesResponses(pageResponses.pages))
   } else {
       dispatch(isItLoading(false));
   dispatch(saveCurrentResponsesToDisplay(responsesFromDBArray/*.slice(0,10)*/));
       dispatch(saveTotalPagesResponses(pageResponses.pages))
       console.log("No responses returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}


export const fetchAllResponsesForOneAgentAdminModule = (agentId) => async (dispatch) => {
 
  console.log("FETCHING RESPONSES FOR ONE AGENT IS--->",agentId)
  
    dispatch(clearAllResponsesToDisplayAdmin([]));
    dispatch(saveTotalPagesResponsesAdmin(0))
  
    let allForms ;
    let allAgents;
  
  
     await  axios.get(`${baseUrl}/api/forms/all`).then((results)=>{
  
     allForms  = results.data.forms
     console.log("ALL FORMS GOTTEN BACK-->",allForms)
    })
  
  
     await axios.get(`${baseUrl}/api/agents/all`).then((results)=>{
  
      allAgents  = results.data.agents
      console.log("ALL AGENTS GOTTEN BACK-->",allAgents)
    })
  
   await axios.get(`${baseUrl}/api/responses/all`)
     .then((results) => {
       const pageResponses =agentId === '66d8b0ad661d989dc6815e5a'? //djibirl cisse is the fallback here and so collects all users who have agent id as null
                             results.data.responses ? results.data.responses.filter((item)=>(null === item.agent_user_id)):[]
                             :
                         
                           results.data.responses ? results.data.responses.filter((item)=>(agentId === item.agent_user_id)):[]
                        
    
       console.log("results from ALL RESPNONSES FOR THIS AGENT IN ADMIN MODULE-->",pageResponses)
  
    let responsesFromDBArray = []
  
  
       pageResponses && pageResponses.sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt) )).forEach((item,index)=>{
  
       const matchingForm = allForms.filter((form)=>( form._id === item.form_id))
  
  
       const matchingAgent = allAgents.filter((agent)=>(agent.user_id === item.agent_user_id))
        
    
       console.log('MATCHING AGENT IS--->',matchingAgent)
       console.log('MATCHING FORM IS--->',matchingForm)
  
        return  responsesFromDBArray.push({
          ...item,
          id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
          agentName:matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName && matchingAgent[0].lastName  ?matchingAgent[0].firstName + " " + matchingAgent[0].lastName :matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName ?matchingAgent[0].firstName  :"Djibril Cisse",
          formName:matchingForm && matchingForm[0]?matchingForm[0].title:null,
          index:index
   
        })
  
    })
  
  
     if (responsesFromDBArray.length > 0) {
       dispatch(isItLoading(false));
       console.log("All RESPONSES, AFTER BEING CUSTOMIZED WITH AGENT NAME AND FORM NAME ARE--> :", responsesFromDBArray);
    
       dispatch(saveAllResponsesAdmin(responsesFromDBArray));
       dispatch(saveFilteredResponsesAdmin(responsesFromDBArray));
  
       dispatch(saveCurrentResponsesToDisplayAdmin(responsesFromDBArray/*.slice(0,10)*/));
       dispatch(saveTotalPagesResponsesAdmin(pageResponses.pages))
     } else {
         dispatch(isItLoading(false));
     dispatch(saveCurrentResponsesToDisplayAdmin(responsesFromDBArray/*.slice(0,10)*/));
         dispatch(saveTotalPagesResponsesAdmin(pageResponses.pages))
         console.log("No responses returned!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
  
  
  }



  export const updateResponse = (fields) => async (dispatch) => {
    
 

    await  axios.post(`${baseUrl}/api/responses/update-response-and-farmer`,{fields:fields}).then((results)=>{
        console.log("AXIOS REQUEST FOR UPDATING RESPONSE HAS BEGUN")
  
     if(results.data.message === "success"){
      notifySuccessFxn("Response Successfully Updated!")
     }
     else{
  
      notifyErrorFxn("Error updating Response, please try again")
  
     }
      
     }).catch((err)=>{
      console.log("Error updating response:", err);
     })
  
  }


export const updateFormFields = (id,fields) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/forms/`,{id:id,fields:fields}).then((results)=>{
      console.log("AXIOS REQUEST FOR UPDATING FORMS HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Form Successfully Updated!")
   }
   else{

    notifyErrorFxn("Error updating form, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}


export const submitNewResponse = (response) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/responses/`,{...response}).then((results)=>{
      console.log("AXIOS REQUEST FOR ADDING NEW RESPONSE HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Response Successfully Added!")
   }
   else{

    notifyErrorFxn("Error submitting response, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}



export const updateFarmerInput = (farmerObject) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/farmers/updateInput`,{...farmerObject}).then((results)=>{
      console.log("AXIOS REQUEST FOR UPDATING FARMER INPUT HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Farmer Input Successfully Added!")
   }
   else{

    notifyErrorFxn("Error updating input, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}


export const updateFarmerHarvest = (farmerObject) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/farmers/updateHarvest`,{...farmerObject}).then((results)=>{
      console.log("AXIOS REQUEST FOR UPDATING FARMER HARVEST HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Farmer Harvest Successfully Added!")
   }
   else{

    notifyErrorFxn("Error updating harvest, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}


export const updateProduceCrop = (produceObject) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/products/updateProduce`,{...produceObject}).then((results)=>{
      console.log("AXIOS REQUEST FOR UPDATING A PRODUCE/CROP HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Produce Successfully Updated!")
    dispatch(saveProductInFocus(results.data.productInfo))
    dispatch(fetchAllFarmerProduce())
   }
   else{

    notifyErrorFxn("Error updating produce, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}


export const addProduceCrop = (produceObject) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/products/addProduce`,{...produceObject}).then((results)=>{
      console.log("AXIOS REQUEST FOR ADDING A PRODUCE/CROP HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Produce Successfully Added!")
    //dispatch(saveProductInFocus(results.data.productInfo))
    dispatch(fetchAllFarmerProduce())
   }
   else{

    notifyErrorFxn("Error adding in produce, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}




export const deleteFarmerSingleInput = (farmerObject) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/farmers/deleteSingleInput`,{...farmerObject}).then((results)=>{
      console.log("AXIOS REQUEST FOR DELETING SINGLE FARMER INPUT HAS BEGUN")

   if(results.data.message === "success"){
   
    dispatch(saveFarmerInFocus(results.data.farmerInfo))
    notifySuccessFxn("Input has been deleted!")
   }
   else{

    notifyErrorFxn("Error updating input, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}


export const deleteSingleProduct = (ProductId) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/products/deleteSingleProduct`,{productId:ProductId}).then((results)=>{
      console.log("AXIOS REQUEST FOR DELETING SINGLE Product HAS BEGUN")

   if(results.data.message === "success"){
   
    //dispatch(saveAllProducts(results.data.products))

    dispatch(fetchAllFarmerProduce())
    notifySuccessFxn("Product has been deleted!")
   }
   else{

    notifyErrorFxn("Error deleting product, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}



export const updateFarmerSingleInput = (farmerObject) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/farmers/updateSingleInput`,{...farmerObject}).then((results)=>{
      console.log("AXIOS REQUEST FOR UPDATING SINGLE FARMER INPUT HAS BEGUN")

   if(results.data.message === "success"){
   
    dispatch(saveFarmerInFocus(results.data.farmerInfo))
    notifySuccessFxn("Input has been updated!")
   }
   else{

    notifyErrorFxn("Error updating input, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}



export const submitNewResponseIntake = (response,setStep1,setStep2,setStep3) => async (dispatch) => {
    
 

  await  axios.post(`${baseUrl}/api/responses/`,{...response}).then((results)=>{
      console.log("AXIOS REQUEST FOR ADDING NEW RESPONSE HAS BEGUN")

   if(results.data.message === "success"){
    notifySuccessFxn("Response Successfully Added!")
    setStep1(false)
    setStep2(false)
    setStep3(true)
   }
   else{

    notifyErrorFxn("Error submitting response, please try again")

   }
    
   }).catch((err)=>{
    console.log("Error getting document:", err);
   })

}


export const fetchAllFarmerProduce = () => async (dispatch) => {
 


  dispatch(saveAllProducts([]));
 

  let allProductsFromDB ;
  


   await  axios.get(`${baseUrl}/api/products/all`).then((results)=>{

   allProductsFromDB  = results.data
   

   if ( allProductsFromDB.length > 0) {
    dispatch(isItLoading(false));
    console.log("All PRODUCTS FROM DB ARE--> :",  allProductsFromDB);
 
    dispatch(saveAllProducts(allProductsFromDB));
    dispatch(saveCurrentProductsToDisplay(allProductsFromDB));
   
  } 

  })



}




export const fetchAllForms = () => async (dispatch) => {
 


  dispatch(saveCurrentFormsToDisplay([]));
  dispatch(saveTotalPagesForms(0))

  let allForms ;
  let allAgents;


   await  axios.get(`${baseUrl}/api/forms/all`).then((results)=>{

   allForms  = results.data.forms
   console.log("ALL FORMS GOTTEN BACK-->",allForms)
  })


   await axios.get(`${baseUrl}/api/agents/all`).then((results)=>{

    allAgents  = results.data.agents
    console.log("ALL AGENTS GOTTEN BACK-->",allAgents)
  })

 await axios.get(`${baseUrl}/api/forms/all`)
   .then((results) => {
     const pageForms = results.data
  
      console.log("results from ALLLLLLLLLL of forms-->",pageForms)

  let formsFromDBArray = []


     pageForms && pageForms.forms.forEach((item,index)=>{

     //const matchingForm = allForms.filter((form)=>( form._id === item.form_id))


     //const matchingAgent = allAgents.filter((agent)=>(agent.user_id === item.agent_user_id))
      
  
     //console.log('MATCHING AGENT IS--->',matchingAgent)
     //console.log('MATCHING FORM IS--->',matchingForm)
      formsFromDBArray.push({
        ...item,
        id:item._id?item._id:item.OriginalResponseId? item.OriginalResponseId: "8Gnbs3WPwJ7ZzzvHgORs",
        //agentName:matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName && matchingAgent[0].lastName  ?matchingAgent[0].firstName + " " + matchingAgent[0].lastName :matchingAgent && matchingAgent[0] &&matchingAgent[0].firstName ?matchingAgent[0].firstName  :"Djibril Cisse",
        //formName:matchingForm && matchingForm[0]?matchingForm[0].title:null,
        index:index
 
      })



  })


   if (formsFromDBArray.length > 0) {
     dispatch(isItLoading(false));
     console.log("All forms, AFTER BEING CUSTOMIZED WITH AGENT NAME AND FORM NAME ARE--> :", formsFromDBArray);
  
     dispatch(saveAllForms(pageForms.forms));
     dispatch(saveFilteredForms(pageForms.forms));

     dispatch(saveCurrentFormsToDisplay(pageForms.forms/*.slice(0,10)*/));
     dispatch(saveTotalPagesForms(pageForms.pages))
   } else {
       dispatch(isItLoading(false));
   dispatch(saveCurrentFormsToDisplay(pageForms.forms/*.slice(0,10)*/));
       dispatch(saveTotalPagesForms(pageForms.pages))
       console.log("No forms returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}


export const sortResponsesByDate = (order,page,allResponses,filteredResponses) => async (dispatch) => {

   let sortedFilteredResponses
   let sortedAllResponses

    let copiedFilteredResponses = [...filteredResponses]
    let copiedAllResponses = [...allResponses]

   console.log("FILTERED RESPONSES I AM GETTING  IS---->",filteredResponses)
  
   console.log("ABOUT TO SORT, ORDER IS--->",order)
   console.log("ABOUT TO SORT, ALL RESPONSES IS--->",allResponses)

   if(order === "Ascending"){

    sortedFilteredResponses = copiedFilteredResponses.sort((a,b)=>(new Date(a.createdAt) - new Date(b.createdAt)))
   sortedAllResponses = copiedAllResponses.sort((a,b)=>(new Date(a.createdAt) - new Date(b.createdAt)))
   }

   else if(order === "Descending"){

    sortedFilteredResponses = copiedFilteredResponses.sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt)))
   sortedAllResponses = copiedAllResponses.sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt)))
   }

   console.log("SORTED FILTERED RESPONSES COMPLETED IS---->",sortedFilteredResponses)


  dispatch(saveFilteredResponses(sortedFilteredResponses));
  dispatch(sectionResponsesFromPage(page,sortedAllResponses,sortedFilteredResponses))
  dispatch(saveCurrentResponsesToDisplay(sortedFilteredResponses/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/  ));
  dispatch(saveTotalPagesResponses(Math.ceil(sortedFilteredResponses.length / 10)));

}



export const filterResponsesByAgent = (agent_user_id,page,allResponses,filteredResponses,selectedForm) => async (dispatch) => {




  const selectedFormFilterRegex = selectedForm ? new RegExp(selectedForm, 'i') : null;
 

   let sortedFilteredResponses  =  [...filteredResponses] 
   let sortedAllResponses  = [...allResponses]

  //console.log("all RESPONSES BY AGENT I AM GETTING  IS---->",allResponses)
 
  console.log("BY AGENT ID I GOT IS--->",agent_user_id)
  //console.log("ABOUT TO SORT BY AGENT, ALL RESPONSES IS--->",allResponses)
if(!selectedForm){  

  // Filter agent selected first
  sortedFilteredResponses = allResponses
  .filter((item) => (
   item.agent_user_id !==  null
  ))
  .filter((item) => (
   agent_user_id  ===  item.agent_user_id
  ))
  /*.filter((item) => (
    item.formName && selectedFormFilterRegex.test(item.formName)
  ));*/


}
else{
 
   if(agent_user_id === `/.*/`){
    sortedFilteredResponses =  allResponses.filter((item) => (
      item.formName && selectedFormFilterRegex.test(item.formName)
    ));

    sortedAllResponses = allResponses
   }
   else{
  
       // Filter agent selected first
       sortedFilteredResponses = allResponses
       .filter((item) => (
        item.agent_user_id !==  null
       ))
       .filter((item) => (
        agent_user_id  ===  item.agent_user_id
       ))
      
   }

}

  console.log("SORTED FILTERED RESPONSES BY AGENT COMPLETED IS ---->",sortedFilteredResponses)

if(sortedFilteredResponses.length > 0){
 dispatch(saveFilteredResponses(sortedFilteredResponses));
 dispatch(sectionResponsesFromPage(page,allResponses,sortedFilteredResponses))
dispatch(saveCurrentResponsesToDisplay(sortedFilteredResponses/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/  ));
 dispatch(saveTotalPagesResponses(Math.ceil(sortedFilteredResponses.length / 10)));
}
else{

  dispatch(clearFilteredResponses([]));
  //dispatch(sectionResponsesFromPage(page,[],[]))
  dispatch(clearCurrentResponsesToDisplay([]) );
  dispatch(saveTotalPagesResponses(0));
}


}




export const filterResponsesByForm = (selectedForm, allResponses, filteredResponses = [], page,selectedAgent) => async (dispatch) => {
  
  dispatch(saveCurrentFormFilter(selectedForm));

  // Function to escape special characters in the filter values for safe regex usage
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create case-insensitive regular expressions for each filter criterion
  const selectedFormFilterRegex = selectedForm ? new RegExp(selectedForm, 'i') : null;
  console.log("SELECTED FORM FILTER REGEX IS---->",selectedFormFilterRegex)
 
 // const currentCropFilterRegex = new RegExp(currentCropFilter, 'i');
 // const currentCropTypeFilterRegex = new RegExp(currentCropTypeFilter, 'i');

  let responsesFilteredByForm = allResponses;

  

 /* if (selectedAgent ) {  
    // Filter agent selected first
    responsesFilteredByForm = allResponses
      .filter(item => (
        item.agent_user_id === selectedAgent    //DEAL WITH AGENTS MESSING UP THIS FILTER LATER
      ))
      .filter((item) => (
        item.formName && selectedFormFilterRegex.test(item.formName)
      ));
  } *//*else {*/
    // Filter by selectedForm and other saved filters
    responsesFilteredByForm = allResponses
     /* .filter(item => (
        item.cropType && currentCropTypeFilterRegex.test(item.cropType)
      ))
      .filter(item => (
        (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
        (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
        (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
        (item.produce && currentCropFilterRegex.test(item.produce))
      ))*/
      .filter(item => (
        item.formName && selectedFormFilterRegex.test(item.formName)
      ));
 /* }
*/
  console.log("FORM O OO-->", responsesFilteredByForm);

  if(responsesFilteredByForm.length > 0){
  dispatch(saveFilteredResponses(responsesFilteredByForm));
  dispatch(sectionResponsesFromPage(page,allResponses,responsesFilteredByForm))
  dispatch(saveCurrentResponsesToDisplay(responsesFilteredByForm/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/ ));
  dispatch(saveTotalPagesResponses(Math.ceil(responsesFilteredByForm.length / 10)));

  }
  else{

   // dispatch(saveFilteredResponses([]));
   dispatch(clearFilteredResponses([]));
    dispatch(clearCurrentResponsesToDisplay([]) );
    dispatch(saveTotalPagesResponses(0));

  }
};





export const filterFarmersByLocation = (selectedLocation, allFarmers, filteredFarmers = [], page, currentLocationFilter, currentCropFilter, currentCropTypeFilter) => async (dispatch) => {
  
  dispatch(saveCurrentLocationFilter(selectedLocation));

  // Function to escape special characters in the filter values for safe regex usage
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create case-insensitive regular expressions for each filter criterion
  const selectedLocationRegex = selectedLocation ? new RegExp(selectedLocation, 'i') : null;
  const currentCropFilterRegex = new RegExp(currentCropFilter, 'i');
  const currentCropTypeFilterRegex = new RegExp(currentCropTypeFilter, 'i');

  let farmersFilteredByLocation = allFarmers;

  if (!selectedLocation) {
    // Filter by other saved filters
    farmersFilteredByLocation = allFarmers
      .filter(item => (
        item.cropType && currentCropTypeFilterRegex.test(item.cropType)
      ))
      .filter(item => (
        (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
        (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
        (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
        (item.produce && currentCropFilterRegex.test(item.produce))
      ));
  } else {
    // Filter by selectedLocation and other saved filters

       farmersFilteredByLocation = allFarmers
         .filter(item => (
           item.cropType && currentCropTypeFilterRegex.test(item.cropType)
         ))
         .filter(item => (
           (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
           (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
           (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
           (item.produce && currentCropFilterRegex.test(item.produce))
         ))
         .filter(item => (
           item.locationName && selectedLocationRegex.test(item.locationName)
         ));
      
  
    }

  console.log("LOCATION O OO-->", farmersFilteredByLocation);

  if(farmersFilteredByLocation.length > 0){

  dispatch(saveFilteredFarmers(farmersFilteredByLocation));
  dispatch(sectionFarmersFromPage(page,allFarmers,farmersFilteredByLocation))
  dispatch(saveCurrentFarmersToDisplay(farmersFilteredByLocation/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/   ));
  dispatch(saveTotalPagesFarmers(Math.ceil(farmersFilteredByLocation.length / 10)));
  }
  else {

    dispatch(clearFilteredFarmers(farmersFilteredByLocation));
    dispatch(sectionFarmersFromPage(page,[],[]))
  dispatch(clearCurrentFarmersToDisplay(farmersFilteredByLocation/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/ ));
    dispatch(saveTotalPagesFarmers(0));
  }
};





export const filterFarmersByCropType = (selectedClass, allFarmers, filteredFarmers = [], page, currentLocationFilter, currentCropFilter, currentCropTypeFilter) => async (dispatch) => {
  
  dispatch(saveCurrentCropTypeFilter(selectedClass));

  // Function to escape special characters in the filter values for safe regex usage
  const escapeRegExp = (str) =>( str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') );
  
  // Create case-insensitive regular expressions for each filter criterion
  const selectedClassRegex = selectedClass ? new RegExp(selectedClass, 'i') : null;
  const currentCropFilterRegex = new RegExp(currentCropFilter, 'i');
  const currentLocationFilterRegex = new RegExp(currentLocationFilter, 'i');
  
  let farmersFilteredByCropType = allFarmers;

  if (!selectedClass) {
    // Filter without selectedClass
    farmersFilteredByCropType = allFarmers
      .filter(item => (
        item.locationName && currentLocationFilterRegex.test(item.locationName)
      ))
      .filter(item => (
        (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
        (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
        (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
        (item.produce && currentCropFilterRegex.test(item.produce))
      ));
  } else {
    // Filter with selectedClass
    farmersFilteredByCropType = allFarmers
      .filter(item => (
        item.cropType && selectedClassRegex.test(item.cropType)
      ))
      .filter(item => (
        (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
        (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
        (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
        (item.produce && currentCropFilterRegex.test(item.produce))
      ))
      .filter(item => (
        item.locationName && currentLocationFilterRegex.test(item.locationName)
      ));
  }

  console.log("CROP TYPE OO-->", farmersFilteredByCropType);

  dispatch(saveFilteredFarmers(farmersFilteredByCropType));
  dispatch(sectionFarmersFromPage(page,allFarmers,farmersFilteredByCropType))
dispatch(saveCurrentFarmersToDisplay(farmersFilteredByCropType/*.slice(10 * (page - 1), ((10 * (page - 1)) + 10))*/   ));
  dispatch(saveTotalPagesFarmers(Math.ceil(farmersFilteredByCropType.length / 10)));
};


export const filterFarmersByName = (nameCharacters,allFarmers) => async (dispatch) => {

//  const selectedFormFilterRegex = selectedForm ? new RegExp(/.*/ , 'i') : null;
  // const selectedSectionRegex = selectedSection ? new RegExp(selectedSection, 'i') : null;
   const currentLocationFilterRegex = new RegExp(/.*/ , 'i');
   const currentCropFilterRegex = new RegExp(/.*/ , 'i');

  let farmersFilteredByName = [...allFarmers]

farmersFilteredByName = farmersFilteredByName
 .filter((item)=>(
  item.name &&  item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(nameCharacters) || 
  item.firstName &&   item.firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(nameCharacters) ||
  item.lastName && item.lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(nameCharacters) 

  ))


  if(farmersFilteredByName.length){
    dispatch(saveFilteredFarmers(farmersFilteredByName));
   // dispatch(sectionFarmersFromPage(page,allFarmers,farmersFilteredByName))
  dispatch(saveCurrentFarmersToDisplay(farmersFilteredByName/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/  ));
    dispatch(saveTotalPagesFarmers(Math.ceil(farmersFilteredByName.length / 10)));
  }
  
    else {
  
      dispatch(clearFilteredFarmers(farmersFilteredByName));
    //  dispatch(sectionFarmersFromPage(page,[],[]))
    dispatch(clearCurrentFarmersToDisplay(farmersFilteredByName/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/ ));
      dispatch(saveTotalPagesFarmers(0));
    }

}


export const filterProductsByName = (nameCharacters,allFarmers) => async (dispatch) => {

  //  const selectedFormFilterRegex = selectedForm ? new RegExp(/.*/ , 'i') : null;
    // const selectedSectionRegex = selectedSection ? new RegExp(selectedSection, 'i') : null;
     const currentLocationFilterRegex = new RegExp(/.*/ , 'i');
     const currentCropFilterRegex = new RegExp(/.*/ , 'i');
  
    let farmersFilteredByName = [...allFarmers]
  
  farmersFilteredByName = farmersFilteredByName
   .filter((item)=>(
    item.name &&  item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(nameCharacters) || 
    item.firstName &&   item.firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(nameCharacters) ||
    item.lastName && item.lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(nameCharacters) 
  
    ))
  
  
    if(farmersFilteredByName.length){
      dispatch(saveFilteredFarmers(farmersFilteredByName));
     // dispatch(sectionFarmersFromPage(page,allFarmers,farmersFilteredByName))
    dispatch(saveCurrentProductsToDisplay(farmersFilteredByName/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/  ));
      
    }
    
      else {
    
     
      dispatch(saveCurrentProductsToDisplay([]/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/ ));
        
      }
  
  }



export const filterFarmersByAgent = (agent_user_id,allFarmers,filteredFarmers,currentLocationFilter, currentCropFilter,selectedForm) => async (dispatch) => {
             
  const selectedFormFilterRegex = selectedForm ? new RegExp(selectedForm, 'i') : null;
 // const selectedSectionRegex = selectedSection ? new RegExp(selectedSection, 'i') : null;
  const currentLocationFilterRegex = new RegExp(currentLocationFilter, 'i');
  const currentCropFilterRegex = new RegExp(currentCropFilter, 'i');
 

   let sortedFilteredFarmers  =  [...filteredFarmers] 
   let sortedAllFarmers  = [...allFarmers]

  //console.log("all Farmers BY AGENT I AM GETTING  IS---->",allFarmers)
 
  console.log("BY AGENT ID I GOT IS--->",agent_user_id)



if (!selectedForm) {
  // Filter by other saved filters
 sortedFilteredFarmers = allFarmers
    .filter(item => (
      item.locationName && currentLocationFilterRegex.test(item.locationName)
    ))
    .filter(item => (
      (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
      (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
      (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
      (item.produce && currentCropFilterRegex.test(item.produce))
    ));
} else {

  if(agent_user_id === `/.*/`){
    sortedFilteredFarmers =  allFarmers.filter((item) => (
      item.agent_user_id && selectedFormFilterRegex.test(item.agent_user_id)
    ));

    sortedAllFarmers = allFarmers
   }

else{ 
  // Filter by selectedSection and other saved filters
 sortedFilteredFarmers = allFarmers
 .filter((item) => (
  item.agent_user_id !==  null
 ))
 .filter((item) => (
  agent_user_id  ===  item.agent_user_id
 ))
 .filter(item => (
  (item.farming_crop && currentCropFilterRegex.test(item.farming_crop)) ||
  (item.crop_types && currentCropFilterRegex.test(item.crop_types)) ||
  (item.what_crop_are_you_farming && currentCropFilterRegex.test(item.what_crop_are_you_farming)) ||
  (item.produce && currentCropFilterRegex.test(item.produce))
))
    .filter(item => (
      item.locationName && currentLocationFilterRegex.test(item.locationName)
    ));

  }
}

  console.log("SORTED FILTERED Farmers BY AGENT COMPLETED IS ---->",sortedFilteredFarmers)

if(sortedFilteredFarmers.length > 0){
 dispatch(saveFilteredFarmers(sortedFilteredFarmers));
 //dispatch(sectionFarmersFromPage(page,allFarmers,sortedFilteredFarmers))
dispatch(saveCurrentFarmersToDisplay(sortedFilteredFarmers/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/  ));
 dispatch(saveTotalPagesFarmers(Math.ceil(sortedFilteredFarmers.length / 10)));
}
else{

  dispatch(clearFilteredFarmers([]));
  //dispatch(sectionFarmersFromPage(page,[],[]))
  dispatch(clearCurrentFarmersToDisplay([]) );
  dispatch(saveTotalPagesFarmers(0));
}



}




export const filterFarmersByCrop = (selectedSection, allFarmers, filteredFarmers = [], page, currentLocationFilter, currentCropFilter, currentCropTypeFilter) => async (dispatch) => {
  
  dispatch(saveCurrentCropFilter(selectedSection));
  
  const selectedSection2 = selectedSection.toLowerCase()


  // Function to escape special characters in the filter values for safe regex usage
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create case-insensitive regular expressions for each filter criterion
  const selectedSectionRegex = selectedSection2 ? new RegExp(selectedSection2, 'i') : null;
  const currentLocationFilterRegex = new RegExp(currentLocationFilter, 'i');
  const currentCropTypeFilterRegex = new RegExp(currentCropTypeFilter, 'i');

  let farmersFilteredByCrop = allFarmers;

  if (!selectedSection) {
    // Filter by other saved filters
    farmersFilteredByCrop = allFarmers
      .filter(item => (
        item.locationName && currentLocationFilterRegex.test(item.locationName)
      ))
      .filter(item => (
        item.cropType && currentCropTypeFilterRegex.test(item.cropType)
      ));
  } else {
    // Filter by selectedSection and other saved filters
    farmersFilteredByCrop = allFarmers
      .filter(item => (
        item.cropType && currentCropTypeFilterRegex.test(item.cropType)
      ))
      .filter(item => (
        (item.farming_crop && selectedSectionRegex.test(item.farming_crop)) ||
       
        (item.crop_types && selectedSectionRegex.test(item.crop_types)) ||
        (item.what_crop_are_you_farming && selectedSectionRegex.test(item.what_crop_are_you_farming)) ||
        (item.produce && selectedSectionRegex.test(item.produce))
      ))
      .filter(item => (
        item.locationName && currentLocationFilterRegex.test(item.locationName)
      ));
  }

  console.log("CROP ONLY OO----->", farmersFilteredByCrop);

if(farmersFilteredByCrop.length){
  dispatch(saveFilteredFarmers(farmersFilteredByCrop));
  dispatch(sectionFarmersFromPage(page,allFarmers,farmersFilteredByCrop))
dispatch(saveCurrentFarmersToDisplay(farmersFilteredByCrop/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/  ));
  dispatch(saveTotalPagesFarmers(Math.ceil(farmersFilteredByCrop.length / 10)));
}

  else {

    dispatch(clearFilteredFarmers(farmersFilteredByCrop));
    dispatch(sectionFarmersFromPage(page,[],[]))
  dispatch(clearCurrentFarmersToDisplay(farmersFilteredByCrop/*.slice(10 * (page - 1), (10 * (page - 1)) + 10)*/ ));
    dispatch(saveTotalPagesFarmers(0));
  }
};



export const fetchAgentsFromPage = (pageNumber,keyword,vendorName) => async (dispatch) => {
  
  dispatch(saveCurrentAgentsToDisplay([]));
  dispatch(saveTotalPagesAgents(0))



 axios.get(`${baseUrl}/api/agents/all?keyword=${keyword}&pageNumber=${pageNumber}&vendorName=${vendorName}`)
   .then((results) => {
     const pageAgents = results.data
  
      console.log("results from first page of Agents-->",pageAgents)

   if (pageAgents.agents.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", pageAgents);
     dispatch(saveCurrentAgentsToDisplay(pageAgents.agents));
     dispatch(saveTotalPagesAgents(pageAgents.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentAgentsToDisplay(pageAgents.agents));
       dispatch(saveTotalPagesAgents(pageAgents.pages))
       console.log("No Agents returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });



 


}



export const fetchFarmersFromPageForThisAgent = (agentId) => async (dispatch) => {
  
  dispatch(clearCurrentFarmersForThisAgent([]));
  dispatch(saveTotalPagesFarmersForThisAgent(0))



 axios.get(`${baseUrl}/api/farmers/oneagent?agentId=${agentId}`)
   .then((results) => {
     const pageFarmers = results.data
  
      console.log("results from first page of farmers for  thusAgents-->",pageFarmers)

   if (pageFarmers.agents.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", pageFarmers);
     dispatch(saveCurrentFarmersForThisAgent(pageFarmers.agents));
     dispatch(saveTotalPagesFarmersForThisAgent(pageFarmers.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveCurrentFarmersForThisAgent(pageFarmers.agents));
       dispatch(saveTotalPagesFarmersForThisAgent(pageFarmers.pages))
       console.log("No farmers for this agent returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });



 


}





export const createGroup = (groupData, user, file, navigate, setLoading, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("groups").add({
    groupName: groupData.groupName,
    noOfSavers: groupData.noOfSavers,
    pin: groupData.pin,
    startDate: groupData.startDate,
    amount: groupData.amount,
    status: groupData.status.toLowerCase(),
    imageUrl: url,
    admins: [user.id],
    members: [user.id],
    accountCreated: today.toLocaleDateString("en-US", options),
}).then((res)=>{
    console.log("RESPONSE ID: ", res.id);
    return db.collection('groups').doc(res.id).update({
      groupId: res.id,
    }).then(() => {
        db.collection('groups').doc(res.id).collection('membersCollection').add({
            memberName: user.name,
            memberEmail: user.email,
            memberImageUrl: user.profileImg,
            invitedBy: user.id,
            invite: 0,
            paid: 0,
            users: [user.id, user.id],
            sentAt: today.toLocaleDateString("en-US", options),
          }).then((resp) => {
            console.log("membersCollection RESPONSE: ", resp);
            setLoading(false);
            db.collection('groups').doc(res.id).collection('membersCollection').doc(resp.id).update({
              id: resp.id,
            })
          }).then(() => {
            notifySuccessFxn("Group Created")
            setLoading(false);
            navigate('/dashboard/home', { replace: true });
          }).catch((err) => {
            console.error("Error creating group: ", err);
            var errorMessage = err.message;
            notifyErrorFxn(errorMessage);
            setLoading(false);
          })
    })
  })
}


export const uploadGroupImage = (groupData, file, user, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`group_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("group_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
        });
    }
  );
}

export const fetchMyGroups = (coolers) => async (dispatch) => {
  console.log("Clicked...");
  dispatch(isItLoading(true));
  if (coolers.length) {
    const chunkSize = 10;
    const chunks = coolers.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, coolers.slice(i, i + chunkSize)]), []);
    const promises = chunks.map((chunk) => {
      return db
        .collection("groups")
        .where("groupId", "in", chunk)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    Promise.all(promises)
      .then((results) => {
        const myGroups = results.flat();
        console.log("My Groups Data:", myGroups);
        dispatch(saveMyGroup(myGroups));
        dispatch(isItLoading(false));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(isItLoading(false));
      });
  } else {
    dispatch(saveMyGroup(coolers));
    dispatch(isItLoading(false));
  }
};


// export const fetchMyGroups = (coolers) => async (dispatch) => {
//   console.log("Cilcked...")
//   dispatch(isItLoading(true));
//     if(coolers.length){
//       db.collection("groups")
//       . where('groupId', 'in', coolers)
//        .get()
//        .then((snapshot) => {
//         const myGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
//         console.log("DATA::: ", myGroups);
//         // return
//       if (myGroups.length) {
//         dispatch(isItLoading(false));
//         console.log("My Groups Data:", myGroups);
//         dispatch(saveMyGroup(myGroups));
//       } else {
//           dispatch(isItLoading(false));
//       }
//      }).catch((error) => {
//        console.log("Error getting document:", error);
//        dispatch(isItLoading(false));
//      });
//     }else{
//       dispatch(saveMyGroup(coolers));
//       dispatch(isItLoading(false));
//     }
//  };


export const fetchGroups = (adminID) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection("groups")
  .where('admin', '==', adminID)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllGroup(allGroups));
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAllGroup(allGroups));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


export const fetchPublicGroup = () => async (dispatch) => {
 dispatch(isItLoading(true));
 db.collection("groups")
  .where("status", "==", "public")
  .get()
  .then((snapshot) => {
    const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (publicGroups.length) {
    dispatch(isItLoading(false));
    console.log("Public Groups Data:", publicGroups);
    dispatch(savePublicGroup(publicGroups));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});
};

export const fetchPrivateGroup = () => async (dispatch) => {
    dispatch(isItLoading(true));
    db.collection("groups")
     .where("status", "==", "private")
     .get()
     .then((snapshot) => {
       const privateGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (privateGroups.length) {
       dispatch(isItLoading(false));
       console.log("Private Groups Data:", privateGroups);
       dispatch(savePrivateGroup(privateGroups));
     } else {
         dispatch(isItLoading(false));
         console.log("No private groups!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
   };


   export const joinGroup = (groupID, user, today, navigate, userWalletBal, groupFee, groupBal, groupName, accruedBalance) => async (dispatch) => {
    let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const date = today.toISOString();  

   
    let newUserBal = userWalletBal - groupFee;
    let newGroupBal = groupBal + groupFee;
    let newAccruedBal = accruedBalance + groupFee;
      // console.log("New Group Bal: ", newGroupBal);
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    accountBalance: newGroupBal,
    members: [...newMembers],
  }).then((res) => {
    db.collection('employees')
    .doc(user.id)
    .update({
      walletBalance: newUserBal,
      accruedBalance: newAccruedBal,
      coolers: [...user?.coolers, groupID],
    })
   .then(() => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: "",
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: user.id,
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      }).then(() => {
        return db.collection('inbox')
          .add({
              id: user.id,
              msg: `You have joined ${groupName}`,
              coolerName: groupName,
              amount: groupFee,
              isViewed: false,
              unread: 0,
              time: date,
          })
      }).then(() => {
        return db.collection('transactions')
          .add({
              userID: user.id,
              coolerID: groupID,
              type: 'Payment',
              amount: groupFee,
              date: todaysDate,
              createdAt: today.toLocaleDateString("en-US", options),
          })
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    // window.location = '/dashboard/home';
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   }) 
   })
})
 };
//    export const joinGroup = (groupID, user, today, navigate, userBal, groupFee) => async (dispatch) => {
//     dispatch(isItLoading(true));
//     let newMembers;
//     var docRef = db.collection("groups").doc(groupID);
//     docRef.get().then((doc) => {
//     const data = doc.data();
//     const members = data.members;
//     newMembers = [...members, user.id];
// }).then(() => {
//   db.collection('groups')
//   var userRef = db.collection("groups").doc(groupID);
//   userRef.update({
//     members: [...newMembers],
//   }).then((res) => {
//     db.collection('employees')
//     .doc(user.id)
//     .update({
//       coolers: [...user?.coolers, groupID],
//     })
//    .then(() => {
//     db.collection('groups').doc(groupID).collection('membersCollection').add({
//       memberName: user.firstName + " " + user.lastName,
//       memberEmail: user.email,
//       memberImageUrl: "",
//       invitedBy: user.id,
//       invite: 0,
//       paid: 1,
//       users: user.id,
//       sentAt: today,
//     }).then((resp) => {
//       console.log("membersCollection RESPONSE: ", resp);
//       db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
//         id: resp.id,
//       })
//   }).then(() => {
//     dispatch(isItLoading(false));
//     notifySuccessFxn("Joined Group")
//     navigate('/dashboard/home', { replace: true });
//     }).catch((error) => {
//     console.log("Error joining group:", error);
//     var errorMessage = error.message;
//     notifyErrorFxn(errorMessage)
//     dispatch(isItLoading(false));
//   });
//    })
      
//    })
// })
//  };


export const joinPublicGroup = (groupID, user, today, navigate) => async (dispatch) => {
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    members: [...newMembers],
  }).then((res) => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: user.imageUrl,
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: [user.id, user.id],
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   })
})
 };

 
export const joinPrivateGroup = (groupID, user, today, navigate) => async (dispatch) => {
  dispatch(isItLoading(true));
  let newMembers;
  var docRef = db.collection("groups").doc(groupID);
  docRef.get().then((doc) => {
  const data = doc.data();
  const members = data.members;
  newMembers = [...members, user.id];
}).then(() => {
db.collection('groups')
var userRef = db.collection("groups").doc(groupID);
userRef.update({
  members: [...newMembers],
}).then((res) => {
  db.collection('groups').doc(groupID).collection('membersCollection').add({
    memberName: user.firstName + " " + user.lastName,
    memberEmail: user.email,
    memberImageUrl: user.imageUrl,
    invitedBy: user.id,
    invite: 0,
    paid: 1,
    users: [user.id, user.id],
    sentAt: today,
  }).then((resp) => {
    console.log("membersCollection RESPONSE: ", resp);
    db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
      id: resp.id,
    })
}).then(() => {
  dispatch(isItLoading(false));
  notifySuccessFxn("Joined Group")
  navigate('/dashboard/home', { replace: true });
  }).catch((error) => {
  console.log("Error joining group:", error);
  var errorMessage = error.message;
  notifyErrorFxn(errorMessage)
  dispatch(isItLoading(false));
});
 })
})
};


export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

export const fetchEmployeer = (id) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    dispatch(saveEmployeer(doc.data()));
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};