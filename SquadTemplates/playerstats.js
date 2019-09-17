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
function getStars(cellData) {
	if (!cellData.innerText.match(/^\d\*/g)) {
	 	return 0;
	}
	return cellData.innerText.slice(0,1);
}
function getGearLevel(cellData) {
	if (!cellData.innerText.match(/^\d\*/g)) {
	 	return 0;
	}
	return parseInt(cellData.innerText.slice(2).match(/G\d+/g)[0].slice(1));
}
function getZetas(cellData) {
	if (!cellData.innerText.match(/^\d\*/g)) {
	 	return 0;
	}
	return parseInt(cellData.innerHTML.match(/zeta/g).length - 1);
}
const allRows = Array.from(document.querySelectorAll('.rt-tr-group'));
const data = allRows.map((row) => {
	let cells = row.querySelectorAll('.rt-td');
	return [{
		//cells,
		name: cells[0].querySelector('a').innerText,
		powerLevel: parseInt(cells[1].innerText.replace(",", "")),
		stars: [
			getStars(cells[2]),
			getStars(cells[3]),
			getStars(cells[4]),
			getStars(cells[5]),
			getStars(cells[6]),

		],
		gearLevels: [
			getGearLevel(cells[2]),
			getGearLevel(cells[3]),
			getGearLevel(cells[4]),
			getGearLevel(cells[5]),
			getGearLevel(cells[6]),
		],
		zetas: [
			getZetas(cells[2]),
			getZetas(cells[3]),
			getZetas(cells[4]),
			getZetas(cells[5]),
			getZetas(cells[6]),
		],
	}];
});

let gear = data.reduce((total, player) => {
	if (!player[0].gearLevels) {
		return total;
	}
	var lowestGearLevel = Math.min(...player[0].gearLevels);
	if (!total[lowestGearLevel]) {
		total[lowestGearLevel] = [];
	} 
	total[lowestGearLevel].push(player[0].name);
	return total;
}, []); 

let stars = data.reduce((total, player) => {
	if (!player[0].stars) {
		return total;
	}
	var lowestGearLevel = Math.min(...player[0].stars);

	if (!total[lowestGearLevel]) {
		total[lowestGearLevel] = [];
	} 
	total[lowestGearLevel].push(player[0].name);
	return total;
}, []); 

let zetas = data.reduce((total, player) => {
	if (!player[0].zetas) return total;
	const playerZetas = player[0].zetas.reduce((a,b) => a + b);
	if (!total[playerZetas]) {
		total[playerZetas] = [];
	}
	total[playerZetas].push(player[0].name);
	return total;
},{});

let powerLevel = data.reduce((total, player) => {
	if (!player[0].powerLevel || player[0].powerLevel <= 0) return total;
	let nearest10k = parseInt(player[0].powerLevel / 10000) * 10000;
	if (!total[nearest10k]) {
		total[nearest10k] = [];
	}
	total[nearest10k].push(player[0].name);
	return total;
},{});


let consoleStyling = 'background: #f3f6fb; color: #253e64; font-size: 12px;'
let consoleTitleLineStyling = 'background: #f3f6fb; color: #253e64;font-weight: 800;font-size: 12px;'
console.log("%cPlayers Lowest Gear Level\t\t", consoleTitleLineStyling);
console.log("%cGear Level\tPlayer List\t", consoleStyling)
for (let i = 13;i >= 0;i--) {
  if (gear[i]) {
  	console.log('%c' + i + "\t\t\t" + gear[i].join(', ') + "\t\t\t\t", consoleStyling);
  }
}
console.log("\n");
console.log("\n");
console.log("%cLowest Star Count for all 5 Toons\t\t", consoleTitleLineStyling);
console.log("%cStar Count\tPlayers\t", consoleStyling)
for (let i = 7;i >= 0;i--) {
  if (stars[i]) {
  	console.log('%c' + i + "\t\t\t" + stars[i].join(', ') + "\t\t\t\t", consoleStyling);
  }
}
console.log("\n");
console.log("\n");
console.log("%cZetas per player\t\t\t\t", consoleTitleLineStyling);
console.log("%cZeta Count\tNumber of Players\t", consoleStyling)
for (let i = 15;i >= 0;i--) {
  if (zetas[i]) {
  	console.log('%c' + i + "\t\t\t" + zetas[i].join(', ') + "\t\t\t\t", consoleStyling);
  }
}
console.log("\n");
console.log("\n");
console.log("%cPlayers by Powerlevel (by 10k)\t\t\t\t", consoleTitleLineStyling);
console.log("%cPower Level\tNumber of Players\t\t", consoleStyling)
for (let i = 200000;i >= 0;i-=10000) {
  if (powerLevel[i]) {
  	console.log('%c' + i + "\t\t" + powerLevel[i].join(', ') + "\t\t\t\t", consoleStyling);
  }
}
