# msmv
/api
Contient tout ce qui est lié au back, sous forme d'api

/api/models : correspond aux schema de bdd
/api/commands : correspond aux commandes créées pour ajouter un utilisateur par exemple
/api/routes : correspond à toutes les routes disponible sur l'api
/api/middlewares : middlewares

Dans un premier temps, pensez à faire un npm install dans ce dossier.

Pour configurer l'api lors d'une nouvelle installation, créer un fichier .env à la racine du dossier /api, avec comme valeur : 

```
JWT_SECRET= #le code secret pour les JWT
CORS_AUTHORIZE= #l'url / ip autorisé à ping l'api exemple : http://localhost:8080
LOGGER= #dev ou common selon le mode de déploiement
DB_URL= #l'url de la base de donnée, sous mongoDB exemple : mongodb://localhost/dbname
EMAIL_USER= #l'adresse mail qui sera utilisé pour l'envoie des mails
EMAIL_SECRET= #de mot de passe du mail
SMTP_HOST= #l'host du smtp
SMTP_PORT= #le port du smtp
MAILER_TYPE= #EMAIL si vous utilisez une adresse mail dépendente d'un service externe comme Gmail, ou SMTP si vous utilisez une mail dépendant d'une autre smtp
SMTP_SECURE=#true ou false
EMAIL_SERVICE=# Uniquement si MAILER_TYPE est égal à "EMAIL", rajouter ici quel service de mail vous utilisez, exemple: Gmail
```

Toujours à la racine du dossier /api, vous pouvez créer un utilisateur, avec la commande "npm run create-user email prénom nom motDePasse role", la valeur rôle doit être égale à ROLE_USER ou ROLE_ADMIN, à savoir qu'un utilisateur avec un role autre que ROLE_ADMIN ne pourra pas se connecter au backoffice
<br>Il y a également une commande pour éditer le role : "npm run change-role email role".

/client
Le dossier /client représente toute la partie "front".

Un npm install est également nescessaire

Il y a 2 fichier environement, présents dans /client/config : dev.env.js prod.env.js, ils doivent au minimum avoir ces valeurs.<br> Ne pas changer la valeur de la variable NODE_ENV présent dans les 2 fichier.

```
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_BASE_API_URL: '"http://localhost:3000/"'
}
```

Pour lancer l'application, exécuter simplement un "npm run dev" pour le mode dev, et un "npm run build" pour la prod.<br>
Le mode dev lancera un serveur local sur le port 8080 par défaut, ou 8081 si utilisé le précédent est déjà utilisé (ou 8082 si le port 8081 est également utilisé, etc...)<br>
Le mode production (build) ne lancera pas de serveur local, mais compilera l'ensemble de l'application. Il faudra alors indiquer à nginx d'utiliser le fichier index.html présent dans /client/dist
