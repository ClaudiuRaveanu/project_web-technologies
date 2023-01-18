import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid, Paper, Typography, createTheme, MenuItem } from '@mui/material'
import { MuiTelInput as PhoneInput } from 'mui-tel-input'
import { indigo } from '@mui/material/colors'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import axios from 'axios'

const CreateAccountScreen = () => {
    const customTypography = createTheme({ typography: { h5: { fontWeight: 600 } } })
    const defTypes = ['Student', 'Profesor', 'Admin']
    const registerURL = 'http://localhost:5000/users/register'

    const [phoneNr, setPhone] = useState('')
    const [user, updateUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        user_type: '',
        email: '',
        id_number: '',
        phone: '',
        password: '',
        wishlist: [],
        reservations: [],
        borrowings: []
    })

    const phoneHandler = (newPhone) => {
        setPhone(newPhone)
    }

    const registerUser = () => {
        axios.post(registerURL, user, { withCredentials: true }).then((res) => {
            if (res === 'duplicate-found') {
                // TODO: handle duplicate login found
            } else {
                // TODO: handle successful registration
                console.log(user)
            }
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        updateUserData({ ...user, phone: phoneNr, username: user.first_name.toLowerCase() + '.' + user.last_name.toLowerCase() })
    }, [phoneNr, user])
    
    return(
    <Grid margin='10px auto' container direction='column' alignItems='center'>
        <Typography theme={ customTypography } style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }} variant='h5'>
            Înregistrare
        </Typography>
        <Paper elevation={5} style={{ padding: '40px 40px', width: 400, margin: '40px auto' }} sx={{ borderRadius: '15px' }}>
            <Grid container direction='column' justifyContent='space-evenly' alignItems='center'>
                <form noValidate>
                    <TextField fullWidth required label='Nume'
                        onChange={(e) => updateUserData({ ...user, last_name: e.target.value })}></TextField>
                    <TextField fullWidth margin='normal' required label='Prenume'
                        onChange={(e) => updateUserData({ ...user, first_name: e.target.value })}></TextField>
                    <TextField fullWidth margin='normal' required label='E-mail'
                        onChange={(e) => updateUserData({ ...user, email: e.target.value })}></TextField>
                    <TextField fullWidth margin='normal' required label='Număr matricol'
                        onChange={(e) => updateUserData({ ...user, id_number: e.target.value })}></TextField>
                    <PhoneInput fullWidth required margin='normal' defaultCountry='RO' preferredCountries={['RO']} value={phoneNr}
                        label='Număr de telefon' onChange={phoneHandler}></PhoneInput>
                    <TextField fullWidth required label='Tip utilizator' margin='normal' select value={user.user_type}
                        onChange={(e) => updateUserData({ ...user, user_type: e.target.value })}>
                        {defTypes.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                    <TextField fullWidth margin='normal' required type='password' label='Parolă'
                        onChange={(e) => updateUserData({ ...user, password: e.target.value })}></TextField>
                </form>
                <Button style={{ marginTop: 16, flex: 1, width: 400, borderColor: indigo[500], color: indigo[500] }} variant='outlined' endIcon={<SendRoundedIcon/>}
                    onClick={() => {
                        updateUserData({ ...user, phone: phoneNr, username: user.first_name.toLowerCase() + '.' + user.last_name.toLowerCase() })
                        registerUser()
                    }}>Creează cont</Button>
            </Grid>
        </Paper>
    </Grid>
    )
}

export default CreateAccountScreen