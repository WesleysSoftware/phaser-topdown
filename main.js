// Phaser configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // backgroundColor: '#FFF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



const game = new Phaser.Game(config);
let wallCount = 10



function preload() {
    // Load the sprite sheet (provide correct dimensions and frame size)
    this.load.spritesheet('character', '/link.jpg', {
        frameWidth: 25,  // Change this to your frame width
        frameHeight: 35  // Change this to your frame height
    });
    this.load.image('bomb', '/bomb.png')
}

let textContent = 'Zombie Survival 0.0.4'

function create() {
    // Create a sprite using the sprite sheet
    character = this.physics.add.sprite(400, 300, 'character')
    // this.character = this.physics.add.sprite(400, 300, 'character', 0);
    character.setCollideWorldBounds(true)
    // Set initial velocity and collision bounds
    character.setVelocity(0);
    character.setCollideWorldBounds(true);
    // Set up controls
    this.cursors = this.input.keyboard.createCursorKeys();
   
    //walls
    walls = this.physics.add.staticGroup()
    
    //collisions
    this.physics.add.collider(character, walls)
    this.physics.add.collider(walls, character)
}

function update() {

    character.setVelocityY(0)
    character.setVelocityX(0)

    let topText = this.add.text(0, 0, textContent)
    let pX = character.x
    let pY = character.y
    // Handle movement
    if (this.cursors.left.isDown) {
        character.setVelocityX(-160);
    } 
    else if (this.cursors.right.isDown) {
        character.setVelocityX(160);
    } else if (this.cursors.up.isDown) {
        character.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        character.setVelocityY(160);
    } 

    const setWalls = () => {
        console.log("We set a wall. we have " + wallCount + " walls left")
        walls.create(pX, pY).setScale(0.5)
        wallCount--;
    }

    if(this.cursors.space.isDown && wallCount > 0 ) {
       setWalls()
    }

}