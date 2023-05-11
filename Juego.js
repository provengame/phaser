var config = {
    type: Phaser.AUTO,
    width: 4000,
    height: 2000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ciudad', 'assets/ciudad10.png');
    this.load.image('ground', 'assets/assets2/plataformade8.jpeg');
    this.load.image('flotante', 'assets/assets2/plataforma21.png');
    this.load.image('ball-tlb', 'assets/ball-tlb.png');
    this.load.image('bomb', 'assets/bomb.png');
    
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(1300, 340, 'ciudad');
    
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    
    platforms.create(1000, 568, 'ground').setScale(2).refreshBody();

    platforms.create(3500, 568, 'ground').setScale(2).refreshBody();
    
    
    
    //  Now let's create some ledges
    

    
    platforms.create(200, 200, 'flotante');
    
    platforms.create(2300, 400, 'flotante');
    platforms.create(3500, 200, 'flotante');

    // The player and its settings
    player = this.physics.add.sprite(50, 250, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 10
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

// Crear el grupo de estrellas original
stars = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 600, y: 350, stepX: 110 }
});

// Crear el grupo de estrellas duplicadas
duplicatedStars = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 710, y: 350, stepX: 110 }
    
});


    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { 
        fontSize: '32px', 
        fill: "rgb(41, 198, 238)",
        stroke: "black",
        strokeThickness: 6,
        fontWeight: 900,
    });
    scoreText.setScrollFactor(0);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(duplicatedStars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, duplicatedStars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-300);
        player.anims.play('up', false)
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }

    

    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }

    
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    

    this.cameras.main.scrollX = player.x - 400;
}

function collectStar (player, star, duplicatedStar)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-500,500), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = true;

    this.add
    .text(200, 250, "Game Over", {
        fontSize: "120px",
        fill: "rgb(41, 198, 238)",
        stroke: "black",
        strokeThickness: 7,
        fontWeight: 9000,
        align:'center',
        
        
    })
    .setScrollFactor(0)
    
}

