/* ===========================
       ELEMENTS
=========================== */
const loginScreen = document.getElementById("loginScreen");
const verifyScreen = document.getElementById("verifyScreen");
const walletScreen = document.getElementById("walletScreen");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const loginBtn = document.getElementById("loginBtn");
const togglePass = document.getElementById("togglePass");

const notify = document.getElementById("notify");

const codeInputs = document.querySelectorAll(".code");
const verifyBtn = document.getElementById("verifyBtn");
const timerBox = document.getElementById("timerBox");
const resendCode = document.getElementById("resendCode");

let timer = 60;
let timerInterval;

/* ===========================
       LOGIN LOGIC
=========================== */
function checkLoginFields() {
  if (loginUser.value.trim() !== "" && loginPass.value.trim() !== "") {
    loginBtn.classList.remove("disabled");
  } else {
    loginBtn.classList.add("disabled");
  }
}

loginUser.addEventListener("input", checkLoginFields);
loginPass.addEventListener("input", checkLoginFields);

togglePass.onclick = () => {
  loginPass.type = loginPass.type === "password" ? "text" : "password";
};

loginBtn.onclick = () => {
  loginBtn.classList.add("loading");

  setTimeout(() => {
    loginBtn.classList.remove("loading");

    showNotify("حساب تایید شد");

    loginScreen.classList.add("hidden");
    verifyScreen.classList.remove("hidden");

    startTimer();
    codeInputs[0].focus();
  }, 1200);
};

/* ===========================
       CODE VERIFY LOGIC
=========================== */
codeInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");

    if (input.value && index < 5) {
      codeInputs[index + 1].focus();
    }

    checkVerifyFilled();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      codeInputs[index - 1].focus();
    }
  });
});

function checkVerifyFilled() {
  const allFilled = [...codeInputs].every(i => i.value.trim() !== "");
  if (allFilled) {
    verifyBtn.classList.remove("disabled");
  } else {
    verifyBtn.classList.add("disabled");
  }
}

verifyBtn.onclick = () => {
  verifyBtn.classList.add("loading");

  setTimeout(() => {
    verifyBtn.classList.remove("loading");

    showNotify("ورود با موفقیت انجام شد");

    verifyScreen.classList.add("hidden");
    walletScreen.classList.remove("hidden");

  }, 1000);
};

/* ===========================
       TIMER
=========================== */
function startTimer() {
  timer = 60;
  timerBox.textContent = "00:60";
  resendCode.classList.add("hidden");

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timer--;
    timerBox.textContent = timer < 10 ? `00:0${timer}` : `00:${timer}`;

    if (timer <= 0) {
      clearInterval(timerInterval);
      resendCode.classList.remove("hidden");
    }
  }, 1000);
}

resendCode.onclick = () => {
  resendCode.classList.add("hidden");
  codeInputs.forEach(i => i.value = "");
  codeInputs[0].focus();
  startTimer();
};

/* ===========================
       NOTIFICATION
=========================== */
function showNotify(text) {
  notify.textContent = text;
  notify.classList.add("show");

  setTimeout(() => {
    notify.classList.remove("show");
  }, 3000);
}

/* ===========================
       THEME SWITCH
=========================== */
document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("light");
};

/* ===========================
       SEND & RECEIVE SHEETS
=========================== */
const sendSheet = document.getElementById("sendSheet");
const receiveSheet = document.getElementById("receiveSheet");

/* SEND ELEMENTS */
const sendBtn = document.getElementById("sendBtn");
const sendBack = document.getElementById("sendBack");
const sendCheck = document.getElementById("sendCheck");

const sendCard = document.getElementById("send_card");
const sendAmount = document.getElementById("send_amount");
const sendPass = document.getElementById("send_pass");

const sendInfo = document.getElementById("sendInfo");

/* RECEIVE ELEMENTS */
const receiveBtn = document.getElementById("receiveBtn");
const receiveBack = document.getElementById("receiveBack");
const receiveCheck = document.getElementById("receiveCheck");
const receivePass = document.getElementById("receive_pass");

/* ===========================
       SHOW SHEETS
=========================== */
sendBtn.onclick = () => {
  resetSendSheet();
  sendSheet.classList.add("show");
};

receiveBtn.onclick = () => {
  resetReceiveSheet();
  receiveSheet.classList.add("show");
};

/* ===========================
       RESET FUNCTIONS
=========================== */
function resetSendSheet() {
  sendCard.value = "";
  sendAmount.value = "";
  sendPass.value = "";

  sendCheck.textContent = "بررسی";
  sendCheck.classList.add("disabled");

  sendInfo.style.display = "none";
  sendInfo.innerHTML = "";

  sendSheet.classList.remove("show");
}

function resetReceiveSheet() {
  receivePass.value = "";
  receiveCheck.classList.add("disabled");
  receiveSheet.classList.remove("show");
}

/* ===========================
       VALIDATION
=========================== */
function validateSend() {
  if (
    sendCard.value.trim() !== "" &&
    sendAmount.value.trim() !== "" &&
    sendPass.value.trim() !== ""
  ) {
    sendCheck.classList.remove("disabled");
  } else sendCheck.classList.add("disabled");
}

sendCard.oninput = validateSend;
sendAmount.oninput = validateSend;
sendPass.oninput = validateSend;

/* RECEIVE VALIDATION */
receivePass.oninput = () => {
  if (receivePass.value.trim() !== "") {
    receiveCheck.classList.remove("disabled");
  } else {
    receiveCheck.classList.add("disabled");
  }
};

/* ===========================
       SEND LOGIC
=========================== */
sendCheck.onclick = () => {
  if (sendCheck.textContent === "بررسی") {
    // Show info
    sendInfo.style.display = "block";
    sendInfo.innerHTML = `
      نام: نامشخص <br>
      بج نامبر: نامشخص <br>
      مقدار درخواستی: ${sendAmount.value} <br>
      موجودی بعد پرداخت: نامشخص <br>
      وضعیت: نامشخص
    `;

    sendCheck.textContent = "واریز";
  } else {
    // Payment done
    showNotify("واریز شد");
    resetSendSheet();
  }
};

sendBack.onclick = () => {
  resetSendSheet();
};

/* ===========================
       RECEIVE LOGIC
=========================== */
receiveCheck.onclick = () => {
  showNotify("واریز شد");
  resetReceiveSheet();
};

receiveBack.onclick = () => {
  resetReceiveSheet();
};
