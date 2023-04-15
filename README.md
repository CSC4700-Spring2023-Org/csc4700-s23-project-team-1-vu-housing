# csc4700-s23-project-team-1-vu-housing
csc4700-s23-project-team-1-vu-housing created by Jimmy Gamboli, Daniel Perez, Rowan Dillon, and Peter Carr

Make sure to navigate into the VUHousing Folder before executing run command:
`npx react-native run-ios`

**To run the application on android:** 
Step 1: Verify android device is connected: 
`adb devices` should show a device as connected. 

Step 2: Reverse android internal development port 
`adb -s <device name> reverse tcp:8081 tcp:8081`

Step 3: Run `npm install`
-> If Build Error occurs, delete /node-modules then run `npm install again`

Step 4: Start Application
`npx react-native run-android`

If the metro server (there should be a popup window with a metro logo while building) does not start on its own, 
run `npx react-native start` before step 4. 