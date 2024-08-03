import View from "./view";

class formView extends View{
  parentEle = document.querySelector(".app");
  _msg = `Questions for this topic are not available. Try another topic!`
  
  newPlayer() {
    const name = this.parentEle.querySelector(".player--name").value;
    const email = this.parentEle.querySelector(".player--email").value;
    const gender = this.parentEle.querySelector(".player--gender").value;
    const category = this.parentEle.querySelector(".player--category").value;
    const difficulty = this.parentEle.querySelector(".player--difficulty").value;

    return {
      name,
      email,
      gender,
      category,
      difficulty,
    };
  }

  addHandler (handle) {
    this.parentEle.addEventListener('submit', function(e) {
        e.preventDefault()
        e.target.classList.toggle('hidden')
        handle()
    })
  }
}

export default new formView();
