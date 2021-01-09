#!/usr/bin/env node

'use strict';

var util = require("util");
var path = require('path');
var fs = require('fs');
var Transform = require("stream").Transform;
var zlib = require('zlib');

// var getStdin = require("get-stdin");

var args = require('minimist')(process.argv.slice(2), {
	boolean: ['help', "in", "out", "compress", "uncompress"],
	string: ['file']
});

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname)

var OUTFILE = path.join(BASE_PATH, "out.txt")

if (args.help) {
	printHelp();
} else if (
	args.in ||
	args._.includes("-")
) {
	processFile(process.stdin);
	// getStdin().then(processFile).catch(error);
}
else if (args.file) {
	let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
	processFile(stream);
} else {
	error('Incorrect usage', true);
}
// ***********

function processFile(inStream) {
	var stream = inStream;
	var outStream;

	if (args.uncompress) {
		let gunzip = zlib.createGunzip();
		stream = stream.pipe(gunzip);
	}

	var upperCaseTr = new Transform({
		transform(chunk, encoding, callback) {
			this.push(chunk.toString().toUpperCase());
			callback();
		}
	});

	stream = stream.pipe(upperCaseTr);

	if (args.compress) {
		OUTFILE = `${OUTFILE}.gz`;
		let gzip = zlib.createGzip();
		stream = stream.pipe(gzip);
	}

	if (args.out) {
		outStream = process.stdout;
	}
	else {
		outStream = fs.createWriteStream(OUTFILE);
	}

	stream.pipe(outStream);
}

function error(msg, includeHelp = false) {
	console.error(msg);
	if (includeHelp) {
		console.log('');
		printHelp();
	}
}

function printHelp() {
	console.log('ex3 usage:');
	console.log('  ex3.js --help={FILENAME}');
	console.log('');
	console.log('--help          		print this help');
	console.log('--file={FILENAME}       process the file');
	console.log('--in, -         		process stdin');
	console.log('--out   				print to stdout');
	console.log('--compress   			gzip the output');
	console.log('--uncompress   		un-gzip the output');
	console.log('');
}
