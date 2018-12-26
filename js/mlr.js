const Token = function (inToken, mlr) {
  this.t = inToken; // STRING a token
  this.ignore = false; // BOOL should this token be ignored in statistics?
  this.lemmas = (mlr.tokens[inToken] || [inToken]).sort((a, b) => mlr.lemmas[a] - mlr.lemmas[b]); // ARRAY of possible lemmas for this token
  this.selected = 0; // INT which lemma (number) is currently selected
  this.explicitlySelected = false; // BOOL was the currently selected lemma explicitly chosen by the user?
  this.unknown = !mlr.lemmas[this.lemmas[this.lemmas.length - 1]];

  this.setSelected = function (n) {
    if (n < this.lemmas.length) {
      this.selected = n;
      this.explicitlySelected = true;
      this.ignore = false;
    }
  };

  this.getSelectedLemma = function () {
    if (this.lemmas) {
      return this.lemmas[this.selected];
    }
    return `${this.t} [onbekend]`; // lemma unknown
  };

  this.autoSelectLowestFactor = function () {
    if (this.lemmas) {
      let lowestIndex = 0;
      for (let index = 0; index < this.lemmas.length; ++index) {
        if ((mlr.lemmas[this.lemmas[index]] < mlr.lemmas[this.lemmas[lowestIndex]]
          || mlr.lemmas[this.lemmas[lowestIndex]] == 0) && mlr.lemmas[this.lemmas[index]] > 0) {
          lowestIndex = index;
        }
      }
      this.selected = lowestIndex;
    }
  };
};

const Text = function (i_o = '', mlr) {
  this.parseText = function (text) {
    // split text into words
    const split = removeDiacritics(text).trim().toLowerCase().match(/[\w\'\*]+/g);

    // store as a list of tokens with metadata
    const t = [];
    for (let index = 0; split && index < split.length; ++index) { // for each word in the text
      t.push(new Token(split[index], mlr)); // add a token to the array
    }
    return t;
  };

  this.tokenlist = this.parseText(i_o); // ARRAY of TOKEN representing the original tekst

  this.regenerateText = function () { return this.tokenlist.map(x => (x.t)).join(' '); };
  this.generateLemmaText = function () { return this.tokenlist.map(x => (x.getSelectedLemma())).join(' '); };

  this.autoSelectLowestFactors = function () { this.tokenlist.forEach((t) => { t.autoSelectLowestFactor(); }); };
};
