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
        speed: 24, // Vitesse de déplacement
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
            // Animation
            this.addAnim('walk', .07, [0, 1, 2, 3, 4, 5]);
            
        },
        update: function() {
            
            // Determiner la vitesse et la direction du zombie
            var direction = this.flip ? -1 : 1;
            this.vel.x = this.speed * direction;
            
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        handleMovementTrace: function(res) {
            this.parent(res);
            
            // Retourner le zombie lorsqu'il se heurte à un mur
            if (res.collision.x) {
                this.flip = !this.flip;
            }
        }
    });
    
});
