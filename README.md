# Globus JSON Table

The entire project is made in codesandbox so there would be no need of building the project so it will also eliminate all the weird Node version dependency issues. If you have any other questions you can email me at bansodegaurav@gmail.com

You don't need to build the project, you can test it and check the code in codesandbox directly.
[Click here](#building-and-running-project-locally) just in case you want it locally

## How to build/run the Project

You don't need to pull in and build the project. You can visit the codesandbox version of the project

### Check out the code here: https://codesandbox.io/s/github/gruler05/globus-status-tracker

### Check out the demo here: https://globusdatatracker.netlify.com/

### Building and Running Project Locally

Install all dependencies `npm i`

then `npm run start`

Run production build if you want to `npm run build`

## Project Structure

The project have two folder `./public` and `./src`

### `/public` folder

In this folder we have all the json data, so we can expose it to the application. Public folder also has all the mockups and main `index.html`

### `./src` folder

This folder consist of source code which is divided into components and services.

`./components` folder has two components for now `LoadData` and `Table`.

The job of the `LoadData` component is to get the data from different JSON objects provided. You can see a **dropdown** on the page where you can choose the dataset.

The job of the `Table` component is to render the data on the page.

For date conversion I am using [`moment.js`](https://momentjs.com/) and [`moment timezone`](https://momentjs.com/timezone/) to avoid any confusion with dates and timezone. It's a very well known library which helps to solve different issues with different timezone. I have not worked with different timezone before but if you guys find any mistakes in conversion then i apologize.

`./services` folder consist of two files. First is `getJsonData.js` which basically is to pull in the data using url provided to the function. The other file has all the helper functions which are being used in the project as per the different requirements.

## Requirements

A: All the requirements have been completed if there is anything missing let me know I can add the missing features.

B: 'success' word has been highlighted.

C: 'fail' and 'error' has been highlighted. Please check `highlightStatus` in `./services/helperFunctions.js`.

D: Raw bytes have been converted to the respective values. Check `bytesToSize` function in `./services/helperFunctions.js` for more details about the code.

E: Dates have been translated to user's timezone using moment JS. Again apologize if something feels wrong. I can fix it if any dates doesn't make sense. Check `getStatus` function in `./services/helperFunctions.js` for more details.

F: Remaining time is converted as well, check `convertSec` function in `./services/helperFunctions.js`

G: If you choose an invalid JSON from the dropdown the page will throw an error telling the user about the invalid JSON, user can change the dataset right away and the state of the app will fix itself. I am not sure what errors are in `test4.json` but if there are some errors let me know i can fix those as well when i get some time. Projects are fun so i can work extra.

H: Primary sort is based on the Inactive tasks and Tasks in progress, the way the sort works is I have given each individual state an order value which i am sorting it later. The secondary sort is based on the Completion date.
