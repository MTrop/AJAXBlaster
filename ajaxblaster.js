/****************************************************************************
 * AJAXBlaster by Matt Tropiano (C) 2018
 * Requires ECMAScript 6, XMLHttpRequest
 * Licensed for use under the MIT License
 ****************************************************************************/

(function(_CTX)
{
	/***** Test Browser Capabilities *****/
	
	if (!XMLHttpRequest)
	{
		console.error("Missing required object type: XMLHttpRequest.");
		return;
	}

	/***** END Test Browser Capabilities *****/

	let CURRENTAJAX = _CTX.$A;

	let Util = {
		'isUndefined': function(obj) {
			return (typeof obj) === 'undefined';
		},
		'isNull': function(obj) {
			return obj === null;
		},
		'isType': function(obj, type) {
			return Object.prototype.toString.call(obj) === '[object '+type+']';
		},
		'isNumber': function(obj) {
			return Util.isType(obj, 'Number');
		},
		'isString': function(obj) {
			return Util.isType(obj, 'String');
		},
		'isArray': function(obj) {
			return Util.isType(obj, 'Array');
		},
		'isFunction': function(obj) {
			return Util.isType(obj, 'Function');
		},
		'isObject': function(obj) {
			return Util.isType(obj, 'Object');
		},
		'isBlank': function(obj) {
			return 
				(typeof obj) === 'undefined' || 
				obj === null || 
				obj === 0 || 
				(Util.isArray(obj) && obj.length === 0) || 
				(Util.isNumber(obj) && isNaN(obj)) || 
				(Util.isString(obj) && obj.trim().length === 0);
		},
		'each': function(list, func) {
			for (let x in list) if (list.hasOwnProperty(x))
				if (func(list[x], x, list.length))
					break;
		},
		'merge': function(base, add) {
			let out = {};
			if (!base) base = {};
			if (!add) add = {};
			Util.each(base, (value, key) => {
				if (Util.isUndefined(add[key]))
					out[key] = value;
				else
					out[key] = add[key];
			});
			Util.each(add, (value, key) => {
				if (Util.isUndefined(base[key]))
					out[key] = value;
			});
			return out;
		},
		'queryString': function(map, extend) {
			let accum = [];
			if (extend)
				accum.push('');
			Util.each(map, (value, key)=>{
				if (Util.isArray(value))
				{
					for (let i = 0; i < value.length; i++)
					{
						accum.push(accum.length === 0 ? '?' : '&');
						accum.push(encodeURIComponent(key));
						accum.push('=');
						accum.push(encodeURIComponent(value[i]));
					}
				}
				else
				{
					accum.push(accum.length === 0 ? '?' : '&');
					accum.push(encodeURIComponent(key));
					accum.push('=');
					accum.push(encodeURIComponent(value));
				}
			});
			return accum.join('');
		},
	};

	// Nano time.
	Util.nanoTime = (function(){
		// Webkit Browser
		if (performance)
		{
			return function() 
			{
				// ms to ns (us res)
				return parseInt(performance.now() * 1e6, 10);
			};	
		}
		else
		{
			return function()
			{
				// ms to ns (ms res)
				return Date.now() * 1e6;
			};
		}
	})();

	/*** Handlers of responses. ***/

	let DEFAULTRESPONSETYPE_HANDLER = function(responseType, responseContent) 
	{
		if (!Util.isString(responseContent))
			return Object.prototype.toString.call(responseContent);
		else
			return responseContent;
	};
	
	// Private list of response type handlers.
	let RESPONSETYPE_HANDLERS = {
		"text": DEFAULTRESPONSETYPE_HANDLER,
		"text/plain": DEFAULTRESPONSETYPE_HANDLER
	};
	
	/*** Main Object ***/

	let AJAXBlasterCall = function(xhr, opt, body)
	{
		// callbacks
		this.beforeSendFunc = null;
		this.progressFunc = null;
		this.successFunc = null;
		this.failureFunc = null;
		this.alwaysFunc = null;
		this.abortFunc = null;
		
		xhr.addEventListener("progress", (event)=>{
			if (this.progressFunc) 
				this.progressFunc((event.lengthComputable ? event.loaded / event.total : 0), xhr, event);
		});
		xhr.addEventListener("error", (event)=>{
			if (this.failureFunc) 
				this.failureFunc(xhr.status, xhr.statusText, xhr, event);
		});
		xhr.addEventListener("abort", (event)=>{
			if (this.abortFunc) 
				this.abortFunc(xhr, event);
		});
		xhr.addEventListener("load", (event)=>{
			
			let c = parseInt(xhr.status / 100, 10);

			// Bad Response
			if ((c === 4 || c === 5) && !opt.responseIsSuccess)
			{
				if (this.failureFunc) 
					this.failureFunc(xhr.status, xhr.statusText, xhr, event);
				return;
			}
			
			if (this.successFunc)
			{
				try {
					const CHARSET = 'charset=';
					let responseContentType = xhr.getResponseHeader('Content-Type');

					let idx = responseContentType.indexOf(';');
					let mimeType = idx >= 0 ? responseContentType.substring(0, idx) : responseContentType;

					let charsetIdx = responseContentType.indexOf(CHARSET);
					let charsetType = charsetIdx >= 0 ? responseContentType.substring(charsetIdx+CHARSET.length, responseContentType.length).trim() : null;

					let typeName = opt.responseType || mimeType;

					let res = xhr.response;
					if (RESPONSETYPE_HANDLERS[typeName])
						res = RESPONSETYPE_HANDLERS[typeName](xhr.response, xhr.responseType, mimeType, charsetType, responseContentType);
					this.successFunc(res, xhr.status, xhr.statusText, xhr, event);
				} catch (err) {
					if (this.failureFunc) 
						this.failureFunc(null, null, xhr, event, err);
				}
			}
		});
		xhr.addEventListener("loadend", (event)=>{
			if (this.alwaysFunc) 
				this.alwaysFunc(xhr, event);
		});

		let SEND_FUNC = ()=>{
			try {
				if (this.beforeSendFunc) 
					this.beforeSendFunc(xhr);
				xhr.send(body);
			} catch (err) {
				if (this.failureFunc) 
					this.failureFunc(null, null, xhr, event, err);
				if (this.alwaysFunc) 
					this.alwaysFunc(event, xhr);
			}
		};
		
		// Delay send - user may be setting fields on this object, await event yield.
		setTimeout(SEND_FUNC, 0);
	};
	
	/**
	 * Sets the function to invoke right before the request is sent.
	 * @param func (Function) a function that takes:
	 *		xhr (XMLHttpResponse): the actual XMLHttpResponse object.
	 * @return itself for chaining.
	 */
	AJAXBlasterCall.prototype.beforeSend = function(func){
		this.beforeSendFunc = func;
		return this;
	};

	/**
	 * Sets the function to invoke on progress updates (if supported).
	 * @param func (Function) a function that takes:
	 *		percent (Number): percent progress.
	 *		xhr (XMLHttpResponse): the actual XMLHttpResponse object.
	 *		event (ProgressEvent): the actual Event object.
	 * @return itself for chaining.
	 */
	AJAXBlasterCall.prototype.progress = function(func){
		this.progressFunc = func;
		return this;
	};

	/**
	 * Sets the function to invoke on successful finish.
	 * @param func (Function) a function that takes:
	 *		data (Varies): the returned data, altered by expected type.
	 *		status (Number): the status code.
	 *		statusText (string): the status text.
	 *		xhr (XMLHttpResponse): the actual XMLHttpResponse object.
	 *		event (ProgressEvent): the actual Event object.
	 * @return itself for chaining.
	 */
	AJAXBlasterCall.prototype.success = function(func){
		this.successFunc = func;
		return this;
	};

	/**
	 * Sets the function to invoke on failure.
	 * @param func (Function) a function that takes:
	 *		status (Number): the status code (can be null if thrown error).
	 *		statusText (string): the status text (can be null if thrown error).
	 *		xhr (XMLHttpResponse): the actual XMLHttpResponse object.
	 *		event (ProgressEvent): the actual Event object.
	 *		err (Error): JS error object if error.
	 * @return itself for chaining.
	 */
	AJAXBlasterCall.prototype.failure = function(func){
		this.failureFunc = func;
		return this;
	};

	/**
	 * Sets the function to always invoke, be it success, failure, or aborted call.
	 * @param func (Function) a function that takes:
	 *		xhr (XMLHttpResponse): the actual XMLHttpResponse object.
	 *		event (ProgressEvent): the actual Event object.
	 * @return itself for chaining.
	 */
	AJAXBlasterCall.prototype.always = function(func){
		this.alwaysFunc = func;
		return this;
	};

	/**
	 * Sets the function to invoke on abort.
	 * @param func (Function) a function that takes:
	 *		xhr (XMLHttpResponse): the actual XMLHttpResponse object.
	 *		event (ProgressEvent): the actual Event object.
	 * @return itself for chaining.
	 */
	AJAXBlasterCall.prototype.abort = function(func){
		this.abortFunc = func;
		return this;
	};
	
	/*** Globals ***/

	let OPTIONS_DEFAULTS = {
		"data": null,
		"dataType": 'form',
		"responseType": null,
		"headers": {},
		"responseIsSuccess": false,
		"async": true,
		"user": null,
		"password": null,
	};
	
	/**
	 * Start an AJAX call.
	 * @param param 
	 * (string) URL:
	 *		Makes a GET request with the provided URL.
	 *		Default return handling.
	 * (Object) map of options:
	 *		method (string): HTTP method.
	 *		url (string): target URL.
	 *		data (VARIES): content to send:
	 *			(Object) 
	 *				If GET/DELETE, turned into params. 
	 *				If POST/PUT/PATCH, submitted in body and reformatted depending on dataType.
	 *			(string) 
	 *				If GET/DELETE, appended as-is as query. 
	 *				If POST/PUT/PATCH, submitted as text, but dataType is now a MIME.
	 *			(ArrayBuffer) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is now a MIME.
	 *			(ArrayBufferView) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is now a MIME.
	 *			(Blob) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is now a MIME.
	 *			(Document) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'text/html'
	 *			(XMLDocument) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'application/xml'
	 *			(HTMLDocument) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'text/html'
	 *			(FormData) 
	 *				If GET/DELETE, discarded. 
	 *				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'multipart/form-data'
	 *		dataType (string): If POST/PUT, the type of data referred to as "data". Usually, this is a MIME type.
	 *			'text': Content-Type is set to 'text/plain'. 
	 *				If data is an Object, JSON-stringify. 
	 *				If text, no conversion.
	 *			'form': Content-Type is set to 'application/x-www-form-urlencoded'. 
	 *				If data is an Object, content is converted to a query string. 
	 *				If text, no conversion.
	 *			'json': Content-Type is set to 'application/json'. 
	 *				If data is an Object, JSON-stringify. 
	 *				If text, no conversion.
	 *			Else, 'application/octet-stream'
	 *		responseType (string): 
	 *			What to expect the data back as (either addResponseHandler() typename or MIMEtype override).
	 *			Else, default is null, which will attempt to convert based on content MIME. If that fails, return response as-is.
	 *			'text' and 'text/plain' are already included.
	 *		responseIsSuccess (Boolean): If true, 4XX and 5XX is considered "success.", else 4XX and 5XX is failure.
	 *		headers (Object): Map of HTTP Header name to value.
	 *		async (Boolean): If true, asynchronus. Else, wait until completion.
	 *		user (string): username for authorization.
	 *		password (string): password for authorization.
	 * @return an AJAXBlasterCall instance.
	 */
	_CTX.AJAXBlaster = function(param){
		let options = null;
		
		if (Util.isString(param))
			options = {
				"method": 'GET', 
				"url": param
			};
		else if (Util.isObject(param))
			options = param;
		
		if (!options.method)
			options.method = 'GET';
		else
			options.method = options.method.toUpperCase();
		
		options.url = options.url || '#';
		
		let opt = Util.merge(OPTIONS_DEFAULTS, options);
		let url = opt.url;
		let body = null;
		
		if (!Util.isNull(opt.data) && !Util.isUndefined(opt.data))
		{
			if (Util.isObject(opt.data))
			{
				if (opt.method === 'GET' || opt.method === 'DELETE')
				{
					let qs = Util.queryString(opt.data, url.indexOf('?') >= 0);
					url = url + qs;
				}
				else
				{
					if (opt.dataType === 'text')
					{
						body = Util.queryString(opt.data).substring(1);
						opt.headers['Content-Type'] = 'text/plain';
					}
					else if (opt.dataType === 'json')
					{
						body = JSON.stringify(opt.data);
						opt.headers['Content-Type'] = 'application/json';
					}
					else if (opt.dataType === 'form')
					{
						body = Util.queryString(opt.data).substring(1);
						opt.headers['Content-Type'] = 'application/x-www-form-urlencoded';
					}
				}
			}
			else if (Util.isString(opt.data) || Util.isType(opt.data, 'DOMString'))
			{
				if (opt.method === 'GET' || opt.method === 'DELETE')
					url = url + qs;
				else
				{
					body = opt.data;
					opt.headers['Content-Type'] = opt.dataType || 'application/octet-stream';
				}
			}
			else if (Util.isType(opt.data, 'ArrayBuffer'))
			{
				if (!(opt.method === 'GET' || opt.method === 'DELETE'))
				{
					body = opt.data;
					opt.headers['Content-Type'] = opt.dataType || 'application/octet-stream';
				}
			}
			else if (Util.isType(opt.data, 'ArrayBufferView'))
			{
				if (!(opt.method === 'GET' || opt.method === 'DELETE'))
				{
					body = opt.data;
					opt.headers['Content-Type'] = opt.dataType || 'application/octet-stream';
				}
			}
			else if (Util.isType(opt.data, 'Blob'))
			{
				if (!(opt.method === 'GET' || opt.method === 'DELETE'))
				{
					body = opt.data;
					opt.headers['Content-Type'] = opt.dataType || 'application/octet-stream';
				}
			}
			else if (Util.isType(opt.data, 'Document') || Util.isType(opt.data, 'HTMLDocument'))
			{
				if (!(opt.method === 'GET' || opt.method === 'DELETE'))
				{
					body = opt.data;
					opt.headers['Content-Type'] = 'text/html';
				}
			}
			else if (Util.isType(opt.data, 'XMLDocument'))
			{
				if (!(opt.method === 'GET' || opt.method === 'DELETE'))
				{
					body = opt.data;
					opt.headers['Content-Type'] = 'application/xml';
				}
			}
			else if (Util.isType(opt.data, 'FormData'))
			{
				if (!(opt.method === 'GET' || opt.method === 'DELETE'))
				{
					body = opt.data;
					opt.headers['Content-Type'] = 'multipart/form-data';
				}
			}
		}
		
		let xhr = new XMLHttpRequest();
		// open connection.
		xhr.open(opt.method, url, opt.async, opt.user, opt.password);
		if (opt.headers) Util.each(opt.headers, (value, key)=>{
			xhr.setRequestHeader(key, value);
		});
		return new AJAXBlasterCall(xhr, opt, body);
	};

	/**
	 * Access to common utilities.
	 */
	Util.each(Util, (func, name) => {
		_CTX.AJAXBlaster[name] = func;
	});

	/**
	 * Adds a response type handler to AJAXBlaster for one or more types.
	 * If called function throws an error, the failure path is invoked.
	 * @param typeName 
	 *		(string) the type name for {options.responseType} override or Content-Type MIME type.
	 *		(Array) the list of type names for {options.responseType} override or Content-Type MIME type.
	 * @param func (Function): A function that is called for the corresponding type, and is passed:
	 * 		responseContent (string) the content buffer from an XHR.
	 * 		responseType (string) the responseType from an XHR.
	 *		mimeType (string) the clipped MIME type from an XHR response header (Content-Type).
	 *		charsetType (string) the clipped charset type from an XHR response header (Content-Type).
	 * 		responseContentType (string) the content type as-is from an XHR response header (Content-Type).
	 */
	_CTX.AJAXBlaster.addResponseHandler = function(typeName, func) {
		if (Util.isArray(typeName))
		{
			for (let i = 0; i < typeName.length; i++)
				RESPONSETYPE_HANDLERS[typeName[i]] = func;
		}
		else
		{
			RESPONSETYPE_HANDLERS[typeName] = func;
		}
	};

	/**
	 * Restore the previous assigning of $A on the context.
	 */
	_CTX.AJAXBlaster.noConflict = function() {
		_CTX.$A = CURRENTAJAX;
	};

})(this);
var $A = $A || AJAXBlaster;
