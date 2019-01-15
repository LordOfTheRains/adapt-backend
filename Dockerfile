# LoopBack App Base Image
# Installs StrongLoop and Git
FROM node:10.15.0-jessie


# Installing Git

RUN mkdir data
RUN mkdir /data/git-tmp
WORKDIR /data/git-tmp
RUN apt-get update
RUN		sudo apt-get install build-essential libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip && \
RUN		wget https://github.com/git/git/archive/v1.9.4.tar.gz && \
RUN		cd git-1.9.4 && \
RUN		make prefix=/usr/local all && \
RUN		sudo make prefix=/usr/local instal && \
RUN		rm /data/git-tmp -Rvf


# Create App Directory and CD into it
RUN mkdir /data/app
WORKDIR /data/app

# Clone Master and Install dependencies
RUN git clone https://github.com/LordOfTheRains/adapt-backend.git

# Run App
WORKDIR /data/app/adapt-backend
ENTRYPOINT ["docker-entrypoint.sh"]
