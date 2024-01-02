import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useCallback } from 'react'

export default function useArticleApi() {
    const { isLogin } = useAuth()
    const getArticle = useCallback(async (slug) => {
        try {
            return await axios.get(`https://api.realworld.io/api/articles/${slug}`)
        } catch (err) {
            throw err
        }
    }, [])

    const deleteArticle = async (slug) => {
        try {
            isLogin() && await axios.delete(`https://api.realworld.io/api/articles/${slug}`)
        } catch (err) {
            throw err
        }
    }

    const handleArticle = async (type, newArticle, slug = '') => {
        try {
            return isLogin() && type === 'new'
                ?
                await axios.post(`https://api.realworld.io/api/articles`, {
                    article: { ...newArticle }
                })
                :
                await axios.put(`https://api.realworld.io/api/articles/${slug}`, {
                    article: { ...newArticle }
                })
        } catch (err) {
            console.log(err);
        }
    }

    const getMultiArticles = useCallback(async (feedStatus, offset, limit, currentTag, profileUsername) => {
        try {
            var url;
            switch (feedStatus) {
                case 'your': {
                    url = `https://api.realworld.io/api/articles/feed?offset=${offset * limit}&limit=${limit}`;
                    break;
                }
                case 'global': {
                    url = `https://api.realworld.io/api/articles?offset=${offset * limit}&limit=${limit}`;
                    break;
                }
                case 'my': {
                    url = `https://api.realworld.io/api/articles?offset=${offset * limit}&limit=${limit}&author=${profileUsername}`;
                    break;
                }
                case 'favorite': {
                    url = `https://api.realworld.io/api/articles?offset=${offset * limit}&limit=${limit}&favorited=${profileUsername}`;
                    break;
                }
                default: {
                    url = `https://api.realworld.io/api/articles?offset=${offset * limit}&limit=${limit}&tag=${currentTag}`;
                    break;
                }
            }
            return axios.get(url)
        } catch (err) {
            console.log(err);
        }
    }, [])

    return { getArticle, deleteArticle, handleArticle, getMultiArticles }
}
