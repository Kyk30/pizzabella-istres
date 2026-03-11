# Pizza Bella - Instructions de deploiement

## Architecture du projet

```
pizzabella3/
├── data/content.json          <- Contenu par defaut (menu, infos, etc.)
├── src/
│   ├── app/
│   │   ├── (site)/            <- Pages publiques (accueil, menu, contact)
│   │   ├── admin/             <- Panel d'administration
│   │   └── api/               <- API (auth, contenu, upload)
│   ├── components/            <- Composants React
│   └── lib/                   <- Utilitaires (auth, gestion contenu)
├── public/images/             <- Images statiques
└── INSTRUCTIONS.md            <- Ce fichier
```

**Technologies utilisees :**
- Next.js 14 (React) - Framework web
- Tailwind CSS - Mise en forme
- Vercel Blob - Stockage des images et du contenu modifie (en production)
- TypeScript - Langage de programmation

---

## Etape 1 : Prerequis

Installer Node.js (version 18 ou plus) :
- Allez sur https://nodejs.org/fr
- Telechargez la version "LTS" (recommandee)
- Installez-le en suivant les instructions

Installer Git :
- Allez sur https://git-scm.com/download/win
- Telechargez et installez

---

## Etape 2 : Preparation du projet en local

### 2.1 Ouvrir un terminal
Ouvrez PowerShell ou le terminal de VS Code dans le dossier du projet.

### 2.2 Installer les dependances
```bash
npm install
```

### 2.3 Configurer les variables d'environnement
Copiez le fichier d'exemple :
```bash
cp .env.local.example .env.local
```

Ouvrez `.env.local` et changez le mot de passe admin :
```
ADMIN_PASSWORD=VotreMotDePasseSecurise
ADMIN_SECRET=UneChaineLongueEtAleatoire123456789
```

### 2.4 Tester en local
```bash
npm run dev
```
Ouvrez http://localhost:3000 dans votre navigateur.
Le panel admin est sur http://localhost:3000/admin

---

## Etape 3 : Creer un compte GitHub

1. Allez sur https://github.com
2. Cliquez "Sign up" et creez un compte
3. Verifiez votre email

---

## Etape 4 : Mettre le code sur GitHub

### 4.1 Creer un nouveau repository
1. Sur GitHub, cliquez le bouton "+" en haut a droite → "New repository"
2. Nom : `pizzabella-istres` (ou ce que vous voulez)
3. Laissez en "Public" (gratuit)
4. Ne cochez RIEN d'autre
5. Cliquez "Create repository"

### 4.2 Envoyer le code
Dans le terminal, executez ces commandes une par une :
```bash
git init
git add .
git commit -m "Premier deploiement Pizza Bella"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/pizzabella-istres.git
git push -u origin main
```

Remplacez `VOTRE-NOM` par votre nom d'utilisateur GitHub.

---

## Etape 5 : Deployer sur Vercel (GRATUIT)

### 5.1 Creer un compte Vercel
1. Allez sur https://vercel.com
2. Cliquez "Sign Up"
3. Choisissez "Continue with GitHub"
4. Autorisez Vercel a acceder a votre GitHub

### 5.2 Importer le projet
1. Sur le dashboard Vercel, cliquez "Add New..." → "Project"
2. Trouvez votre repository `pizzabella-istres` et cliquez "Import"
3. Framework Preset : Next.js (devrait etre detecte automatiquement)
4. **IMPORTANT - Variables d'environnement :**
   Avant de cliquer "Deploy", ajoutez ces variables :
   - `ADMIN_PASSWORD` = votre mot de passe admin
   - `ADMIN_SECRET` = une chaine aleatoire longue
5. Cliquez "Deploy"

Attendez 1-2 minutes. Votre site est en ligne !

### 5.3 Configurer le stockage Vercel Blob (pour l'admin)
1. Dans votre projet Vercel, allez dans l'onglet "Storage"
2. Cliquez "Create Database" ou "Connect Store"
3. Choisissez "Blob"
4. Donnez un nom (ex: "pizzabella-blob")
5. Cliquez "Create"
6. Le `BLOB_READ_WRITE_TOKEN` sera automatiquement ajoute aux variables d'environnement
7. **Redeployez** : allez dans "Deployments", cliquez les 3 points du dernier deploiement → "Redeploy"

---

## Etape 6 : Nom de domaine personnalise (optionnel)

Si vous avez un nom de domaine (ex: pizzabella-istres.fr) :
1. Dans Vercel, allez dans "Settings" → "Domains"
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer les DNS chez votre registrar

---

## Utilisation du Panel Admin

### Acceder au panel
1. Allez sur `votre-site.vercel.app/admin`
2. Entrez le mot de passe configure dans `ADMIN_PASSWORD`

### Ce que vous pouvez faire :
- **Informations** : Modifier le nom, adresse, telephone, horaires, description
- **Menu** : Ajouter/modifier/supprimer des categories et des articles avec leurs prix
- **Evenements** : Publier des annonces visibles sur la page d'accueil (promos, soirees, etc.)
- **Galerie** : Ajouter des photos de vos pizzas et du restaurant

### Apres chaque modification :
1. Faites vos changements
2. Cliquez "Sauvegarder" en bas de page
3. Les modifications sont visibles immediatement sur le site

---

## Mettre a jour le site (apres modifications du code)

Si vous modifiez le code source :
```bash
git add .
git commit -m "Description de la modification"
git push
```
Vercel redeploiera automatiquement en 1-2 minutes.

---

## Depannage

### Le site ne s'affiche pas
- Verifiez que `npm run build` fonctionne sans erreur en local
- Verifiez les logs dans Vercel Dashboard → "Deployments" → dernier deploiement → "Build Logs"

### L'admin ne fonctionne pas
- Verifiez que `ADMIN_PASSWORD` est bien configure dans Vercel (Settings → Environment Variables)
- Essayez de redeployer

### Les images ne s'uploadent pas
- Verifiez que Vercel Blob est configure (Etape 5.3)
- Verifiez que le `BLOB_READ_WRITE_TOKEN` est dans les variables d'environnement

### Les modifications admin ne persistent pas
- En local : les changements sont sauvegardes dans `data/content.json`
- En production : il faut que Vercel Blob soit configure (Etape 5.3)
