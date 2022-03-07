import "core-js/stable";
import * as model from "./model.js";
import view from "./view.js";

const controlAddExpense = function (data) {
  // store the form input data in the state

  model.state.input = data;

  // render the data
  view.renderEntry(data);
};

const init = function () {
  view.addHandlerAddExpense(controlAddExpense);
  view.addHandlerRemoveExpense();
};
init();
