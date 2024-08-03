import * as modal from "./modal.js";
import formView from "./views/formView.js";
import layoutView from "./views/layoutView.js";
import navigationView from "./views/navigationView.js";
import resultView from "./views/resultView.js";

const controlFormView = async function () {
  try {
    const query = formView.newPlayer();
    if (!query) throw err

    layoutView.renderSpinner();
    await modal.loadData(query);

    [layoutView, navigationView].forEach((ele) =>
      ele.renderData(modal.quiz)
    );
  } catch (err) {
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
    [layoutView, navigationView].forEach((ele) =>
      ele.update(modal.quiz, +id)
    );
  } catch (err) {
    navigationView.renderError(err.message)
  }
};

const controlResultView = function () {
  try {
    [layoutView, navigationView].forEach((ele) =>
      ele.parentEle.classList.toggle("hidden")
    );

    resultView.renderSpinner();
    modal.calcResult(modal.quiz.questions);
    resultView.renderData(modal.quiz);
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
    resultView.update(modal.quiz);
    [layoutView, navigationView].forEach((ele) =>
      ele.renderData(modal.quiz)
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
