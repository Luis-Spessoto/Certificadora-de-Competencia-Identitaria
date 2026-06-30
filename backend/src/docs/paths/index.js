const alunoPaths = require("./features/alunoPaths");
const professorPaths = require("./features/professorPaths");
const tutorPaths = require("./features/tutorPaths");
const temaPaths = require("./features/temaPaths");
const oficinaPaths = require("./features/oficinaPaths");
const turmaPaths = require("./features/turmaPaths");
const authPaths = require("./features/authPaths");

module.exports = {
  ...alunoPaths,
  ...professorPaths,
  ...tutorPaths,
  ...temaPaths,
  ...oficinaPaths,
  ...turmaPaths,
  ...authPaths
};
