# Description des choix techniques


## Frontend

Pour le frontend, on utilise React comme framework car c'est un framework complet, très utilisé et nous avons déjà pu nous familiariser avec dans un précédent cours.

Pour gérer la conversation entre deux utilisateurs, on utilise Talkjs qui nous offre un système de messagerie prêt à l'utilisation et bien documentée.

Pour gérer l'injection d'argent pour un échange contre des points, on utilise Stripe. C'est une solution de paiement fiable et ils ont la possibilité qui peut être intéressante à tester, celle d'utiliser TWINT.

## Backend

Côté backend, on utilise Medusajs comme framework, ce qui nous a créé un projet avec une base déjà bien complète pour un site de vente, comme les comptes utilisateurs ou des produits. 

On utilise également PostgreSQL qui est le type de base de données utilisée par Medusajs pour stocker les produits, utilisateurs, etc...

## Déploiement

On utilise Microsoft Azure pour le déploiement de notre application. Le frontend est déployé sur une Application Web statique et notre backend sur une Application Web simple, mais relié à une base de donnée Azure pour PostgreSQL. 

On utilise des Github Actions sur notre répo Github pour ajouter nos modifications sur Azure.