/**
  * @param {Array} data – массив CSS классов
  */
module.exports = function(data) {
	this.data = data;
	this.weights = [];
	this.itemsCount = 0;
	this.usedNames = {};
	this.result = {};
	this.itemsCount = this.data.length;
	
	
	var sorted = this.data;
	sorted.sort();
	
	var current = null;
	var cnt = 0;
	
	var self = this;
	
	for(var i=0;i<sorted.length;i++) {
		if(sorted[i]!=current) {
			if(cnt>0) {
				this.weights.push({name:current,weight:cnt});
			}
			current = sorted[i];
			cnt=1;
		}
		else {
			cnt++;
		}
	}
	
	this.weights.sort(function(item1,item2){ return item2.weight-item1.weight; });
	
	var generateName = function(nameLength) {
		if(typeof nameLength === "undefined")
		nameLength = 0;
	
		var charsList = 'abcdefghijklmnopqrstuvwxyz';
		var numbersAndSymbols = '0123456789_-';
		
		function getRandomInt(min, max) {
		   return Math.floor(Math.random() * (max - min)) + min;
		}
		
		function getRandomChar(charsList) {
			return charsList.charAt(getRandomInt(0,charsList.length-1));
		}
		
		var charStr = '';
		for(var i=0;i<nameLength-1;i++) {
			charStr+=getRandomChar(charsList+numbersAndSymbols);
		}
		
		var result = getRandomChar(charsList)+charStr;
		
		if(typeof self.usedNames[result] === 'undefined') {
			self.usedNames[result] = 1;
			return result;
		}
		else {
			return generateName(nameLength);
		}
	}
	
	var nameLength = 1;
	var currentWeight = this.weights[0].weight;
	
	for(var key in this.weights) {
		var current = this.weights[key];
		if(current.weight!==currentWeight)
		{
			nameLength++;
			currentWeight = current.weight;
		}
		this.result[current.name] = generateName(nameLength);
	}
	return this.result;
};
