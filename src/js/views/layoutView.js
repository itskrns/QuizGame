import levelIcon from "url:../../img/levels.svg";
import categoryIcon from "url:../../img/category.svg";
import View from "./view.js";
//import timerIcon from "url:../../img/timer.svg";

class layoutView extends View {
  parentEle = document.querySelector(".layout__container");
  _msg = `Something went wrong. Try Again!`
  _question 

  addHandler(handle) {
    this.parentEle.addEventListener("click", function (e) {
      if (e.target.closest("input")) handle(e);
    });
  }

  _genMarkup() {
    this._question = this._data.questions[this._index]
    
    return `
      <div class="header ${this._data.renderSolution ? "hidden": ""}">
        <span class="header__link" id="level"><img src="${levelIcon}" alt="quiz" class="header__icons">
          <p id="quiz--level">${this._data.player.difficulty}</p>
        </span>
        <span class="header__link" id="topic"><img src="${categoryIcon}" alt="quiz" class="header__icons">
          <p id="quiz--topic">${this._data.player.category}</p>
        </span>
      </div>

      <div class="layout ${this._data.renderSolution ? "layout--border" : ""}">
        <p class="quiz__question option">Q ${this._index + 1}. ${this._data.questions[this._index].question}</p>

        <div class="section quiz__options">
          ${this._question.answers.map((answer, ind) =>  this._genOptionMarkup(answer, ind)).join(" ")}
        </div>
      </div>`;
  }

  _genOptionMarkup = function (answer, ind) {
    return `<label 
              class="option 
                ${this._data.renderSolution && this._question?.activeID == ind ? (this._question.answerID == ind ? "correct" : "incorrect") : ""} ${this._data.renderSolution && this._question.answerID == ind ? "correct" : " "}">

              <input type="radio" name="option" data-goto=${this._index} data-id=${ind} 
                ${this._question?.activeID == ind ? "checked" : ""} ${this._data.renderSolution ? "disabled" : ""}> 
              
                  ${this._question.labels[ind]}) ${answer}
          </label>`;
  };
}

export default new layoutView();
