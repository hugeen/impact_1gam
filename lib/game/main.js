ig.module(
    'game.main'
).requires(
    'impact.game',
    'impact.font',
    'game.levels.level1', // game/levels/level1.js
    'game.entities.particle' // game/entities/particle.js
).defines(function() {
    
    MyGame = ig.Game.extend({
        // Création de la font qui sera utilisée pour afficher les textes
        instructions: new ig.Font('media/04b03.font.png'),
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
            
            // On positione les instructions en bas au centre
            var x = ig.system.width/2;
            var y = ig.system.height-8;
            
            // On dessine les instructions
            this.instructions.draw('[Controls] Arrows: Moves, X: Jumps & C: Fires.', x, y, ig.Font.ALIGN.CENTER);
            
            var y = 5;
            // Nombre de zombies restants
            this.instructions.draw('Zombies left : '+this.getEntitiesByType(EntityZombie).length, x, y, ig.Font.ALIGN.CENTER);
        }
    });
    
    ig.main('#canvas', MyGame, 60, 320, 240, 2);
    
});
