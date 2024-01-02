import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useCallback } from "react";

export default function useProfileApi() {
    const { isLogin } = useAuth();

    const handleFollow = async (author) => {
        try {
            return isLogin() && author.following
                ? await axios.delete(`https://api.realworld.io/api//profiles/${author.username}/follow`)
                : await axios.post(`https://api.realworld.io/api//profiles/${author.username}/follow`);
        } catch (err) {
            throw err;
        }
    }

    const getProfile = useCallback(async (profileUsername) => {
        try {
            return await axios.get(`https://api.realworld.io/api/profiles/${profileUsername}`)
        } catch (err) {
            console.log(err);
        }
    }, [])

    return { handleFollow, getProfile }
};
