import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useAuth } from './AuthContext'
import { AppBar, Button, Card, CardActions, CardActionArea, CardMedia, CardContent, Grid, Paper, Typography, Tooltip, createTheme } from '@mui/material'

const ViewBooks = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const numberURL = "http://localhost:5000/books/total"
    const booksURL = "http://localhost:5000/books"
    const usersURL = "http://localhost:5000/users"

    const appbarStyle = { flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: 'auto', background: '#757de8' }
    const gridStyle = { margin: 'auto', width: '90%' }
    const paperStyle = { padding: '20px 20px', width: '60%', margin: '40px auto', textAlign: 'center', flexDirection: 'row', justifyContent: 'center' }
    const customTypography = createTheme({ typography: { h5: { fontWeight: 600 } } })
    // eslint-disable-next-line no-unused-vars
    const [cookies, getCookie] = useCookies(['user'])
    const [bookNr, setNumber] = useState(0)
    const [data, updateData] = useState([])
    const [userData, updateUserData] = useState([])

    var clicks = useState([])

    useEffect(() => {
        axios.get(numberURL, { withCredentials: true }).then((res) => {
            setNumber(res.data)
        }).catch((err) => console.log(err))
    })

    useEffect(() => {
        axios.get(booksURL, { withCredentials: true }).then((res) => {
            updateData(res.data)
        }).catch((err) => console.log(err))
    })

    useEffect(() => {
        axios.get(usersURL + '/currentUser', { withCredentials: true }).then((res) => {
            updateUserData(res.data)
        }).catch((err) => console.log(err))
    })

    for (var i = 0; i < bookNr; i++) clicks.push({ clicked: 0 })

    const checkClick = (book, index) => {
        if (auth.user === null || auth.user === undefined)
            setTimeout(() => navigate('/login'), 0)
        else if (!clicks[index].clicked) {
            clicks[index].clicked = 1
            userData.wishlist.push({ book_id: book })
            data[index - 2].stock -= 1
            axios.patch(booksURL + '/update/' + book, data[index - 2], { withCredentials: true }).then((res) => {}).catch((err) => console.log(err))
            axios.patch(usersURL + '/update/' + userData._id, userData, { withCredentials: true }).then((res) => {}).catch((err) => console.log(err))
        }
    }

    return(
        <Grid container>
            <Grid container direction="row" justifyContent="space-evenly">
                <AppBar position='static' style={appbarStyle}>
                    <Paper elevation={0} style={{ margin: '8px auto', textAlign: 'center', background: 'transparent', display: 'flex' }}>
                        <Link style={{ fontSize: '25px', color: '#FFFFFF', marginRight: 70, marginTop: 4 }} underline='none' to='/'>Acasă</Link>
                        <Typography variant='h5' theme={customTypography} style={{ margin: 6 }}>Bibliotech</Typography>
                    </Paper>
                </AppBar>
            </Grid>

            <Paper style={paperStyle} elevation={5} sx={{borderRadius: '15px'}}>
                <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start" style={gridStyle} spacing={3}>
                {
                    data.map((book, index) => (
                        <Tooltip title={book.title}>
                        <Grid item key={index} xs={4}>
                            <Card style={{ margin: 'auto', width: '75%', marginBottom: '26px' }}>
                                <Link to='/book' state={{ book }} style={{ justifyContent: 'center', fullWidth: true }} color='primary'>
                                    <CardActionArea style={{ minWidth: '75%', maxWidth: '100%' }}>
                                        <CardMedia style={{ height: 0, paddingTop: '150%', objectFit: 'cover' }} image={book.cover} title={book.title}/>
                                        <CardContent>
                                            <Typography noWrap gutterBottom variant='body1' align='center' component='h2' style={{ color: '#335ebd', marginBottom: 0, marginTop: 0, fontSize: '0.97vw' }}>
                                                <u>{book.title}</u>
                                            </Typography>
                                            <Typography noWrap variant='body2' color='textPrimary' component='p' styles={{ height: '5vw', fontSize: '1.1vw' }}>
                                                {book.author}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>

                                <CardActions style={{ justifyContent: 'center', fullWidth: true }}>
                                    <Button style={{ fontSize: '0.67vw', marginTop: '-10px' }} aria-label='wishlist'
                                            color={auth.user === undefined ? 'secondary' : 'primary'} variant='outlined'
                                            disabled={book.stock === 0 ? true : ((clicks !== undefined && clicks[index + 2].clicked === 1) ? true : false)}
                                            onClick={() => {checkClick(book.title, index + 2)}}>
                                        {book.stock === 0 ? 'stoc insuficient' : 'adaugă în wishlist'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        </Tooltip>
                    ))
                }
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ViewBooks