# LoopBack App Base Image
# Installs StrongLoop and Git
FROM node:10.15.0-jessie


# Installing Git

RUN mkdir data
RUN mkdir /data/git-tmp
WORKDIR /data/git-tmp
RUN apt-get update
RUN git --version


# Create App Directory and CD into it
RUN mkdir /data/app
WORKDIR /data/app

# Clone Master and Install dependencies
RUN git clone https://github.com/LordOfTheRains/adapt-backend.git

# Run App
WORKDIR /data/app/adapt-backend

ENTRYPOINT ["docker-entrypoint.sh"]
