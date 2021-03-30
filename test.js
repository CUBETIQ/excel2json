const excel2json = require("./index");
const result = excel2json({
  inputFile: "./data/source.xlsx",
});
console.log(result);
