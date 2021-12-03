var exec = require('cordova/exec');
var channel = require('cordova/channel');
var BaseAd = function() {
	this.channels = {};
};

BaseAd.prototype = {
	_eventHandler: function(event) {
		if (event && (event.type in this.channels)) {
				this.channels[event.type].fire(event);
		}
	},
	on: function(type, func) {
			if (!(type in this.channels)) {
					this.channels[type] = channel.create(type);
			}
			this.channels[type].subscribe(func);
			return this;
	},
};

var Clipboard = function() { BaseAd.call(this); };
Clipboard.prototype = new BaseAd();

Clipboard.copy = function(text, cb) {
	var ad = new Clipboard();
	exec(cb, cb, "Clipboard", "copy", [text]);
	return ad;
}

Clipboard.paste = function(cb) {
	var ad = new Clipboard();
	// var cb = function(event) {
	// 	ad._eventHandler(event);
	// };
	exec(cb, cb, "Clipboard", "paste", []);
	return ad;
}

// /**
//  * Clipboard plugin for Cordova
//  *
//  * @constructor
//  */
// function Clipboard () {}

/**
 * Sets the clipboard content
 *
 * @param {String}   text      The content to copy to the clipboard
 * @param {Function} onSuccess The function to call in case of success (takes the copied text as argument)
 * @param {Function} onFail    The function to call in case of error
 */
// Clipboard.prototype.copy = function (text, onSuccess, onFail) {
//     if (typeof text === "undefined" || text === null) text = "";
// 	cordova.exec(onSuccess, onFail, "Clipboard", "copy", [text]);
// };

/**
 * Gets the clipboard content
 *
 * @param {Function} onSuccess The function to call in case of success
 * @param {Function} onFail    The function to call in case of error
 */
// Clipboard.prototype.paste = function (onSuccess, onFail) {
// 	cordova.exec(onSuccess, onFail, "Clipboard", "paste", []);
// };

// Register the plugin
// var clipboard = new Clipboard();
// module.exports = clipboard;
module.exports = {
	Clipboard: Clipboard
}
