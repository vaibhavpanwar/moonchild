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

export {quesTypes, userTypes};
