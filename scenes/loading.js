class Loading extends Phaser.State {
	preload () {
		console.log("create");
		window.game.load.atlasXML('platformer_complete', '../assets/platformer_complete.png', '../assets/platformer_complete.xml');
		console.log("load");
	}
	create () {
		this.state.start('Stage');
	}
	update () {
	}
}
