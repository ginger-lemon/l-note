# l-note
A lightweight tool for publishing notes.

## What is l-note?

![mockup](https://i.imgur.com/nMvRZpZ.png)

[l-note](l-note-app.web.app/) is a non-login lightweight note tool. 
The main idea refers to [telegra.ph](telegra.ph), basing on its anonymous-publish, l-note adding features such as deleteing notes and password setting in parallel. 
Users can edit can remove notes across devices.

## Features 

### 📝 Edit Mode

- edit: before publish, input can be store in local storage

![publish](https://i.imgur.com/daKZ9oR.gif)

- password: to support editing in different devices

![password](https://i.imgur.com/Kp6Dk5b.gif)

- delete: enable to delete note if knowing password

![delete](https://i.imgur.com/mZXbPoM.gif)

### 📄 Note Mode

- edit verify: user can re-edit the note if having correct password 

![reedit](https://i.imgur.com/pvVcXwN.gif)

### ❌ Error Mode

- error page: direact to edit page

![direct](https://i.imgur.com/YHgHEII.gif)

### 📱 Accross Devices 

- implement the Responsive Web Design (RWD) for mobile users

![rwd](https://i.imgur.com/ZXSHSto.gif)

## Techniques

![structure](https://i.imgur.com/i41Rxjw.png)

l-note uses React and Webpack build the frontend environment; partly features implemented with packages,
such as password encryption and SPA...
local storage stores unpublished data, published notes is stored in cloud database, firestore;
using webpack its and other plugins comes from communities to resolve cross browser issues, modules bundle and optimization;
Jest and React Testing Library for easy component and interface testing;
finally, deploy project to the internet with firebase-hosting.

### Frontend

- HTML
- CSS
- Javascript: ES6(destructuring assignment, arrow functions...)
- React
- React Hooks (useState, useEffect, useContext, custom hooks)

- React Router: implementing SPA
- styled-components: manage style for the component
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

