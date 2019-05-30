import { domain } from "./Domain";
import {checkFetch} from "./Fetch";
import token from "./GetToken";

export const verifyToken = async () => {
    
    const fetcher = await checkFetch(`${domain}/auth/verify-token`, {
        headers: token,
        mode: 'cors'
    });
     
    return fetcher;
}