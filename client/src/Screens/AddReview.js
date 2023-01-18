import React, { useState } from 'react'
import { AppBar, Card, CardMedia, Checkbox, FormControlLabel, Grid, MenuItem, Paper, TextField, Tooltip, Typography, createTheme } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useAuth } from './AuthContext'

const AddReview = () => {
    const appbarStyle = { flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: 'auto', background: '#757de8' }
    const gridStyleCentered = { margin: '10px auto', direction: 'column', alignItems: 'center' }
    const paperStyle = { padding: '40px 40px', width: 900, margin: '40px auto', textAlign: 'center', flexDirection: 'column', justifyContent: 'center' }
    const customTypography = createTheme({ typography: { h6: { fontWeight: 600 } } })

    // eslint-disable-next-line no-unused-vars
    const [cookies, getCookie] = useCookies(['user'])
    const location = useLocation()
    // eslint-disable-next-line no-unused-vars
    const auth = useAuth()
    const book = location.state

    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [checked, setChecked] = useState(true)

    const handleCheck = (event) => {
        setChecked(event.target.checked)
        updateReview({ ...review, anonymous: event.target.checked})
    }

    const [review, updateReview] = useState({
        book_id: '',
        rv_title: '',
        opinion: '',
        grade: 1,
        anonymous: checked,
        student_name: (auth.user === undefined ? 'Anonim' : cookies.Name)
    })

    return (
        <Grid>
            <AppBar position='static' style={appbarStyle}>
                <Typography variant='h6' theme={customTypography} style={{ margin: 10 }}>Bibliotech</Typography>
            </AppBar>
            <Paper style={paperStyle} elevation={5} sx={{borderRadius: '15px'}}>
                <Grid style={gridStyleCentered}>
                    <Typography gutterBottom variant='body1' align='center' component='h2' style={{ color: '#335ebd', marginBottom: 0, marginTop: 0, fontSize: '0.97vw' }}>
                        {book.title}
                    </Typography>
                    <form noValidate>
                        <Grid container style={{ direction: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Grid width={688} style={{ direction: 'row', alignItems:'left', marginRight: 20 }}>
                                <TextField fullWidth required label='Titlu recenzie' style={{ marginBottom: 8, marginTop: 4 }}
                                onChange={(e) => updateReview({ ...review, rv_title: e.target.value })}/>
                                <TextField fullWidth required label='Notă oferită' margin='normal' select value={review.grade}
                                    onChange={(e) => updateReview({ ...review, grade: e.target.value })}>
                                    {grades.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                                <FormControlLabel label="Doresc să rămân anonim"
                                control={<Checkbox disabled={ auth.user === undefined ? true : false } checked={checked} onChange={handleCheck} color='primary'/>}
                                />
                            </Grid>
                            <Grid>
                                <Tooltip arrow title='Previzualizare imagine copertă'>
                                    <Card label='Imagine copertă'>
                                        <CardMedia style={{ objectFit: 'cover', height: 294, width: 191 }} component='img' image={book.cover}/>
                                    </Card>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default AddReview