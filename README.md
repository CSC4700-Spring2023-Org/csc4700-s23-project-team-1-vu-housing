# csc4700-s23-project-team-1-vu-housing
csc4700-s23-project-team-1-vu-housing created by Jimmy Gamboli, Daniel Perez, Rowan Dillon, and Peter Carr

The following describes the steps required to setup and install our application for IOS and Android. 

Make sure to navigate into the VUHousing Folder before executing any commands:

`cd VUHousing`

---
**To run the application on ios:**

Step 1a: install npm dependencies \
`npm install`

-> (If there are missing packages when trying to build the applicaton): \
Step 1b: Manually install Required Packages \
`npm install axios` \
`npm i --save-dev @types/react-progress-button` \
`npm install react-progress-button --save` \
`npm install @react-navigation/native @react-navigation/stack` \
`npm install react-native-animatable` \
`npm install react-native-reanimated` \
`npm install react-native-paper react-native-svg` \

-> (If there is an issue related to a conflicting firebase version): \
Step 1c: Resolve issues with legacy dependencies \
`npm install --legacy-peer-deps` \

Step 3: Switch to the ios directory \
`cd ios` \

Step 4: update cocoapods dependencies (IOS only) \
`pod install` \

Step 5: nativate to the root directory \
`cd ..` \

Step 6: start the application \
`npx react-native run-ios` \

The metro server should start automatically and appear on a second terminal window which can be used to load the application onto an IOS emulator. 

--- 

**To run the application on android:**

Step 1: Verify android device is connected: `adb devices` should show a device as connected. \

Step 2: Reverse android internal development port \
`adb -s <device name> reverse tcp:8081 tcp:8081` \

Step 3: Run `npm install` \
-> (If Build Error occurs, delete /node-modules then run `npm install` again) \
-> (If there is an error building related to conflicting firebase versions, run `npm install --legacy-peer-deps`) \
-> (If there are errors related to missing packages, install the packages mentioned in ios instructions step 1b) \

Step 4: Start Application \
`npx react-native run-android`

If the metro server (there should be a popup window with a metro logo while building) does not start on its own, 
run `npx react-native start` before step 4. 
