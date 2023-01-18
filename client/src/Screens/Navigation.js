import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import ViewBooks from './ViewBooks'
import BookDetails from './BookDetails'
import AddBook from './AddBook'
import AdminDashboard from './AdminDashboard'
import CreateAccountScreen from './CreateAccount'
import Login from './Login'
import NotFound from './NotFound'
import UserDashboard from './UserDashboard'
import axios from 'axios'
import { useCookies } from 'react-cookie'

// eslint-disable-next-line no-unused-vars
const PrivateRoute = () => {
    const cookies = useCookies(['user'])

    return cookies.Name === undefined ? <Navigate to='/login'/> : <Outlet/>
}

// eslint-disable-next-line no-unused-vars
const AdminRoute = () => {
    const cookies = useCookies(['user'])
    const userURL = 'http://localhost:5000/users/currentUser'
    let isAdmin = false

    if (cookies.Name !== undefined)
        axios.get(userURL, { withCredentials: true })
            .then((res) => { if (res.data.user_type === 'Admin') isAdmin = true })
            .catch((err) => console.log(err))

    return isAdmin ? <Navigate to='/not-found'/> : <Outlet/>
}

const Navigation = (props) => {
    // eslint-disable-next-line no-unused-vars
    const auth = useAuth()

    return(
        <Router>
            <Routes>
                <Route exact path='/not-found' element={<NotFound/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/register' element={<CreateAccountScreen/>}/>
                <Route exact path='/' element={<UserDashboard/>}/>
                <Route exact path='/books' element={<ViewBooks/>}/>
                <Route exact path='/book' element={<BookDetails/>}/>
                <Route exact path='/add-book' element={<AddBook/>}/>
                <Route exact path='/admin' element={<AdminDashboard/>}/>
            </Routes>
        </Router>
    )
}

export default Navigation