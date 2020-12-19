"use strict";

function Cs142TemplateProcessor(template){
	this.template = template;
}
Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
	var hha = this.template;

	var re  = /{{[^{]*}}/g;
	var re1 = /{{day}}/g;


	var match = this.template.match(re);

	var fir, sec, thir;
 

	for(var i = 0; i < match.length; i++) {

		fir = match[i];
	
		
		sec = fir.replace("{{", "");
		sec = sec.replace("}}", "");

		thir = dictionary[sec] ||  '';

		hha = hha.replace(fir, thir);
	    
       }
	return hha;
};