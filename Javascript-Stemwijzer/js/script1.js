// Page content variables
var progBar = document.getElementById("myBar");

var title = document.getElementById('title');
var statement = document.getElementById('statement');

var proBtn = document.getElementById('proBtn');
var ambivalentBtn = document.getElementById('ambivalentBtn');
var contraBtn = document.getElementById('contraBtn');

var opinionContainer = document.getElementById('opinionContainer');
var opinionBtns = document.getElementById('opinionBtns');
var opinions = document.getElementById('opinions');
var proElement = document.getElementById('pro');
var ambivalentElement = document.getElementById('ambivalent');
var contraElement = document.getElementById('contra');

var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');
var col3 = document.getElementById('col3');

var match = document.getElementById('match');

// Logic variables
var statements = [];
var storedStatements = JSON.parse(sessionStorage.getItem('statements'));

// Run this on page load
window.onload = function() {
	pageContents();
};

// Show data on page
function pageContents() {

	// Statements
	for (var i = subjects.length - 1; i >= 0 ; i--) {
		var x = i + 1;
		var page = x.toString();
		var w = 100 / subjects.length;

		if (window.location.href.indexOf(page) > -1) {
			progBar.style.width = x * w + '%';
	    	title.innerHTML = page + '. ' + subjects[i].title;
	    	statement.innerHTML = subjects[i].statement;

	    	if (storedStatements[i] == 'pro') {
	    		proBtn.className = 'w3-button w3-cyan';
	    	} else if (storedStatements[i] == 'ambivalent') {
	    		ambivalentBtn.className = 'w3-button w3-cyan';
	    	} else if (storedStatements[i] == 'contra') {
	    		contraBtn.className = 'w3-button w3-cyan';
	    	}

	    	for (var j = 0; j < 22; j++) {
	    		console.log(j);
	    		if (subjects[i].parties[j].position == 'pro') {
	    			proElement.innerHTML += '<div style="border-bottom: 1px solid black;"><a onclick="toggleExplanation(' + j + ')" style="cursor: pointer;">' + subjects[i].parties[j].name + '</a><br><div id="exp' + j + '" style="display: none;"></div></div>';
	    		} else if (subjects[i].parties[j].position == 'ambivalent') {
	    			ambivalentElement.innerHTML += '<div style="border-bottom: 1px solid black;"><a onclick="toggleExplanation(' + j + ')" style="cursor: pointer;">' + subjects[i].parties[j].name + '</a><br><div id="exp' + j + '" style="display: none;></div></div>';
	    		} else {
	    			contraElement.innerHTML += '<div style="border-bottom: 1px solid black;"><a onclick="toggleExplanation(' + j + ')" style="cursor: pointer;">' + subjects[i].parties[j].name + '</a><br><div id="exp' + j + '" style="display: none;></div></div>';
	    		}

	    		var exp = document.getElementById('exp' + j);
	    		exp.innerHTML += '"' + subjects[i].parties[j].explanation + '"';
	    	}
	    }
	}

	// Important subjects
	if (window.location.href.indexOf('important-subjects') > -1) {
		for (var i = 0; i < 4; i++) {
			col1.innerHTML += '<div style="border-bottom: 1px solid black;"><input id="subject' + i + '" class="w3-check" type="checkbox" name="subject' + i + '"> <label>' + subjects[i].title + '</label><p class="w3-tooltip"><i class="far fa-question-circle"></i><span style="max-height:20vw;max-width:20vw;position:absolute;left:18px;bottom:0;"class="w3-text w3-tag">' + subjects[i].statement + '</span></p></div>';
		}
		for (var i = 4; i < 8; i++) {
			col2.innerHTML += '<div style="border-bottom: 1px solid black;"><input id="subject' + i + '" class="w3-check" type="checkbox" name="subject' + i + '"> <label>' + subjects[i].title + '</label><p class="w3-tooltip"><i class="far fa-question-circle"></i><span style="max-height:20vw;max-width:20vw;position:absolute;left:18px;bottom:0;"class="w3-text w3-tag">' + subjects[i].statement + '</span></p></div>';
		}
		for (var i = 8; i < 12; i++) {
			col3.innerHTML += '<div style="border-bottom: 1px solid black;"><input id="subject' + i + '" class="w3-check" type="checkbox" name="subject' + i + '"> <label>' + subjects[i].title + '</label><p class="w3-tooltip"><i class="far fa-question-circle"></i><span style="max-height:20vw;max-width:20vw;position:absolute;left:18px;bottom:0;"class="w3-text w3-tag">' + subjects[i].statement + '</span></p></div>';
		}
	}

	// Result
	if (window.location.href.indexOf('result') > -1) {
		var sortedParties = parties.sort(dynamicSort("name"));

		for (var i = 0; i < subjects.length; i++) {
			var sortedPartyPositions = subjects[i].parties.sort(dynamicSort("name"));
			//var important = document.getElementById("subject" + i).value;
			//console.log(important);

		    for (var j = 0; j < 22; j++) {
		    	if(storedStatements[i] == 'pro') {
		    		// if important subject pro = +20 ambivalent = +5 contra = 0, else
		    		/* if(important == true) {
		    			if(sortedPartyPositions[j].position == 'pro') {
			    			parties[j].score += 20;
				    	} else
				    	if(sortedPartyPositions[j].position == 'ambivalent') {
				    		parties[j].score += 5;
				    	} else
				    	if(sortedPartyPositions[j].position == 'contra') {
				    		parties[j].score += 0;
				    	} else {
				    		parties[j].score += 0;
				    	}
		    		} else
					*/
			    	if(sortedPartyPositions[j].position == 'pro') {
			    		parties[j].score += 10;
			    	} else
			    	if(sortedPartyPositions[j].position == 'ambivalent') {
			    		parties[j].score += 5;
			    	} else
			    	if(sortedPartyPositions[j].position == 'contra') {
			    		parties[j].score += 0;
			    	} else {
			    		parties[j].score += 0;
			    	}
		    	} else

		    	if(storedStatements[i] == 'ambivalent') {
		    		/* if(important == true) {
		    			if(sortedPartyPositions[j].position == 'pro') {
			    			parties[j].score += 5;
				    	} else
				    	if(sortedPartyPositions[j].position == 'ambivalent') {
				    		parties[j].score += 20;
				    	} else
				    	if(sortedPartyPositions[j].position == 'contra') {
				    		parties[j].score += 5;
				    	} else {
				    		parties[j].score += 0;
				    	}
		    		} else
		    		*/
					if(sortedPartyPositions[j].position == 'pro') {
			    		parties[j].score += 5;
			    	} else
			    	if(sortedPartyPositions[j].position == 'ambivalent') {
			    		parties[j].score += 10;
			    	} else
			    	if(sortedPartyPositions[j].position == 'contra') {
			    		parties[j].score += 5;
			    	} else {
			    		parties[j].score += 0;
			    	}
		    	} else

		    	if(storedStatements[i] == 'contra') {
		    		/* if(important == true) {
		    			if(sortedPartyPositions[j].position == 'pro') {
			    			parties[j].score += 0;
				    	} else
				    	if(sortedPartyPositions[j].position == 'ambivalent') {
				    		parties[j].score += 5;
				    	} else
				    	if(sortedPartyPositions[j].position == 'contra') {
				    		parties[j].score += 20;
				    	} else {
				    		parties[j].score += 0;
				    	}
		    		} else
		    		*/
			    	if(sortedPartyPositions[j].position == 'pro') {
			    		parties[j].score += 0;
			    	} else
			    	if(sortedPartyPositions[j].position == 'ambivalent') {
			    		parties[j].score += 5;
			    	} else
			    	if(sortedPartyPositions[j].position == 'contra') {
			    		parties[j].score += 10;
			    	} else {
			    		parties[j].score += 0;
			    	}
		    	}
			}
		}

		var partyScores = parties.sort(dynamicSort("-score"));

		match.innerHTML = partyScores[0].name;

		for (var j = 0; j < 22; j++) {
			var num = j + 1;
			col1.innerHTML += num + ': ' + partyScores[j].name + '<br>';
		}
	}
}

