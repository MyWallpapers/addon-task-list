# Today

Une liste de tâches, une ligne par tâche. Les coches sont conservées sur cet appareil.

Une seule responsabilité : task-list. Le texte est rendu comme du texte brut. Aucune analyse IA, télémétrie, permission native ou dépendance à un service privé du cœur. Les données de fonctionnement des minuteurs et coches restent dans les réglages d’appareil exposés par le SDK. Aucun localStorage parallèle. Les horloges et rappels visuels sont suspendus quand le document est masqué ; le temps est recalculé à la reprise. Les rappels et minuteurs nécessitent que l’add-on soit actif : ils ne constituent pas un service de notification en arrière-plan.

`pnpm install`, `pnpm build`, `pnpm test`, puis `mywallpaper dev` pour l’appairage local. Vérifiez avec `mywallpaper check`, publiez un dépôt public distinct et un tag immuable correspondant au manifeste, puis soumettez ce tag dans MyWallpaper.

Code et textes originaux sous licence MIT.
