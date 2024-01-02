import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../components/contexts/AuthContext'
import Comment from '../components/Comment'
import useArticleApi from '../components/api/ArticleApi'
import useCommentApi from '../components/api/CommentApi'
import ArticleDetailAuthor from '../components/ArticleDetailAuthor'
import LoadingIndicator from '../components/LoadingIndicator'

export default function ArticleDetail() {
    const { currentUser } = useAuth()
    const [article, setArticle] = useState(null)
    const { slug } = useParams()
    const { getArticle } = useArticleApi()
    useEffect(() => {
        (async function () {
            try {
                const res = await getArticle(slug)
                setArticle(res.data.article)
                document.title = res.data.article.title
            } catch (err) {
                console.log(err);
            }
        })()
    }, [slug, getArticle])


    const [commentsList, setCommentsList] = useState([])
    const { getComment } = useCommentApi()
    useEffect(() => {
        (async function () {
            try {
                const res = await getComment(slug)
                setCommentsList(res.data.comments)
            } catch (err) {
                console.log(err);
            }
        })()
    }, [slug, getComment])

    return article ?
        <div style={{ marginBottom: '100px' }}>
            <Row>
                <Col xs={12} style={{ backgroundColor: '#333', padding: '2rem 0' }}>
                    <Container className='m-0' style={{ padding: '0 11%' }}>
                        <h1 className='text-white mb-3' style={{ fontSize: '40px' }}>{article.title}</h1>
                        <ArticleDetailAuthor
                            article={article}
                            setArticle={setArticle} />
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{ padding: '40px 11% 0 11%', fontSize: 'large' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8rem', margin: '0' }}>
                        {article.body}
                    </p>
                </Col>
            </Row >
            <Row>
                <Col xs={12} style={{ padding: '0 11%' }}>
                    <div className='d-flex py-5' style={{ borderBottom: 'solid thin #aaa' }}>
                        {article.tagList.map((t, i) => {
                            return (
                                <div className='tag' key={i} style={{ color: '#aaa' }}>
                                    {t}
                                </div>
                            )
                        })}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className='d-flex flex-column align-items-center pt-4'>
                    <ArticleDetailAuthor
                        article={article}
                        setArticle={setArticle} />
                    {
                        currentUser ?
                            <>
                                <Comment type='add' slug={slug} setCommentsList={setCommentsList} />
                                {
                                    commentsList.map(c => {
                                        return (
                                            <Comment type='comment' comment={c} key={c.id} setCommentsList={setCommentsList} />
                                        )
                                    })
                                }
                            </>
                            :
                            <div className='mt-4'>
                                <Link className='to-add-comment' to={'/login'}>Sign in</Link> or <Link className='to-add-comment' to={'/register'}>sign up</Link> to add comment on this article
                            </div>
                    }
                </Col>
            </Row>
        </div>
        :
        <LoadingIndicator />
}
