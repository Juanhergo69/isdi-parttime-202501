#!/bin/bash

# Test 1: Registro exitoso
echo "Testing register successful..."
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test1@example.com","password":"Passw0rd!","confirmationPassword":"Passw0rd!"}'
echo -e "\n"

# Test 2: Email inválido
echo "Invalid email..."
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"invalid-email","password":"Passw0rd!","confirmationPassword":"Passw0rd!"}'
echo -e "\n"

# Test 3: Contraseña débil
echo "Weak Password..."
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test2@example.com","password":"weak","confirmationPassword":"weak"}'
echo -e "\n"

# Test 4: Contraseñas no coinciden
echo "Passwords do not match..."
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test3@example.com","password":"Passw0rd!","confirmationPassword":"Different!"}'
echo -e "\n"

# Test 5: Email ya registrado (ejecutar después del Test 1)
echo "Email already registered..."
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test1@example.com","password":"Passw0rd!","confirmationPassword":"Passw0rd!"}'
echo -e "\n"