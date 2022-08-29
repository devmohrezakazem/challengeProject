import { Box, Stack, Grid, Button, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { Login as LoginIcon } from '@mui/icons-material';
import authState from "../recoil/atoms/authData";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useRecoilState(authState);
  const { api_key } = useRecoilValue(authState);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  const getAccountId = function (session_id) {
    axios.get(`https://api.themoviedb.org/3/account?api_key=${api_key}&session_id=${session_id}`)
      .then(function (response) {
        setAuth({
          api_key: 'bfb597de645924b6af6eed909c659eaf',
          session_id: session_id,
          account_id: response.data.id,
        });
        navigate('/list');
      });
  }


  const createSessionId = function (request_token) {
    axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${api_key}`, { request_token }).then(function (response) {
      console.log(response);
      getAccountId(response.data.session_id)
    });
  }

  const getApiKey = function () {
    axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`)
      .then(function (response) {
        window.open(`https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=http://localhost:3000/login`)
        window.close();
        console.log(response);
      });
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const search_params = new URLSearchParams(url.search);
    if (search_params.has('approved')) {
      const approved = search_params.get('approved');
      if (approved) {
        const request_token = search_params.get('request_token');
        handleToggle();
        createSessionId(request_token);
      }
    }
  }, [])

  return (
    <Box component={'section'} className={'containerFluid'} sx={{ flexGrow: 1, height: '100%' }}>
      {!open && <Grid component={'div'} container sx={{ height: '100%' }}>
        <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: '100%' }}>
          <Stack spacing={5}>
            <Box component={'div'}>
              <Button variant="contained" color="primary" onClick={() => getApiKey()}>
                {'Login To Tmdb Sample Project'}
                <LoginIcon />
              </Button>
            </Box>
            <Box>
              <Typography variant={'h6'} textAlign={'center'}>
                {'please click On Login'}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </Box>
  );
}

export default Login;