# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'Macarthur'
set :repo_url, 'git@github.com:unepwcmc/MacarthurWatersheds.git'

set :branch, 'LinodeDeploy'

set :deploy_user, 'wcmc'
set :deploy_to, "/home/#{fetch(:deploy_user)}/#{fetch(:application)}"

set :pty, true


set :ssh_options, {
  forward_agent: true,
}

set :linked_dirs, %w{data/data_sheets}

set :keep_releases, 5

set :passenger_restart_with_touch, false