// Main button functions
function pro() {
	for (var i = subjects.length - 1; i >= 0 ; i--) {
		var x = i + 1;
		var page = x.toString();

		if (window.location.href.indexOf(page) > -1) {
			if (storedStatements == null) {
				statements[i] = 'pro';
				sessionStorage.setItem('statements', JSON.stringify(statements));
			} else {
				storedStatements[i] = 'pro';
				sessionStorage.setItem('statements', JSON.stringify(storedStatements));
			}

			proBtn.className = 'w3-button w3-cyan';
			ambivalentBtn.className = 'w3-button w3-black w3-hover-cyan';
			contraBtn.className = 'w3-button w3-black w3-hover-cyan';
	    }
	}
}

function ambivalent() {
	for (var i = subjects.length - 1; i >= 0 ; i--) {
		var x = i + 1;
		var page = x.toString();

		if (window.location.href.indexOf(page) > -1) {
			if (storedStatements == null) {
				statements[i] = 'ambivalent';
				sessionStorage.setItem('statements', JSON.stringify(statements));
			} else {
				storedStatements[i] = 'ambivalent';
				sessionStorage.setItem('statements', JSON.stringify(storedStatements));
			}

			proBtn.className = 'w3-button w3-black w3-hover-cyan';
			ambivalentBtn.className = 'w3-button w3-cyan';
			contraBtn.className = 'w3-button w3-black w3-hover-cyan';
	    }
	}
}

function contra() {
	for (var i = subjects.length - 1; i >= 0 ; i--) {
		var x = i + 1;
		var page = x.toString();

		if (window.location.href.indexOf(page) > -1) {
			if (storedStatements == null) {
				statements[i] = 'contra';
				sessionStorage.setItem('statements', JSON.stringify(statements));
			} else {
				storedStatements[i] = 'contra';
				sessionStorage.setItem('statements', JSON.stringify(storedStatements));
			}

			proBtn.className = 'w3-button w3-black w3-hover-cyan';
			ambivalentBtn.className = 'w3-button w3-black w3-hover-cyan';
			contraBtn.className = 'w3-button w3-cyan';
	    }
	}
}

// Display opinions list
function toggleOpinions() {
	if (opinions.style.display == 'none') {
		opinionContainer.className += ' w3-container w3-light-gray';
		opinionBtns.className += ' w3-container w3-section';
		opinions.style.display = 'block';
	} else {
		opinionContainer.className -= ' w3-container w3-light-gray';
		opinionBtns.className -= ' w3-container w3-section';
		opinions.style.display = 'none';
	}
}

// Display opinion explanation
function toggleExplanation(id) {
	for (var j = 0; j < 22; j++) {
		var exp = document.getElementById('exp' + j);

	    if (j == id) {
	    	if (exp.style.display == 'none') {
	    		exp.style.display = 'block';
	    	} else {
	    		exp.style.display = 'none';
	    	}
	    }
	}
}

// Sort arrays
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}