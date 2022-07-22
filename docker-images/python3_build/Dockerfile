FROM ubuntu:20.04

WORKDIR /tcc-backend

RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt install -yq tzdata apt python3 python3-pip python3.8-venv -y && \
    ln -fs /usr/share/zoneinfo/America/Maceio /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /tcc-backend

RUN pip3 install --upgrade pip
RUN pip3 install build

