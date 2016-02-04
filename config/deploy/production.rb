set :stage, :production
set :branch, 'master'

# used in case we're deploying multiple versions of the same
# app side by side. Also provides quick sanity checks when looking
# at filepaths
set :full_app_name, "#{fetch(:application)}"

set :server_name, 'xxx.xxx.xxx.xxx'

server 'Frontend-Prod', user: 'ubuntu', roles: %w(app), primary: true

# Default deploy_to directory is /var/www/my_app
set :deploy_to, "/home/#{fetch(:deploy_user)}/apps/#{fetch(:full_app_name)}"

set :shared_path, "#{fetch(:deploy_to)}/shared"

# dont try and infer something as important as environment from
# stage name.
set :rails_env, :production

set :ssh_options, {
  user: 'ubuntu',
  keys: %w(~/.ssh/cb-apac.pem),
  forward_agent: false,
}
