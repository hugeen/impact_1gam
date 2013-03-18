ig.module(
    'game.entities.elevator'
).requires(
    'impact.entity'
).defines(function() {

    EntityElevator = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/elevator.png', 40, 52),
        size: { x: 40, y: 52 },
        offset: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function() {
            this.parent();
        },
        check: function(other) {
            ig.game.loadLevelDeferred(ig.global.LevelLevel1);
        }
    });
    
});
