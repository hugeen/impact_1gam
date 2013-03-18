ig.module(
    'game.entities.particle'
).requires(
    'impact.entity'
).defines(function() {

    EntityParticle = ig.Entity.extend({
        size: { x: 2, y: 2 },
        maxVel: { x: 160, y: 200 },
        lifetime: 1, // Durée de vie : 1 seconde
        bounciness: 0,
        vel: { x: 100, y: 100 }, // Vitesse de base
        friction: { x:100, y: 0 },
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet('media/particles.png', 2, 2),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            
            // Choix de la particule en fonction du type
            var types = {
                blood: 0,
                explosion: 1
            };
            this.addAnim('idle', 0.2, [types[settings.type]]);
            
            // Vitesse aléatoire pour une impression d'explosion
            this.vel.x = (Math.random()*2-1) * this.vel.x;
            this.vel.y = (Math.random()*2-1) * this.vel.y;
            
            // Création d'un timer pour la durée de vie de la particule
            this.lifeTimer = new ig.Timer();
        },
        update: function() {
            
            // Si le timer excède la durée de vie de la particule on la détruit
            if(this.lifeTimer.delta() > this.lifetime) {
                this.kill();
                return;
            }
            
            // Calcul de la couche alpha en fonction du temps de vie restant pour un effet de fade
            this.currentAnim.alpha = this.lifeTimer.delta().map(
                0, this.lifetime,
                1, 0
            );
            
            this.parent();
        }
    });
    
    EntityParticlesEmitter = ig.Entity.extend({
        particles: 25, // Nombre de particules à générer
        init: function(x, y, settings) {
            this.parent(x, y, settings);
        
            // Génération des particules
            for(var i = 0; i < this.particles; i++) {
                ig.game.spawnEntity(EntityParticle, x, y, { type: settings.type });
            }
            
            // Destruction immédiate du générateur
            this.kill();
        }
    });

});
