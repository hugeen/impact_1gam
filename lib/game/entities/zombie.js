ig.module(
    'game.entities.zombie'
).requires(
    'impact.entity'
).defines(function() {

    EntityZombie = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/zombies.png', 17, 17),
        size: { x: 11, y: 17 },
        offset: { x: 3, y: 0 },
        maxVel: { x: 100, y: 100 },
        flip: false,
        friction: { x: 300, y: 0 },
        speed: 10, // Vitesse de déplacement
        health: 100,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A, // Gère la collision avec le joueur
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
            this.zombieType = Math.floor(Math.random()*5);
            var offset = this.zombieType*7;
            
            // Animation
            this.addAnim('walk', 0.075, [0+offset, 1+offset, 2+offset, 3+offset, 4+offset, 5+offset]);
            
        },
        update: function() {
            
            // Determiner la vitesse et la direction du zombie
            var direction = this.flip ? -1 : 1;
            this.vel.x = (this.speed+this.zombieType*5) * direction;
            
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        handleMovementTrace: function(res) {
            this.parent(res);
            
            // Retourner le zombie lorsqu'il se heurte à un mur
            if (res.collision.x) {
                this.flip = !this.flip;
            }
        },
        check: function(other) {  
            other.kill();
        },
        kill: function() {
            
            // Génération de la projection de sang
            ig.game.spawnEntity(EntityParticlesEmitter, this.pos.x, this.pos.y, { type: "blood" });
            this.parent();
        }
    });
    
});
