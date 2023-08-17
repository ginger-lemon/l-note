# l-note
A lightweight tool for publishing notes.

## What is l-note?

![mockup](https://i.imgur.com/nMvRZpZ.png)

[l-note](l-note-app.web.app/) is a non-login lightweight note tool. 
The main idea is inspired by [telegra.ph](telegra.ph), building upon its anonymous publishing feature. l-note adds additional features like note deletion and password protection in parallel. Users can edit can remove notes across devices.

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

### 📱 Accross Devices 

- Implemented Responsive Web Design (RWD) for mobile users.

![rwd](https://i.imgur.com/ZXSHSto.gif)

## Techniques

![structure](https://i.imgur.com/Mw2gcoM.png)

l-note uses React and Webpack to build the frontend environment, with certain features implemented using packages such as password encryption and SPA. Unpublished data is stored in local storage, while published notes are stored in the cloud database, firestore. Webpack and other plugins sourced from the community are utilized to address cross-browser compatibility issues, bundle modules, and optmize the project. For easy component and interface testing, Jest and React Testing Library are employed. Finally, the project is deployed to the internet with using Firebase Hosting.


### Frontend

- HTML
- CSS
- Javascript: ES6(destructuring assignment, arrow functions...)
- React
- React Hooks (useState, useEffect, useContext, customized hooks)
- React Router: for implementing SPA
- styled-components: manage style for components
- react-markdown: supporting easy markdown
- crypto-js: using SHA256 to encrypt password value when send data to firestore

  
### Data Storage

- firebase-firestore: cloud data storage
- local storage: web api, to store user's input in edit mode
- react-markdown: easy markdown type support

### Testing 

Easy components, feature, and context testing.
- Jest
- React Testing Library


### Development Tools 

- git/GitHub: version control and CI/CD
- Webpack: environment configure, bundle Javascript, optimization

