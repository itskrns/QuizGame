import View from "./view";

class navigationView extends View {
  parentEle = document.querySelector(".navigation__container");

  addNavigationHandler(handle) {
    this.parentEle.addEventListener("click", function (e) {
      if (e.target.classList.contains("navigate")) handle(e);
    });
  }

  addResultHandler(handle) {
    this.parentEle.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn--submit")) handle();
    });
  }

  _genMarkup() {
    return `
      <div class="navigation btn__navigator">
        <button class="btn navigate btn--prev ${this._index === 0 ? "fade" : " "}" data-id=${this._index > 0 ? this._index - 1 : 0}>Prev</button>
        <p>${this._index + 1} of 10</p>
        <button class="btn navigate btn--next ${this._index === 9 ? "hidden" : ""}" data-id=${this._index < 9 ? this._index + 1 : 9}>Next</button>
        <button class="btn btn--submit ${this._index !== 9 || this._data.renderSolution ? "hidden" : ""}">Submit</button>
      </div>`;
  }
}

export default new navigationView();
