// -------------------------------------------------------------------------------------
// BARv9: Banner Auto Registration Tool for Banner 9
// Created by Canon Maranda | https://about.canon.click | hello@canon.click
// INSTRUCTIONS: Fill out the requested information below and complete the remaining
//               steps at https://link.canon.click/bar-tool
// -------------------------------------------------------------------------------------

// The boolean below disables BARv9 when set to true. You'll receive a notification
// when disabled, just in case you forget to change the setting back
const disableAllScripts = false;
// In the array below, enter all of your CRNs separated by commas. Add more elements
// as needed
const classes = [1111, 2222, 3333, 4444];
// Enter your registration PIN below. This information doesn't leave your device
const pin = 123456;
// Fill out your registration time below. Set the third value to true only if your
// registration begins after 11:59 AM
const hour = 7; // Number between 0 and 11 (0 = 12 AM)
const minute = 30; // Number between 0 and 59
const isPM = false; // true or false
// Don't forget to click the save button!

// -------------------------------------------------------------------------------------
// IMPORTANT: Do not change any of the code below and make sure you've copied everything
//            We're not responsible for registration failures based on this script
//            By continuing, you assume all liability for anything that goes wrong
// -------------------------------------------------------------------------------------

// Checks the time and refreshes the page until the time is <= registration time
const timeTrack = () => {
  clearErrors();
  let timeDiff = 0;
  if (isPM) {
    timeDiff = 12;
  }
  let now = new Date();
  let timeUntil =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour + timeDiff,
      minute,
      0,
      0
    ) - now;
  console.log(timeUntil);
  if (timeUntil < 0) {
    console.log("BARv9 > Registration time, loading the next page");
    document.querySelector("#term-go").click();
    clearErrors();
  } else if (timeUntil > 10000) {
    console.log(
      "BARv9 > Found waiting page, refreshing in less than 10 seconds"
    );
    setTimeout(function () {
      refresh();
      clearErrors();
    }, Math.floor(Math.random() * 10000));
  } else
    setTimeout(function () {
      refresh();
      clearErrors();
    }, timeUntil);
};

// Clears any errors that may appear on the page
const clearErrors = () => {
  try {
    document.querySelector(
      "body > div.notification-center-shim"
    ).style.display = "none";
    if (
      document.querySelector(
        "#notification-center > div > ul.error-container > li:nth-child(1) > div.notification-item-prompts > button"
      ) !== null
    ) {
      document
        .querySelector(
          "#notification-center > div > ul.error-container > li:nth-child(1) > div.notification-item-prompts > button"
        )
        .click();
      document.querySelector("#notification-center > a > div > span").click();
      document
        .querySelector(
          "#notification-center > div > ul.error-container > li > div.notification-item-prompts > button"
        )
        .click();
    }
  } catch (e) {
    console.log(e);
  }
};

// Refreshes the page and calls the timeTrack function again
const refresh = () => {
  document.querySelector("#term-go").click();
  timeTrack();
};

// Checks if the cookie search exists
const cookieCheck = (search) => {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].split("=");
    if (c[0].substring(0, 1) == " ") {
      c[0] = c[0].substring(1);
    }
    if (c[0] === search) {
      return c[1];
    }
  }
  return false;
};

// Injects CSS into the page
const injectStyles = (rule) => {
  let div = $("<div />", {
    html: "&shy;<style>" + rule + "</style>",
  }).appendTo("body");
};

if (hour < 0 || hour > 11 || minute < 0 || minute > 59) {
  alert(
    "(BARv9) The time information you entered is incorrect. This error message wil disappear when the issue is resolved."
  );
}
let url = window.location.pathname;
console.log("BARv9 > Got current url as " + url);
if (!disableAllScripts) {
  if (
    url.includes("StudentRegistrationSsb/ssb/registration") &&
    !cookieCheck("completedRegistration")
  ) {
    console.log("BARv9 > Found registration homepage, requesting user action");
    if (cookieCheck("completedRegistration")) {
      let action = confirm(
        "(BARv9) The registration cookie has been detected on your device, and this tool will not work unless it is removed. Click 'OK' to learn how to remove the cookie."
      );
      if (action) {
        window.open("https://link.canon.click/bar-tool");
      }
    } else {
      $("#brandingDiv")[0].innerHTML +=
        '<p style="padding-left: 10px; display: flex;">BARv9: Ready for registration page</p>';
    }
  } else if (url.includes("StudentRegistrationSsb/ssb/term/termSelection")) {
    console.log("BARv9 > Found PIN page, requesting user action");
    injectStyles("body > div.notification-center-shim {display:none;}");
    document.querySelector("#input_alt_pin").value = pin;
    if (
      document
        .querySelector(".select2-chosen")
        .textContent.includes("Select a term...")
    ) {
      let ev = new MouseEvent("mousedown", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      document.querySelector("#s2id_txt_term > a").dispatchEvent(ev);
      $("#brandingDiv")[0].innerHTML +=
        '<p style="padding-left: 10px; display: flex;">BARv9: Select registration term and click continue</p>';
    } else {
      console.log(
        "BARv9 > Found term " +
        document.querySelector("#select2-chosen-1").textContent +
        ", autofilling PIN"
      );
      document.querySelector("#term-go").click();
    }
    timeTrack();
  } else if (
    url.includes(
      "StudentRegistrationSsb/ssb/classRegistration/classRegistration"
    )
  ) {
    if (!cookieCheck("completedRegistration")) {
      console.log("BARv9 > Found registration page, autofilling courses");
      document.querySelector("#enterCRNs-tab").click();
      for (let i = 1; i < classes.length + 1; i++) {
        document.querySelector("#addAnotherCRN").click();
        document.querySelector("#txt_crn" + i).value = classes[i - 1];
      }
      document.querySelector("#addCRNbutton").click();
      document.cookie = "completedRegistration=true";
      document.querySelector("#saveButton").click();
    } else {
      console.log("BARv9 > Registration process complete");
    }
  }
} else if (url.includes("StudentRegistrationSsb")) {
  $("#brandingDiv")[0].innerHTML +=
    '<p style="padding-left: 10px; display: flex;">BARv9: Disabled</p>';
}

// -------------------------------------------------------------------------------------
// IMPORTANT: Scroll to the top of this code to fill out your CRNs and PIN, otherwise
//            this program won't work
// -------------------------------------------------------------------------------------
