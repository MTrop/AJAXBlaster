/****************************************************************************
 * AJAXBlaster [HT|X]ML Handler Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6, DOMParser
 * Licensed for use under the MIT License
 ****************************************************************************/

if (!AJAXBlaster)
	console.error("AJAXBlaster must be loaded first!");
if (!DOMParser)
	console.error("DOMParser must be present!");

AJAXBlaster.addResponseHandler('html', function(responseContent, responseType, mimeType){
	return (new DOMParser()).parseFromString(responseContent, mimeType);
});

AJAXBlaster.addResponseHandler('text/html', function(responseContent){
	return (new DOMParser()).parseFromString(responseContent, 'text/html');
});
