import React, { useEffect, useMemo, useState } from 'react'
import { Col, Pagination, Row } from 'react-bootstrap'
import Articles from './Articles'
import { useAuth } from './contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import useArticleApi from './api/ArticleApi'
import LoadingIndicator from './LoadingIndicator'

export default function Feed({ type, thisProfileUsername, currentTag, handleTag, feedStatus, resetFeedStatus }) {
  const { currentUser } = useAuth()
  const [articles, setArticles] = useState({
    articles: [],
    articlesCount: 0
  })
  const [noArticle, setNoArticle] = useState(<LoadingIndicator />)

  const handleNewPage = () => {
    setArticles(preArticle => {
      return {
        articles: [],
        articlesCount: preArticle.articlesCount
      }
    })
  }

  const handleFeedStatus = (status) => {
    resetFeedStatus(status)
    setArticles({
      articles: [],
      articlesCount: 0
    })
    setOffset(0)
    setCurrentPage(1)
  }

  const [offset, setOffset] = useState(0)
  const limit = useMemo(() => 10, [])
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = Array.from({ length: Math.ceil(articles.articlesCount / limit) }, (_, i) => i + 1);

  const { getMultiArticles } = useArticleApi()
  useEffect(() => {
    setArticles({
      articles: [],
      articlesCount: 0
    })
    setOffset(0)
    setCurrentPage(1)
    setNoArticle(<LoadingIndicator />)
    try {
      (async function () {
        const res = await getMultiArticles(feedStatus, offset, limit, currentTag, thisProfileUsername)
        setArticles(res.data)
        setNoArticle('No article here... yet')
      })()
    } catch (err) {
      setNoArticle('Error')
      console.log(err);
    }
  }, [feedStatus, offset, limit, currentTag, thisProfileUsername, getMultiArticles])

  return (
    <>
      <Row className={type === 'profile' ? 'profile-status' : 'm-0 feed-status'} style={{ borderBottom: 'solid thin #aaa' }}>
        <Col xs={12} className='p-0'>
          {type === 'profile'
            ?
            <>
              <div className='d-inline-block profile-nav' onClick={() => {
                setArticles({
                  articles: [],
                  articlesCount: 0
                })
              }}>
                <NavLink end to={`/@${thisProfileUsername}`}>
                  My Article
                </NavLink>
              </div>
              <div className='d-inline-block profile-nav' onClick={() => {
                setArticles({
                  articles: [],
                  articlesCount: 0
                })
              }}>
                <NavLink end to={`/@${thisProfileUsername}/favorites`}>
                  Favorite Articles
                </NavLink>
              </div>
            </>
            :
            <>
              {currentUser &&
                <div
                  style={{ display: 'inline-block' }}
                  className={feedStatus === 'your' ? 'active' : ''}
                  onClick={() => { handleFeedStatus('your') }}>
                  Your Feed
                </div>}
              <div
                style={{ display: 'inline-block' }}
                className={feedStatus === 'global' ? 'active' : ''}
                onClick={() => { handleFeedStatus('global') }}>
                Global Feed
              </div>
              {currentTag.length > 0 &&
                <div
                  style={{ display: 'inline-block' }}
                  className='active'>
                  #{currentTag}
                </div>}
            </>}
        </Col>
      </Row>
      <Row className='py-4'>
        <Col xs={12}>
          <Row>
            {articles.articles.length > 0
              ? articles.articles.map((a, i) => {
                return <Articles key={i} article={a} handleTag={type === 'profile' ? () => { } : handleTag} />
              })
              : <>
                {noArticle}
              </>}
          </Row>
        </Col>
      </Row>
      {/* Pagination */}
      {articles.articlesCount > 0 && articles.articlesCount > limit &&
        <Row className='mb-5 pb-5'>
          <Col xs={12}>
            <nav>
              <Pagination className="m-0">
                <Pagination.Item
                  onClick={() => {
                    handleNewPage()
                    setOffset(0)
                    setCurrentPage(1)
                  }}
                  disabled={currentPage === 1}
                >
                  &lt;&lt;
                </Pagination.Item>
                <Pagination.Item
                  onClick={() => {
                    handleNewPage()
                    setOffset(preOffset => preOffset - 1)
                    setCurrentPage((oldPage) => Math.max(oldPage - 1, 1))
                  }}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Pagination.Item>
                {pageNumbers.slice(Math.max(0, currentPage - 3), currentPage + 2).map((number) => (
                  <Pagination.Item
                    key={number}
                    onClick={() => {
                      handleNewPage()
                      setOffset(number - 1)
                      setCurrentPage(number)
                    }}
                    active={currentPage === number}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                <Pagination.Item
                  onClick={() => {
                    handleNewPage()
                    setOffset(preOffset => preOffset + 1)
                    setCurrentPage((oldPage) => Math.min(oldPage + 1, articles.articlesCount))
                  }}
                  disabled={currentPage === Math.ceil(articles.articlesCount / limit)}
                >
                  &gt;
                </Pagination.Item>
                <Pagination.Item
                  onClick={() => {
                    handleNewPage()
                    setOffset(Math.floor(articles.articlesCount / limit))
                    setCurrentPage(Math.ceil(articles.articlesCount / limit))
                  }}
                  disabled={currentPage === Math.ceil(articles.articlesCount / limit)}
                >
                  &gt;&gt;
                </Pagination.Item>
              </Pagination>
            </nav>
          </Col>
        </Row>
      }
    </>
  )
}
