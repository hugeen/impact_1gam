ig.module(
    'game.main'
).requires(
    'impact.game',
    'game.levels.level1', // game/levels/level1.js
    'game.entities.particle' // game/entities/particle.js
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
            
            // Récupération de notre entité player
        	var player = this.getEntitiesByType(EntityPlayer)[0];
        	
        	// Si l'entité existe on centre la caméra sur le personnage
        	if(player) {
        	    
        	    // Récupération de la largeur du niveau en pixel
        	    var levelWidth = ig.game.backgroundMaps[0].width*ig.game.backgroundMaps[0].tilesize;
        	    
        	    // Récupération de la position de l'écran centrée sur le joueur
        	    var centeredPosition = player.pos.x-ig.system.width/2;
        	    
        	    // On fige la caméra si on arrive sur les bords du niveau
        	    this.screen.x = Math.min(
        	        Math.max(centeredPosition, 0),
        	        levelWidth-ig.system.width
        	    );
        	}
            
            this.parent();
        },
        draw: function() {
            this.parent();
        }
    });
    
    ig.main('#canvas', MyGame, 60, 320, 240, 2);
    
});
