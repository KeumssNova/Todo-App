# Simple To-Do App - Vue 3 Mobile First

Une application de gestion de tâches minimaliste, conçue pour être rapide, simple et mobile-first.  
Elle permet de créer des tâches, définir une répétition (jour/semaine/mois), éditer, supprimer et recevoir des notifications.

---

## Fonctionnalités

- Ajout de tâches avec choix de répétition : jamais, jour, semaine, mois  
- Edition inline des tâches (double-clic sur la tâche)  
- Suppression de tâches  
- Marquer une tâche comme terminée (checkbox)  
- Notifications simples pour les rappels  
- Sauvegarde locale dans `localStorage`  
- Interface mobile-first, responsive  

---

## Technologies utilisées

- [Vue 3](https://vuejs.org/) avec Composition API  
- Tailwind CSS pour le style  
- API Notification Web pour les rappels  
- `localStorage` pour la persistance des données  

---

## Installation et lancement

1. Cloner ce dépôt  
   ```bash
   git clone <url-du-dépôt>
   cd <nom-du-dossier>
   ```

2. Installer les dépendances

   ```bash
   npm install
   ```

3. Lancer le serveur de développement

   ```bash
   npm run dev
   ```

4. Ouvrir dans le navigateur
   Accéder à [http://localhost:5173](http://localhost:5173) (ou l’adresse affichée dans la console)

---

## Build pour production

```bash
npm run build
```

Le build sera généré dans le dossier `dist`.
Tu peux héberger ce dossier sur un serveur ou une plateforme comme Netlify ou Vercel.

---

## Utilisation sur mobile

* Accéder à l’URL de l’app depuis Safari sur iPhone ou navigateur mobile.
* Ajouter à l’écran d’accueil pour une expérience proche d’une app native.
* Les notifications fonctionnent si l’utilisateur a autorisé les permissions.

---

## Contribution

Les contributions sont les bienvenues !
N’hésite pas à ouvrir une issue ou proposer une pull request.

---

## Licence

MIT © TonNom

