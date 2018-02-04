'use strict';

class Selector {
    constructor(player, skin) {
        this.player = player;
        this.skin = skin;
        this.skin.hover();
        this.text = game.add.text(this.skin.sprite.x, this.skin.sprite.y + this.skin.sprite.height, 'P' + this.player.playerId);
        this.text.anchor.set(0.5, 0);
        this.text.font = 'Luckiest Guy';
        this.text.fill = '#FF8181';
        this.text.fontSize = 70;
        this.skin.taken = true;
        this.cooldown = game.time.now;
    }

    isCooldownOver() {
        return game.time.now > this.cooldown;
    }

    resetCooldown() {
        this.cooldown = game.time.now + 250;
    }

    setSkin(newSkin) {
        if (!this.isCooldownOver()) {
            return;
        }
        this.skin.reset();
        this.skin.taken = false;
        this.skin = newSkin;
        this.skin.hover();
        this.skin.taken = true;
        this.text.x = this.skin.sprite.x;
        this.resetCooldown();
    }

    selectSkin() {
        if (!this.isCooldownOver()) {
            return;
        }
        this.skin.select();
        this.player.color = this.skin.colorId;
        this.resetCooldown();
    }
}