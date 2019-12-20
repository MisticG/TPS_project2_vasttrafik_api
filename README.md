
# Projektarbete 2 - WIE18G - Create app with Västtrafik API.
We created an app using Typescript/React and nodejs/typescript as our backend. The app lets the user search and display departure/arrival times with the help of Västtrafik API.

The user can...

- select specific transports.
- be able to see the next 3 trips.
- see stops in between the two stops that was chosen.
- see if the current transport is late.

In backend we created a function to handle the tokens. The tokens were used in the requests that were made to the API. The json-file containing all the stops, is updated every 24h with setinterval method.

# How to start the app

1. **$ npm install** in root

2. **$ cd frontend** and run **$ npm install**

3. **$ cd..** and run **$ npm run dev**


if you clone the project from here you should have keys.ts and keys.js inside handlers folder.

