#!/usr/bin/env node

const yargs = require("yargs");
const excel2json = require("./../excel2json");

const options = yargs
  .usage("Usage: -i <input> -o <output> -m <mapper>")
  .option("i", {
    alias: "input",
    describe: "Input File Excel (Required .xlsx)",
    type: "string",
    demandOption: true,
  })
  .option("o", {
    alias: "output",
    describe: "Output File to JSON",
    type: "string",
    demandOption: false,
  })
  .option("m", {
    alias: "mapper",
    describe: "Mapper File in JSON",
    type: "string",
    demandOption: false,
  })
  .option("s", {
    alias: "sheet",
    describe: "Sheet Name in workbook",
    type: "string",
    demandOption: false,
  })
  .argv;

const inputFile = options.input;
const outputFile = options.output;
const mapperFile = options.mapper;
const sheetName = options.sheet;

const exported = excel2json({
  inputFile: inputFile,
  mapperFile: mapperFile,
  outputFile: outputFile,
  sheetName: sheetName,
});
