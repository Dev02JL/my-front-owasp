# Front-End OWASP

Ce projet est le front-end pour l'application OWASP.

## Getting Started

Suivez ces instructions pour obtenir une copie du projet et la faire fonctionner sur votre machine locale pour le développement et les tests.

### Prérequis

Vous devez avoir [Node.js](https://nodejs.org/) (version 18 ou supérieure) et npm installés sur votre machine.

### Installation

1.  Clonez le dépôt sur votre machine locale :
    ```sh
    git clone git@github.com:Dev02JL/my-front-owasp.git
    ```

2.  Naviguez dans le répertoire du projet :
    ```sh
    cd front-owasp
    ```

3.  Installez les dépendances du projet :
    ```sh
    npm install
    ```

4.  Créez un fichier de variables d'environnement locales. Copiez le fichier d'exemple :
    ```sh
    cp .env.example .env.local
    ```

5.  Ouvrez le fichier `.env.local` et modifiez les valeurs si nécessaire pour qu'elles correspondent à la configuration de votre API backend.

### Lancer le serveur de développement

Une fois l'installation terminée, vous pouvez lancer le serveur de développement :

```sh
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

Le rechargement rapide (Fast Refresh) est activé, donc la page se mettra à jour automatiquement lorsque vous modifierez les fichiers.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
