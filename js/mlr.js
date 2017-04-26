(function() {
	$.getJSON("data/mlr.json", function( json ) {
		mlr = json;
	});
})();

var Token = function(i_t, mlr) {
	this.t = i_t; // STRING a token
	this.mlr = mlr; // REFERENCE to an MLR data Object
	this.ignore = false; // BOOL should this token be ignored in statistics?
	this.lemmas = this.mlr.tokens[i_t] || this.mlr.lemmas[i_t]; // ARRAY of possible lemmas for this token
	this.selected = 0; // INT which lemma (number) is currently selected

	this.setSelected = function(n) { if(n < this.lemmas.length) { this.selected = n; } }

	this.getSelectedLemma = function() {
		if (this.lemmas) {
			return this.lemmas[this.selected];
		} else {
			return this.t+" [onbekend]"; // lemma unknown
		}
	}

	this.autoSelectLowestFactor = function() {
		if (this.lemmas) {
			var lowestIndex = 0;
			for (index = 0; index < this.lemmas.length; ++index) {
				if ((this.mlr.lemmas[this.lemmas[index]] < this.mlr.lemmas[this.lemmas[lowestIndex]] || 
					this.mlr.lemmas[this.lemmas[lowestIndex]] == 0) && this.mlr.lemmas[this.lemmas[index]] > 0) {
					lowestIndex = index;
				}
			}
			this.setSelected(lowestIndex);
		}
	}

	this.autoSelectHighestFactor = function() {
		if (this.lemmas) {
			var highestIndex = 0;
			for (index = 0; index < this.lemmas.length; ++index) {
				if (this.mlr.lemmas[this.lemmas[index]] > this.mlr.lemmas[this.lemmas[highestIndex]]) {
					highestIndex = index;
				}
			}
			this.setSelected(highestIndex);
		}
	}
}

