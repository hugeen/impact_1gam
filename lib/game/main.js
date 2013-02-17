ig.module(
    'game.main'
).requires(
    'impact.game',
    'game.levels.level1' // game/levels/level1.js
).defines(function() {
    
    MyGame = ig.Game.extend({

        init: function() {
            // Chargement du level
            this.loadLevel(LevelLevel1);
        },

        update: function() {
            this.parent();
        },

        draw: function() {
            this.parent();
        }
    });
    
    ig.main('#canvas', MyGame, 60, 320, 240, 2);
    
});
