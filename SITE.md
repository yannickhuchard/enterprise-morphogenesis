# Site du white paper

## Configuration GitHub Pages

Vérifiée sur GitHub le 31 octobre 2026 :

- Dépôt : `yannickhuchard/enterprise-morphogenesis`.
- Source : **Deploy from a branch**, branche `main`, dossier `/docs`.
- HTTPS : activé.
- Adresse : https://yannickhuchard.github.io/enterprise-morphogenesis/.

Cette configuration existe déjà. Il n’est pas nécessaire de créer un autre dépôt,
de changer de mode de déploiement ou de mettre en place un hébergement tiers.
Le fichier `docs/.nojekyll` permet de servir les fichiers statiques directement.

Le script idempotent ci-dessous vérifie ces réglages et les configure seulement
s’ils diffèrent. Il nécessite GitHub CLI, une session authentifiée et les droits
d’administration du dépôt. Il ne pousse aucun fichier et ne crée aucun commit.

```powershell
./scripts/configure_github_pages.ps1
```

Réglages dans l’interface GitHub :
https://github.com/yannickhuchard/enterprise-morphogenesis/settings/pages

Documentation officielle :
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Page d’accueil animée

Adresse : https://yannickhuchard.github.io/enterprise-morphogenesis/landing/

Page courte, en noir et blanc, avec animations 3D en CSS, pour un public non
spécialiste. Elle est bilingue : un sélecteur FR | EN, choix mémorisé dans le
navigateur, `?lang=en` pour ouvrir l’anglais. Elle présente aussi les deux
présentations de `docs/presentations/`.

La source est le design `design/landing.dc.html`, issu du canevas Claude Design.
Après chaque modification de cette source, régénérer la page :

```text
python scripts/build_landing.py
```

Le script écrit `docs/landing/index.html`, `docs/assets/css/landing.css` et
`docs/assets/js/landing.js`. Ce dernier contient un petit moteur de rendu sans
dépendance (`scripts/landing_runtime.js`). Les aperçus des diapositives sont
dans `docs/assets/images/decks/`. Les animations s’arrêtent si le système
demande moins de mouvement. Sans JavaScript, la page affiche des liens vers le
white paper, le brouillon `discover/` et les présentations.

## Premier brouillon local

### Ligne éditoriale

La page s’adresse aux dirigeants et responsables de transformation. Elle ouvre
sur l’écart entre stratégie et exécution, puis aborde l’allocation des budgets,
les limites de la délégation et les signaux qui imposent de reprendre la main.
Chaque section associe une question précise, une réponse directe, un mécanisme
concret et un renvoi au raisonnement du white paper. L’appel principal permet
de poursuivre par les décisions à changer ; la synthèse reste accessible dès
le premier écran.

Éviter les slogans abstraits, les phrases qui annoncent leur propre contenu,
les faux chiffres de performance et les promesses de résultats déjà démontrés.
Les scénarios exposent les décisions à prendre et le critère à vérifier.
Les versions française et anglaise suivent la même exigence.

Références de travail : les recommandations créatives de LinkedIn sur
l’accroche initiale, la pertinence pour l’audience et la clarté de l’action
(https://business.linkedin.com/advertise/ads/sponsored-content/video-ads/tips).
Elles portent sur des publicités vidéo ; leur transposition à cette page est
un choix éditorial, pas une preuve de performance de la page.

### Contenu

Le brouillon pédagogique est dans `docs/discover/index.html`. Il propose :

- Une introduction en français, avec une version anglaise sélectionnable.
- Un schéma qui relie les parties de l’entreprise.
- Les quatre étapes d’une boucle de transformation, consultables au clavier.
- Trois scénarios fictifs : réglementation, ouverture d’un pays et dérive opérationnelle.
- Les dimensions humaines, les limites de la proposition et les sources précises.
- La lecture intégrale, le téléchargement Word et les formats de citation.

La page reste lisible sans JavaScript. Le script ajoute les variantes anglaises,
les scénarios interactifs, le menu mobile et la copie de la citation. Aucun suivi
de fréquentation ni service externe n’est ajouté. Le choix de langue peut être
conservé dans le navigateur ; `?lang=en` ouvre directement la version anglaise.

Le texte intégral reste à la racine du site avec tous ses liens existants.
Le convertisseur Word continue de générer `docs/index.html` et ne touche pas au
brouillon `docs/discover/`. Les feuilles de style et scripts du brouillon sont
séparés de ceux du white paper.

### Prévisualiser

Depuis la racine du dépôt, avec Python 3.10 ou une version plus récente :

```text
python scripts/preview_site.py
```

Ouvrir http://127.0.0.1:4173/enterprise-morphogenesis/discover/.
La prévisualisation reproduit le préfixe du dépôt utilisé par GitHub Pages afin
de vérifier les liens relatifs. Elle écoute uniquement sur `127.0.0.1`.
Le texte intégral est accessible à http://127.0.0.1:4173/enterprise-morphogenesis/.
Arrêter le serveur avec Ctrl+C. Utiliser `--port 4174` si le port est occupé.

### Vérifier

```text
python scripts/check_site.py
node --check docs/assets/js/discover.js
```

Le contrôle vérifie les fichiers liés, les ancres vers le manuscrit, les clés de
traduction, les identifiants HTML et la compatibilité avec un site de projet
GitHub Pages. Le workflow `.github/workflows/check-pages.yml` reprend ces
vérifications pour les contributions et modifications du site. Il ne déploie pas.

Vérifications effectuées dans Chrome : les quatre étapes et les trois scénarios
dans les deux langues, les touches fléchées des onglets, le menu mobile, les
questions déroulantes, la persistance de la langue et la copie de citation.
Les liens locaux, le téléchargement Word et les formats de citation répondent
en HTTP 200. La page reste lisible sans JavaScript. L’affichage est contrôlé
entre 320 et 1 440 pixels de large, sans débordement horizontal.

## Publication ultérieure

Le brouillon n’est pas publié par sa seule présence dans le dossier local.
Avec le réglage actuel de GitHub Pages, un push de `docs/` sur `main` publierait
les fichiers, dont cette page à l’adresse `/enterprise-morphogenesis/discover/`.

Avant cette publication, relire les deux langues et les scénarios sur ordinateur
et mobile. La promotion de cette page en page d’accueil sera une modification
séparée : conserver d’abord une URL stable pour le manuscrit et ses ancres, puis
adapter le convertisseur, les métadonnées et les liens canoniques ensemble.
Ne pas remplacer simplement `docs/index.html`, car le convertisseur l’écrirait
de nouveau lors de la prochaine mise à jour du Word.
