<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'recipe/rsync.php';
$projectFolder = '/var/www/api.pmubet.com';
task('pwd', function () {
    $result = run('pwd');
    writeln("Current dir: $result");
});
writeln('START');
// Project name
set('application', 'api.pmubet.com');
writeln('appplication set');
// Project repository
set('repository', 'git@github.com:artash-grigoryan/api.pmubet.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server
add('writable_dirs', []);
set('allow_anonymous_stats', false);
writeln('DIR FOLDER' . __DIR__);
set('rsync_src', function () {
    return __DIR__; // If your project isn't in the root, you'll need to change this.
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
// Grabs the dotenv file from the github secret
task('deploy:secrets', function () {
    file_put_contents(__DIR__ . '/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path') . '/shared');
});

// Hosts
writeln('Hosts part');
host('ec2-15-236-238-84.eu-west-3.compute.amazonaws.com')
    ->hostname('15.236.238.84') // Hostname or IP address
    ->stage('production') // Deployment stage (production, staging, etc)
    ->user('root') // SSH user
    ->set('deploy_path', '~/{{application}}');

// Tasks

after('deploy:failed', 'deploy:unlock'); // Unlock after failed deploy

writeln('Deploy the application');
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

//task('build', function () {
//    run('cd {{release_path}} && build');
//});
//
//// [Optional] if deploy fails automatically unlock.
//after('deploy:failed', 'deploy:unlock');
//
//// Migrate database before symlink new release.
//
//before('deploy:symlink', 'artisan:migrate');

