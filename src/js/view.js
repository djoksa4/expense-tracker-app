class View {
  #formElement = document.querySelector(".expense__form");
  #noEntriesMessageElement = document.querySelector(".no__entries");
  #tableElement = document.querySelector(".expenses__table");
  #data;

  addHandlerAddExpense(handler) {
    this.#formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      if (data.name === "" || data.date === "" || data.amount === "") return;
      handler(data);
      e.target.reset();
    });
  }

  addHandlerRemoveExpense() {
    this.#tableElement.addEventListener(
      "click",
      function (e) {
        const button = e.target.closest(".btn--delete__expense");
        if (!button) return;
        const entry = button.closest("tr");
        entry.parentElement.removeChild(entry);
        if (this.#tableElement.rows.length < 2)
          this.#noEntriesMessageElement.classList.remove("hidden");
      }.bind(this)
    );
  }

  renderEntry(data) {
    this.#data = data;
    this.#noEntriesMessageElement.classList.add("hidden");
    const markup = this.#generateMarkup();
    this.#tableElement.insertAdjacentHTML("beforeend", markup);
  }

  #generateMarkup() {
    return `
        <tr>
          <td>${this.#data.name}</td>
          <td>${this.#data.date}</td>
          <td>${this.#data.amount}€</td>
          <td><button class="btn btn--delete__expense">X</button></td>
        </tr>
    `;
  }
}

export default new View();
