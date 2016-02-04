# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'tank_frontend'
set :deploy_user, 'ubuntu'

set :scm, :git
set :repo_url, 'https://github.com/weilluo/angular-grunt-requirejs-bower.git'
set :deploy_via, :remote_cache

set :keep_releases, 5

set :default_env, { rvm_bin_path: '~/.rvm/bin' }

# Default value for linked_dirs is []
set :linked_dirs, %w(www log)

set :config_files, %w(nginx.conf)
set :executable_config_files, []
set(:symlinks, [
  {
    source: "nginx.conf",
    link: "/etc/nginx/sites-enabled/{{full_app_name}}"
  }
])

namespace :deploy do
  before :deploy, "deploy:setup_config"
  after 'deploy:symlink:shared', 'deploy:compile_assets_locally'
  after :deploy, 'nginx:restart'
  after :rollback, 'nginx:restart'
  after :finishing, 'deploy:cleanup'
end
