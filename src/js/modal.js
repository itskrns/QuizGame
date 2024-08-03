import { API_URL, SCORE_PER_ANS, COUNT } from "./config";
import { shuffleArr, formatTimer, capitalize, getJSON } from "./helper";

export const quiz = {
  player: {},

  duration: {
    timeStamp: 9,
    start: {
      mins: 9,
      secs: 59,
    },
    current: {},
  },

  questions: [],

  result: {
    score: 0,
    rights: 0,
    wrongs: 0,
    attempted: 0,
  },

  renderSolution: false,
};

const createPlayer = function (query) {
  try {
    return {
      name: query.name,
      email: query.email,
      gender: query.gender,
      difficulty: capitalize(query.difficulty),
      category: query.category.split(" ").slice(1).join(" "),
    };
  } catch (err) {
    throw err;
  }
};

const createQuestions = function (data) {
  try {
    return data?.results.map((ele) => {
      ele.answers = shuffleArr([...ele.incorrect_answers, ele.correct_answer]);
      ele.answerID = ele.answers.findIndex((el) => el === ele.correct_answer);
      ele.labels = ["A", "B", "C", "D"];
      return ele;
    });
  } catch (err) {
    throw err;
  }
};

export const loadData = async function (query) {
  try {
    const category = query.category.split(" ")[0];
    const data = await getJSON(
      `${API_URL}category=${category}&difficulty=${query.difficulty}`
    );

    quiz.player = createPlayer(query);
    quiz.questions = createQuestions(data);
  } catch (err) {
    throw err;
  }
};

export const calcResult = function (data) {
  try {
    data.map((ele) => {
      if (ele.activeID) quiz.result.attempted += COUNT;

      if (ele.activeID && ele.activeID == ele.answerID) {
        quiz.result.score += SCORE_PER_ANS;
        quiz.result.rights += COUNT;
      }

      if (ele.activeID && ele.activeID != ele.answerID)
        quiz.result.wrongs += COUNT;
    });
  } catch (err) {
    throw err;
  }
};
