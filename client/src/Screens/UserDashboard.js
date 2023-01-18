import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useAuth } from './AuthContext'
import { AppBar, Button, Grid, Link, Paper, Typography, createTheme } from '@mui/material'

const UserDashboard = () => {
    const auth = useAuth()

    const appbarStyle = { flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: 'auto', background: '#757de8', marginBottom: 0 }
    const gridStyleCentered = { margin: '10px auto', direction: 'column', alignItems: 'center' }
    const paperStyle = { padding: '40px 40px', width: 400, margin: '40px auto', textAlign: 'center', flexDirection: 'column', justifyContent: 'center' }
    const customTypography = createTheme({ typography: { h5: { fontWeight: 600 } } })
    // eslint-disable-next-line no-unused-vars
    const [cookies, getCookie] = useCookies(['user'])

    return(
        <Grid>
            <AppBar position='static' style={appbarStyle}>
                <Paper elevation={0} style={{ margin: '8px auto', textAlign: 'center', background: 'transparent', display: 'flex' }}>
                <Link style={{ fontSize: '25px', color: '#FFFFFF', marginRight: 70, marginTop: 4 }} underline='none' href='/books'>Cărți</Link>
                <Typography variant='h5' theme={customTypography} style={{ margin: 6 }}>Bibliotech</Typography>
                </Paper>
            </AppBar>
            <Paper style={paperStyle} elevation={5} sx={{borderRadius: '15px'}}>
                <Grid style={gridStyleCentered}>
                {
                    auth.user !== undefined ?
                    <Typography>
                        <u>Bun venit, {cookies.Name}</u>!
                    </Typography> :
                    <Link style={{ fontSize: '25px' }} href='/login' underline='always'>
                        Conectează-te la cont.
                    </Link>
                }
                </Grid>
            </Paper>
        </Grid>
    )
}

export default UserDashboard