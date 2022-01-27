# Banner Auto Register (BAR)
#### Disclaimer: BAR created solely for testing purposes. If you are prohibited from using software to automatically register for courses, do not use this program. BAR is not associated with Ellucian Banner. I am not responsible for anything that goes wrong.

### Automatically register for your next semester's classes with this tool!
![example workflow](https://github.com/cm090/banner-auto-register/actions/workflows/codeql-analysis.yml/badge.svg)

BAR accomplishes a few tasks so human error doesn't slow down the registration process:
- Takes in a PIN that is autofilled when prompted by the site
- Refreshes the waiting screen at random intervals between 1 and 10 seconds
- Begins to load the registration page with millisecond precision
- Instantly loads CRNs into the page and submits the form
- Stores a temporary cookie to stop the script after first run

You must be familiar with a few things before continuing:
- JavaScript - adding your information to a few lines in the code
- Chrome extensions - downloading and setting up the code injector

## Getting Started
Make sure you have the following things:
- Chromium-based browser
  - this includes Chrome, Edge, Brave, Opera, or anywhere else where you can download the required extension
- A working internet connection (ethernet is recommended)
- 10 minutes to set up the tool

If you need help, check out this video (coming soon)

1. Download the <a href="https://chrome.google.com/webstore/detail/injector/bfdonckegflhbiamlmidciapolfccmmb" target="_blank">Injector plugin for Chrome</a>
2. Click on the extension icon
3. Press the plus button on the screen and enter the domain of your Banner site in the popup box
4. In the large textbox on the right, paste in the below code
   - If on Banner 8, use <a href="https://github.com/cm090/banner-auto-register/blob/main/BARv8.js" target="_blank">BARv8.js</a>
   - If on Banner 9, use BARv9 (coming soon)
5. Make changes to the top of the code based on the green comments
   - The first thing to add is your list of CRNs in the array. Do not delete the empty slots or else the code won't work. If you don't have 10 CRNs, put two single quotes in the empty spaces. When you're finished, it should look like this: `[1234, 5678, 9012, 3456, '', '', '', '', '' ,'']`
   - Next, fill in your PIN. If you don't need one, set the value to `''`
   - Finally, add your registration time. The code will ask for the hour and minute registration opens. Note that 0 hours represents 12:00. Below that, enter `TRUE` if your time is after 11:59 AM, otherwise don't change this value
6. Click the green save button and you're finished. 3-5 minutes before your registration time, visit the PIN entry page and BAR will do the rest

## Notes and Recommendations
- Your success with BAR may vary. Version 8 of this program was tested in early 2022 with a high success rate
- Make sure BAR is working **before** registration. Do this by visiting the PIN entry page. You won't be able to register, but BAR is working if the page randomly refreshes while you're on it
- You can check the developer console for messages or errors. Press the keys `Ctrl` + `Shift` + `I` or `F12` to open the tool and click on the console tab. Messages from BAR should appear when the program is running
- Have a backup method just in case something goes wrong. I recommend using <a href="https://autohotkey.com" target="_blank">AutoHotKey</a>
- Double-check everything you enter into BAR. The program doesn't pay attention to formatting until it finds an error during registration
- Make sure cookies are enabled on your browser. If you haven't disabled them, then you should have nothing to worry about
- Do not start BAR more than 5 minutes before your registration time, or you risk being temporarily restricted from the Banner server

#### Reminder: I am not liable for anything that happens to you while using BAR

If you have any questions or improvements, create an issue/pull request or feel free to contact me directly. Good luck!
