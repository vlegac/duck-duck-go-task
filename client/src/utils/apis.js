import axios from "axios";

export const getHistoryData = async () => {
  const data = await axios
    .get(`http://localhost:8000/history`)
    .then((res) => res.data);
  return data;
};
export const getTopicsData = async (term) => {
  const data = await axios
    .get(`http://localhost:8000/duck/${term}`)
    .then((res) => res.data);
  return data;
};
