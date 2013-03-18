ig.module(
    'game.entities.player'
).requires(
    'impact.entity',
    'game.entities.grenade', // EntityGrenade
    'game.entities.bullet' // EntityBullet
).defines(function() {

    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/player.png', 17, 17),
        size: { x: 11, y: 17 }, // Taille de l'entité (Taille du sprite-Taille des marges)
        offset: { x: 3, y: 0 }, // Marge interne
        flip: false, // Le sprite est il retourné verticalement ?
        maxVel: { x: 100, y: 150 }, // Vitesse maximale
        friction: { x: 600, y: 0 }, // Frottements avec le sol
        jump: 225, // Impulsion du saut
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE, // Laissons le zombie gérer la collision
        collides: ig.Entity.COLLIDES.PASSIVE,
        cooldownGrenadeTimer: new ig.Timer(),
        cooldownFireTimer: new ig.Timer(),
        canFire: true,
        canGrenade: true,
        weapon: 1,
        cooldownFireVisual: new ig.Image("media/cdfire.png"),
        cooldownGrenadeVisual: new ig.Image("media/cdgrenade.png"),
        bullet: new ig.Image("media/bullet.png"),
        grenade: new ig.Image("media/grenade.png"),
        cooldownGrenade: 3.5,
        cooldownFire: 0.35,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.setupAnimations();
        },
        setupAnimations: function() {
            var offset = this.weapon*12;
            // Animations
            this.addAnim('idle', 1, [0+offset]);
            this.addAnim('run', 0.07, [0+offset, 1+offset, 2+offset, 3+offset, 4+offset, 5+offset, 6+offset, 7+offset, 8+offset]);
            this.addAnim('jump', 1, [7+offset]);
            this.addAnim('fall', 0.1, [7+offset, 8+offset]);
        },
        update: function() {
            
            if(this.cooldownGrenadeTimer.delta() >= this.cooldownGrenade) {
                this.canGrenade = true;
            }
            
            if(this.cooldownFireTimer.delta() >= this.cooldownFire) {
                this.canFire = true;
            }
            
            var accel = 350;
            
            // Mouvements
            if (ig.input.state('left')) {
                this.accel.x = -accel;
                this.flip = true;
            } else if (ig.input.state('right')) {
                this.accel.x = accel;
                this.flip = false;
            } else {
                this.accel.x = 0;
            }
            
            // Saut
            if (this.standing && ig.input.pressed('jump')) {
                this.vel.y = -this.jump;
            }

            
            // Grenade
            if(ig.input.pressed('grenade')) {
                if(this.canGrenade) {
                    this.cooldownGrenadeTimer.reset();
                    this.canGrenade = false;
                    ig.game.spawnEntity(EntityGrenade, this.pos.x, this.pos.y, { flip:this.flip });
                }
            }
            
            // Fire
            if(ig.input.pressed('fire')) {
                if(this.canFire) {
                    this.cooldownFireTimer.reset();
                    this.canFire = false;
                    ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, { flip:this.flip });
                }
            }
            
            // Choix de l'animation appropriée
            if(this.vel.y < 0) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.y > 0) {
                this.currentAnim = this.anims.fall;
            } else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            } else {
                this.currentAnim = this.anims.idle;
            }
            
            // Direction du sprite
            this.currentAnim.flip.x = this.flip;
            
            this.parent();
            
        },
        draw: function() {
            this.parent();
            
            if(this.canFire) {
                var heightFire = this.cooldownFireVisual.height;
            } else {
                var cdFirePercent = Math.min(100/this.cooldownFire*Math.min(this.cooldownFireTimer.delta(), this.cooldownFire), 100);
                var heightFire = this.cooldownFireVisual.height*cdFirePercent/100;
            }
            
            if(this.canGrenade) {
                var heightGrenade = this.cooldownGrenadeVisual.height;
            } else {
                var cdGrenadePercent = Math.min(100/this.cooldownGrenade*Math.min(this.cooldownGrenadeTimer.delta(), this.cooldownGrenade), 100);
                var heightGrenade = this.cooldownGrenadeVisual.height*cdGrenadePercent/100;
            }
            
            this.cooldownFireVisual.draw(3, 10, 0, 0, 2, heightFire);
            this.cooldownGrenadeVisual.draw(3, 40, 0, 0, 2, heightGrenade);
            this.bullet.draw(7, 10+(this.cooldownFireVisual.height/2)-(this.bullet.height/2));
            this.grenade.draw(7, 40+(this.cooldownGrenadeVisual.height/2)-(this.grenade.height/2));
        },
        kill: function() {
            
            // Rechargement du niveau lorsque le joueur meurt
            ig.game.currentLevel = "LevelLevel1";
            ig.game.loadLevelDeferred(ig.global.LevelLevel1);
            
            this.parent();
        }
    });
    
});
