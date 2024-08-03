import { TIMEOUT_SEC } from "./config.js";

export const shuffleArr = function (arr) {
  let curIndex = arr.length;
  while (curIndex != 0) {
    let randomIndex = Math.floor(Math.random() * curIndex);
    curIndex--;
    [arr[curIndex], arr[randomIndex]] = [arr[randomIndex], arr[curIndex]];
  }
  return arr;
};

export const capitalize = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

export const formatTimer = function (time) {
  let { mins, secs } = time;

  if (mins > 0 && secs > 0)
    return `${mins} ${mins == "01" ? "Min" : "Mins"} : ${secs} ${
      secs == "01" ? "Sec" : "Secs"
    }`;

  if (mins == 0) return `${secs} ${secs == "01" ? "Sec" : "Secs"}`;

  if (secs == 0) return `${mins} ${mins == "01" ? "Min" : "Mins"}`;
};

import { TIMEOUT_SEC } from "./config";

export const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() =>
      reject(
        new Error(`Too long to respond! session timeout after ${sec}`),
        sec * 10
      )
    );
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = await fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
