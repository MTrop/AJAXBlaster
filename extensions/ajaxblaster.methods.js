/****************************************************************************
 * AJAXBlaster HTTP Method Convenience Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 ****************************************************************************/

if (!AJAXBlaster)
	console.error("AJAXBlaster must be loaded first!");

/**
 * Start an AJAX call.
 * @param method (string) method type (see options.method).
 * @param url (string) Target URL (see options.url).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.call = function(method, url, options){
	let opt = AJAXBlaster.merge({
		"method": method,
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a GET AJAX call.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The param-value mapping to add to the URL (will be converted).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.get = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'GET',
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a DELETE AJAX call.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The param-value mapping to add to the URL (will be converted).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.del = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'DELETE',
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a PATCH AJAX call.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The param-value mapping to add to the URL (will be converted).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.patch = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'PATCH',
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a POST AJAX call.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The data mapping to add as content (see options.data).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.post = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'POST',
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a PUT AJAX call.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The data mapping to add as content (see options.data).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.put = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'PUT',
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

/**
 * Start a HEAD AJAX call.
 * @param url (string) Target URL (see options.url).
 * @param data (Object) The data mapping to add as content (see options.data).
 * @param options (Object) map of options (see main call).
 * @return an AJAXBlaserCall instance.
 */
AJAXBlaster.head = function(url, data, options){
	let opt = AJAXBlaster.merge({
		"method": 'HEAD',
		"url": url,
		"data": data,
	}, options);
	return AJAXBlaster(opt);
};

