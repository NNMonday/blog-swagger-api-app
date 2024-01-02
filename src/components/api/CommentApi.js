import axios from "axios";
import { useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useCommentApi() {
    const { isLogin } = useAuth()

    const getComment = useCallback(async (slug) => {
        try {
            return await axios.get(`https://api.realworld.io/api/articles/${slug}/comments`)
        } catch (err) {
            throw err;
        }
    }, [])

    const addComment = async (newComment, slug) => {
        try {
            return isLogin() && await axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, {
                comment: {
                    "body": newComment
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const deleteComment = async (slug, id) => {
        try {
            await isLogin() && axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`)
        } catch (err) {
            console.log(err);
        }
    }

    return { getComment, addComment, deleteComment }
};
