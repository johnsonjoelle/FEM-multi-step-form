let costs = {
  monthly: {
    arcade: 9,
    advanced: 12,
    pro: 15,
    online: 1,
    storage: 2,
    profile: 2
  },
  yearly: {
    arcade: 90,
    advanced: 120,
    pro: 150,
    online: 10,
    storage: 20,
    profile: 20
  }
}

let yearly = false;
let online = false;
let storage = false;
let profile = false;
const yearlyCheck = document.getElementById('plan-slider');
const onlineCheck = document.getElementById('online');
const storageCheck = document.getElementById('storage');
const profileCheck = document.getElementById('profile');
let arcadeCost = costs.monthly.arcade;
let advancedCost = costs.monthly.advanced;
let proCost = costs.monthly.pro;
let onlineCost = costs.monthly.online;
let storageCost = costs.monthly.storage;
let profileCost = costs.monthly.profile;
let userPlan = 1;
let userPlanCost = arcadeCost;
let totalCost = 0;

const user = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const info = [
  {input: user, check: nameCheck},
  {input: email, check: emailCheck},
  {input: phone, check: phoneCheck}
];

const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const step5 = document.getElementById('step-5');
const steps = [step1, step2, step3, step4, step5];
const sidebarNums = document.getElementsByClassName('sidebar-num');
const changeLink = document.getElementById('change-plan');

const planArc = document.getElementById('arcade');
const planAdv = document.getElementById('advanced');
const planPro = document.getElementById('pro');
const sliderLabels = document.getElementsByClassName('slider-label');

let confirmationCheck = false;
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
let currentStep = 1;

// **** Plan Duration Functions ****
function changeYearly() {
  yearlyCheck.checked ? yearly=true : yearly=false;
  changeCost();
  if (yearly) {
    sliderLabels[0].classList.remove('active');
    sliderLabels[1].classList.add('active');
  } else {
    sliderLabels[0].classList.add('active');
    sliderLabels[1].classList.remove('active');
  }
}
function changeCost() {
  if (yearly) {
    arcadeCost= costs.yearly.arcade;
    advancedCost = costs.yearly.advanced;
    proCost = costs.yearly.pro;
    onlineCost = costs.yearly.online;
    storageCost = costs.yearly.storage;
    profileCost = costs.yearly.profile;
  } else {
    arcadeCost= costs.monthly.arcade;
    advancedCost = costs.monthly.advanced;
    proCost = costs.monthly.pro;
    onlineCost = costs.monthly.online;
    storageCost = costs.monthly.storage;
    profileCost = costs.monthly.profile;
  }
  changeCostTexts();
}
function changeCostTexts() {
  const specialsText = document.getElementsByClassName('yearly');
  const unitText = document.getElementsByClassName('unit');

  // Step 2
  document.getElementById('arc-cost').innerText = arcadeCost;
  document.getElementById('adv-cost').innerText = advancedCost;
  document.getElementById('pro-cost').innerText = proCost;
  // Step 3
  document.getElementById('online-cost').innerText = onlineCost;
  document.getElementById('storage-cost').innerText = storageCost;
  document.getElementById('profile-cost').innerText = profileCost;

  if (yearly) {
    for (let i=0; i<unitText.length; i++) {
      unitText[i].innerText = 'yr';
    }
    for (let i=0; i<specialsText.length; i++) {
      specialsText[i].classList.remove('hidden');
    }
    // Step 4
    document.getElementById('summary-plan-type').innerText = 'year';
  } else {
    for (let i=0; i<unitText.length; i++) {
      unitText[i].innerText = 'mo';
    }
    for (let i=0; i<specialsText.length; i++) {
      specialsText[i].classList.add('hidden');
    }
    // Step 4
    document.getElementById('summary-plan-type').innerText = 'month';
  }
}

