import maleIcon from "url:../../img/male.svg";
import femaleIcon from "url:../../img/female.svg";
import scoreIcon from "url:../../img/score.svg";
import attemptedIcon from "url:../../img/attempted.svg";
import timeIcon from "url:../../img/time.svg";
import rightIcon from "url:../../img/right.svg";
import wrongIcon from "url:../../img/wrong.svg";
import View from "./view.js";

class resultView extends View{
  parentEle = document.querySelector(".app");
  _msg = `Something went wrong. Try again after sometime!`
  _player
  _duration
  _result
  _renderSolution

  addHandler(handle) {
    this.parentEle.addEventListener("click", function (e) {
      if (e.target.closest(".btn--solution")) handle(e);
    });
  }

  _genMarkup() {
    this._player = this._data.player
    this._duration = this._data.duration
    this._result = this._data.result
    this._renderSolution = this._data.renderSolution

    return `
      <div class="result">
        <div class="result__tab player__info">
          <img src="${
            this._player.gender === "M" ? maleIcon : femaleIcon
          }" alt="player" id="player__icon">
          <h2>${this._player.name}</h2>
          <p>Email: ${this._player.email}</p>
          <p>Topic: ${this._player.category}</p>
          <p>Level: ${this._player.difficulty}</p>
          <button class="btn btn--solution">${this._renderSolution ? 'Hide' : 'View'} Solution</button>
        </div>
        
        <div class="result__tab quiz__report">
          <span class="result__score">
            <img src="${scoreIcon}" alt="quiz" id="score__icon">
            <p id="score">Score: ${this._result.score}</p>
          </span>

          <ul class="extras">
            <li class="result__link"><img src="${attemptedIcon}" alt="quiz" class="result__icons">
              <p id="attempted">Question Attempted: ${
                this._result.attempted
              }</p>
            </li>
            <li class="result__link"><img src="${timeIcon}" alt="quiz" class="result__icons">
              <p id="time">Time Taken: ${this._duration.timeStamp}</p>
            </li>
            <li class="result__link"><img src="${rightIcon}" alt="quiz" class="result__icons">
              <p id="right">Right Answers: ${this._result.rights}</p>
            </li>
            <li class="result__link"><img src="${wrongIcon}" alt="quiz" class="result__icons">
              <p id="wrong">Wrong Answers: ${this._result.wrongs}</p>
            </li>
          </ul>
        </div>
      </div>`;
  }
}

export default new resultView();
