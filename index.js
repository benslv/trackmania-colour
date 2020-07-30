const fs = require("fs");

const { createCanvas } = require("canvas");
const height = 1;
const width = 1;
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Regex for a valid hexcode string (either 3 or 6 chars).
const hexMatch = RegExp("^(?:[0-9a-fA-F]{3}){1,2}$");

app.get("/", (req, res) => {
	console.log(`Server is running successfully, on port ${port}.`);

	res.sendFile("index.html", { root: __dirname });
});

app.get("/:hexcode.png", (req, res) => {
	const { hexcode } = req.params;

	if (!hexMatch.test(hexcode)) {
		console.log(hexMatch.test(hexcode));
		res.send("Invalid hexcode string. Must be either 3 or 6 characters.");
	}

	// Fill the 1x1 canvas with the hexcode specified.
	context.fillStyle = `#${hexcode}`;
	context.fillRect(0, 0, width, height);

	// Write the canvas information to a jpeg image.
	const buffer = canvas.toBuffer("image/png");
	fs.writeFileSync("./output.png", buffer);

	// Send the resulting image back to the user.
	res.sendFile("output.png", { root: __dirname });
});

app.listen(port, () => console.log(`Colour app is listening at port: ${port}`));
