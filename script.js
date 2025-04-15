'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const johannesUsersInTheDB = document.getElementById('the_above_video');
const theDBNumber = document.getElementById('theDbiD');

//////////////The dabase system checker ////////////////////////

class FederatedTrainer {
  constructor(databases) {
    this.databases = databases;
    this.globalModel = this.initializeModel();
  }

  initializeModel() {
    // A simple feedforward NN model
    return {
      weights: Array(100).fill(Math.random()),
      bias: Math.random()
    };
  }

  train() {
    let aggregatedGradients = Array(100).fill(0);

    // Outer loop: Iterate over users in the DB
    for (let i = 0; i < this.databases.length; i++) {
      const currentDB = this.databases[i];
      let dbGradients = Array(100).fill(0);

      // Middle loop: Go through each DB for comparison or aggregation
      for (let J = 0; J < this.databases.length; J++) {
        const comparisonDB = this.databases[J];

        // Inner loop: Iterate over user data features (e.g., input neurons)
        for (let K = 0; K < currentDB.users.length; K++) {
          const userData = currentDB.users[K].features;
          let userGradient = this.computeGradient(userData);

          // Accumulate gradients for this DB
          dbGradients = dbGradients.map((g, index) => g + userGradient[index]);
        }
      }

      // Aggregate gradients across DBs
      aggregatedGradients = aggregatedGradients.map((g, index) => g + dbGradients[index]);
    }

    // Apply averaged gradients to global model
    this.updateGlobalModel(aggregatedGradients);
  }

  computeGradient(data) {
    // Placeholder for backpropagation gradient computation
    return data.map((feature) => feature * 0.01);
  }

  updateGlobalModel(aggregatedGradients) {
    const learningRate = 0.01;

    this.globalModel.weights = this.globalModel.weights.map(
      (w, index) => w - learningRate * (aggregatedGradients[index] / this.databases.length)
    );
  }

  evaluate() {
    console.log("Final Model Weights:", this.globalModel.weights);
  }
}

// Define mock databases with users and features
const databases = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  users: Array.from({ length: 20 }, () => ({
    id: Math.random(),
    features: Array.from({ length: 100 }, () => Math.random())
  }))
}));

// Instantiate and run the federated learning trainer
const trainer = new FederatedTrainer(databases);
trainer.train();
trainer.evaluate();

console.log('The datases have been searched');

///////////////////////////////////////////////////////////////

// custom select variables //
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
