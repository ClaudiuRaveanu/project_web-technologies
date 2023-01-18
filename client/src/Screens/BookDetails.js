import React from 'react'
import { useCookies } from 'react-cookie'
import { useAuth } from './AuthContext'
import { AppBar, Card, CardMedia, Grid, Link, Paper, TextField, Tooltip, Typography, createTheme, Icon } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useLocation } from 'react-router-dom'

const BookDetails = () => {
    // eslint-disable-next-line no-unused-vars
    const auth = useAuth()
    const location = useLocation()
    const { book } = location.state
    
    const appbarStyle = { flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: 'auto', background: '#757de8' }
    const gridStyleCentered = { margin: '10px auto', direction: 'column', alignItems: 'center' }
    const paperStyle = { padding: '40px 40px', width: 900, margin: '40px auto', textAlign: 'center', flexDirection: 'column', justifyContent: 'center' }
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
                    <form noValidate>
                        <Grid container style={{ direction: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Grid width={688} style={{ direction: 'row', alignItems:'left', marginRight: 20 }}>
                                <TextField fullWidth value={book.title} label='Titlu' inputProps={{ readOnly: true }} style={{ marginBottom: 8, marginTop: 4 }}/>
                                <TextField fullWidth value={book.author} label='Autor' inputProps={{ readOnly: true }} margin='normal'/>
                                <TextField fullWidth value={book.editure} label='Editură' inputProps={{ readOnly: true }} margin='normal'/>
                                <TextField fullWidth value={book.genre.join(', ')} label='Genuri' inputProps={{ readOnly: true }} style={{ marginBottom: 4, marginTop: 16 }}/>
                            </Grid>
                            <Grid>
                                <Tooltip arrow title='Previzualizare imagine copertă'>
                                    <Card label='Imagine copertă'>
                                        <CardMedia style={{ objectFit: 'cover', height: 294, width: 191 }} component='img' image={book.cover}/>
                                    </Card>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <TextField fullWidth value={book.description} label='Descriere' inputProps={{ readOnly: true }} margin='normal' multiline rows={10}/>
                        <TextField fullWidth value={book.stock} label='Număr Exemplare' inputProps={{ readOnly: true }} margin='normal'/>
                    </form>
                </Grid>
            </Paper>

            { book.reviews.length !== 0 ?

                <Paper elevation={5} style={paperStyle} sx={{borderRadius: '15px'}}>
                    <form noValidate>
                        {
                            book.reviews.map( (bk, index) => (
                                <Grid align="right" style={{ padding: '0px 0px', width:'100%', flexDirection:'column', display:'flex', marginBottom:0 }} key={index}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        inputProps={{ readOnly: true }}
                                        label={bk.reviews[index].rv_title}
                                        defaultValue={bk.reviews[index].opinion}
                                        variant="outlined"
                                    />
                                    <Typography style={{marginTop:'15', padding:'10px 10px', marginBottom:0}}>
                                        <Icon> <AccountCircle/> </Icon>
                                        {bk.reviews[index].anonymous ? 'Anonim' : bk.reviews[index].student_name} (notă oferită: {bk.reviews[index].grade})
                                    </Typography>
                                </Grid>
                            ))
                        }
                    </form>
                </Paper>

                : null
            }
        </Grid>
    )
}

export default BookDetails