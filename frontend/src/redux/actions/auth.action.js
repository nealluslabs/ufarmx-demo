import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup, saveIsAgent, saveIsFarmer, saveIsAdmin,saveIsSuperAdmin } from '../reducers/group.slice';
import { clearPitch } from '../reducers/pitch.slice';
import baseUrl from './baseUrl';
import { fetchAllFarmers, fetchAllResponses,fetchAgentByPhone,fetchFarmerByPhone, fetchAllForms, fetchAllAdmins, fetchFarmersForOneAgent, fetchAllResponsesForOneAgent, fetchAllFarmerProduce } from './group.action';
import axios from 'axios';
import { FaLaptopHouse } from 'react-icons/fa';


export const signin = (user, navigate, setLoading) => async (dispatch) => {
 
   const farmerInfo = user
   console.log('users comms triggered!')
   axios.post(`${baseUrl}/api/users/login`,farmerInfo)
   .then((res)=>{

    console.log('res.data is-->',res.data)
      
    if(res.data && res.data.user && res.data.user.role &&  res.data.user.role.includes("SuperAdmin") ){
       dispatch(fetchAdminById(res.data.user && res.data.user._id))
      dispatch(saveIsSuperAdmin(true))
      dispatch(saveIsAdmin(false))
      dispatch(saveIsAgent(false))
      dispatch(saveIsFarmer(false))


     console.log("we have refetched all farmers")
     dispatch(fetchAllFarmers())
     dispatch(fetchAllFarmerProduce())
     dispatch(fetchAllResponses());
     dispatch(fetchAllForms());

     dispatch(fetchAllAdmins()).then(()=>{ 
     
    
    setTimeout(()=>{navigate('/dashboard/home')},3000)
  })



  }
  else if(res.data && res.data.user && res.data.user.role.includes("Admin")){
  
    dispatch(fetchAdminById(res.data.user && res.data.user._id))
    dispatch(saveIsSuperAdmin(false))
    dispatch(saveIsAdmin(true))
    dispatch(saveIsAgent(false))
    dispatch(saveIsFarmer(false))

   console.log("we have refetched all farmers")
   dispatch(fetchAllFarmers())
   dispatch(fetchAllFarmerProduce())
   dispatch(fetchAllResponses());
   dispatch(fetchAllForms());
   
   dispatch(saveIsSuperAdmin(true))
   dispatch(fetchAllFarmers()).then(()=>{  
  setTimeout(()=>{navigate('/dashboard/home-regmgr')},3000)
    })
  }
  else if(res.data && res.data.user && res.data.user.role.includes("Agent")){
    dispatch(fetchAllForms());
    dispatch(fetchAllFarmerProduce())
    //dispatch(fetchAllResponsesForOneAgent(res.data.user && res.data.user._id))
    dispatch(saveIsAgent(true))
    dispatch(saveIsSuperAdmin(false))
    dispatch(saveIsFarmer(false))
    console.log("we have acknowledged agent---->",res.data.user)

    dispatch(fetchAllResponsesForOneAgent(res.data.user && res.data.user._id)).then(()=>{
   
    dispatch(fetchFarmersForOneAgent(res.data.user && res.data.user._id)).then(()=> 
    {
    setTimeout( ()=>{dispatch(fetchAgentByPhone(user.email,navigate,setLoading))}, 3000 )
  }
   )

   })
   
  }

  else if(res.data && res.data.user && res.data.user.role.includes("Farmer")){
    
    dispatch(saveIsFarmer(true))
    dispatch(saveIsAgent(false))
    dispatch(saveIsSuperAdmin(false))
    console.log("we have acknowledged FARMER",res.data.user)

    dispatch(fetchFarmerByPhone(user.email,navigate,setLoading))
    
 }
     
 
     //dispatch(fetchUserData(user.uid, "sigin", navigate, setLoading));
 
   }).then(()=>{
    setTimeout(()=>{notifySuccessFxn("Logged In")},3000)
    ;
   })
   .catch((error) => {
    setLoading(false);
    var errorCode = error.code;
    var errorMessage = error.message;
   // notifyErrorFxn(errorMessage);
    console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
    dispatch(loginFailed(errorMessage));
  });

};


export const fetchAdminById = (id) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))


 await axios.get(`${baseUrl}/api/admins/${id}`)
   .then((results) => {

    console.log("results from ffetching admin by id--->",results)
    let userData  = {}

     userData = results.data[0]
  
      console.log("results from ffetching agent by id DATA--->",userData)

   if (userData) {
   
     console.log("Agent with this id-->:", userData);
     dispatch(storeUserData(userData));

    
   } else {
    
       dispatch(storeUserData(userData));
      
       console.log("ERROR HERE, No agents returned, by id!");
      
   }
 }).catch((error) => {
   console.log("Error getting document of agent by id:", error);
   //notifyErrorFxn("Please Check your number and try again!");
  
 });

}




export const signinAthlete = (user, navigate, setLoading) => async (dispatch) => {
   
  dispatch(clearPitch())

  fb.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('Signed In user is: ', user.email);
    //I AM COMMENTING OUT USER DATA FOR NOW, FOR UfarmX ATHLETES, LATER THERE WILL BE A COLLECTION THAT I CALL FROM - MAY 28TH 2024
     dispatch(fetchUserDataAthlete(user.uid, "sigin", navigate, setLoading));
  })
  .catch((error) => {
    setLoading(false);
    var errorCode = error.code;
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage);
    console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
    dispatch(loginFailed(errorMessage));
  });

};


export const signup = (user, navigate, setLoading) => async (dispatch) => {
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

    dispatch(clearPitch())

  fb.auth().createUserWithEmailAndPassword(
    user.email,
    user.password
).then((res)=>{
  console.log("Good to go...");
  return db.collection('users').doc(res.user.uid).set({
    adminId: res.user.uid,
    email: user.email,
    schoolName: user.sname,
    firstName: user.fname,
    lastName: user.lname,
    sport: user.sport,
    password: user.password,
    userType:"athlete",
    accountCreated: today.toLocaleDateString("en-US", options),
  })
}).then(() => {
  notifySuccessFxn('Registered Successfully✔');
  navigate('/login-athlete', { replace: true });
}).catch((err) => {
  console.error("Error signing up: ", err);
  var errorMessage = err.message;
  notifyErrorFxn(errorMessage);
  dispatch(signupFailed({ errorMessage }));
  setLoading(false);
})
}


export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
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
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const fetchUserDataAthlete = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home-athlete', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
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
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID/*, file, navigate, setLoading, url*/) => async (dispatch) => {
  // return  
  //db.collection('users').doc(userID).update({
  //  paymentLink: profileData.paymentLink,
  //  imageUrl: url,
  //}).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(()=>{
     db.collection("users").doc(userID).update({
      password:profileData?.password
     }).catch((error) => {
      // An error happened.
      console.log('COULDNT UPDATE USER PASSWORD IN THEIR RECORDS-->: ', error.message);
    })

          }).then(() => {
            //setLoading(false);
            console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            //navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            //setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        //setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        //navigate('/dashboard/home', { replace: true });
       }
     
  //}).catch((err) => {
  // // setLoading(false);
  //  console.log("ERR-: ", err);
  //})
}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    navigate('/', { replace: true });
    notifySuccessFxn("Logged out!")
    console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}