import axios from "axios";
import { useCallback } from "react";

export default function useTagApi() {

    const getTag = useCallback(async () => {
        try {
            return await axios.get('https://api.realworld.io/api/tags')
        } catch (err) {
            throw err;
        }
    }, [])

    return { getTag }
};
