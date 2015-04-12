'use strict';

angular.module('myApp', [ 'ngRoute', 'knalli.angular-vertxbus' ]).config(
		[ '$routeProvider', 'vertxEventBusProvider',
				function($routeProvider, vertxEventBusProvider) {
					$routeProvider.when('/', {
						templateUrl : 'views/main.html',
						controller : 'MainCtrl'
					})

					vertxEventBusProvider.enable().useReconnect();
				} ]);

angular.module('myApp').controller(
		'MainCtrl',
		[
				'$scope',
				'vertxEventBusService',
				function($scope, vertxEventBusService) {
					$scope.main = this;
					$scope.main.state = 'disconnected';

					$scope.$on('vertx-eventbus.system.disconnected', function(
							event) {
						$scope.main.state = 'disconnected';
						console.log('disconnected');
					});

					$scope.$on('vertx-eventbus.system.connected', function(
							event) {
						$scope.main.state = 'connected';
						console.log('connected');

						// unregister current listener
						unregisterBusListener(vertxEventBusService);

						// register Listener
						registerBusListener(vertxEventBusService);
					});
				} ]);

var unregisterfn = null;

function registerBusListener(vertxEventBusService) {
	unregisterfn = vertxEventBusService.on('inbound.test', function(message) {
		console.log('<<<<<<<<<< ', message);
	});
	console.log('Listener registered');
}

function unregisterBusListener(vertxEventBusService) {
	if (typeof unregisterfn === 'function') {
		vertxEventBusService.removeListener('inbound.test', unregisterfn);
		console.log('Listener unregistered');
	}
}