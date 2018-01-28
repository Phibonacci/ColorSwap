'use strict';

class WallChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
		this.mode = Math.floor(Math.random() * 2);
		this.width = Math.floor(Math.random() * 2) + 1;
	}

	build() {
		for (let i = 0; i < 8; ++i) {
			super.addBlock('grassMid.png', 0, i, 4);
		}
		for (let x = 3; x < 5; ++x) {
			for (let y = 0; y < 4; ++y) {
				super.addBlock('brickGrey.png', this.mode === 0 ? this.map.color1 : this.map.color2, x, y);
			}
		}
	}
}
