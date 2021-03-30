interface Excel2JsonProps {
  mappings?: Array<any>;
  saveToOutput?: boolean;
  outputPath?: string;
  outputName?: string;
  sheetName?: string;
  inputFile?: string;
  mapperFile?: string;
  encoding?: string;
}

declare function excel2json(props: Excel2JsonProps);
