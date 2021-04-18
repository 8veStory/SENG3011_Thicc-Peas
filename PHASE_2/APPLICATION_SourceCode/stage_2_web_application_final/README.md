# SENG3011 Web Application Front End
## How to Run
Following commands start only the front-end. Back-end is still in development.
1. In this directory, run ```npm install```.
2. Run ```npm run```.

The front-end should not be running on port 3000. Access it via ```localhost:3000```.
## Technologies
* React
* Material-UI
## File Structure
* We are using the following file structure (sourced from this [Medium post](https://charles-stover.medium.com/optimal-file-structure-for-react-applications-f3e35ad0a145)): 
```
my-app
├── public                                  # All static files.
│   └── <static files go here...>
└── src
    ├── common                              # Common resources (e.g. css) used across different components.
    ├── routes                              # The main pages (components provided directly to react-routers' <Routes> tags).
    │   └── <route-name>
    │       ├── <route-name>.css
    │       └── <route-name>.js
    ├── components                          # The components that make up each main page.
    │   └── <component-name>
    │       ├── components
    │       │   └── <sub-components go here...>
    │       ├── <component-name>.css
    │       ├── <component-name>.js
    │       └── <component-name>.test.js
    ├── utils                               # Helpful methods/classes that are used globally.
    │   └── <util-name>
    │       ├── <util-name>.js
    │       └── <util-name>.test.js
    ├── images                              # Images used by components or routes.
    │   └── logo.svg
    ├── index.js                            # Entry point.
    └── index.css
```

## Tips for First-time React Contributers
* JSX is different to HTML. E.g. the 'class' attribute is called 'className' instead, and 'for' is called 'htmlFor'. Be careful of this.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
