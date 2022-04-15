QUE.view = {
	shared_lucky_effects : [
		'./assets/img/effects/confetti.png',
		'./assets/img/effects/money_large.png',
		'./assets/img/effects/money_small_01.png',
		'./assets/img/effects/money_small_02.png',
		'./assets/img/effects/flames.gif',
	],
};

QUE.view.audio_background = new Audio();
QUE.view.audio_background.loop = true;

QUE.view.audio_effect     = new Audio();

QUE.view.get_random_item = function( list_name ){
	var list = this[ list_name ];
	return list[ Math.floor( Math.random() * list.length ) ];
};

QUE.view.play_audio_background = function(){
	this.audio_background.setAttribute( 'src', this.get_random_item( 'lucky_audio' ) );
	this.audio_background.load();
	this.audio_background.play();
};

QUE.view.play_audio_effect = function(){
	this.audio_effect.setAttribute( 'src', this.get_random_item( 'audio_effects' ) );
	this.audio_effect.load();
	this.audio_effect.play();
};

QUE.view.search = function(){
	window.open( 'https://www.google.com/search?q=' + this.name + ' ' + $( "#search-bar" ).val(), '_blank' ).focus();
};

QUE.view.feeling_lucky = function(){
	$( "#feeling-lucky" ).css( 'background-image', 'url(' + this.get_random_item( 'lucky_gifs' ) + ')');
	$( "#feeling-lucky" ).show();
	this.play_audio_background();
};

QUE.view.stop_feeling_lucky = function(){
	$( "#feeling-lucky" ).hide();
	this.audio_background.pause();
};

QUE.view.draw = function(){
	var search = this.this_str + '.search();';
	$( "#content" ).html(
		'<div id="search-options">' +
			QUE.search_options.map(function( option ){
				var key = option.key || option.name;
				return '<img src="./assets/img/search_options/' + key + '.png" onclick="QUE.views.' + key + '.draw();" />';
			}).join('') +
		'</div>' +
		'<div id="search-container" onclick="' + this.this_str + '.play_audio_effect();">' +
			'<img src="./assets/img/title/' + this.name.split(' ').join('_').toLowerCase() + '.png" />' +
			'<input id="search-bar" onkeyup="if( event.keyCode == 13 ) ' + search + '"></input>' +
			'<button onclick="' + search + '">'                         + this.search_button + '</button>' +
			'<button onclick="' + this.this_str + '.feeling_lucky();">' + this.lucky_button  + '</button>' +
		'</div>' +
		'<div id="feeling-lucky" onclick="' + this.this_str + '.stop_feeling_lucky();">' + 
			'<img class="confetti"          src="./assets/img/effects/confetti.png"       />' +
			'<img class="money-large"       src="./assets/img/effects/money_large.png"    />' +
			'<img class="money-small-left"  src="./assets/img/effects/money_small_01.png" />' +
			'<img class="money-small-right" src="./assets/img/effects/money_small_02.png" />' +
			'<img class="flames"            src="./assets/img/effects/flames.gif"         />' +
			( this.lucky_effects || [] ).map(function( effect ){
				return '<img class="' + effect.classes + '" src="' + effect.path + '" />';
			}).join('') +
		'</div>'
	);
};