#!/bin/bash

# Test 1: Create a new post
echo "Test 1: Create post"
curl -X POST http://localhost:3001/api/posts \
-H "Content-Type: application/json" \
-d '{"userId":1,"title":"Test Post","msg":"This is a test message"}'
echo -e "\n"

# Test 2: Like a post
echo "Test 2: Like post"
curl -X PUT http://localhost:3001/api/posts/like \
-H "Content-Type: application/json" \
-d '{"messageId":"1/1/2023, 12:00:00 PM","userId":1}'
echo -e "\n"

# Test 3: Get all posts
echo "Test 3: Get posts"
curl -X GET http://localhost:3001/api/posts
echo -e "\n"

# Test 4: Dislike a post
echo "Test 4: Dislike post"
curl -X PUT http://localhost:3001/api/posts/dislike \
-H "Content-Type: application/json" \
-d '{"messageId":"1/1/2023, 12:00:00 PM","userId":1}'
echo -e "\n"

# Test 5: Favorite a post
echo "Test 5: Favorite post"
curl -X PUT http://localhost:3001/api/posts/favorite \
-H "Content-Type: application/json" \
-d '{"messageId":"1/1/2023, 12:00:00 PM","userId":1}'
echo -e "\n"