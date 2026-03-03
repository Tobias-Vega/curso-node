# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

## dev
1. Clonar el archivo .env.example a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
```

3. Instalar las dependencias

```
npm install
```

4. Levantar la base de datos con el comando

```
docker compose up -d
```

5. Iniciar el servidor

```
npm run dev
```
