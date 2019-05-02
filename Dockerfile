# LoopBack App Base Image
# Installs StrongLoop and Git
FROM node:10.15.0-jessie

# the following commands are ran because jessie and weezy recently(april 2019) got removed from debian support
# https://unix.stackexchange.com/questions/508724/failed-to-fetch-jessie-backports-repository
RUN echo "deb [check-valid-until=no] http://cdn-fastly.deb.debian.org/debian jessie main" > /etc/apt/sources.list.d/jessie.list
RUN echo "deb [check-valid-until=no] http://archive.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN sed -i '/deb http:\/\/\(deb\|httpredir\).debian.org\/debian jessie.* main/d' /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update

RUN apt-get -y install sudo


RUN adduser --disabled-password --gecos '' docker
RUN adduser docker sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

#USER docker


RUN mkdir data
RUN git --version
RUN sudo npm install -g loopback-cli
RUN sudo npm install loopback-connector-mysql --save


# Create App Directory and CD into it
RUN mkdir /data/app
WORKDIR /data/app

# Clone Master and Install dependencies
#RUN sudo git clone https://github.com/LordOfTheRains/adapt-backend.git
RUN git clone https://github.com/LordOfTheRains/adapt-backend.git


# Run App
WORKDIR /data/app/adapt-backend
RUN sudo chmod 777 docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
