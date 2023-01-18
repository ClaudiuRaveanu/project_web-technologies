import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button, createTheme } from '@mui/material'
import { useAuth } from './AuthContext'

const Login = () => {
    const customTypography = createTheme({ typography: { h5: { fontWeight: 600 } } })
    
    const [user, updateUserData] = useState({
        email: '',
        password: ''
    })

    const auth = useAuth()
    const navigate = useNavigate()

    const loginUser = () => {
        auth.login(user)
    }

    return(
        <Grid>
            <Typography theme={ customTypography } style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }} variant='h5'>
                Intră în cont
            </Typography>
            <Paper elevation={5} style={{ padding: '40px 40px', width: 400, margin: '40px auto' }} sx={{ borderRadius: '15px' }}>
                <Grid container direction='column' justifyContent='space-evenly' alignItems='center'>
                    <form noValidate>
                        <TextField fullWidth required label='E-mail'
                            onChange={(e) => updateUserData({ ...user, email: e.target.value })}></TextField>
                        <TextField fullWidth required label='Parolă' margin='normal' type='password'
                            onChange={(e) => updateUserData({ ...user, password: e.target.value })}></TextField>
                    </form>
                    <Button style={{ marginTop: 16, flex: 1, width: 400 }} variant='outlined'
                        onClick={() => {console.log(user); loginUser(); setTimeout(() => navigate('/'), 2000)}}>Conectare</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login