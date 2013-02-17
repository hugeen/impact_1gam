ig.module(
    'game.main'
).requires(
    'impact.game',
    'game.levels.level1' // game/levels/level1.js
).defines(function() {
    
    MyGame = ig.Game.extend({
        gravity: 275, // Affecte les entités
        init: function() {
            
            // Définition des contrôles
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
            ig.input.bind( ig.KEY.X, 'jump' );
            ig.input.bind( ig.KEY.C, 'shoot' );
            
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
