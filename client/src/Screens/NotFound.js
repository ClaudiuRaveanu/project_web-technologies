import React from 'react'
import { Grid, Typography, createTheme } from '@mui/material'

const NotFound = () => {
    const customTypography = createTheme({ typography: { h6: { fontWeight: 600 } } })

    return(
        <Grid margin='10px auto' container direction='column' alignItems='center'>
            <Typography theme={customTypography} variant='h6'>
                Nu am putut găsi pagina pe care o cauți.
            </Typography>
        </Grid>
    )
}

export default NotFound