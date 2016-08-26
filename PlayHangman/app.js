$(document).ready(function(){
	// $('h1').text('WANNA GET YOUR HANGMAN ON?');
	$('.getWord').on('click', function(){
		wordGetter(wordsArr);
		$('.hangman > img').attr('src', hangSprite[pictureChanger]);
		placesGenerator(numOfLetsInWord);
		$('button').hide();
		$('.newWord').text('You have ' + numOfGuesses + ' guesses remaining.');
		$('.gameMessages > p').replaceWith('THERE ARE ' + numOfLetsInWord + ' LETTERS IN THE WORD. </br> TO GUESS, PRESS A LETTER ON YOUR KEYBOARD.');

		$(document).on("keydown", function(event) {
			var keyPressed = event.key.toUpperCase();
			if(acceptedEntries.indexOf(keyPressed) !== -1){
				var wordToGuessIndex = wordToGuess.indexOf(keyPressed);
				checkPastEntries(keyPressed);
				checkWordToGuessArray(wordToGuessIndex, keyPressed);
			} else {
				$('.newWord').text( "--  " + keyPressed + "  --" + " is not a letter. Choose a letter.");
			} 	
		});
	});
});


var duplicateKeyEntry = false;
var pictureChanger = 6;
var pastKeysEntered = [];
var numOfGuesses = 6;
var wordToGuess = [];
var correctGuesses = [];
var numOfLetsInWord = 0;
var appendInOneGo = '';
var keyCount = 0;

function checkPastEntries(keyPressed) {
	if(pastKeysEntered.indexOf(keyPressed) === -1) {
		pastKeysEntered.push(keyPressed);
	} else {
		duplicateKeyEntry = true;
	}
	$('.guessedLetters > h5').text("YOU'VE ALREADY SELECTED THESE LETTERS: " + pastKeysEntered);
	$('.guessedLetters > h5').fadeOut(100).fadeIn(100);
}

function checkWordToGuessArray(wordToGuessIndex, keyPressed) {
	if(wordToGuessIndex !== -1) {
		$('.letter' + wordToGuessIndex).text(keyPressed);
		gameWon(keyPressed);
	} else if (wordToGuessIndex === -1) {
		if (duplicateKeyEntry === true){
			return duplicateKeyEntry = false; 
		} else {
			numOfGuesses--
			gameOver();
			$('.newWord').text('You have ' + numOfGuesses + ' guesses remaining.');
			pictureChanger++
			$('.hangman > img').attr('src', hangSprite[numOfGuesses]);
		}
	}
}

function wordGetter(wordsArr) {
	wordToGuess = wordsArr[Math.floor(Math.random() * wordsArr.length)].toUpperCase();
	numOfLetsInWord = wordToGuess.length;
	console.log(wordToGuess);
  	return wordToGuess;
}

function placesGenerator(numOfLetsInWord) {
	for(var i = 0; i < numOfLetsInWord; i++){
		var classMaker = ('letter' + i);
		appendInOneGo += '<span class="blank ' + classMaker + '">#</span>';
	}
	$('.blankLetterHolders').append(appendInOneGo);
}

function gameOver() {
	if(numOfGuesses <= 0){
		$('.gameMessages').remove();
		$('.newWord').remove();
		$('.letters').append("<h1 class='gameMessages alert'>You've been strung-up! What a waste. </br> The word you miserably failed to guess was '" + wordToGuess +  "'. </br> Reload page to play again.</h1>");
		$(document).off();
	}
}

function gameWon(keyPressed) {
	if(correctGuesses.indexOf(keyPressed) === -1) {
		correctGuesses.push(keyPressed);
		console.log(correctGuesses);
	}
	if(correctGuesses.length === numOfLetsInWord){
		$('.gameMessages').remove();
		$('.newWord').remove();
		$('.letters').append("<h1 class='gameMessages alert'>YOU JUST SAVED A LIFE! </br> CONGRATS ON YOUR VICTORY AND MORAL HIGH GROUND.</br> RELOAD PAGE TO PLAY AGAIN.</h1>");
		$(document).off();
	}
}

var acceptedEntries = [
	'A','B','C','D','E','F','G','H','I','J','K',
	'L','M','N','O','P','Q','R','S','T','U','V',
	'W','X','Y','Z'
];

var hangSprite = [
'http://i.imgur.com/KeD9Eo2.png',
'http://i.imgur.com/TUTPR1n.png',
'http://i.imgur.com/eyx4vN3.png',
'http://i.imgur.com/R0C7W0o.png',
'http://i.imgur.com/w7rp7XN.png',
'http://i.imgur.com/84j3rAe.png',
'http://i.imgur.com/LptdExr.png'	
];

var wordsArr = [	
'glance',
'glands',
'glared',
'glazed',
'glazer',
'glazes',
'gleams',
'gleamy',
'grumpy',
'grunts',
'grutch',
'guacos',
'guanos',
'gleamy',
'gleans',
'glider',
'glides',
'padlocks',
'padrones',
'pageboys',
'cadges',
'cadres',
'cagers',
'cagily',
'aftershock',
'artichokes',
'authorizes',
'background',
'bankruptcy',
'binoculars',
'blackhorse',
'blacksmith',
'boyfriends',
'campground',
'clothespin',
'complaints',
'conjugated',
'despicably',
'destroying',
'downstream',
'dumbwaiter',
'duplicates',
'farsighted',
'formidable',
'godparents',
'graciously',
'greyhounds',
'hospitable',
'importance',
'infamously',
'introduces',
'judgmental',
'juxtaposed',
'lawrencium',
'lumberjack',
'malnourish',
'mistakenly',
'monarchist',
'nightmares',
'noticeably',
'pathfinder',
'phlegmatic',
'quadriceps',
'Scunthorpe',
'shockingly',
'slumbering',
'trampoline',
'trapezoids',
'Volkswagen',
'waveringly',
'abolishment',
'atmospheric',
'backgrounds',
'birthplaces',
'campgrounds',
'complainers',
'copyrighted',
'countryside',
'dangerously',
'designatory',
'disgraceful',
'disturbance',
'documentary',
'earthmoving',
'embracingly',
'facetiously',
'filmography',
'fluoridates',
'foremanship',
'geophysical',
'imprudently',
'importances',
'journalized',
'juxtaposing',
'keyboarding',
'lumberjacks',
'misanthrope',
'misanthropy',
'nefariously',
'overstaying',
'palindromes'	
];