/**
 * Split Filepath to Path and Filename
 *
 * @param {String} filePath
 * @returns Object of JSON
 */
module.exports.splitFilepath = function splitFilepath(filePath) {
  const filename = filePath.replace(/^.*[\\\/]/, "");
  const path = filePath.replace("/" + filename, "");

  return {
    path: path == filename ? undefined : path,
    filename,
  };
}
