import React from "react";
import { Topic } from "./Topic/Topic";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
export const Topics = () => {
  const allTopics = useSelector((state) => state.topics);
  console.log(allTopics);
  return (
    <div>
      {allTopics.map((topic) => {
        console.log(topic);
        return <Topic key={uuidv4()} title={topic.title} />;
      })}
    </div>
  );
};
