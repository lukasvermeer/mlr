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
		for (index = 0; split && index < split.length; ++index) { // for each word in the text
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
		var lists = ['0','1','2','3','4','5','6','7','8','9','known','total']; // enum of all lists.
		var listStats = {}; // statistics for each list.
		for (var l in lists) {
			listStats[lists[l]] = {'totalLemmas': 0, 'lemmas': {}, 'totalTokens': 0, 'tokens': []};
		}		
		var stat_mlrws; // the actual mlr value

		for (index = 0; index < this.tokenlist.length; ++index) { // for each word in the text
			var t = this.tokenlist[index].t;
			var l = this.tokenlist[index].getSelectedLemma();
			var f = this.mlr.lemmas[l] || 0;

			if (!this.tokenlist[index].ignore) {
				var list = ['total',f];
				if (f > 0) { list.push('known'); };
				for (var i in list) {
					listStats[list[i]]['totalTokens']++;
					listStats[list[i]]['tokens'].push(t);
				
					if (!listStats[list[i]]['lemmas'][l]) {
						listStats[list[i]]['totalLemmas']++;
						listStats[list[i]]['lemmas'][l] = [t];
					} else {
						listStats[list[i]]['lemmas'][l].push(t);
					}
				}
			}
		}

		for (var i in lists) {
			listStats[lists[i]]['percentageOfTotalTokens'] = listStats[lists[i]]['totalTokens'] / listStats['total']['totalTokens'] * 100 || 0;
			listStats[lists[i]]['percentageOfKnownTokens'] = listStats[lists[i]]['totalTokens'] / listStats['known']['totalTokens'] * 100 || 0;
			listStats[lists[i]]['percentageOfTotalLemmas'] = listStats[lists[i]]['totalLemmas'] / listStats['total']['totalLemmas'] * 100 || 0;
			listStats[lists[i]]['percentageOfKnownLemmas'] = listStats[lists[i]]['totalLemmas'] / listStats['known']['totalLemmas'] * 100 || 0;
		}

		var n = [];
		if (listStats[2]['percentageOfKnownTokens'] < (6 * 1.25)) {
			n[2] = listStats[2]['percentageOfKnownTokens'] / (6 * 1.25);
		} else {
			n[2] = 1;
		}
		if (listStats[3]['percentageOfKnownTokens'] < (2.6 * 1.75)) {
			n[3] = listStats[3]['percentageOfKnownTokens'] / (2.6 * 1.75);
		} else {
			n[3] = 1;
		}
		if (listStats[4]['percentageOfKnownTokens'] < (1.5 * 2)) {
			n[4] = listStats[4]['percentageOfKnownTokens'] / (1.5 * 2);
		} else {
			n[4] = 1;
		}
		if (listStats[5]['percentageOfKnownTokens'] < (1.0 * 3)) {
			n[5] = listStats[5]['percentageOfKnownTokens'] / 3;
		} else {
			n[5] = 1;
		}
		if (listStats[6]['percentageOfKnownTokens'] < (1.0 * 4)) {
			n[6] = (listStats[6]['percentageOfKnownTokens'] / 4) * 1.5;
		} else {
			n[6] = 1.5;
		}
		if (listStats[7]['percentageOfKnownTokens'] < (0.7 * 4)) {
			n[7] = (listStats[7]['percentageOfKnownTokens'] / (0.7 * 4)) * 1.6;
		} else {
			n[7] = 1.6;
		}
		if (listStats[8]['percentageOfKnownTokens'] < (1.0 * 6)) {
			n[8] = (listStats[8]['percentageOfKnownTokens'] / 6) * 4.6;
		} else {
			n[8] = 4.6;
		}
		if (listStats[9]['percentageOfKnownTokens'] < (0.9 * 9)) {
			n[9] = (listStats[9]['percentageOfKnownTokens'] / (0.9 * 9)) * 13.8;
		} else {
			n[9] = 13.8;
		}

		stat_mlrws = 1 + n.reduce(function(acc, val) { return acc + val; }, 0);
	
		// TODO Make this work again, if it turns out I actually need it somewhere.
		//for (index = 1; index <= 9; ++index) {
		//	stat_tokens_cover[index] = stat_percentage_tokens.slice(0, index).reduce(function(acc, val) { return acc + val; }, 0);
		//	stat_lemmas_cover[index] = stat_percentage_lemmas.slice(0, index).reduce(function(acc, val) { return acc + val; }, 0);
		//}
		
		return { mlr: stat_mlrws, lists: listStats };
	}
}