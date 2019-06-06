import {docx, saveStudentData, convertToArray, compare} from './helper';
import Compare from '../../model/CompareResult';
import { Submission } from '../../model/Submission';

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

  const uploadedFiles = req.files;

  // return res.json({
  //   firstStudent,
  //   first: uploadedFiles.first
  // })

  if(!firstStudent || !secondStudent || !firstStudentID || !secondStudentID || !uploadedFiles.first || !uploadedFiles.second){
      return res.status(400).json({
          message: "Incomplete data"
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

  const submitFirstStudent = await saveStudentData.storeNewAssignmentData(
    firstStudent, 
    firstStudentID, 
    course, 
    topic, 
    dt, 
    eachStudentText.first,
    req.owner
  );

  const submitSecondStudent = await saveStudentData.storeNewAssignmentData(
    secondStudent,
    secondStudentID,
    course,
    topic,
    dt,
    eachStudentText.second,
    req.owner
  );

  let firstData = [];
  let secondData = [];

  firstData.push(submitFirstStudent.name);
  firstData.push(submitFirstStudent.studentID);
  secondData.push(submitSecondStudent.name);
  secondData.push(submitSecondStudent.studentID)

  const compareAssignment = await compare(eachStudentText.first, eachStudentText.second);

  const result = new Compare();
  result.students = [submitFirstStudent._id, submitSecondStudent._id];
  result.noOfFirstPercentage = compareAssignment.firstpercentage;
  result.noOfSecondPercentage = compareAssignment.secondpercentage;
  result.sameSentence = compareAssignment.sameSentences;
  result.noOfSimilarSentences = result.sameSentence.length;
  result.dateOfTest = dt;
  result.createdBy = req.owner;
  result.totalSentences=[eachStudentText.first.length, eachStudentText.second.length]

  await result.save();

  return res.status(200).json({
    result,
    firstData,
    secondData,
    message: 'Successful'
  });
  };

  async view(req, res){
    const {compareId} = req.params;

    const findComparison = await Compare.findById(compareId);

    if(!findComparison)
      return res.status(404).json({
        message: 'Failed'
      })

    let students = [];

    for (let i = 0; i < findComparison.students.length; i++) {
      const id = findComparison.students[i];
      const studentName = await Submission.findById(id);
      students.push(studentName.name);
      students.push(studentName.studentID)
    }
    
    return res.status(200).json({
      message: 'Successful',
      findComparison,
      students
    })  
  }
}

const compareController = new CompareController();

export default compareController;