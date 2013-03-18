ig.module(
    'game.entities.grenade'
).requires(
    'impact.entity'
).defines(function() {

    EntityGrenade = ig.Entity.extend({
        size: { x: 4, y: 4 },
        offset: { x: 2, y: 2 },
        animSheet: new ig.AnimationSheet('media/grenade.png', 8, 8),
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: { x: 200, y: 200 },
        bounciness: 0.6, // Taux de rebond
        bounceCounter: 0, // Nombre de rebonds effectués
        init: function(x, y, settings) {
            x += settings.flip ? -4 : 7
            this.parent(x, y, settings);
            
            // Impulsion
            this.vel.x = settings.flip ? -this.maxVel.x : this.maxVel.x;
            this.vel.y = -65;
            
            this.addAnim('idle', 0.2, [0, 1]);
        },
        handleMovementTrace: function(res) {
            this.parent(res);
            
            // Si la grenade entre en collision avec un mur
            if (res.collision.x || res.collision.y) {
                
                // On la laisse rebondir
                this.bounceCounter++;
                
                // 3 fois maximum
                if (this.bounceCounter > 3) {
                    
                    // Avant de la détruire
                    this.kill();
                }
            }
        },
        check: function(other) {
            other.kill();
            this.kill();
        },
        kill: function() {
            ig.game.shakeScreenTimer.reset();
            ig.game.shakeScreen = true;
            // Génération de l'explosion
            ig.game.spawnEntity(EntityParticlesEmitter, this.pos.x, this.pos.y, { type: "explosion" });
            this.parent();
        }

    });

});
