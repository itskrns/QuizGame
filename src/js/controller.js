import { DEFAULT_INDEX } from "./config.js";
import * as modal from "./modal.js";
import formView from "./views/formView.js";
import layoutView from "./views/layoutView.js";
import navbarView from "./views/navbarView.js";
import navigationView from "./views/navigationView.js";
import resultView from "./views/resultView.js";

const controlFormView = async function () {
  try {
    const query = formView.newPlayer();
    if (!query) throw err

    layoutView.renderSpinner();
    await modal.loadData(query);

    [navbarView, layoutView, navigationView].forEach((ele) =>
      ele.renderData(modal.quiz, DEFAULT_INDEX)
    );
  } catch (err) {
    console.log(err)
    formView.renderError()
  }
};

const controlLayoutView = function (e) {
  try {
    const { id, goto } = e.target.dataset;
    modal.quiz.questions[+goto].activeID = id;
  } catch (err) {
    layoutView.renderError(err.message)
  }
};

const controlNavigationView = function (e) {
  try {
    const { id } = e.target.dataset;
    layoutView.renderData(modal.quiz, +id)
    navigationView.update(modal.quiz, +id)
  } catch (err) {
    navigationView.renderError(err.message)
  }
};

const controlResultView = function () {
  try {
    [navbarView, layoutView, navigationView].forEach((ele) =>
      ele.parentEle.classList.toggle("hidden")
    );

    resultView.renderSpinner();
    modal.calcResult(modal.quiz.questions);
    resultView.renderData(modal.quiz, DEFAULT_INDEX);
  } catch (err) {
    resultView.renderError()
  }
};

const controlSolutionView = function () {
  try {
    modal.quiz.renderSolution = !modal.quiz.renderSolution;

    layoutView.parentEle.classList.toggle("hidden");
    navigationView.parentEle.classList.toggle("hidden");

    layoutView.renderSpinner();
    resultView.update(modal.quiz, DEFAULT_INDEX);
    [layoutView, navigationView].forEach((ele) =>
      ele.renderData(modal.quiz,  DEFAULT_INDEX)
    );
  } catch (err) {
    layoutView.renderError()
  }
};

const init = function () {
  formView.addHandler(controlFormView);
  layoutView.addHandler(controlLayoutView);
  navigationView.addNavigationHandler(controlNavigationView);
  navigationView.addResultHandler(controlResultView);
  resultView.addHandler(controlSolutionView);
};
init();
