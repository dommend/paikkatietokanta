# Paikkatietokanta 1.4.9 (Client with Admin)
React.js CRUD App with Vue Router & Axios

## To get started
1. npm install
2. Change database settings from db.config. Can be found @ app/congig/db.config.js
3. Run node server.js - If a database does not exist it will be created. Server.js will be running @ http://localhost:8080
4. Run npm start - This will start Paikkatietokanta @ http://localhost:8081

## About ports  
Node server.js runs @ port 8080. 
Paikkatietokanta runs @ port 8081.
Any other port won't work if you don't change them from settings.

## Before running a build script
Before you run a build script change the baseURL-address from src/http-commons.js 
and the homepage address from package.json

### To get the app run properly on the web
Add this htaccess snippet to the root.
This part makes sure the site is updated correctly if you refresh a page.

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule> 
```

#### And this to the /api folder
This will turn rewrites off. Otherwise Node server's api doesn't work.

```
RewriteEngine Off
```