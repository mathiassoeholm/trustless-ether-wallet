sudo yarn build-production
sudo yarn rename-production
yarn production

forever start -c "ganache-cli --defaultBalanceEther 9000000000000000000000 --db ./ganache-db" ./