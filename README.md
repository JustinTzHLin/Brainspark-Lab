# Brainspark-Lab


## Table of Contents
1. [About](#about-brainspark-lab)
2. [How it Works](#how-it-works)
3. [Getting Started](#getting-started-with-brainspark-lab)
4. [License](#license)


## About Brainspark-Lab
Make it easy and relaxing to gain new knowledge.


## How it Works
Brainspark-Lab is built with:

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://gemini.google.com/)


## Getting Started With Brainspark-Lab
1. Fork and clone this repository then open it on your code editor of choice.
2. Setup the .env file
   - You will need to add your own JSON Web Token (JWT) secret key for security purposes: https://jwt.io/
   - You will need to set up your own Next Auth URL and secret key for security purposes: https://next-auth.js.org/configuration/options
   - You will need to add your own Gemini Api Key for AI features: https://ai.google.dev/gemini-api/docs/api-key
   - Optional: If you would prefer to use Google OAuth for your login, please fill in the corresponding ID and Secret Key in the .env file as well.
3. Set up the application by running the below command:
```
npm install
npm run build
```
4. Activate the Frontend and the Backend server by running the following commands in separate terminals:
```
npm start
```
```
npm run prod
```
5. Visit localhost:3000, create an account or log in to store your result, or play as guest.
6. Select your preferences for the quiz, including the number of questions, category, difficulty level, and question type.
7. Click the Gemini button to receive an AI-generated explanation for the question.
8. Enjoy!


## License
This product is licensed under the MIT License without restriction.