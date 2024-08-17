installLocal:
  npm run test:pack

deploy:
  pushd personal_setup; npm run deploy; popd;

backup:
  pushd personal_setup; npm run backup; popd;
