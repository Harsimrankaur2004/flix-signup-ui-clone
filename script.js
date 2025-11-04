import { quesAns } from "./data/ques-ans.js";

const slider = document.getElementById("imageSlider");
const leftBtn = document.querySelector(".js-left-arrow");
const rightBtn = document.querySelector(".js-right-arrow");

// HANDLE THE LEFT AND RIGHT ARROW BUTTON VISIBILITY
function updateArrowVisibility() {
  // calculate the invisible width
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

  // console.log(slider.scrollLeft);
  // console.log(maxScrollLeft);

  // If slider is on the left edge = left button invisible
  // else visible.
  if(slider.scrollLeft <= 0){
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "flex";
  }

  // If slider is on the right edge = left button invisible
  // else visible.
  if(slider.scrollLeft >= maxScrollLeft - 5){
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "flex";
  }
}

updateArrowVisibility(); 

// MAKE THE ARROW BUTTONS INTERACTIVE
let scrollAmount = 1005;

// Add event listener to the left arrow button
leftBtn.addEventListener('click', () => {
  slider.scrollBy({left: -scrollAmount, behavior: "smooth"});
});

// Add event listener to the right arrow button
rightBtn.addEventListener('click', () => {
  slider.scrollBy({left: scrollAmount, behavior: "smooth"});
});

slider.addEventListener('scroll', updateArrowVisibility);


// THIS CODE IS FOR SLIDING THE SLIDER BY TOUCHING THE PHONE SCREEN
// Here two variables underneath store the start touch value and end touch value. But for now, their value = 0.
let startX = 0;
let endX = 0;

// This event listener stores the value when finger will touch the phone.
slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});


// This event listener will get triggered while sliding finger on phone screen. And when the sliding is stopped the value will get stored.
slider.addEventListener('touchmove', e => {
  endX = e.touches[0].clientX;
});


// This event listener will get triggered when the finger will be removed from the screen.
slider.addEventListener('touchend', e => {
  const deltaX = endX - startX;  // If we slide from left to right the endX will increase and deltaX will be positive & vice-versa.

  scrollAmount = Math.abs(deltaX);// Math.abs = absolute number. It will change any -tive into +tive.

  if (Math.abs(deltaX) > 30) { // This will check if we slide it more than 80px.
  
    if(deltaX < 0) {
      slider.scrollBy({left: scrollAmount, behavior: "smooth"});
    } else{
      slider.scrollBy({left: -scrollAmount, behavior: "smooth"});
    }
  }

updateArrowVisibility(); // This function is called to handle the arrow buttons visibility.

// Here values of these variables are restored.
  scrollAmount = 1005;
  startX = 0;
  endX = 0;
});

// GENERATE HTML FOR  question-container
  // console.log(quesAns);
let quesAnsHTML = "";
quesAns.forEach(qA => {
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
      <div class="ans-box ans-box-${qA.id} hidden" id="${qA.id}">
        ${qA.ans}
      </div>
    </div>
  `;
});
document.querySelector('.js-ques-ans').innerHTML = quesAnsHTML
// (quesAnsHTML);console.log

// THIS CODE IS FOR QUESTION BOX
// Loop through all ques-box and add event listener to each. 
document.querySelectorAll(".ques-box")
  .forEach(e => {
    e.addEventListener('click', () => {
      let quesId = e.id;

      // Loop through all answer boxes
      document.querySelectorAll('.ans-box').forEach(ansBox => {
        // If this answer box matches the clicked question
        if (ansBox.id === quesId && ansBox.classList.contains(`ans-box-${quesId}`)) {
          // Toggle visibility (show if hidden, hide if shown)
          ansBox.classList.toggle('hidden');
        } else {
          // Hide all other answer boxes
          ansBox.classList.add('hidden');
        }
      });
      e.querySelectorAll("img")
        .forEach(img => {
          if (quesId === img.id){
            img.classList.toggle("img-rotate");
          }
        })
    });
  });

// Add event listener to Learn more
const learnMore = document.querySelector(".js-learn-more");
const agreementInfo = document.querySelector(".js-agreement-info");

learnMore.addEventListener('click', () => {
  agreementInfo.style.display = "block";
  learnMore.style.display = "none";
})