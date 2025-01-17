import { MongoCluster } from 'mongodb-runner';
import * as path from 'path';
import * as os from 'os';

const serverOidcConfig = {
    issuer: 'https://test.com',
    clientId: 'testServer',
    requestScopes: ['mongodbGroups'],
    authorizationClaim: 'groups',
    audience: 'resource-server-audience-value',
    authNamePrefix: 'dev',
  };

await MongoCluster.start({
    version: '8.0.x',
      downloadOptions: { enterprise: true },
      args: [],
      tmpDir: path.join(os.tmpdir(), `vscode-tests-aaa-data`),
      topology: 'standalone',
      logDir: process.env.MONGODB_RUNNER_LOGDIR,
      args: [
        '--setParameter',
        '--debug',
        'authenticationMechanisms=SCRAM-SHA-256,MONGODB-OIDC',
        // enableTestCommands allows using http:// issuers such as http://localhost
        '--setParameter',
        'enableTestCommands=true',
        '--setParameter',
        `oidcIdentityProviders=${JSON.stringify([serverOidcConfig])}`,
    ],

});

console.log("success!");
process.exit(0);
