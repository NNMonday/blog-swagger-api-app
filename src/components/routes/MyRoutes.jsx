import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../../screens/Home'
import Login from '../../screens/Login'
import Register from '../../screens/Register'
import Editor from '../../screens/Editor'
import Settings from '../../screens/Settings'
import Profile from '../../screens/Profile'
import PrivateRoute from './PrivateRoute'
import Header from '../Header'
import Footer from '../Footer'
import ArticleDetail from '../../screens/ArticleDetail'
import AuthProvider from '../contexts/AuthContext'

export default function MyRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/article/:slug' element={<ArticleDetail />} />
                    <Route path='/editor' element={
                        <PrivateRoute>
                            <Editor type='new' />
                        </PrivateRoute>
                    } />
                    <Route path='/editor/:slug' element={
                        <PrivateRoute>
                            <Editor type='edit' />
                        </PrivateRoute>
                    } />
                    <Route path='/settings' element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    } />
                    <Route path={'/:username'} element={
                        <Profile feedStatus='my' />
                    } />
                    <Route path={'/:username/favorites'} element={
                        <Profile feedStatus='favorite' />
                    } />

                </Routes>
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    )
}
