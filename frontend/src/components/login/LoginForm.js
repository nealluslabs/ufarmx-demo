import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from 'src/redux/actions/auth.action';
import { fetchAllFarmers, fetchAllResponses } from 'src/redux/actions/group.action';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const userSignin = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password };
    dispatch(signin(user, navigate, setLoading));
  }

  return (
    <>
     <form  onSubmit={userSignin}>
      <Stack spacing={3}>
        <TextField required name="email" type="text" label="Email address / Phone Number" 
        
        InputProps={{
          style:{height:"3rem",padding:"10px"},
         
        }}
        
        onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            style:{height:"3rem",padding:"10px"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        {
        <>
        <Checkbox name="remember" label="Remember me" />
        <div>
          Remember Me
        </div> 

        </>
        
        }

      </Stack>

      <LoadingButton /*onClick={(e)=>{setLoading(true);userSignin(e) }}*/ fullWidth size="large" type="submit" variant={'contained'} disabled={loading} style={{ backgroundColor: '#0A6054',color: 'white',
           border: '1px solid black',borderRadius:"0.5rem", color: 'white',fontWeight:"400"}}>
        {loading ? "Loading..." : "Login"}
      </LoadingButton>
      </form>
    </>
  );
}
