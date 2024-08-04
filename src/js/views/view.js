import errorIcon from 'url:../../img/error.svg'
import { DEFAULT_INDEX } from '../config';

export default class View {
  _app = document.querySelector('.app')
  _msg = `Something went wrong. Try Again!`
  _data;
  _index;
 
  renderData(data, index) {
    this._data = data;
    this._index = index;
    
    const markup = this._genMarkup();
    this.parentEle.innerHTML = " ";
    this.parentEle.insertAdjacentHTML("afterbegin", markup);
  }

  renderLayout(data, index) {
    this._data = data;
    this._index = index;
    
    const markup = this._genMarkup();
    this.parentEle.insertAdjacentHTML("beforeend", markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner"></div>`;
    this._app.innerHTML = ' '
    this._app.insertAdjacentHTML('afterbegin', markup)
  }

  renderError(message = this._msg) {
    const markup = `<div class="error">
                      <img src="${errorIcon}" alt="error" id="error--icon">
                      <p>${message}</p>
                    </div>`

    this._app.innerHTML = ' '
    this._app.insertAdjacentHTML('afterbegin', markup)
  }

  update(data, index) {
    this._data = data;
    this._index = index;

    const newMarkup = this._genMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this.parentEle.querySelectorAll("*"));


    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
