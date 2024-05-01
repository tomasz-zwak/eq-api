rm -fr ./build

read -r -d '' INSTALL_PACKAGES_SCRIPT << EOF
  require('concurrently')([
    {
      name: 'API',
      command: 'npm install',
      prefixColor: 'cyan',
    },
  ]);
EOF

if [ $? != 0 ]; then
  cp .env.example .env
  echo "Warning: The .env.example was copied to .env file" >&2;
fi

read -r -d '' RUN_APP_SCRIPT << EOF
  require('concurrently')([
    {
      name: ' - DB  - ',
      command: 'docker-compose up -d',
      prefixColor: 'blue',
    },
    {
      name: ' - API - ',
      command: 'TZ=UTC npm run start:dev',
      prefixColor: 'white',
    },
  ]);
EOF

echo "$RUN_APP_SCRIPT" | npx dotenv-cli -e .env node
