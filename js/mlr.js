var Token = function(i_t, mlr) {
	this.t = i_t; // STRING a token
	this.ignore = false; // BOOL should this token be ignored in statistics?
	this.lemmas = (mlr.tokens[i_t] || [i_t]).sort(function(a,b) {return mlr.lemmas[a]- mlr.lemmas[b]} ); // ARRAY of possible lemmas for this token
	this.selected = 0; // INT which lemma (number) is currently selected
	this.explicitlySelected = false; // BOOL was the currently selected lemma explicitly chosen by the user?
	this.unknown = !mlr.lemmas[this.lemmas[this.selected]];

	this.setSelected = function(n) {
		if(n < this.lemmas.length) {
			this.selected = n;
			this.explicitlySelected = true;
		}
	}

	this.getSelectedLemma = function() {
		if (this.lemmas) {
			return this.lemmas[this.selected];
		} else {
			return this.t+" [onbekend]"; // lemma unknown
		}
	}

	this.autoSelectLowestFactor = function(mlr) {
		if (this.lemmas) {
			var lowestIndex = 0;
			for (index = 0; index < this.lemmas.length; ++index) {
				if ((mlr.lemmas[this.lemmas[index]] < mlr.lemmas[this.lemmas[lowestIndex]] || 
					mlr.lemmas[this.lemmas[lowestIndex]] == 0) && mlr.lemmas[this.lemmas[index]] > 0) {
					lowestIndex = index;
				}
			}
			this.selected = lowestIndex;
		}
	}
}

var Text = function(i_o = "", mlr) {
	this.parseText = function(text) {
		// split text into words
		var split = removeDiacritics(text).trim().toLowerCase().match(/[\w\'\*]+/g);
		
		// store as a list of tokens with metadata
		var t = [];
		for (index = 0; split && index < split.length; ++index) { // for each word in the text
			t.push(new Token(split[index], mlr)); // add a token to the array
		}
		return t;
	}
	
	this.tokenlist = this.parseText(i_o); // ARRAY of TOKEN representing the original tekst
	
	this.regenerateText = function() { return this.tokenlist.map(function(x){return(x.t)}).join(" "); }
	this.generateLemmaText = function() { return this.tokenlist.map(function(x){return(x.getSelectedLemma())}).join(" "); }

	this.autoSelectLowestFactors = function(mlr) { this.tokenlist.forEach(function(t) { t.autoSelectLowestFactor(mlr) }); }
}