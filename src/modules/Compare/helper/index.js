import StreamZip from 'node-stream-zip';
import { Submission } from '../../../models/Submission';


export const docx = {

  open(filePath) {
    return new Promise(((resolve, reject) => {
      const zip = new StreamZip({
        file: filePath,
        storeEntries: true,
      });

      zip.on('ready', () => {
        const chunks = [];
        let content = '';
        zip.stream('word/document.xml', (err, stream) => {
          if (err) {
            reject(err);
          }
          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          stream.on('end', () => {
            content = Buffer.concat(chunks);
            zip.close();
            resolve(content.toString());
          });
        });
      });
    }));
  },

  extract(filePath) {
    return new Promise(((resolve, reject) => {
      docx.open(filePath).then((res, err) => {
        if (err) {
          reject(err);
        }

        let body = '';
        const components = res.toString().split('<w:t');

        for (let i = 0; i < components.length; i++) {
          const tags = components[i].split('>');
          const content = tags[1].replace(/<.*$/, '');
          body += `${content} `;
        }

        resolve(body);
      });
    }));
  },

};

export const saveStudentData = {
  async checkIfDataExist(name, studentID, course, topic, date){
    const search = await Submission.findOne({
      name,
      studentID,
      course,
      topic,
      date
    });

    if(!search) return false;
    return search;
  },

  async storeNewAssignmentData(name, studentID, course, topic, date, text){
    const checkIfExist = await saveStudentData.checkIfDataExist(name, studentID, course, topic, date);
    
    if(checkIfExist === false) {
      const newSubmission = new Submission();
      newSubmission.name = name;
      newSubmission.studentID = studentID;
      newSubmission.course = course;
      newSubmission.topic = topic;
      newSubmission.date = date;
      newSubmission.text = text;

      await newSubmission.save()
    }else{
      const student = checkIfExist;

      student.text = text;

      await student.save();
    }
  }
};

export const convertToArray = (data) => {
  const one = data[0].split('.');
  const two = data[1].split('.');

  const first = [];
  const second = [];

  for (let i = 0; i < one.length;) {
    const data = one[i];
    if (data.length !== 0) {
      const val = data.trim();
      first.push(val);
    }
    i += 1;
  }

  for (let i = 0; i < two.length;) {
    const data = two[i];
    if (data.length !== 0) {
      const val = data.trim();
      second.push(val);
    }
    i += 1;
  };

  return {first, second};
}

export const compare = (first, second) => {
  let count = 0;

  for (let i = 0; i < first.length;) {
    const sentence = first[i];
    if (second.includes(sentence)) {
      count += 1;
    }
    i += 1;
  }
  const all = first.length;
  let percentage = count * 100;
  percentage /= all;
  percentage = Math.round(percentage);

  return {all, count, percentage};
}
