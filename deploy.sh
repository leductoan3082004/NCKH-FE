APP_NAME=nckh-fe
DEPLOY_CONNECT=root@165.22.54.162

docker rm -f ${APP_NAME}
docker rmi -f ${APP_NAME}

ssh -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'bash -s' < ./deploy/remove.sh
./deploy/remove.sh

echo "Deploying..."

ssh -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'bash -s' < ./deploy/stg.sh

echo "Done"