// **** Step 1 Validation Functions ****
function checkEmpty(val) {
  if(val.length == 0 || val == " ") {
    return true;
  }
  return false;
}
function nameCheck(val) {
  let pattern = /^[a-z ,.'-]+$/i;
  if (pattern.test(val)) {
    return true;
  }
  return false;
}
function emailCheck(val) {
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (pattern.test(val)) {
    return true;
  }
  return false;
}
function phoneCheck(val) {
  let pattern = /^\+(?:[0-9]\s?){6,14}[0-9]$/;
  if (pattern.test(val)) {
    return true;
  }
  return false;
}
function quickCheck(input) {
  input.check(input.input.value) ? unhighlightError(input.input) : highlightError(input.input);
  checkEmpty(input.input.value) ? highlightErrorMsg(input.input) : unhighlightErrorMsg(input.input);
}
function highlightError(input) {
  input.classList.add('error');
  if(!nextBtn.classList.contains('disabled')) {
    nextBtn.classList.add('disabled');
  }
}
function highlightErrorMsg(input) {
  input.previousElementSibling.lastChild.classList.remove('hidden');
}
function unhighlightError(input) {
  input.classList.remove('error');
  if(nextBtn.classList.contains('disabled')) {
    nextBtn.classList.remove('disabled');
  }
}
function unhighlightErrorMsg(input) {
  input.previousElementSibling.lastChild.classList.add('hidden');
}
function checkForm() {
  let noErrors = true;
  if (currentStep==1) {
    info.forEach(input => {
      unhighlightError(input.input);
      unhighlightErrorMsg(input.input);
    });
    info.forEach(input => {
      if (!input.check(input.input.value)) {
        highlightError(input.input);
        checkEmpty(input.input.value) ? highlightErrorMsg(input.input) : unhighlightErrorMsg(input.input);
        noErrors = false;
      } 
    });
  }
  return noErrors;
}

// **** Plan & Add-ons Functions ****
function changePlan(id) {
  userPlan = id;
  switch (id) {
    case 1:
      userPlanCost = arcadeCost;
      break;
    case 2:
    userPlanCost = advancedCost;
      break;
    case 3:
    userPlanCost = proCost;
      break;
  
    default:
      break;
  }
}
function removePlanHighlight() {
  const cards = document.getElementsByClassName('plan');
  for (let i=0; i<cards.length; i++) {
    cards[i].classList.remove('active');
  }
}
function changeOnline() {
  if (onlineCheck.checked) {
    online = true;
    document.getElementById('online-container').classList.add('active');
  } else {
    online = false;
    document.getElementById('online-container').classList.remove('active');
  }
}
function changeStorage() {
  if (storageCheck.checked) {
    storage = true;
    document.getElementById('storage-container').classList.add('active');
  } else {
    storage = false;
    document.getElementById('storage-container').classList.remove('active');
  }
}
function changeProfile() {
  if (profileCheck.checked) {
    profile = true;
    document.getElementById('profile-container').classList.add('active');
  } else {
    profile = false;
    document.getElementById('profile-container').classList.remove('active');
  }
}

// ****Summary Page Functions *****
function checkCheckmarks() {
  // Browser saves the state of checkmarks, 
  // so user may load the form with states already checked
  // the following makes sure of the check states of checkmarks
  onlineCheck.checked ? online=true : online=false;
  storageCheck.checked ? storage=true : storage=false;
  profileCheck.checked ? profile=true : profile = false;
  changeYearly();
  changeOnline();
  changeStorage();
  changeProfile();
}
function printPlan() {
  let title = "";
  let duration = "";
  switch (userPlan) {
    case 1:
      title = "Arcade";
      userPlanCost = arcadeCost;
      break;
    case 2:
      title = "Advanced";
      userPlanCost = advancedCost;
      break;
    case 3:
    title = "Pro";
    userPlanCost = proCost;
      break;
  
    default:
      break;
  }
  yearly ? duration="Yearly" : duration="Monthly";
  document.getElementById('summary-plan-title').innerText = `${title} (${duration})`;
  document.getElementById('summary-plan-cost').innerText = userPlanCost;
}
function printAddons() {
  if (online || storage || profile) {
    let addonConent = ``;
    let title;
    let price;
    let unit;
    yearly ? unit="yr" : unit="mo";
    if (online) {
      title = 'Online service';
      price = onlineCost;
      totalCost += onlineCost;
      addonConent += `
        <div class="summary-addon">
          <p class="summary-addon-title">${title}</p>
          <p class="summary-addon-cost">+$${price}/${unit}</p>
        </div>`;
    }
    if (storage) {
      title = 'Larger storage';
      price = storageCost;
      totalCost += storageCost;
      addonConent += `
        <div class="summary-addon">
          <p class="summary-addon-title">${title}</p>
          <p class="summary-addon-cost">+$${price}/${unit}</p>
        </div>`;
    }
    if (profile) {
      title = 'Customizable profile';
      price = profileCost;
      totalCost += profileCost;
      addonConent += `
        <div class="summary-addon">
          <p class="summary-addon-title">${title}</p>
          <p class="summary-addon-cost">+$${price}/${unit}</p>
        </div>`;
    }
    document.getElementById('summary-addons-list').innerHTML = addonConent;
  }
}
function printSummary() {
  printPlan();
  totalCost = userPlanCost;
  printAddons();
  document.getElementById('total-cost').innerText = totalCost;
}

// **** Step Navigation Functions ****
function goToNextStep() {
  if (currentStep<5) {
    if (checkForm()) {
      const oldStep = currentStep - 1;
      let oldStepView = findStep(oldStep);
      let newStepView = findStep(currentStep);
      changeSidebarHighlight(oldStep, currentStep);
      currentStep++;
      checkButtonText();
      oldStepView.classList.add('hidden');
      if (currentStep==2) {
        showBackButton()
      };
      hideNavButtons(); 
      if (currentStep==4) {
        printSummary();
      }
      newStepView.classList.remove('hidden');
    }
  }
}
function goToPreviousStep() {
  if (currentStep>1) {
    // converting step number to index number for steps array
    const newStep = currentStep - 2; 
    const oldStep = currentStep - 1;
    let oldStepView = findStep(oldStep);
    let newStepView = findStep(newStep);
    changeSidebarHighlight(oldStep, newStep);
    currentStep--;
    checkButtonText();
    oldStepView.classList.add('hidden');
    if (currentStep==1) {
      hideBackButton()
    };
    newStepView.classList.remove('hidden');
  }
}
function findStep(step) {
  for (let i=0; i<steps.length; i++) {
    if (i==step) {
      return steps[i];
    }
  }
}
function goToPlans() {
  const oldStep = currentStep - 1;
  const newStep = 1
  let oldStepView = findStep(oldStep);
  let newStepView = findStep(newStep);
  changeSidebarHighlight(oldStep, newStep);
  currentStep = 2;
  checkButtonText();
  oldStepView.classList.add('hidden');
  newStepView.classList.remove('hidden');
}

function changeSidebarHighlight(step, next) {
  if (next < 4) {
    for (let i=0; i<sidebarNums.length; i++) {
      let id = sidebarNums[i].dataset.id;
      if (id==next) {
        sidebarNums[i].classList.add('active');
      }
      if (id==step) {
        sidebarNums[i].classList.remove('active');
      }
    }
  }
}

function checkButtonText() {
  if (currentStep==4) {
    changeNextButton(true);
  } 
  if (currentStep==3) {
    changeNextButton(false);
  }
}
function changeNextButton(check) {
  check ? nextBtn.innerText = "Confirm" : nextBtn.innerText = "Next Step";
}
function hideBackButton() {
  backBtn.classList.add('hidden');
}
function showBackButton() {
  backBtn.classList.remove('hidden');
}
function hideNavButtons() {
  if (currentStep==5) {
    document.getElementById('buttons').classList.add('hidden');
  }
}

window.onload = () => {

  // Event Listeners
  nextBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    goToNextStep();
  });
  backBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    goToPreviousStep();
  });
  info.forEach(input => {
    input.input.addEventListener("focusout", ()=>{quickCheck(input)});
  });
  yearlyCheck.addEventListener('change', changeYearly);
  onlineCheck.addEventListener('change', changeOnline);
  storageCheck.addEventListener('change', changeStorage);
  profileCheck.addEventListener('change', changeProfile);
  planArc.addEventListener("click", ()=>{
    changePlan(1);
    removePlanHighlight();
    planArc.classList.add('active');
  });
  planArc.addEventListener("keydown", (e)=>{
    if(e.key==" ") {
      changePlan(1);
      removePlanHighlight();
      planArc.classList.add('active');
    }
  });
  planAdv.addEventListener("click", ()=>{
    changePlan(2);
    removePlanHighlight();
    planAdv.classList.add('active');
  });
  planAdv.addEventListener("keydown", (e)=>{
    if(e.key==" ") {
      changePlan(2);
      removePlanHighlight();
      planAdv.classList.add('active');
    }
  });
  planPro.addEventListener("click", ()=>{
    changePlan(3);
    removePlanHighlight();
    planPro.classList.add('active');
  });
  planPro.addEventListener("keydown", ()=>{
    if(e.key==" ") {
      changePlan(3);
      removePlanHighlight();
      planPro.classList.add('active');
    }
  });
  changeLink.addEventListener('click', goToPlans);
  changeLink.addEventListener('keydown', (e)=>{
    if(e.key==" ") {goToPlans()}
  });

  checkCheckmarks();
};