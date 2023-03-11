const button = document.querySelectorAll(".btn");
const display = document.querySelector(".display");

const saveCounter = document.getElementById("save-counter");
const showCounters = document.getElementById("show-counters");

const modal = document.querySelector(".show-modal");
const closeModal = document.querySelector(".close");

// Populate modal

function populateCountersModal() {
  let keyArr = Object.keys(localStorage).sort((a, b) => a < b);
  console.log(keyArr);
  const countersHolder = document.querySelector(".counters");
  countersHolder.innerHTML = "";
  for (let i = 1; i < keyArr.length; i++) {
    let counter = document.createElement("div");
    counter.classList.add("counter");
    let heading = document.createElement("h3");
    heading.innerText = `Counter-${keyArr[i]}`;
    let counterVal = document.createElement("h2");
    counterVal.innerText = Number(localStorage.getItem(`${keyArr[i]}`));
    let counterImage = document.createElement("img");
    counterImage.setAttribute("src", "./images/delete.png");
    counter.appendChild(heading);
    counter.appendChild(counterVal);
    counter.appendChild(counterImage);
    countersHolder.appendChild(counter);
  }
  if (localStorage.length) {
    document.querySelector(".saved-counter-disp").innerText =
      localStorage.length - 1;
  }
}

populateCountersModal();

button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    var count = document.querySelector(".display").innerText;
    count = Number(count);
    console.log(e.target);
    if (e.target.classList.contains("plus")) display.innerText = count + 1;
    else if (e.target.classList.contains("minus") && count)
      display.innerText = count - 1;
  });
});

saveCounter.addEventListener("click", () => {
  let savedCounters = Number(localStorage.getItem("saved-counters"));
  let counterValue = Number(display.innerText);
  console.log(
    `SavedCounters: ${savedCounters}, typeof: ${typeof savedCounters}`
  );
  console.log(`counterValue: ${counterValue}`);
  if (savedCounters === null) {
    localStorage.setItem("saved-counters", 1);
  } else {
    savedCounters += 1;
    localStorage.setItem("saved-counters", savedCounters);
  }
  savedCounters = localStorage.getItem("saved-counters");
  localStorage.setItem("saved-counters", savedCounters);
  localStorage.setItem(`${savedCounters}`, counterValue);
  populateCountersModal();
});

showCounters.addEventListener("click", () => {
  modal.classList.toggle("inactive");
});
closeModal.addEventListener("click", () => {
  modal.classList.toggle("inactive");
});

const delButtons = document.querySelectorAll('img[src="./images/delete.png"');
delButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e);
    key = e.target.parentNode.querySelector("h3").innerText;
    localStorage.removeItem(key);
    populateCountersModal();
  });
});
