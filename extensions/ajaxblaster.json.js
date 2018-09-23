/****************************************************************************
 * AJAXBlaster JSON Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 ****************************************************************************/

if (!AJAXBlaster)
	console.error("AJAXBlaster must be loaded first!");

AJAXBlaster.addResponseHandler(['json', 'application/json'], function(responseContent){
	return JSON.parse(responseContent);
});

/**
 * Start a GET JSON AJAX call. Assumes a JSON response by default.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The param-value mapping to add to the URL (will be converted).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.jsonGet = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'GET',
		"url": url,
		"data": data,
		"responseType": 'json',
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a DELETE AJAX call. Assumes a JSON response by default.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The param-value mapping to add to the URL (will be converted).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.jsonDel = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'DELETE',
		"url": url,
		"data": data,
		"responseType": 'json',
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a PATCH AJAX call. Assumes a JS Object content and JSON response by default.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The param-value mapping to add to the URL (will be converted).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.jsonPatch = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'PATCH',
		"url": url,
		"data": data,
		"dataType": 'json',
		"responseType": 'json',
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a POST JSON AJAX call. Assumes a JS Object content and JSON response by default.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The data mapping to add as content (see options.data).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.jsonPost = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'POST',
		"url": url,
		"data": data,
		"dataType": 'json',
		"responseType": 'json',
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a PUT JSON AJAX call. Assumes a JS Object content and JSON response by default.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The data mapping to add as content (see options.data).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.jsonPut = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'PUT',
		"url": url,
		"data": data,
		"dataType": 'json',
		"responseType": 'json',
	}, options);
	return AJAXBlaster(opt);
};
