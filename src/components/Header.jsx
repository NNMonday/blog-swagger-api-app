import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function Header() {
    const { currentUser } = useAuth()
    return (
        <Container fluid className='shadow-sm' style={{ padding: '0.5% 11%' }}>
            <Row>
                <Col xs={12} className='d-flex justify-content-between p-0'>
                    <Link to={'/'} className='nav-left'>conduit</Link>
                    <div className='d-flex align-items-center nav-right'>
                        <NavLink to={'/'}>
                            Home
                        </NavLink>
                        {currentUser
                            ?
                            <>
                                <NavLink to={'/editor'}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    <span style={{ marginLeft: '3px' }}>New Article</span>
                                </NavLink>
                                <NavLink to={'/settings'}>
                                    <i className="fa-solid fa-gear"></i>
                                    <span style={{ marginLeft: '3px' }}>Settings</span>
                                </NavLink>
                                <NavLink to={`/@${currentUser.username}`} className='d-flex align-items-center'>
                                    <img src={currentUser.image} alt="" style={{ maxWidth: '30px', borderRadius: '50%', marginRight: '3px' }} />
                                    {currentUser.username}
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to={'/login'}>
                                    Sign in
                                </NavLink>
                                <NavLink to={'/register'}>
                                    Sign up
                                </NavLink>
                            </>}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
