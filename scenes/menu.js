'use strict';

class Menu extends Phaser.State {
	create () {
        this.background = game.add.sprite(0, game.world.height, 'blue_land');
        this.background.anchor.setTo(0, 1);
        this.title = game.add.text(game.world.centerX, 120, 'Color Swap');
        this.title.font = 'Luckiest Guy';
        this.title.fill = '#FF8181';
        this.title.fontSize = 100;
        this.title.anchor.set(0.5);
        const colorA = 1;
		const colorB = 3;
        this.players = [];
        this.players[0] = new Player(1, colorA);
        this.players[1] = new Player(2, colorB);
        this.skinselector = new SkinSelector(this.players);
    }
    
	update () {
        this.skinselector.update();
        if (this.skinselector.selectionOver) {
            this.state.start('Stage', true, false, this.players);
        }
	}
}
