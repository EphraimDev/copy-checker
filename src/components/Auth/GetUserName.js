import { domain } from "./Domain";
import {checkFetch} from "./Fetch";

export const userProfile = async (userId) => {
    
    const fetcher = await checkFetch(`${domain}/auth/user/${userId}`, {
        mode: 'cors'
    });
     
    return fetcher;
}