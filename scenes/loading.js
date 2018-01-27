class Loading extends Phaser.State {
	preload () {
		window.game.load.atlasXML('platformer_complete', '../assets/platformer_complete.png', '../assets/platformer_complete.xml');
	}
	create () {
		this.state.start('Stage');
	}
	update () {
	}
}
