class Loading extends Phaser.State {
	preload () {
		game.load.atlasXML('platformer', 'assets/platformer_complete.png', 'assets/platformer_complete.xml');
		game.load.image('blue_land', 'assets/blue_land.png');
		game.load.audio('cheerful_annoyance', 'assets/cheerful_annoyance.ogg');
		game.load.audio('jump1', 'assets/jump1.ogg');
		game.load.audio('jump4', 'assets/jump4.ogg');
	}
	create () {
		this.state.start('Stage');
	}
	update () {
	}
}
