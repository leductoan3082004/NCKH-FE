APP_NAME=nckh-fe
DEPLOY_CONNECT=root@165.22.54.162

docker rm -f ${APP_NAME}
docker rmi ${APP_NAME}

ssh -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'bash -s' < ./deploy/remove.sh
./deploy/remove.sh

echo "Docker building..."

docker build -t ${APP_NAME}:latest .
echo "Docker pushing..."
docker tag ${APP_NAME}:latest toan3082004/${APP_NAME}:latest
docker push toan3082004/${APP_NAME}:latest

echo "Deploying..."

ssh -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'bash -s' < ./deploy/stg.sh

echo "Done"