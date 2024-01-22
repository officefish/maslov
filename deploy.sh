echo "Switching to branch master"
git checkout master

echo "Building app... (Can also use npm instead of yarn)"
yarn build

echo "Deploy next client..."
scp -r .next/* root@45.131.41.251:/var/www/maslov/html

echo "Deploy nest server..."
scp -r dist/* root@45.131.41.251/:/var/www/maslov/html

echo "Done!"