'use strict';

class BridgeChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
		this.mode = Math.floor(Math.random() * 2);
	}

	build() {
		super.addBlock('grassMid.png', 0, 0, 4);
		super.addBlock('grassRight.png', 0, 1, 4);
		super.addBlock('grassLeft.png', 0, 6, 4);
		super.addBlock('grassMid.png', 0, 7, 4);

		let c = this.mode === 0 ? this.map.color1 : this.map.color2;
		super.addBlock('stoneCliff_left.png', c, 3, 2.5);
		super.addBlock('stoneCliff_right.png', c, 4, 2.5);
	}
}
