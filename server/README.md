# Scripts
`npm run start` - Starts the webpack compiler and runs nodemon to start server, will automatically detect changes
`npm run start-manual` - Start the server without webpack or nodemon

# Dependancies
* body-parser:            Parse HTTP request bodies
* cors:                   Express middleware to enable CORS with various options. (Not sure why we need this...)
* express:                Fast, unopinionated, minimalist web framework for Node.js.
* helmet:                 Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
* mongoose:               ORM library for persisting data with MongoDB

# Development Dependancies
* dotenv:                 Zero-dependency module that loads environment variables from a .env file into process.env. Consider moving this to normal deps
* nodemon:                Automatically restart server on file changes
* nodemon-webpack-plugin: Links webpack into nodemon. Webpack watches your files for changes, and nodemon watches webpack for changes
* ts-loader:              A TypeScript loader for webpack, which helps preprocess TypeScript files to create a JavaScript bundle.
* typescript:             Adds types to javascript
* webpack:                A module bundler, which is capable of transforming, bundling, or packaging just about any resource or asset.
* webpack-cli:            A module that provides a flexible set of commands for developers to increase speed when setting up a custom webpack project.
* webpack-dev-server: 		No clue what this does, maybe remove?
* webpack-node-externals: A module to easily exclude Node.js modules from a webpack bundle.


# To add (maybe)
* morgan (dev dep)
* joi