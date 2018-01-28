'use strict';

class WallChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
		this.typeA = Math.floor(Math.random() * 2);
		this.typeB = Math.floor(Math.random() * 2);
		this.heightA = Math.floor(Math.random() * 3) + 1;
		this.heightB = Math.floor(Math.random() * 3) + 1;
		this.spacing = Math.floor(Math.random() * 3);
	}

	build() {
		for (let i = 0; i < 8; ++i) {
			super.addBlock('grassMid.png', 0, i, 4);
		}
		for (let y = this.heightA; y < 4; ++y) {
			let c = this.typeA === 0 ? this.map.color1 : this.map.color2;
			super.addBlock('brickGrey.png', c, 4 - this.spacing, y);
		}
		for (let y = this.heightB; y < 4; ++y) {
			let c = this.typeB === 0 ? this.map.color1 : this.map.color2;
			super.addBlock('brickGrey.png', c, 5, y);
		}
	}
}
