import {docx, saveStudentData, convertToArray, compare} from './helper';
import Compare from '../../model/CompareResult';

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

    //const findComparison = Compare.findOne({students: [firstStudent, secondStudent], course, })

  
    if(!firstStudent || !secondStudent || !firstStudentID || !secondStudentID)
    return res.status(400).json({
      message: "Incomplete student data"
    })

    

  const uploadedFiles = req.files;

  if(!uploadedFiles.first || !uploadedFiles.second){
      return res.status(400).json({
          message: "Upload the assignment for both students"
      })
  }

  const filesToString = [];

  for (const key in uploadedFiles) {
      const file = uploadedFiles[key];
      const filepath = file[0].path;
      try {
        const data = await docx.extract(filepath);
        const removespecifiedchars = data.replace(/[\r\n\"]/g, '');
        const trimdata = removespecifiedchars.trim();
        filesToString.push(trimdata);
      } catch (error) {
        return res.status(400).json({
          message: 'Extract from word document failed',
        });
      }
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

  const result = new Compare();
  result.students = [firstStudentID, secondStudentID];
  result.noOfTotalSentences = compareAssignment.all;
  result.noOfSimilarSentences = compareAssignment.count;
  result.percentage = compareAssignment.percentage;
  result.sameSentence = compareAssignment.sameSentences;
  result.dateOfTest = dt;

  await result.save();

  return res.status(200).json({
    result,
    message: 'Successful'
  });
  };

  async view(req, res){
    const {compareId} = req.params;

    const findComparison = Compare.findById(compareId);

    if(!findComparison)
      return res.status(404).json({
        message: 'Failed'
      })

    return res.status(200).json({
      message: 'Successful',
      findComparison
    })  
  }
}

const compareController = new CompareController();

export default compareController;