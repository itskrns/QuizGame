import maleIcon from "url:../../img/male.svg";
import femaleIcon from "url:../../img/female.svg";
import View from "./view"

class navbarView extends View {
    parentEle = document.querySelector('.nav__subtitle')

    _genMarkup () {
        return `<img src="${
            this._data.player.gender === "M" ? maleIcon : femaleIcon
          }" alt="brain" class="nav__icons ${this._data.renderSolution ? "hidden" : ""}"> ${this._data.player.name}, welcome to the quiz zone!`
    }
}

export default  new navbarView()