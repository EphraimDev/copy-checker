import { domain } from "./Domain";
import {checkFetch} from "./Fetch";

export const createUser = async (email, password, firstname, lastname) => {
    
    const fetcher = await checkFetch(`${domain}/auth/create`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            email,
            password,
            firstname,
            lastname
        })
    });
     
    return fetcher;
}