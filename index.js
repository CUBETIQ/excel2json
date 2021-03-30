// import excel2json module
const excel2json = require("./excel2json");

// called function export excel2json
const exported = excel2json({
    inputFile: "./data/people.xlsx"
});

// output data from exported
console.log("Output =>\n", exported);
