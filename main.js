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



// variables
let wallCount = 1000
function preload() {
    // Load the sprite sheet (provide correct dimensions and frame size)
    this.load.spritesheet('character', '/link.jpg', {
        frameWidth: 25,  // Change this to your frame width
        frameHeight: 35  // Change this to your frame height
    });
    this.load.image('bomb', '/bomb.png')
    this.load.image('wall', '/wall.png')
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

    let wallCountDisplay = this.add.text(0, 20, "Walls: " + wallCount)
    
    //collisions
    // this.physics.add.collider(character, walls)
    this.physics.add.collider(character, walls)

    const collisionDetection = () => {
        console.log("we hit a wall")
    }

    this.physics.add.collider(character, walls, collisionDetection, null, this)

}

function update() {



    character.setVelocityY(0)
    character.setVelocityX(0)

    let topText = this.add.text(0, 0, textContent)
    let pX = character.x
    let pY = character.y
    let playerSpeed = 200
    // Handle movement
    if (this.cursors.left.isDown) {
        character.setVelocityX(-playerSpeed);
    } 
    else if (this.cursors.right.isDown) {
        character.setVelocityX(playerSpeed);
    } else if (this.cursors.up.isDown) {
        character.setVelocityY(-playerSpeed);
    } else if (this.cursors.down.isDown) {
        character.setVelocityY(playerSpeed);
    } 

    const setWalls = () => {
        console.log("We set a wall. we have " + wallCount + " walls left")
        
        walls.create(pX, pY, 'wall').setScale(.25).setSize(25, 25).setOffset(43, 45)
        wallCount--;
    }

    if(this.cursors.space.isDown && wallCount > 0 ) {
       setWalls()
    }




}