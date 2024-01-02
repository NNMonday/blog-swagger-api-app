import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/contexts/AuthContext'

export default function Login() {
  document.title = 'Sign in -- Conduit'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setErrors(Object.entries(err.response.data.errors))
    }

    setLoading(false);
  }

  return (
    <Container className='text-center p-5 d-flex justify-content-center align-items-center'>
      <Row style={{ maxWidth: '500px' }}>
        <Col xs={12}>
          <h1>Sign in</h1>
        </Col>
        <Col xs={12}>
          <Link to={'/register'} style={{ color: '#5CB85C' }} className='text-decoration-none'>
            Need an account?
          </Link>
        </Col>
        {errors.length > 0 &&
          <Col xs={12}>
            <ul style={{ textAlign: 'left', color: '#B85C5C', fontWeight: 'bold', margin: '0' }}>
              {errors.map((e, i) => {
                return (
                  <li key={i}>{e[0]} {e[1]}</li>
                )
              })}
            </ul>
          </Col>}
        <Col xs={12}>
          <Form className='py-3'>
            <Form.Group controlId='email'>
              <Form.Control
                type='email'
                placeholder='Email'
                size='lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
              <Form.Control
                type='password'
                placeholder='Password'
                size='lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} className='d-flex justify-content-end'>
          <Button type='submit' className='submit' size='lg' onClick={(e) => handleSubmit(e)} disabled={loading}>
            Sign in
          </Button>
        </Col>
      </Row>

    </Container>
  )
}
