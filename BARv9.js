// -------------------------------------------------------------------------------------
// BARv9: Banner Auto Registration Tool for Banner 9
// Created by Canon Maranda | https://about.canon.click | hello@canon.click
// INSTRUCTIONS: Fill out the requested information below and complete the remaining
//               steps at https://link.canon.click/bar-tool
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// IMPORTANT: As of 4/26/22, this script is not complete. Please check this page later
//            for a working solution.
//            BY DOWNLOADING THIS VERSION, YOU UNDERSTAND THAT BARv9 WILL NOT WORK
// TODO: Line 72
// alert("(BARv9) This version of BARv9 is not complete and will not work.");
// -------------------------------------------------------------------------------------

// The boolean below disables BARv9 when set to true. You'll receive a notification
// when disabled, just in case you forget to change the setting back
const disableAllScripts = false;
// In the array below, enter all of your CRNs separated by commas
const classes = [0, 0, 0, 0];
// Enter your registration PIN below. This information doesn't leave your device
const pin = 000000;;
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

if (hour < 0 || hour > 11 || minute < 0 || minute > 59) { alert("(BARv9) The time information you entered is incorrect. This error message wil disappear when the issue is resolved."); }
var url = window.location.pathname;
console.log("BARv9 > Got current url as " + url);
if (!disableAllScripts) {
    if (url.includes('StudentRegistrationSsb/ssb/registration') && !cookieCheck('completedRegistration')) {
        console.log("BARv9 > Found registration homepage, requesting user action");
        if (cookieCheck('completedRegistration')) {
            var action = confirm("(BARv9) The registration cookie has been detected on your device, and this tool will not work unless it is removed. Click 'OK' to learn how to remove the cookie.");
            if (action) {
                window.open("https://link.canon.click/bar-tool");
            }
        } else {
            alert('(BARv9) We have detected you are on the main registration page. Click on "Register for Classes" to start BARv9.');
        }
    } else if (url.includes('StudentRegistrationSsb/ssb/term/termSelection')) {
        console.log("BARv9 > Found PIN page, requesting user action");
        document.querySelector("#input_alt_pin").value = pin;
        if (document.querySelector(".select2-chosen").textContent.includes("Select a term...")) {
            var ev = new MouseEvent('mousedown', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            document.querySelector("#s2id_txt_term > a").dispatchEvent(ev);
            alert("(BARv9) Please select your registration term from the dropdown menu and press Continue when finished.");
        }
        else {
            console.log("BARv9 > Found term " + document.querySelector("#select2-chosen-1").textContent + ", autofilling PIN");
            document.querySelector("#term-go").click();
        }
        timeTrack();
    } else if (url.includes('StudentRegistrationSsb/ssb/classRegistration/classRegistration')) {
        if (!cookieCheck('completedRegistration')) {
            console.log("BARv9 > Found registration page, autofilling courses");
            document.querySelector("#enterCRNs-tab").click();
            for (var i = 1; i < classes.length + 1; i++) {
                document.querySelector("#addAnotherCRN").click();
                document.querySelector("#txt_crn" + i).value = classes[i - 1];
            }
            document.querySelector("#addCRNbutton").click();
            document.cookie = 'completedRegistration=true';
            document.querySelector("#saveButton").click();
        } else {
            console.log("BARv9 > Registration process complete");
            alert("(BARv9) Thanks for using BARv9! Learn more at https://link.canon.click/bar-tool");
        }
    }
} else if (url.includes('StudentRegistrationSsb')) {
    alert("(BARv9) We've detected you're on a registration page but have disabled BARv9. If you would like to enable the tool, set the disableAllScripts variable to false in the code.");
}

function timeTrack() {
    clearErrors();
    var timeDiff = 0;
    if (isPM) {
        timeDiff = 12;
    }
    var now = new Date();
    var timeUntil = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour + timeDiff, minute, 0, 0) - now;
    console.log(timeUntil);
    if (timeUntil < 0) {
        console.log('registration time, loading the next page...');
        document.querySelector("#term-go").click();
    }
    else if (timeUntil > 10000) {
        console.log("BARv9 > Found waiting page, refreshing in less than 10 seconds");
        setTimeout(function () {
            refresh();
            clearErrors();
        }, Math.floor(Math.random() * 10000));
    }
    else setTimeout(function () {
        refresh();
        clearErrors();
    }, timeUntil);
}

function clearErrors() {
    try {
        if (document.querySelector("#notification-center > div > ul.error-container > li:nth-child(1) > div.notification-item-prompts > button") !== null) {
            document.querySelector("#notification-center > div > ul.error-container > li:nth-child(1) > div.notification-item-prompts > button").click();
            document.querySelector("#notification-center > a > div > span").click();
            document.querySelector("#notification-center > div > ul.error-container > li > div.notification-item-prompts > button").click();
        }
    } catch (e) { }
}

function refresh() {
    document.querySelector("#term-go").click();
    timeTrack();
}

function cookieCheck(search) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].split('=');
        if (c[0].substring(0, 1) == ' ') {
            c[0] = c[0].substring(1);
        }
        if (c[0] === search) {
            return c[1];
        }
    }
    return false;
}

// -------------------------------------------------------------------------------------
// IMPORTANT: Scroll to the top of this code to fill out your CRNs and PIN, otherwise
//            this program won't work
// -------------------------------------------------------------------------------------
