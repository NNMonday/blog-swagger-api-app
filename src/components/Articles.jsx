import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import FavoriteBtn from './FavoriteBtn';
import AuthorInfo from './AuthorInfo';

export default function Articles({ article, handleTag = () => { } }) {
    const navigate = useNavigate()
    const [thisArticle, setArticle] = useState(article)
    const [loading, setLoading] = useState(false)
    const navigateToDetail = (slug) => {
        navigate(`/article/${slug}`)
    }

    return (
        <Col xs={12}>
            <Row className='mb-2'>
                <Col xs={12} className='d-flex justify-content-between'>
                    <AuthorInfo author={thisArticle.author} updatedAt={thisArticle.updatedAt}/>
                    <div>
                        <FavoriteBtn
                            article={thisArticle}
                            setArticle={setArticle}
                            loading={loading}
                            setLoading={setLoading}
                            shorten
                        />
                    </div>
                </Col>
            </Row>
            <Row className='title' onClick={() => navigateToDetail(thisArticle.slug)}>
                <Col xs={12}>
                    <h3 className='fs-4'>
                        {thisArticle.title}
                    </h3>
                </Col>
            </Row>
            <Row className='description' onClick={() => navigateToDetail(thisArticle.slug)}>
                <Col xs={12} className='summary'>
                    <p className='m-0'>{thisArticle.description}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{ fontSize: 'small' }} className='d-flex justify-content-between others'>
                    <div className='read-more' onClick={() => navigateToDetail(thisArticle.slug)}>
                        Read more...
                    </div>
                    <div className='d-flex'>
                        {thisArticle.tagList.length > 0 &&
                            thisArticle.tagList.map((t, i) => {
                                return (
                                    <div className='tag' key={i} onClick={() => handleTag(t)}>
                                        {t}
                                    </div>
                                )
                            })}
                    </div>
                </Col>
            </Row>
        </Col>
    )
}
