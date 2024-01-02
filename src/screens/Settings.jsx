import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useAuth } from '../components/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  document.title = 'Settings -- Conduit'
  const { currentUser, logout, updateUser } = useAuth()
  const u = { ...currentUser }
  const [image, setImage] = useState(u.image)
  const [username, setUsername] = useState(u.username)
  const [bio, setBio] = useState(u.bio || '')
  const [email, setEmail] = useState(u.email)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateUser(image, username, bio, email, password)
      navigate(`/@${username}`)
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }
  return (
    <Container className='my-5 justify-content-center p-0' style={{ width: '600px' }}>
      <Row>
        <Col xs={12}>
          <h1 className='text-center'>Your Settings</h1>
        </Col>
      </Row>
      <Row style={{ borderBottom: 'solid thin gray' }}>
        <Col xs={12} className='p-0'>
          <Form className='py-3 settings'>
            <Row>
              <Col xs={12}>
                <Form.Control
                  disabled={loading}
                  type='text'
                  value={image}
                  placeholder='URL of profile picture'
                  onChange={(e) => setImage(e.target.value)} />
                <Form.Control
                  disabled={loading}
                  type='text' value={username}
                  size='lg'
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)} />
                <Form.Control
                  disabled={loading}
                  as='textarea'
                  row={3}
                  style={{ height: '200px', marginBottom: '20px' }}
                  placeholder='Short bio about you'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)} />
                <Form.Control
                  disabled={loading}
                  type='email'
                  value={email}
                  size='lg'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)} />
                <Form.Control
                  disabled={loading}
                  type='password'
                  value={password}
                  size='lg'
                  placeholder='New Password'
                  onChange={(e) => setPassword(e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className='d-flex justify-content-end'>
                <Button disabled={loading} size='lg' type='submit' className='submit' onClick={(e) => handleSubmit(e)}>
                  Update Settings
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className='my-3' style={{ height: '100px' }}>
        <Col xs={12} className='p-0'>
          <Button disabled={loading} variant='danger' className='logout' onClick={() => {
            logout();
            navigate('/')
          }}>
            Or click here to logout
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
