/****************************************************************************
 * AJAXBlaster XML Handler Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6, DOMParser
 * Licensed for use under the MIT License
 ****************************************************************************/

(function($A){

	if (!$A)
	{
		console.error("AJAXBlaster must be loaded first!");
		return;
	}

	if (!DOMParser)
	{
		console.error("DOMParser must be present!");
		return;
	}

	$A.addResponseHandler('xml', function(responseContent, responseType, mimeType){
		return (new DOMParser()).parseFromString(responseContent, mimeType);
	});

	$A.addResponseHandler('text/xml', function(responseContent){
		return (new DOMParser()).parseFromString(responseContent, 'text/xml');
	});

	$A.addResponseHandler('application/xml', function(responseContent){
		return (new DOMParser()).parseFromString(responseContent, 'application/xml');
	});

})(AJAXBlaster);
