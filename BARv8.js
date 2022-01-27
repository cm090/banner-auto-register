// -------------------------------------------------------------------------------------
// BARv8: Banner Auto Registration Tool for Banner 8
// Created by Canon Maranda | https://about.canon.click | hello@canon.click
// INSTRUCTIONS: Fill out the requested information below and complete the remaining
//               steps at https://link.canon.click/bar-tool
// -------------------------------------------------------------------------------------

// In the array below, enter up to 10 CRNs. If you have less than 10, use two single
// quotes ('') in the empty fields. Make sure there are exacly 10 elements below
const classes = [0, 0, 0, 0, '', '', '', '', '', ''];
// Enter your registration PIN below. This information doesn't leave your device
const pin = 111111;
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

if(classes.length != 10) {alert("(BARv8) There are " + classes.length + " CRNs in your list instead of 10! BAR will not work unless this is fixed. This error message will disappear when the issue is resolved.");}
if(hour < 0 || hour > 11 || minute < 0 || minute > 59) {alert("(BARv8) The time information you entered is incorrect. This error message wil disappear when the issue is resolved.");}
var url = window.location.pathname;
if (url.includes('P_AltPin') || url.includes('P_CheckAltPin') || url.includes('P_Regs')) {
    if (document.querySelector('#apin_id') !== null) {
        console.log('trying pin...');
        document.querySelector("#apin_id").value = pin;
        document.querySelector("body > div.pagebodydiv > form > input[type=submit]").click();
    } else {
        if (!document.querySelector('.dataentrytable')) {
            console.log('BAR > Found waiting page, refreshing soon...');
            timeTrack();
        } else {
            if (!cookieCheck('completedRegistration')) {
                console.log('BAR > Found registration page, trying to autofill courses...');
                for (var i = 0; i < 10; i++) {
                    document.querySelectorAll('.dedefault > input[name="CRN_IN"]')[i].value = classes[i];
                }
                console.log('BAR > Courses filled, adding cookie and submitting...');
                document.cookie = 'completedRegistration=true ';
                document.querySelector('input[value="Submit Changes"]').click();
            } else {
                alert('(BARv8) Course autofill complete! Thanks for using BAR!');
                console.log('BAR > Thanks for using BARv8! Learn more at https://link.canon.click/bar-tool');
            }
        }
    }
}

function timeTrack() {
    timeDiff = 0;
    if(isPM) {
        timeDiff = 12;
    }
    var now = new Date();
    var timeUntil = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour + timeDiff, minute, 0, 0) - now;
    console.log(timeUntil);
    if (timeUntil < 0) {
        console.log('registration time, loading the next page...');
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
    if (timeUntil > 10000) {
        setTimeout(function () {
            location.reload();
        }, Math.floor(Math.random() * 10000));
    }
    setTimeout(function () {
        location.reload();
    }, timeUntil);
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
