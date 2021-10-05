const userTypes = [
  {
    enum: 1,
    _id: 1,
    name: 'Job Owner',
  },
  {
    enum: 2,
    _id: 2,
    name: 'Worker',
  },
  {
    enum: 3,
    _id: 3,
    name: 'Services',
  },
  {
    enum: 4,
    _id: 4,
    name: 'Offices',
  },
];
const quesTypes = [
  {
    enum: 4,
    _id: 4,
    name: 'Boolean',
  },
  {
    enum: 2,
    _id: 2,
    name: 'Single Choice',
  },
  {
    enum: 3,
    _id: 3,
    name: 'Mutiple Choice',
  },
  {_id: 1, enum: 1, name: 'Text Input'},
];

export const maritalStatus = [
  {enum: 1, name: 'Single', _id: 1},
  {enum: 2, name: 'Married', _id: 2},
  {enum: 3, name: 'Widow', _id: 3},
  {enum: 4, name: 'Divorced', _id: 4},
];
export const workerEducation = [
  {enum: 1, name: 'Under High', _id: 1},
  {enum: 2, name: 'High School', _id: 2},
  {enum: 3, name: 'Diploma', _id: 3},
  {enum: 4, name: 'Bachelor', _id: 4},
  {enum: 5, name: 'Post Graduate', _id: 5},
];
export const workerExperience = [
  {enum: 1, name: 'No Experience', _id: 1},
  {enum: 2, name: 'Years under 2', _id: 2},
  {enum: 3, name: 'Years 2-5', _id: 3},
  {enum: 4, name: 'Years 5-10', _id: 4},
  {enum: 5, name: 'Years 10-15', _id: 5},
  {enum: 6, name: 'Years above 15', _id: 6},
];
export const religion = [
  {enum: 1, name: 'Muslim', _id: 1},
  {enum: 2, name: 'Chrisitan', _id: 2},
  {enum: 3, name: 'Hindi', _id: 3},
  {enum: 4, name: 'Athiest', _id: 4},
  {enum: 5, name: 'Jewish', _id: 5},
  {enum: 6, name: 'Other', _id: 6},
];
export const speakingLanguage = [
  {enum: 1, name: 'Arabic', _id: 1},
  {enum: 2, name: 'English', _id: 2},
  {enum: 3, name: 'Hindi', _id: 3},
  {enum: 4, name: 'Philippine', _id: 4},
  {enum: 5, name: 'French', _id: 5},
  {enum: 6, name: 'Other', _id: 6},
];

export const gender = [
  {enum: 1, name: 'Male', _id: 1},
  {enum: 2, name: 'Female', _id: 2},
];

export {quesTypes, userTypes};
