import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");

const parseData = (parse) => {
  return (d) => {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
};

export const getData = async () => {
  try {
    const response = await fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv");
    const data = await response.text();
    const parsedData = tsvParse(data, parseData(parseDate));
    return parsedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

