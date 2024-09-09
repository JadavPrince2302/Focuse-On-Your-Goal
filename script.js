const CheckBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");


const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half Done !',
  'Just Step Away, keep going !',
  'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first : {
    name: '',
    complete : false
  },
  second : {
    name: '',
    complete : false
  },
  third : {
    name: '',
    complete : false
  }
};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.complete).length
progressValue.style.width = `${completedGoalsCount / 3 * 100 }%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
progressLabel.innerText = allQuotes[completedGoalsCount]
CheckBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allInputFieldFilled = [...inputFields].every((input) => {
      return input.value;
    });
    if (allInputFieldFilled) {
      checkBox.parentElement.classList.toggle("completed");
      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].complete = !allGoals[inputId].complete;
      completedGoalsCount = Object.values(allGoals).filter((goals) => goals.complete).length
      progressValue.style.width = `${completedGoalsCount / 3 * 100 }%`
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
      progressLabel.innerText = allQuotes[completedGoalsCount]
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});
inputFields.forEach((input) => {
  input.value = allGoals[input.id].name
  input.addEventListener("focus", (e) => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if(allGoals[input.id].complete) {
      e.target.value = allGoals[input.id].name
      return
    }
    allGoals[input.id].name = input.value
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
