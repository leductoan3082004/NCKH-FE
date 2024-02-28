APP_NAME=nckh-fe

echo "Docker building"
docker build -t ${APP_NAME}:latest .
docker tag ${APP_NAME}:latest toan3082004/${APP_NAME}:latest

echo "Docker pusing"

docker push toan3082004/${APP_NAME}:latest