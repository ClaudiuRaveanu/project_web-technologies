import React, { useState } from 'react'
import axios from 'axios'
import { AppBar, Autocomplete, Button, Card, CardMedia, Grid, Paper, TextField, Typography, Tooltip, createTheme } from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { indigo } from '@mui/material/colors'

const AddBook = () => {
    const customTypography = createTheme({ typography: { h5: { fontWeight: 600 } } })
    const appbarStyle = { flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: 'auto', background: '#757de8' }
    const gridStyleCentered = { direction: 'column', alignItems: 'center' }
    const paperStyle = { padding: '40px 40px', width: 900, margin: '40px auto', textAlign: 'center', flexDirection: 'column', justifyContent: 'center' }

    const genres = ['Acțiune', 'Comedie', 'Psihologie', 'Istorie', 'Filozofie', 'Religie', 'Poezie, teatru, studii literare', 'Sport', 'Ficțiune',
                    'Artă, arhitectură', 'Biografii, memorii, jurnale', 'Lingvistică, dicționare', 'Enciclopedii', 'Astronomie, spațiu, timp', 'Mister', 'Thriller']

    const addBookURL = "http://localhost:5000/books/new-book"

    const [book, updateBook] = useState({
        title: '',
        author: '',
        editure: '',
        description: '',
        genre: [],
        cover: '',
        pages: 0,
        stock: 0,
        avg_grade: 0,
        reviews: []
    })

    const addBook = () => {
        axios.post(addBookURL, book, { withCredentials: true }).then(() => {
            console.log("book has been added")
            console.log(book)
        }).catch((err) => console.log(err))
    }

    return(
        <Grid>
            <AppBar position='static' style={appbarStyle}>
                <Typography variant='h6' theme={customTypography} style={{ margin: 10 }}>Bibliotech</Typography>
            </AppBar>
            <Paper style={paperStyle} elevation={5} sx={{borderRadius: '15px'}}>
                <Grid style={gridStyleCentered}>
                    <form noValidate>
                        <Grid container style={{ direction: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Grid width={688} style={{ direction: 'row', alignItems:'left', marginRight: 20 }}>
                                <TextField fullWidth required label='Titlu' onChange={(e) => updateBook({ ...book, title: e.target.value })} style={{ marginBottom: 8, marginTop: 4 }}/>
                                <TextField fullWidth required label='Autor' onChange={(e) => updateBook({ ...book, author: e.target.value })} margin='normal'/>
                                <TextField fullWidth required label='Editură' onChange={(e) => updateBook({ ...book, editure: e.target.value })} margin='normal'/>
                                <TextField fullWidth required label='Link Imagine Copertă' onChange={(e) => updateBook({ ...book, cover: e.target.value })} style={{ marginBottom: 4, marginTop: 16 }}/>
                            </Grid>
                            <Grid>
                                <Tooltip arrow title='Previzualizare imagine copertă'>
                                    <Card label='Imagine copertă'>
                                        <CardMedia style={{ objectFit: 'cover', height: 294, width: 191 }} component='img' image={book.cover || require('../images/cover_placeholder.png')}/>
                                    </Card>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <TextField fullWidth required label='Descriere' onChange={(e) => updateBook({ ...book, description: e.target.value })} margin='normal' multiline rows={6}/>
                        <Autocomplete fullWidth options={genres.sort()} onChange={(event, value) => updateBook({ ...book, genre: value })}
                            multiple renderInput={(params) => (<TextField margin='normal' { ...params } required label='Genuri' />)}/>
                        <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                            <Grid width='48.85%' marginRight={2.3}>
                                <TextField fullWidth required label='Număr Exemplare' onChange={(e) => updateBook({ ...book, stock: e.target.value })} margin='normal'/>
                            </Grid>
                            <Grid width='48.85%'>
                                <TextField fullWidth required label='Număr Pagini' onChange={(e) => updateBook({ ...book, pages: e.target.value })} margin='normal'/>
                            </Grid>
                        </Grid>
                    </form>
                    <Button fullWidth style={{ marginTop: 16, flex: 1, borderColor: indigo[500], color: indigo[500] }} variant='outlined' endIcon={<SendRoundedIcon/>}
                        onClick={() => addBook()}>Adăugă carte</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default AddBook