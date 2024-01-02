import React from 'react'
import { Button } from 'react-bootstrap'
import useFavoriteApi from './api/FavoriteApi'

export default function FavoriteBtn({ loading, setLoading, article, setArticle, shorten = false }) {
    const { handleFavorite: handleFavoriteApi } = useFavoriteApi()
    const handleFavorite = async () => {
        try {
            setLoading(true)
            const res = await handleFavoriteApi(article)
            setArticle(res.data.article)
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
    }
    return (
        <Button disabled={loading} size='sm' className={article.favorited ? 'favorite' : 'not-favorite'} onClick={handleFavorite}>
            <i className="fa-solid fa-heart"></i>
            <span style={{ marginLeft: '5px' }}>
                {!shorten ?
                    <>
                        Favorite Article ({article.favoritesCount})
                    </>
                    :
                    <>
                        {article.favoritesCount}
                    </>}
            </span>
        </Button>
    )
}