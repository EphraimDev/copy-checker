import {docx, saveStudentData, convertToArray, compare} from '../helper';
import Compare from '../../../models/CompareResult';

class CompareController {
/**
 * Register user
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
 async check(req, res) {
  const { 
    firstStudent, 
    secondStudent, 
    firstStudentID,
    secondStudentID,
    course,
    topic,
    date } = req.body;

  
    if(!firstStudent || !secondStudent || firstStudentID || secondStudentID)
    return res.status(400).json({
      message: "Incomplete student data"
    })

  const uploadedFiles = req.files;

  if(uploadedFiles.length != 2){
      return res.status(400).json({
          message: "Upload the assignment for both students"
      })
  }

  const filesToString = [];

  for (let i = 0; i < uploadedFiles.length;) {
    const file = uploadedFiles[i];
    const fileone = file.path;
    try {
      const data = await docx.extract(fileone);
      const removespecifiedchars = data.replace(/[\r\n\"]/g, '');
      const trimdata = removespecifiedchars.trim();
      filesToString.push(trimdata);
    } catch (error) {
      return res.status(400).json({
        message: 'Extract from word document failed',
      });
    }
    i += 1;
  }

  const eachStudentText = await convertToArray(filesToString);

  let dt = '';
  if (date) {
    dt = date.toDateString();
  } else {
    dt = new Date().toDateString();
  }

  await saveStudentData.storeNewAssignmentData(
    firstStudent, 
    firstStudentID, 
    course, 
    topic, 
    dt, 
    eachStudentText.first
  );

  await saveStudentData.storeNewAssignmentData(
    secondStudent,
    secondStudentID,
    course,
    topic,
    dt,
    eachStudentText.second
  );

  const compareAssignment = await compare(eachStudentText.first, eachStudentText.second);

  // const result = new Compare();
  // result.students = [userone, usertwo];
  // result.totalSentences = all;
  // result.similarSentences = count;
  // result.percentage = percentage;
  // result.dateOfTest = dt

  return res.json({
    count: compareAssignment.count,
    all: compareAssignment.all,
    percentage: compareAssignment.percentage,
    date: dt,
    first: eachStudentText.first,
    second: eachStudentText.second,
  });
};
}

const compareController = new CompareController();

export default compareController;