docker rm -f nckh-fe
docker run --name=nckh-fe -d --network=my-net -p 80 -e LETSENCRYPT_HOST=fe.hareta.me -e VIRTUAL_HOST=fe.hareta.me toan3082004/nckh-fe:latest