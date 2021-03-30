const XLSX = require("xlsx");
const fs = require("fs");

// do export for excel to json output or data json object
function _internalExport(props = {}) {
  const NAME = process.env.APP_NAME || "excel2json";
  console.log("APP NAME =>", NAME, "\n");

  // load from env
  const INPUT_FILE =
    props.inputFile || process.env.INPUT_FILE || "./data/people.xlsx";
  const OUTPUT_PATH =
    props.outputPath || process.env.OUTPUT_PATH || "./data/outputs";
  const MAPPER_FILE =
    props.mapperFile || process.env.MAPPER_FILE || "./data/mapper.json";
  const SHEET_NAME = props.sheetName || process.env.SHEET_NAME || "Sheet1";
  const ENCODING = props.encoding || process.env.ENCODING || "utf-8";

  // get mapper in string
  var mapperString = undefined;
  try {
    mapperString = fs.readFileSync(
      MAPPER_FILE,
      { encoding: ENCODING },
      (err) => {
        if (err) {
          console.error(err);
        }
        console.log("Load file suceed =>", MAPPER_FILE);
      }
    );
  } catch (err) {
    console.error("read file error", err);
  }

  // convert mapper from string to json object
  const mapperJson = mapperString ? JSON.parse(mapperString) : {};
  const configs = { ...mapperJson.configs, ...props };
  console.log(configs);
  const columsData = props.mappings || mapperJson.data || undefined;

  // read workbook from excel file
  const wb = XLSX.readFile(configs.inputFile || INPUT_FILE);
  const xlData = XLSX.utils.sheet_to_json(
    wb.Sheets[configs.sheetName || SHEET_NAME]
  );

  // mapping the data from read excel file
  const data = xlData.map((row) => {
    if (columsData == undefined || !columsData) {
      return row;
    }

    var _r = {};

    columsData.map((col) => {
      _r[col.label] = row[col.dataIndex];
    });

    return _r;
  });

  // able to save to output or not (default is true)
  if (configs.saveToOutputput) {
    // parse a new path
    const outputPath = configs.outputPath || OUTPUT_PATH;

    // check directory and create it if not exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // json data output
    const jsonStringData = JSON.stringify(data);

    try {
      // write to file
      fs.writeFileSync(
        `${outputPath}/${
          configs.outputName || "exported"
        }_${new Date().getTime()}.json`,
        jsonStringData,
        (err) => {
          if (err) throw err;
          console.log("Write succeed!");
        }
      );
    } catch (err) {}
  }

  return data;
}

/**
 * excel2json
 * Allow to export data from excel to json object or output of json.
 *
 * @returns JSON Object of result
 */
module.exports = excel2json = (props = {}) => {
  return _internalExport(props);
};
