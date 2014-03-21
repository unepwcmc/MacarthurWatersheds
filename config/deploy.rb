set :application, "Macarthur"
set :repository,  "https://github.com/unepwcmc/MacarthurWatersheds.git"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory $
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "ec2-46-51-154-19.eu-west-1.compute.amazonaws.com"                          # Your HTTP server, Apache/etc
role :app, "ec2-46-51-154-19.eu-west-1.compute.amazonaws.com"                          # This may be the same as your `Web` server
role :db,  "ec2-46-51-154-19.eu-west-1.compute.amazonaws.com", :primary => true # This is where Rails migrations will run

set :branch, "master"
set :scm_username, "unepwcmc-read"


# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end

set :deploy_to, "/home/ubuntu/#{application}"
set :normalize_asset_timestamps, false
