import React, { useState, useEffect, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const loginUrl = 'http://localhost:5000/users/login'
const userUrl = 'http://localhost:5000/users/user'
const logoutUrl = 'http://localhost:5000/users/logout'

const authContext = createContext()

export function ProvideAuth({children}) {
    const auth = useProvidedAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvidedAuth() {
    const [user, updateUser] = useState(null)
    const [userID, setUserID] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['user'])

    const login = (data) => {
        return axios.post(loginUrl, data, { withCredentials: true }).then((res) => {
            updateUser(res.data.first_name)
            setCookie('Name', res.data.first_name, { path: '/', maxAge: 3600 * 24 })
            setUserID(res.data._id)
            setCookie('ID', res.data._id, { path: '/', maxAge: 3600 * 24 })
            return res.data.first_name
        }).catch((err) => console.log(err))
    }

    const logout = () => {
        axios.get(logoutUrl, { withCredentials: true }).then((res) => {
            updateUser(null)
            setUserID(null)
        })
    }

    useEffect(() => {
        axios.get(userUrl, { withCredentials: true }).then((res) => {
            updateUser(res.data.first_name)
            setUserID(res.data._id)
        })
    }, [])

    return { user, userID, login, logout }
}
