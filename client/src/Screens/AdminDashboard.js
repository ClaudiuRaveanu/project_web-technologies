import React from 'react'
import { useCookies } from 'react-cookie'
import { AppBar, Grid, Paper, Typography, createTheme } from '@mui/material'

const AdminDashboard = () => {

    const appbarStyle = { flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: 'auto', background: '#757de8' }
    // eslint-disable-next-line no-unused-vars
    const gridStyleCentered = { margin: '10px auto', direction: 'column', alignItems: 'center' }
    const paperStyle = { padding: '40px 40px', width: 400, margin: '40px auto' }
    const customTypography = createTheme({ typography: { h6: { fontWeight: 600 } } })
    // eslint-disable-next-line no-unused-vars
    const [cookies, getCookie] = useCookies(['user'])

    return(
        <Grid>
            <AppBar position='static' style={appbarStyle}>
                <Typography variant='h6' theme={customTypography}>Panou Admin</Typography>
            </AppBar>
            <Paper style={paperStyle} elevation={5} sx={{ borderRadius: '15px' }}>
                <Typography>
                    <u>Bun venit, {cookies.Name}</u>!
                </Typography>
            </Paper>
        </Grid>
    )
}

export default AdminDashboard