# adapt-backend
backend for ADAPT app senior design project

Run ./run-docker-server.sh to start the docker container that automatically setup loopback and runs the application

# Setup (Ubuntu 16.x tested)
update your package source list  
`$ sudo apt update`  

install docker  
`$ sudo apt install docker.io`  

run the following command and your docker version should be 18.x  
`$ docker -v`  

clone the repo  
`$ git clone https://github.com/LordOfTheRains/adapt-backend.git`  

change directory into the project  
`$ cd adapt-backend`  

 create the log file used by mysql
`$ touch mysql.log mysql_error.log`  

# Build the database and server application docker container
build the container that runs the server code first  
`$ ./build-adapt-server-container.sh`  
run the database container  
`$ ./run-database-container.sh`  
run the server code  
`$ ./run-adapt-server.sh`  
you local development API server should be on [Loopback api dashboard](localhost:8080/explorer)  


#### ------- if you are the backend developer -------
* only run the database container to start your database. Then you can do your normal `$ node .` to start ur local server and do your development. 
* Theres database directory created at the directory containing ur "adapt-backend" folder, that's where the database file is so if you want fresh database just remove this directory completely and run your migration to create the tables
