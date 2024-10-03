const root = document.documentElement;
const mainWindow = document.querySelector('.main-window');

function changeGradientDirection(direction) {
	root.style.setProperty('--side', direction);

}

const SelectSide = document.getElementById('side');

function updateWindowDimensions() {
	const windowOuterWidth = window.outerWidth;

	root.style.setProperty('--center', windowOuterWidth + 'px')
}

updateWindowDimensions();

window.addEventListener('resize', updateWindowDimensions);



var percentx = 1;
var percenty = 1;
var check = 0;

const intervalID = window.setInterval(myCallback, 50);


SelectSide.addEventListener('change', function(){
const SelectedSide = SelectSide.value;
	console.log(SelectedSide);
	changeGradientDirection(SelectedSide); 
})


function myCallback(){
	const selectedValue = SelectSide.value;


	if(['to left', 'to right'].includes(selectedValue)){
	root.style.setProperty('--moving-x', percentx + '%')
	percentx++;
}

else if(['to top', 'to bottom'].includes(selectedValue)){
	root.style.setProperty('--moving-y', percenty + '%')
	percenty++;
}

}



var rangeColorR = document.getElementById('color-red');
var rangeColorG = document.getElementById('color-green');
var rangeColorB = document.getElementById('color-blue');

function getColorValues(){
	var red = rangeColorR.value;
	var green= rangeColorG.value;
	var blue = rangeColorB.value;	

	root.style.setProperty('--color-red',red );
	root.style.setProperty('--color-green', green);
	root.style.setProperty('--color-blue', blue);

}

getColorValues();

rangeColorR.addEventListener('input', getColorValues);
rangeColorG.addEventListener('input', getColorValues);
rangeColorB.addEventListener('input', getColorValues);


var ColorMS = [];
var ColorSTR = '';
var AddColorButton = document.getElementById('AddColor');

AddColorButton.addEventListener('click', function(){
	var red = parseInt(rangeColorR.value).toString(16).padStart(2, '0');
	var green = parseInt(rangeColorG.value).toString(16).padStart(2, '0');
	var blue = parseInt(rangeColorB.value).toString(16).padStart(2, '0');

	ColorMS.push(red + green + blue);
	

	ColorSTR = '#' + ColorMS.join(', #')

	root.style.setProperty('--color-mass', ColorSTR)
	console.log(ColorSTR);
	console.log(ColorMS);
})

var Reset = document.getElementById('ResetColor');

Reset.addEventListener('click', function(){
	root.style.setProperty('--color-mass', '#f00, #ffa500, #00f, #4b0082, #ee82ee')
})


var Save = document.getElementById('SaveColor');
var Delete = document.getElementById('DeleteColor');

Save.addEventListener('click', function(){
localStorage.setItem('ColorMass', ColorSTR);
})

Delete.addEventListener('click', function(){
	localStorage.removeItem('ColorMass');
})

window.onload = function(){
	var savedColors = localStorage.getItem('ColorMass');

	if(savedColors){
		root.style.setProperty('--color-mass', savedColors);
        ColorMS = savedColors.replace(/#/g, '').split(', ');
        ColorSTR = savedColors;
	}
}