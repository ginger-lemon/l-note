# l-note
A lightweight tool for publishing notes.

## What is l-note?

![mockup](https://i.imgur.com/nMvRZpZ.png)

[l-note](https://l-note-app.web.app/) is a non-login lightweight note tool. 
The main idea is inspired by [telegra.ph](https://telegra.ph), building upon its anonymous publishing feature. l-note adds additional features like note deletion and password protection in parallel. Users can edit can remove notes across devices.

## Getting Started 

### Prerequisites

Before running the application, make sure you have the following installed:

- node.js: v18.16.0
- npm: v9.5.1

### Available Script 

- `npm install` to install dependencies for the app after cloning the repository.
- `npm start` to run the app in the development mode.
- `npm test` to test the app.
- `npm run build` to build the app in the production mode.

## Techniques

![structure](https://i.imgur.com/Mw2gcoM.png)

l-note uses React and Webpack to build the frontend environment, with certain features implemented using packages such as password encryption and SPA. Unpublished data is stored in local storage, while published notes are stored in the cloud database, firestore. Webpack and other plugins sourced from the community are utilized to address cross-browser compatibility issues, bundle modules, and optmize the project. For easy component and interface testing, Jest and React Testing Library are employed. Finally, the project is deployed to the internet with using Firebase Hosting.


### Frontend

- HTML
- CSS
- Javascript: ES6(destructuring assignment, arrow functions...)
- React ![image](https://github.com/ginger-lemon/l-note/assets/134685249/d7516740-d8ec-439f-a64c-2c574c15fffc)
- React Hooks (useState, useEffect, useContext, customized hooks)
- React Router: for implementing SPA  ![](https://camo.githubusercontent.com/a66197314a02337d55def7211a433d87e5bcc7aeccb17fd09c8dfc47b4d95009/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72656163742d726f757465722d646f6d2e7376673f7374796c653d666c61742d737175617265)
- styled-components: manage style for components ![](https://github.com/ginger-lemon/l-note/assets/134685249/11a4692f-8c99-4db7-81c7-e2b2eb31478e)

- react-markdown: supporting easy markdown
- crypto-js: using SHA256 to encrypt password value when send data to firestore

  
### Data Storage

- firebase-firestore: cloud data storage
- local storage: web api, to store user's input in edit mode
- react-markdown: easy markdown type support

### Testing 

Easy components, feature, and context testing.
- Jest ![](https://camo.githubusercontent.com/9d823e30179e43b1d7d9f4ced26c51b08465b6a5379bbdf52f3d26f312713f8e/68747470733a2f2f62616467652e667572792e696f2f6a732f6a6573742e737667)
- React Testing Library ![](https://camo.githubusercontent.com/9305b48aaffa2ed6e0ce152bf1935db82b4de37e2de2c8a4da8a69b7d65f6d0a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f4074657374696e672d6c6962726172792f72656163742e7376673f7374796c653d666c61742d737175617265)


### Development Tools 

- git/GitHub: version control and CI/CD
- Webpack: environment configure, bundle Javascript, optimization ![](https://camo.githubusercontent.com/dcf3110e99c354b13ab7d252b5141df6f9c69710b4d1a6c5194089a5c7b82ff1/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7765627061636b2e737667)


## Features 

### 📝 Edit Mode

- Edit: Before publishing, input can be stored in local storage.

![publish](https://i.imgur.com/daKZ9oR.gif)

- Password: To support editing on different devices.

![password](https://i.imgur.com/Kp6Dk5b.gif)

- Delete: Enable to deletion of a note if the password is known.

![delete](https://i.imgur.com/mZXbPoM.gif)

### 📄 Note Mode

- Edit Verification: Users can re-edit the note if they have the correct password. 

![reedit](https://i.imgur.com/pvVcXwN.gif)

### ❌ Error Mode

- Error Page: Redirect to the edit page.

![direct](https://i.imgur.com/YHgHEII.gif)

### 📱 Across Devices 

- Implemented Responsive Web Design (RWD) for mobile users.

![rwd](https://i.imgur.com/ZXSHSto.gif)


## Development Diary

You can check the weekly diary here: [development record](https://ginger-lemon.medium.com/list/ec709041c5be)
