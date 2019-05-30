import { domain } from "./Domain";
import {checkFetch} from "./Fetch";

export const compareDetails = async (compareId) => {
    
    const fetcher = await checkFetch(`${domain}/compare/view-comparison/${compareId}`, {
        method: 'GET',
        mode: 'cors',
    });
     
    return fetcher;
}