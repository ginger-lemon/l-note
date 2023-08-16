# l-note
A lightweight tool for publishing notes.

## What is l-note?

[l-note](l-note-app.web.app/) is a non-login lightweight note tool. 
The main idea refers to [telegra.ph](telegra.ph), basing on its anonymous-publish, l-note adding features such as deleteing notes and password setting in parallel. 
Users can edit can remove notes across devices.

## Features 

### 📝 Edit Mode

- edit: before publish, input can be store in local storage
- password: to support editing in different devices
- delete: enable to delete note if knowing password

### 📄 Note Mode

- show note
- edit verity: person can entry edit mode if has correct password

### ❌ Error Mode

- error page: direact to edit page

## Techniques

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
- crytpo-js: using SHA256 to encrypt password value when send data to firestore
  
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

