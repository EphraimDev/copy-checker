import docx from '../helper'
import Compare from '../../../models/CompareResult';


/**
 * Register user
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.check = async (req, res) => {
    const {userone, usertwo, date} = req.body;

    const uploadedFiles = req.files;

    let filesToString = [];


    for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const fileone = file.path;
        try {
            //const o = new docx();
            const data = await docx.extract(fileone);
            let trimdata = data.replace(/[\r\n\"]/g,'');
            let removeemptyspace = trimdata.trim();
            filesToString.push(removeemptyspace)
        } catch (error) {
            return res.status(400).json({
                message: "Extract from word document failed"
            })
        }
    }


    let one = filesToString[0].split('.');
    let two = filesToString[1].split('.');

    let first = [];
    let second = [];

    for (let i = 0; i < one.length; i++) {
        let data = one[i];
        if(data.length != 0){
            const val = data.trim();
            first.push(val)
        }
    }

    for (let i = 0; i < two.length; i++) {
        let data = two[i];
        if(data.length != 0){
            const val = data.trim();
            second.push(val)
        }
    }

    let count = 0;

    for (let i = 0; i < first.length; i++) {
        const sentence = first[i];
        if(second.includes(sentence)){
            count += 1;
        }
    }
    let all = first.length;
    let percentage = count * 100;
    percentage = percentage/all;
    percentage = Math.round(percentage);

    let dt = "";
    if(date){
        dt = date.toDateString();
    }else{
        dt = new Date().toDateString();
    }

    // const result = new Compare();
    // result.students = [userone, usertwo];
    // result.totalSentences = all;
    // result.similarSentences = count;
    // result.percentage = percentage;
    // result.dateOfTest = dt

    return res.json({
        count,
        all,
        percentage,
        dt
    })
}

