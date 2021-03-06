# hurry-up

The goal of hurry-up is to make sure you are never late to an appointment again. hurry-up allows users to save an appointment and receive a text message reminder when they should leave, based on wherever their location happens to be at that time.

## Installation

1. Install all dependencies (there are many!) - run `npm install`
2. Run rnpm link
2. To run the server - from the root directory do `nodemon server/server.js`

#### Client-side specifics

1. Run `npm start` to start the React Native server.

#### To Simulate App on XCODE
1. To open the project in Xcode:
 1. `open ios/hurryup.xcodeproj`
 2. Or in the command line `react-native run-ios`
2. Click 'Build and Run (PLAY BUTTON)' to open the application in the simulator
 * Immediately got to Debug -> Simulate Location -> San Francisco, CA (or choose other locations). 
 * App will be unable to retrieve location if no location is simulated.
3. This application has only been tested on iPhone 5 and 6 models. 
 * Visual elements will not display correctly on older models.
 * Note: Xcode 7.3 required for IOS 9.3.1 and above to test on iphone directly.

#####Non-platform specific commands:

1. In emulator, ctrl-cmd-Z brings up a popup that allows you to Enable Live Reload.  This will let you edit your code and immediately see the result in the emulator.
2. In emulator, cmd-D it will open a debugger window.


## API's

This project will require developer accounts for two API's: Google Maps for location information, and Twilio to send text messages to users. It should be noted that each trial Twilio account allows texting to a single phone number. Each team member might need to create a separate account for testing purposes.

Once you have created the necessary developer accounts, you will need to create a file called `api_keys.js` within the `server` directory (this file should already be git ignored). This file -- which is required in several places in the back end -- should contain the following information:

```javascript
var API_KEYS = {
 googleAPI: /* INSERT HERE */,
 twilioAccountSid: /* INSERT HERE */,
 twilioAuthToken: /* INSERT HERE */,
 twilioPhoneNumber: /* INSERT HERE */
};
module.exports = API_KEYS;
```
Make sure the Twilio phone number is ten digits, with a leading + sign and no dashes - for example: '+14151234567'

Create Twilio Phone Number

On your account in Twilio, Choose the "Account" menu option off of your account in top right menu.
Should Create Your First Twilio Number button to create a number.  
This will give you a number that will need to be used as the from phone number in the app, currently at server/workers/twilio-api-call.js   There are two types, a real number and a test, the test number only logs to the console.

## Tech Stack

The client side is written entirely in React Native for iOS. The server is written in Node Express and uses the Sqlite database engine, along with the Bookshelf.js ORM and Knex SQL query builder.

##Modules Added
* polyline https://github.com/mapbox/polyline
* Accordion https://www.npmjs.com/package/react-native-accordion
* 

## Added Features
1. Sliding Menu
2. Logout Feature
3. Edit/Delete Events
4. Directions for Events including Map/Route 

## Deployment

The client side cannot be truly deployed to an iPhone without going through the app store approval process. For this reason, the client side must be tested through the Xcode simulator, or on the device through a USB connection.

Our server side code and database is currently deployed to Digital Ocean.
