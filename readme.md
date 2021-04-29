# BOT de autentificación - DiscordAuth
## ¿Qué hace el bot?
- Envía un enlace a los nuevos usuarios de un server.
- Al ingresar a dicho enlace, el usuario hage login con su cuenta de Google.
- Si el proceso se ejecuta correctamente, el bot asigna el rol "Students" a dicho usuario y actualiza su "Alias" en el server a su nombre completo de Google.

## ¿Cómo instalar el bot?
- Crear un archivo de variables globales (.env) en el proyecto:
```env
BOT_TOKEN=<discord-bot-token>
PORT=<puerto-del-servidor> Ej. 8000
CALLBACKURL=<uri> Ej. https://cs.utec.edu.pe/apibotCS/google/callback
AUTHURL=<uri> Ej. https://cs.utec.edu.pe/apibotCS
GOOGLEID=<google-api-id>
GOOGLESECRET=<google-api-secret>
```
- Correr `npm install` para instalar las librerías utilizadas.
- Correr `npm start` para correr el bot.

## Dudas y Consultas
christian.ledgard@utec.edu.pe