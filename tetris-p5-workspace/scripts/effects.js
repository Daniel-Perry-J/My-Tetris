// effects.js
// Special effects for Tetris game using p5.js

let effects = [];

class FlashEffect {
    constructor(duration = 20, color = [255, 255, 255]) {
        this.duration = duration;
        this.timer = duration;
        this.color = color;
    }
    update() {
        this.timer--;
    }
    draw() {
        if (this.timer > 0) {
            push();
            noStroke();
            fill(this.color[0], this.color[1], this.color[2], map(this.timer, 0, this.duration, 0, 180));
            rect(0, 0, width, height);
            pop();
        }
    }
    isDone() {
        return this.timer <= 0;
    }
}

class ExplosionParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = random(-4, 4);
        this.vy = random(-4, 4);
        this.life = 30 + random(10);
        this.color = color;
        this.size = random(8, 16);
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.92;
        this.vy *= 0.92;
        this.life--;
    }
    draw() {
        push();
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], map(this.life, 0, 40, 0, 255));
        ellipse(this.x, this.y, this.size);
        pop();
    }
    isDone() {
        return this.life <= 0;
    }
}

class ComboTextEffect {
    constructor(x, y, text, color = [255, 255, 0]) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.timer = 40;
    }
    update() {
        this.y -= 1;
        this.timer--;
    }
    draw() {
        push();
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(this.color[0], this.color[1], this.color[2], map(this.timer, 0, 40, 0, 255));
        text(this.text, this.x, this.y);
        pop();
    }
    isDone() {
        return this.timer <= 0;
    }
}

// Call this in your draw loop
function updateAndDrawEffects() {
    for (let i = effects.length - 1; i >= 0; i--) {
        effects[i].update();
        effects[i].draw();
        if (effects[i].isDone()) {
            effects.splice(i, 1);
        }
    }
}

// Utility functions to trigger effects
function triggerFlash() {
    effects.push(new FlashEffect());
}

function triggerExplosion(x, y, color = [255, 200, 50]) {
    for (let i = 0; i < 24; i++) {
        effects.push(new ExplosionParticle(x, y, color));
    }
}

function triggerComboText(x, y, comboCount) {
    let text = comboCount > 1 ? `COMBO x${comboCount}!` : 'NICE!';
    effects.push(new ComboTextEffect(x, y, text));
}

// Example usage in your game logic:
// triggerFlash(); // For big events (e.g., Tetris, all-clear)
// triggerExplosion(x, y, [255, 100, 100]); // For line clears or big combos
// triggerComboText(x, y, comboCount); // For combos

// Export for use in other scripts
window.updateAndDrawEffects = updateAndDrawEffects;
window.triggerFlash = triggerFlash;
window.triggerExplosion = triggerExplosion;
window.triggerComboText = triggerComboText;

export {
    FlashEffect,
    ExplosionParticle,
    ComboTextEffect,
    updateAndDrawEffects,
    triggerFlash,
    triggerExplosion,
    triggerComboText
};