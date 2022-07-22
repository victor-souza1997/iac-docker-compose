FROM ubuntu:20.04

WORKDIR /tcc-backend/app

RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt install -yq tzdata supervisor nginx python3-pip default-libmysqlclient-dev && \
    ln -fs /usr/share/zoneinfo/America/Maceio /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /tcc-backend/logs
COPY ./app /tcc-backend/app
COPY ./configs /tcc-backend/configs

RUN rm -f /etc/nginx/nginx.conf
RUN ln -s /tcc-backend/configs/nginx_nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/sites-enabled/default
RUN ln -s /tcc-backend/configs/nginx_conf.d_nginx.conf /etc/nginx/conf.d/nginx.conf
RUN ln -s /tcc-backend/configs/nginx_conf.d_upload.conf /etc/nginx/conf.d/upload.conf

RUN ln -s /tcc-backend/configs/supervisord-ciclope.conf /etc/supervisor/conf.d/ciclope.conf
RUN chmod 755 /tcc-backend/configs/supervisor-stop.sh
RUN ln -s /tcc-backend/configs/supervisor-stop.sh /etc/supervisor/supervisor-stop.sh

RUN mkdir /etc/uwsgi
RUN ln -s /tcc-backend/configs/uwsgi-main.ini /etc/uwsgi/uwsgi-main.ini

COPY ./entrypoint.sh /
RUN chmod 755 /entrypoint.sh
COPY ./start.sh /
RUN chmod 755 /start.sh

RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r /tcc-backend/app/requirements.txt


EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

CMD ["/start.sh"]
