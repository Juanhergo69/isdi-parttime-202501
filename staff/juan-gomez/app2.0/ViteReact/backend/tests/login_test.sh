#!/bin/bash

# Test de login exitoso
echo "Testing login successful..."
curl -X POST http://localhost:3001/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"Test123!","rememberme":true}'

# Test de email no registrado
echo -e "\n\nTesting unregistered email..."
curl -X POST http://localhost:3001/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"nonexistent@example.com","password":"Test123!"}'

# Test de contraseña incorrecta
echo -e "\n\nTesting wrong password..."
curl -X POST http://localhost:3001/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"wrongpassword"}'


