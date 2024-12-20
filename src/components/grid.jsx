import React from "react";
import NewsCard from "./home/news-card";
import GridLayout from "./home/grid-layout";
import { v4 } from "uuid";

const Grid = ({ data }) => {
  // console.log(data);
  return (
    <GridLayout>
      {data.map((datum) => (
        <NewsCard key={v4()} datum={datum} />
      ))}
    </GridLayout>
  );
};

export default Grid;
