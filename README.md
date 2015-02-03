# app-browserify

A simple project following discussion https://github.com/bendrucker/discuss/issues/7

## Installation
```bash
npm install && bower install
```

## Context
This simple project, uses browerify and angular, as well as an external library (yoobic-angular-core) that was build also using browserify + angular.

This external library contains a single service  `yoobic.angular.core.directiveBinder` exposing a simple `add` function

When first opening `index.html`, the app will display a `Welcome, 12 + 14 = 26` message.

## Usage
```bash
gulp browserify
```

This will create a single bundled file `./dist/bundle.js`

You can now open `index.html` in the browser

## Reproducting the issues
Go to `./node_modules/yoobic-angular-core/package.json` and change 
```js
"browserify-shim": {
    "angular": {
      "exports": "global:angular"
    }
```
to
```js
"browserify-shim": {
    "angular": {
      "exports": "angular"
    }
```

Try `gulp browserify`.
You will get the following error:
```bash
Browserify failed
 ENOENT, open '/app-browserify/node_modules/yoobic-angular-core/bower_components/angular/angular.js'
```

This suggest that browserify is looking for angular inside the submodule instead of de-duping from the parent module location


Now still in `./node_modules/yoobic-angular-core` let's run the following:

```bash
cd ./node_modules/yoobic-angular-core
bower init
bower install --save angular
cd ../..
```
Rerun `gulp browserify`

This time you don't get an error but if you look at the console of the web page you will see the following:
```
WARNING: Tried to load angular more than once.
```

So you end up with 2 identical versions (bower.json of app and submodules are stricly identical) of angular in your bundle files.

The issue is not specific to angular, it will happen with any bower package used in both parent and sub module.



