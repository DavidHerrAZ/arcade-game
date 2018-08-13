// Player class to initiate, update, and render any object
class  Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Player {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x = -100, y = 60, sprite = 'images/enemy-bug.png', speed = 200) {
        super(x,y);
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.checkBoundary()) {
            this.x += this.speed * dt;
        } else {
            this.reset();
        }
    }

    checkBoundary() {
        return this.x < 500;
    }

    reset() {
        this.x = this.enemyXstart();
        this.y = this.enemyYstart();
        this.speed = this.enemySpeed();
    }

    enemyXstart() {
        // Creates a random starting position 1-2 blocks
        // outside the left boundary of the canvas
        return Math.floor(Math.random() * -101) - 100;
    }

    enemyYstart() {
        // Creates a random starting position for the Y-axis
        // within the 3 rows of stone pavers
        return 60 + (Math.floor(Math.random() * 3) * 83);
    }

    enemySpeed() {
        // Creates a random speed between 100dt and 700dt
        return Math.floor(Math.random() * 601) + 100;
    }
}

// Now write your own player class
// This class requires an update() and
// a handleInput() method.
class Hero extends Player {
    constructor(x = 100 * 2, y = 81 * 5, sprite = 'images/char-boy.png') {
        super(x,y);
        this.sprite = 'images/char-boy.png';
    }

    handleInput(keyPressed) {
        if (keyPressed === 'left' && this.checkLeft()) {
            this.x -= 100;
        } else if (keyPressed === 'right' && this.checkRight()) {
            this.x += 100;
        } else if (keyPressed === 'down' && this.checkDown()) {
            this.y += 83;
        } else if (keyPressed === 'up' && this.checkUp()) {
            this.y -= 83;
        } else {
            // trap to prevent Hero from moving on other key presses
            // do nothing
        }
    }

    checkLeft() {
        return this.x > 0;
    }

    checkRight() {
        return this.x < 400;
    }

    checkUp() {
        return this.y > 0;
    }

    checkDown() {
        return this.y < 405;
    }

    update() {
        const yOffset = 13;
        let yCollision = this.y - yOffset;
        const xOffset = 50;

        for (let enemy of allEnemies) {
            if (yCollision === enemy.y && (enemy.x + xOffset > this.x && enemy.x < this.x + xOffset)) {
                this.reset();
            }
        }
        this.checkWin();
    }

    checkWin() {
        if (this.y === -10) {
            this.playerWin();
        }
    }

    playerWin() {
        alert('You won the game!');
        this.reset();
    }

    reset() {
        this.x = 100 * 2
        this.y = 81 * 5
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(Enemy.prototype.enemyXstart(),Enemy.prototype.enemyYstart(),undefined,Enemy.prototype.enemySpeed());
const enemy2 = new Enemy(Enemy.prototype.enemyXstart(),Enemy.prototype.enemyYstart(),undefined,Enemy.prototype.enemySpeed());
const enemy3 = new Enemy(Enemy.prototype.enemyXstart(),Enemy.prototype.enemyYstart(),undefined,Enemy.prototype.enemySpeed());
const enemy4 = new Enemy(Enemy.prototype.enemyXstart(),Enemy.prototype.enemyYstart(),undefined,Enemy.prototype.enemySpeed());
const enemy5 = new Enemy(Enemy.prototype.enemyXstart(),Enemy.prototype.enemyYstart(),undefined,Enemy.prototype.enemySpeed());
const allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5);
const player = new Hero();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

