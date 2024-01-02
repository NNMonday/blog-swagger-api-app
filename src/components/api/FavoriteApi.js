import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function useFavoriteApi() {
    const { isLogin } = useAuth();

    const handleFavorite = async (article) => {
        try {
            return isLogin() && !article.favorited
                ? await axios.post(`https://api.realworld.io/api/articles/${article.slug}/favorite`)
                : await axios.delete(`https://api.realworld.io/api/articles/${article.slug}/favorite`);
        } catch (err) {
            throw err;
        }
    }

    return { handleFavorite }
};
