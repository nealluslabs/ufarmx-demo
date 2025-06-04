import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signinAthlete } from 'src/redux/actions/auth.action';

// ----------------------------------------------------------------------

export default function LoginFormAthlete() {
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
    dispatch(signinAthlete(user, navigate, setLoading));
  }

  return (
    <>
     <form onSubmit={userSignin}>
      <Stack spacing={3}>
        <TextField required name="email" type="email" label="Email address"
        
         
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" disabled={loading} style={{backgroundColor: '#D72A34', color: 'white'}}>
        {loading ? "Loading..." : "Login"}
      </LoadingButton>
      </form>
    </>
  );
}
