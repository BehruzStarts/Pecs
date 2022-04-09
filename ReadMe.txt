Setting up the development environment:
    - go to below location, click on "React Native CLI Quickstart" tab, select "Android" for Target OS and follow the setup steps
    - https://reactnative.dev/docs/environment-setup
    - Use VS Code for your IDE

Setup:
    After cloning the repository please follow below steps:
    - go to your projects root directory and run "npm i"

Execution on Emulator:
    - launch your android emulator and run below command in project's root directory
        "npx react-native run-android"
    - the application should run successfully

Execution on physical android device:
    - enable Developer Options and enable USB debugging from your android device's settings
    - connect your android device to the PC through USB cable
    - run this command in project's root directory "npx react-native run-android"

Troubleshooting: 
    - if issues with emulator: you may need to manually download and install intel HAXM
    - if any other issues follow below:
        - run "npx react-native doctor" or "npx @react-native-community/cli doctor" command in project's root directory.
        - This command shows all issues that need to be fixed.
        - Press f to fix the issues and then restart your machine
        - launch the emulator and then run command: "npx react-native run-android"
	
Usefull VS Code extensions:
	- Material Icon Theme
	- Prettier - Code formatter
	- React-Native/React/Redux snippets for es6/es7

Usefull tools:
    - React Native Debuggin tool - https://github.com/jhen0409/react-native-debugger

Generate APK:
    - Get my-upload-key.keystore file from lead developer and paste it in "...\Pecs\android\app"
    - Open terminal and run these commands "cd android && ./gradlew assembleRelease"
    - once the build is successful the apk will be generated in this location "...\Pecs\android\app\build\outputs\apk\release"
