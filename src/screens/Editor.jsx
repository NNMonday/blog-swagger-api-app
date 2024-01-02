import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/contexts/AuthContext'
import useArticleApi from '../components/api/ArticleApi'

export default function Editor({ type }) {
  const article = useLocation().state
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  if (article && article.author.username !== currentUser.username) {
    navigate('/')
  }

  document.title = 'Editor -- Conduit'
  const [title, setTitle] = useState(article ? article.title : '')
  const [description, setDescription] = useState(article ? article.description : '')
  const [body, setBody] = useState(article ? article.body : '')
  const [currentTag, setCurrentTag] = useState('')
  const [tagList, setTagList] = useState(article ? article.tagList : [])
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleTagList = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '' && !tagList.includes(e.target.value)) {
      setTagList(preList => [...preList, e.target.value])
      setCurrentTag('')
    }
  }

  const { handleArticle: handleArticleApi } = useArticleApi()
  const handleArticle = async (e) => {
    e.preventDefault()
    setErrors([])
    try {
      setLoading(true)
      const newArticle = {
        title,
        description,
        body,
        tagList
      }
      const res = await (handleArticleApi(type, newArticle, article && article.slug))
      navigate(`/article/${res.data.article.slug}`)
    } catch (err) {
      setErrors(Object.entries(err.response.data.errors))
    }
    setLoading(false)
  }
  return (
    <Row className='my-5'>
      <Col xs={12} className='d-flex justify-content-center mw-100'>
        <Form className='p-3' style={{ width: '70%', minWidth: '700px' }}>
          {errors.length > 0 &&
            <ul style={{ textAlign: 'left', color: '#B85C5C', fontWeight: 'bold', margin: '0' }}>
              {errors.map((e, i) => {
                return (
                  <li key={i}>{e[0]} {e[1]}</li>
                )
              })}
            </ul>}
          <Form.Group controlId='title'>
            <Form.Label></Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Article Title" size='lg' />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label></Form.Label>
            <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="What's this article about?" />
          </Form.Group>
          <Form.Group controlId='body'>
            <Form.Label></Form.Label>
            <Form.Control value={body} onChange={(e) => setBody(e.target.value)} as={'textarea'} rows={8} placeholder="Write your article (in markdown)" />
          </Form.Group>
          <Form.Group controlId='tagList'>
            <Form.Label></Form.Label>
            <Form.Control value={currentTag} onChange={e => setCurrentTag(e.target.value)} onKeyDown={(e) => handleTagList(e)} type='text' placeholder="Enter tags" />
          </Form.Group>
          <div className='tags-container mt-2'>
            {tagList.map((t, i) => {
              return (
                <div key={i} className='tag-item'>
                  <i className="fa-solid fa-x"
                    onClick={() => { setTagList(preList => preList.filter(thisTag => thisTag !== t)) }}></i>
                  <span style={{ marginLeft: '5px' }}>{t}</span>
                </div>
              )
            })}
          </div>
          <div className='mt-3'>
            <Button disabled={loading} size='lg' className='publish' onClick={e => handleArticle(e)}>
              Publish Article
            </Button>
          </div>
        </Form>
      </Col>
    </Row >
  )
}
