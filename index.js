// import excel2json module
const excel2json = require("./excel2json");

// called function export excel2json
const exported = excel2json({
    mappings: [
        {
            "dataIndex": "Name",
            "label": "Name"
        }
    ],
    "saveToOutput": false
});

// output data from exported
console.log("Output =>\n", exported);
