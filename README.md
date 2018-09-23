# AJAXBlaster

Copyright (c) 2018 Matt Tropiano. All rights reserved.

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

## Licensing

This program and the accompanying materials are made available under 
the terms of MIT License.
