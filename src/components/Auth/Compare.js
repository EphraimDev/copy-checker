import { domain } from "./Domain";
import {checkFetch} from "./Fetch";

export const compareData = async (first, second, firstStudent, secondStudent, firstStudentID, secondStudentID) => {
    
    const fetcher = await checkFetch(`${domain}/compare/compare-submission`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            firstStudent,
            firstStudentID,
            secondStudent,
            secondStudentID
        }),
        files: {
            first,
            second
        }
    });
     
    return fetcher;
}