var Text = function(i_o = "", mlr) {
	this.originalText = i_o; // STRING the original text 
	this.mlr = mlr; // REFERENCE to an MLR data Object
	
	this.parseText = function(text) {
		// split text into words
		var split = text.trim().toLowerCase().match(/[\w\']+/g);
		
		// store as a list of tokens with metadata
		var t = [];
		for (index = 0; index < split.length; ++index) { // for each word in the text
			t.push(new Token(split[index], mlr)); // add a token to the array
		}
		return t;
	}
	
	this.tokenlist = this.parseText(this.originalText); // ARRAY of TOKEN representing the original tekst
	
	this.regenerateText = function() { return this.tokenlist.map(function(x){return(x.t)}).join(" "); }
	this.generateLemmaText = function() { return this.tokenlist.map(function(x){return(x.getSelectedLemma())}).join(" "); }

	this.autoSelectLowestFactors = function() { this.tokenlist.forEach(function(t) { t.autoSelectLowestFactor() }); }
	this.autoSelectHighestFactors = function() { this.tokenlist.forEach(function(t) { t.autoSelectHighestFactor() }); }
	
	this.generateMlrStats = function() {
		// TODO this thing is a hairy and literal translation from PHP. Could use some cleaning up.
		var cnt_tokens = 0; // the amount not ignored of tokens in the text
		var cnt_unique_tokens = 0; // the amount of unique tokens in the text
		var cnt_unique_lemmas = 0; // the amount of unique lemmas in the text
		var cnt_unique_lemmas_list_null = 0; // the amount of unique lemmas in the text from list 0 (unknown);
		var cnt_ignored_tokens = 0; // the amount of ignored tokens in the text
		var cnt_ignored_lemmas = 0; // the amount of ignored lemmas	
		var cnt_unknown_tokens = 0; // the amount of tokens that are not known
	
		// list variables
		var lemma_list = {}; // list of lists of counters per lemma sorted by factor
		var token_list = {}; // list of lists of counters per lemma sorted by factor
		var ignored_lemmas_list = [];
	
		// stat variables
		var stat_percentage_tokens = []; // the percentage of tokens from list [i]
		var stat_percentage_lemmas = []; // the percentage of lemmas from list [i]
		var stat_mlrws; // the actual mlr value
		var stat_tokens_cover = []; // the coverage of the text by tokens from list [i]
		var stat_lemmas_cover = [];	 // the coverage of the text by lemmas from list [i]

		for (index = 0; index < this.tokenlist.length; ++index) { // for each word in the text
			var t = this.tokenlist[index].t;
			var l = this.tokenlist[index].getSelectedLemma();
			var f = this.mlr.lemmas[l] || 0;
		
			// count ignored
			if (this.tokenlist[index].ignore) {
				cnt_ignored_tokens++;
				f = 10;
			}
			else {
				cnt_tokens++;
			}
		
			// count unknown
			if (f == 0) {
				cnt_unknown_tokens++;
			}
			
			// for lemma_list
			if (lemma_list[f] && lemma_list[f][l]) {
				lemma_list[f][l].push(t);
			} else {
				if (!lemma_list[f]) { lemma_list[f] = {}; }
				if (!lemma_list[f][l]) { lemma_list[f][l] = []; }
				lemma_list[f][l].push(t);
				cnt_unique_lemmas++;
				if (f == 0) {
					cnt_unique_lemmas_list_null++;
				}
				if (!lemma_list[f]["__total__"]) { lemma_list[f]["__total__"] = 0; }
				lemma_list[f]["__total__"]++;
			}
		
			// for token_list
			if (token_list[f] && token_list[f][t]) {
				token_list[f][t].push(t);
			} else {
				if (!token_list[f]) { token_list[f] = {}; }
				if (!token_list[f][t]) { token_list[f][t] = []; }
				token_list[f][t].push(t);
				cnt_unique_tokens++;
			}
			if (!token_list[f]["__total__"]) { token_list[f]["__total__"] = 0; }
			token_list[f]["__total__"]++;
		}

		for (index = 1; index <= 9; ++index) {
			if (!token_list[index]) { token_list[index] = {}; }
			if (!lemma_list[index]) { lemma_list[index] = {}; }
			var ct = cnt_tokens - cnt_unknown_tokens;
			var cl = cnt_unique_lemmas - cnt_unique_lemmas_list_null;
			if (ct == 0) {
				stat_percentage_tokens[index] = 0;
			}
			else {
				stat_percentage_tokens[index] = (token_list[index]["__total__"] / ct) * 100 || 0;
			}
			if (cl == 0) {
				stat_percentage_lemmas[index] = 0;
			}
			else {
				stat_percentage_lemmas[index] = (lemma_list[index]["__total__"] / cl) * 100 || 0;
			}
		}

		var n = [];
		if (stat_percentage_tokens[2] < (6 * 1.25)) {
			n[2] = stat_percentage_tokens[2] / (6 * 1.25);
		} else {
			n[2] = 1;
		}
		if (stat_percentage_tokens[3] < (2.6 * 1.75)) {
			n[3] = stat_percentage_tokens[3] / (2.6 * 1.75);
		} else {
			n[3] = 1;
		}
		if (stat_percentage_tokens[4] < (1.5 * 2)) {
			n[4] = stat_percentage_tokens[4] / (1.5 * 2);
		} else {
			n[4] = 1;
		}
		if (stat_percentage_tokens[5] < (1.0 * 3)) {
			n[5] = stat_percentage_tokens[5] / 3;
		} else {
			n[5] = 1;
		}
		if (stat_percentage_tokens[6] < (1.0 * 4)) {
			n[6] = (stat_percentage_tokens[6] / 4) * 1.5;
		} else {
			n[6] = 1.5;
		}
		if (stat_percentage_tokens[7] < (0.7 * 4)) {
			n[7] = (stat_percentage_tokens[7] / (0.7 * 4)) * 1.6;
		} else {
			n[7] = 1.6;
		}
		if (stat_percentage_tokens[8] < (1.0 * 6)) {
			n[8] = (stat_percentage_tokens[8] / 6) * 4.6;
		} else {
			n[8] = 4.6;
		}
		if (stat_percentage_tokens[9] < (0.9 * 9)) {
			n[9] = (stat_percentage_tokens[9] / (0.9 * 9)) * 13.8;
		} else {
			n[9] = 13.8;
		}

		stat_mlrws = 1 + n.reduce(function(acc, val) { return acc + val; }, 0);
	
		for (index = 1; index <= 9; ++index) {
			stat_tokens_cover[index] = stat_percentage_tokens.slice(0, index).reduce(function(acc, val) { return acc + val; }, 0);
			stat_lemmas_cover[index] = stat_percentage_lemmas.slice(0, index).reduce(function(acc, val) { return acc + val; }, 0);
		}
		
		return {
			mlr: stat_mlrws,
			lemmas: lemma_list,
			tokens: token_list,
			stat_percentage_tokens: stat_percentage_tokens,
			stat_percentage_lemmas: stat_percentage_lemmas,
			stat_tokens_cover: stat_tokens_cover,
			stat_lemmas_cover: stat_lemmas_cover
			};
	}
}