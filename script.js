import { quesAns } from "./data/ques-ans.js";

const slider = document.getElementById("imageSlider");
const leftBtn = document.querySelector(".js-left-arrow");
const rightBtn = document.querySelector(".js-right-arrow");

// HANDLE THE LEFT AND RIGHT ARROW BUTTON VISIBILITY
function updateArrowVisibility() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

  if (slider.scrollLeft <= 0) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "flex";
  }

  if (slider.scrollLeft >= maxScrollLeft - 5) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "flex";
  }
}

updateArrowVisibility();

let scrollAmount = 500;

leftBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

slider.addEventListener("scroll", updateArrowVisibility);

updateArrowVisibility();

// GENERATE HTML FOR  question-container
let quesAnsHTML = "";
quesAns.forEach((qA) => {
  quesAnsHTML += `
    <div class="ques-box-container">
      <div class="ques-box" id="${qA.id}">
        <div>
          ${qA.ques}
        </div>
        <div>
          <img src="images/plus.svg" id="${qA.id}">
        </div>
      </div>
      <div class="ans-box hidden" id="${qA.id}">
        ${qA.ans}
      </div>
    </div>
  `;
});
document.querySelector(".js-ques-ans").innerHTML = quesAnsHTML;
// (quesAnsHTML);console.log

// THIS CODE IS FOR QUESTION BOX
// Loop through all ques-box and add event listener to each.
document.querySelectorAll(".ques-box").forEach((e) => {
  e.addEventListener("click", () => {
    let quesId = e.id;

    // Loop through all answer boxes
    document.querySelectorAll(".ans-box").forEach((ansBox) => {
      // If this answer box matches the clicked question
      if (
        ansBox.id === quesId
      ) {
        // Toggle visibility (show if hidden, hide if shown)
        ansBox.classList.toggle("hidden");
      } else {
        // Hide all other answer boxes
        ansBox.classList.add("hidden");
      }
    });
    
    document.querySelectorAll(".ques-box img").forEach((img) => {
      if (quesId === img.id) {
        img.classList.toggle("img-rotate");
      } 
      if (quesId !== img.id) {
        img.classList.remove("img-rotate");
      }
    });
  });
});

// Add event listener to Learn more
const learnMore = document.querySelector(".js-learn-more");
const agreementInfo = document.querySelector(".js-agreement-info");

learnMore.addEventListener("click", () => {
  agreementInfo.style.display = "block";
  learnMore.style.display = "none";
});
