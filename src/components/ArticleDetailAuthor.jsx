import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FollowBtn from './FollowBtn'
import FavoriteBtn from './FavoriteBtn'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import useArticleApi from './api/ArticleApi'
import AuthorInfo from './AuthorInfo'

export default function ArticleDetailAuthor({ article, setArticle }) {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [loadingFavoriteBtn, setLoadingFavoriteBtn] = useState(false)
    const [loadingFollowBtn, setLoadingFollowBtn] = useState(false)

    const [loadingDel, setLoadingDel] = useState(false)
    const { deleteArticle } = useArticleApi()
    const handleDeleteArticle = async () => {
        try {
            setLoadingDel(true)
            await deleteArticle(article.slug)
            navigate('/')
        } catch (err) {
            console.log(err);
        }
        setLoadingDel(false)
    }
    return (
        <div className="d-flex">
            <AuthorInfo author={article.author} updatedAt={article.updatedAt} />
            <div className='d-flex align-items-center' style={{ marginLeft: '10px' }}>
                {currentUser && currentUser.username === article.author.username
                    ?
                    <>
                        <Button className='edit-btn' size='sm' style={{ marginRight: '10px' }} onClick={() => navigate(`/editor/${article.slug}`, { state: article })}>
                            <i className="fa-solid fa-pen"></i> Edit Article
                        </Button>
                        <Button className='delete-article' size='sm' onClick={handleDeleteArticle} disabled={loadingDel}>
                            <i className="fa-solid fa-trash"></i> Delete Article
                        </Button>
                    </>
                    :
                    <>
                        <FollowBtn
                            author={article.author}
                            loading={loadingFollowBtn}
                            setArticle={setArticle}
                            setLoading={setLoadingFollowBtn} />
                        <FavoriteBtn
                            article={article}
                            loading={loadingFavoriteBtn}
                            setArticle={setArticle}
                            setLoading={setLoadingFavoriteBtn} />
                    </>}
            </div>
        </div>
    )
}
