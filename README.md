# angular-vertxbus_removelistener
Reproducer for https://github.com/knalli/angular-vertxbus/issues/52

1. Start MainVertx (the server sends a message every 3 seconds)
2. Open http://localhost:8484/ in the browser
3. Click the button "Register"
4. Restart the server
5. Client automatically reconnects and registers the handler, so far so good
6. CLick the button "Unregister"
7. Issue 1: client still receives messages from the server
8. CLick the button "Unregister" again
9. Issue 2: client produces error a TypeError: Cannot read property 'length' of undefined
    at angular.module.provider.$get.wrapped.registerHandler.deconstructor  (http://localhost:8484/js/angular-vertxbus.js:647:42)
    at unregisterBusListener (http://localhost:8484/js/app.js:62:3)
    at $scope.main.doUnregister (http://localhost:8484/js/app.js:46:7)
