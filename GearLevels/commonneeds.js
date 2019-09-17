/*
 * Basic Steps to use this...
 * 1. Goto a Squad Template on swgoh.gg (with 5 characters on it)
 * 2. Right click the page and inspect then click the console tab
 *     or the keyboard shortcut Ctrl Shift J (on Windows) or Cmd Option J (on Mac)
 * 3. Copy this entire script into your copy/paste buffer (ctrl +a then ctrl + c)
 * 4. click the near the > at the bottom of the console and make sure you have a cursor.
 * 5. Paste (ctrl + v) or right click/paste and hit enter.
 * 6. Scroll up if you don't see all the results.  
*/
console.clear();
const list = Array.from(document.querySelector('.content-container-primary').querySelectorAll('.list-group-item'));

console.log(list);

let toon = list[0].innerText.split('·')[0].trim();
let currentGearLevel = 0;
let gearSearchedFor = ["Mk 6 Chiewab Hypo Syringe", "Mk 8 BioTech Implant"]
let data = [];

for (let i = 1;i < list.length;i++)
{
	if (list[i].innerText.match(/Gear Level \d?\d/g)) {
		currentGearLevel = parseInt(list[64].innerText.match(/Gear Level \d?\d/g)[0].match(/\d?\d/g)[0]);
		console.log("currentGearLevel: " + currentGearLevel);
		continue;
	}

	let textArray = list[i].innerText.split("\n");
	for (let gear of gearSearchedFor) {
		let index = textArray.indexOf(gear);
		if (index >= 0) {
			addToData(data, currentGearLevel, textArray[index], textArray[index + 1])
		}
	}

}

function addToData(data, currentGearLevel, gearName, piecesString)
{
	if (!data[currentGearLevel]) {
		data[currentGearLevel] = {};
	}

	let pieces = parseInt(piecesString.match(/\d*/g)[0]);
	if (!data[currentGearLevel][gearName]) {
		data[currentGearLevel][gearName] = 0;
	}

	data[currentGearLevel][gearName] += pieces;
}