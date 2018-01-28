'use strict';

class EmptyChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
	}

	build() {
		for (let i = 0; i < 8; ++i) {
			super.addBlock('grassMid.png', 0, i, 4);
		}
	}
}
