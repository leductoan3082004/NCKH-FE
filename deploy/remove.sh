docker rmi $(docker images -f "dangling=true" -q)
docker rmi -f toan3082004/nckh-fe:latest
docker rmi -f nckh-fe:latest


