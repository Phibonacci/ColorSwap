class Loading extends Phaser.State {
	preload () {
		game.load.atlasXML('platformer', 'assets/platformer_complete.png', 'assets/platformer_complete.xml');
		game.load.image('blue_land', 'assets/blue_land.png');
	}
	create () {
		this.state.start('Stage');
	}
	update () {
	}
}
