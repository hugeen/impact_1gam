ig.module(
    'game.entities.door'
).requires(
    'impact.entity'
).defines(function() {

    EntityDoor = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/door.png', 16, 32),
        size: { x: 16, y: 32 },
        offset: { x: 0, y: 0 },
        timer: new ig.Timer(),
        opening: false,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('open', 0.05, [0,1,2,3,2,1,0]);
        },
        update: function() {
            if(this.timer.delta() > this.openCooldown) {
                this.currentAnim = this.anims.open;
                this.currentAnim.gotoFrame(0);
                this.opening = true;
                this.timer.reset();
                ig.game.spawnEntity(EntityZombie, this.pos.x, this.pos.y+12);
            }
            if(this.opening && this.currentAnim.sequence.length - 1 <= this.currentAnim.frame) {                    
                this.opening = false;
                this.currentAnim = this.anims.idle;
            }
            this.parent();
        }
    });
    
});
