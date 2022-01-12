// require csvtojson
var csv = require("csvtojson");
const path = require("path");

// the method to convert csv to json using the package 'csvtojson'
export const convertcsvToJson = async (filePath) => {
  const pathToBeUsed = path.join(__dirname, filePath);
  const jsonArray = await csv().fromFile(pathToBeUsed);
  return jsonArray;
};