/*
 * Basic Steps to use this...
 * 1. Goto the home page of swgoh.gg
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


let list = Array.from(document.querySelectorAll('li .character')).map(toon => { return [
    toon.querySelector('.media-heading h5').innerText,
    toon.querySelectorAll('p strong')[0].innerText
 	];
}, [])
	.sort(function(a, b) {
    return b[1] - a[1];
});


let consoleStyling = 'background: #f3f6fb; color: #253e64; font-size: 18px;'
let consoleTitleLineStyling = 'background: #f3f6fb; color: #253e64;font-weight: 800;font-size: 18px;'
console.log("%Sorted Power\t\t\t\t", consoleTitleLineStyling);
console.log('%c\tPower\tName\t\t\t\t', consoleStyling);
for (let index in list) {
  console.log('%c\t' +  list[index][1] + "\t\t" + list[index][0] + "\t\t\t\t", consoleStyling);
}