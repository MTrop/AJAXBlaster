/****************************************************************************
 * AJAXBlaster HTTP Method Convenience Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 ****************************************************************************/

(function($A){

	if (!$A)
	{
		console.error("AJAXBlaster must be loaded first!");
		return;
	}

	/**
	 * Start an AJAX call.
	 * @param method (string) method type (see options.method).
	 * @param url (string) Target URL (see options.url).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.call = function(method, url, options){
		let opt = $A.merge({
			"method": method,
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

	/**
	 * Start a GET AJAX call.
	 * @param url (string) Target URL (see options.url).
	 * @param data (Object) The param-value mapping to add to the URL (will be converted).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.get = function(url, data, options){
		let opt = $A.merge({
			"method": 'GET',
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

	/**
	 * Start a DELETE AJAX call.
	 * @param url (string) Target URL (see options.url).
	 * @param data (Object) The param-value mapping to add to the URL (will be converted).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.del = function(url, data, options){
		let opt = $A.merge({
			"method": 'DELETE',
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

	/**
	 * Start a PATCH AJAX call.
	 * @param url (string) Target URL (see options.url).
	 * @param data (Object) The param-value mapping to add to the URL (will be converted).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.patch = function(url, data, options){
		let opt = $A.merge({
			"method": 'PATCH',
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

	/**
	 * Start a POST AJAX call.
	 * @param url (string) Target URL (see options.url).
	 * @param data (Object) The data mapping to add as content (see options.data).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.post = function(url, data, options){
		let opt = $A.merge({
			"method": 'POST',
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

	/**
	 * Start a PUT AJAX call.
	 * @param url (string) Target URL (see options.url).
	 * @param data (Object) The data mapping to add as content (see options.data).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.put = function(url, data, options){
		let opt = $A.merge({
			"method": 'PUT',
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

	/**
	 * Start a HEAD AJAX call.
	 * @param url (string) Target URL (see options.url).
	 * @param data (Object) The data mapping to add as content (see options.data).
	 * @param options (Object) map of options (see main call).
	 * @return an AJAXBlaserCall instance.
	 */
	$A.head = function(url, data, options){
		let opt = $A.merge({
			"method": 'HEAD',
			"url": url,
			"data": data,
		}, options);
		return $A(opt);
	};

})(AJAXBlaster);
