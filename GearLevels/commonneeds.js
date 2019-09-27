/*
 * Basic Steps to use this...
 * 1. Goto a Toon Page on swgoh.gg and click Gear Levels
 * 2. Right click the page and inspect then click the console tab
 *     or the keyboard shortcut Ctrl Shift J (on Windows) or Cmd Option J (on Mac)
 * 3. Copy this entire script into your copy/paste buffer (ctrl +a then ctrl + c)
 * 4. click the near the > at the bottom of the console and make sure you have a cursor.
 * 5. Paste (ctrl + v) or right click/paste and hit enter.
 * 6. Scroll up if you don't see all the results.  
 * 7. You can see the list of gear searched for below.
 *    If you want to add more, make sure it's surrounded by "", and get the text from the image alt tag.
*/
console.clear();
let gearSearchedFor = [
	"Mk 6 Chiewab Hypo Syringe Salvage", 
	"Mk 8 BioTech Implant Component", 
	"Mk 3 Czerka Stun Cuffs Salvage", 
	"Mk 9 Kyrotech Battle Computer Prototype Salvage", 
	"Mk 7 Kyrotech Shock Prod Prototype Salvage", 
	"Mk 5 A/KT Stun Gun Prototype Salvage", 
	"Mk 3 Carbanti Sensor Array Salvage",
].sort();

const list = Array.from(document.querySelector('.content-container-primary').querySelectorAll('.list-group-item'));
let toon = list[0].innerText.split('·')[0].trim();
let currentGearLevel = 0;
let data = [];

for (let i = 1;i < list.length;i++)
{
	if (list[i].innerText.match(/Gear Level \d?\d/g)) {
		currentGearLevel = parseInt(list[i].innerText.match(/Gear Level \d?\d/g)[0].match(/\d?\d/g)[0]);
		continue;
	}
	let innerLists = list[i].querySelectorAll('li');
	for (let li of innerLists) {
		let pieceName = li.querySelector('img').alt;
		let pieces = parseInt(li.innerText.match(/\d*/)[0]);

		let index = gearSearchedFor.indexOf(pieceName);
		if (index >= 0) {
			addToData(data, currentGearLevel, pieceName, pieces)
		}
	}
}

function addToData(data, currentGearLevel, gearName, pieces)
{
	if (!data[currentGearLevel]) {
		data[currentGearLevel] = [];
	}

	if (!data[currentGearLevel][gearName]) {
		data[currentGearLevel][gearName] = 0;
	}

	data[currentGearLevel][gearName] += pieces;
}

let consoleStyling = 'background: #f3f6fb; color: #253e64; font-size: 18px;'
let consoleTitleLineStyling = 'background: #f3f6fb; color: #253e64;font-weight: 800;font-size: 18px;'
console.log("%cGear For " + toon + " By Level\t\t", consoleTitleLineStyling);
for (let i = 13;i >= 0;i--) {
  if (data[i]) {
  		console.log('%cGear ' + i + " pieces\tName", consoleStyling)
  	for (let index in data[i]) {
  		console.log('%c\t' +  data[i][index] + "\t\t\t\t" + index + "\t\t\t\t", consoleStyling);
  	}
  }
}
