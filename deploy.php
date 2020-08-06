<?php
namespace Deployer;
// Include the Laravel & rsync recipes
require 'recipe/laravel.php';
require 'recipe/rsync.php';

set('application', 'api.pmubet.com');
set('ssh_multiplexing', true); // Speeds up deployments

set('rsync_src', function () {
    return __DIR__.'/api'; // If your project isn't in the root, you'll need to change this.
});

// Configuring the rsync exclusions.
// You'll want to exclude anything that you don't want on the production server.
add('rsync', [
    'exclude' => [
        '.git',
        '/.env',
        '/storage/',
        '/vendor/',
        '/node_modules/',
        '.github',
        'deploy.php',
    ],
]);

// Set up a deployer task to copy secrets to the server.
// Since our secrets are stored in Gitlab, we can access them as env vars.
task('deploy:secrets', function () {
    file_put_contents(__DIR__ . '/api/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path') . '/shared');
});

// Hosts
host('ec2-15-236-238-84.eu-west-3.compute.amazonaws.com') // Name of the server
->hostname('ec2-15-236-238-84.eu-west-3.compute.amazonaws.com') // Hostname or IP address
->stage('production') // Deployment stage (production, staging, etc)
->user('ec2-user') // SSH user
->set('deploy_path', '/var/www/api.pmubet.com'); // Deploy path

after('deploy:failed', 'deploy:unlock'); // Unlock after failed deploy

desc('Deploy the application');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'rsync', // Deploy code & built assets
    'deploy:secrets', // Deploy secrets
    'deploy:shared',
    'deploy:vendors',
    'deploy:writable',
    'artisan:storage:link', // |
    'artisan:view:cache',   // |
    'artisan:config:cache', // | Laravel specific steps
    'artisan:optimize',     // |
    'artisan:migrate',      // |
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
]);
