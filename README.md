# AJAXBlaster

Copyright (c) 2018 Matt Tropiano. All rights reserved.

## Notice

This README's Documentation is totally incomplete. Sorry.

## Introduction

AJAXBlaster is a reduced set, jQuery-like Ajax utility library for browser JavaScript.

A simple `GET` request can look like:

	$A('/index.html').success((data)=>{
		console.log(data);
	});

The `$A` symbol is the shorthand symbol to AJAXBlaster created when `ajaxblaster.js` is included. This
is completely equivalent to the previous block of code:

	AJAXBlaster('/index.html').success((data)=>{
		console.log(data);
	});

If `$A` got replaced and you wish to restore it, you can restore the previous value of `$A` at the time of
AJAXBlaster's inclusion with:

	AJAXBlaster.noConflict();


## Documentation

### Main Calls

#### AJAXBlaster ( param )

Start an AJAX call. 

```
param:
	(string) URL:
		Makes a GET request with the provided URL.
		Default return handling.
	(Object) map of options:
		method (string): HTTP method.
		url (string): target URL.
		data (VARIES): content to send:
			(Object) 
				If GET/DELETE, turned into params. 
				If POST/PUT/PATCH, submitted in body and reformatted depending on dataType.
			(string) 
				If GET/DELETE, appended as-is as query. 
				If POST/PUT/PATCH, submitted as text, but dataType is now a MIME.
			(ArrayBuffer) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is now a MIME.
			(ArrayBufferView) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is now a MIME.
			(Blob) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is now a MIME.
			(Document) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'text/html'
			(XMLDocument) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'application/xml'
			(HTMLDocument) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'text/html'
			(FormData) 
				If GET/DELETE, discarded. 
				If POST/PUT/PATCH, submitted as-is, but dataType is overridden to 'multipart/form-data'
		dataType (string): If POST/PUT, the type of data referred to as "data". Usually, this is a MIME type.
			'text': Content-Type is set to 'text/plain'. 
				If data is an Object, JSON-stringify. 
				If text, no conversion.
			'form': Content-Type is set to 'application/x-www-form-urlencoded'. 
				If data is an Object, content is converted to a query string. 
				If text, no conversion.
			'json': Content-Type is set to 'application/json'. 
				If data is an Object, JSON-stringify. 
				If text, no conversion.
			Else, 'application/octet-stream'
		responseType (string): 
			What to expect the data back as (either addResponseHandler() typename or MIMEtype override).
			Else, default is null, which will attempt to convert based on content MIME. If that fails, return response as-is.
			'text' and 'text/plain' are already included.
		responseIsSuccess (Boolean): If true, 4XX and 5XX is considered "success.", else 4XX and 5XX is failure.
		headers (Object): Map of HTTP Header name to value.
		async (Boolean): If true, asynchronus. Else, wait until completion.
		user (string): username for authorization.
		password (string): password for authorization.
```

Returns an **AJAXBlasterCall** instance.


#### AJAXBlaster.addResponseHandler ( typeName, func )

Adds a response type handler to AJAXBlaster for one or more types.
If the called function throws an error, the failure path is invoked.

```
typeName:
	(string) the type name for {options.responseType} override or Content-Type MIME type.
	(Array) the list of type names for {options.responseType} override or Content-Type MIME type.
func: 
	(Function) A function that is called for the corresponding type, and is passed:
		responseContent (string) the content buffer from an XHR.
		responseType (string) the responseType from an XHR.
		mimeType (string) the clipped MIME type from an XHR response header (Content-Type).
		charsetType (string) the clipped charset type from an XHR response header (Content-Type).
		responseContentType (string) the content type as-is from an XHR response header (Content-Type).
```

Returns nothing.

#### AJAXBlaster.noConflict ( )

Restores the previous assigning of `$A` on the global context.



### AJAXBlasterCall Prototype 

#### beforeSend ( fn )

#### progress ( fn )

#### success ( fn )

#### failure ( fn )

#### always ( fn )

#### abort ( fn )



### Utility

#### AJAXBlaster.isUndefined ( object )

#### AJAXBlaster.isNull ( object )

#### AJAXBlaster.isType ( object )

#### AJAXBlaster.isNumber ( object )

#### AJAXBlaster.isString ( object )

#### AJAXBlaster.isArray ( object )

#### AJAXBlaster.isFunction ( object )

#### AJAXBlaster.isObject ( object )

#### AJAXBlaster.isBlank ( object )

#### AJAXBlaster.each ( object, function )

#### AJAXBlaster.merge ( object, object )

#### AJAXBlaster.queryString ( object )

#### AJAXBlaster.nanoTime ( )


## Licensing

This program and the accompanying materials are made available under the terms of the MIT License.
