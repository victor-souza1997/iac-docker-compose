# Criar o ambiente dev

## Criar diretório de trabalho

```bash
    $ mkdir lab
    $ cd lab
```

## Clonar repositórios em que vai trabalhar

Exemplo:

```bash
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/puppet.git
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/maestro.git
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/packages.git
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/api_bk.git
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/emulador.git
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/documentation.git
    $ git clone --branch develop https://gitlab.bktele.com.br/ped/ciclope/mgm_student.git
```

## Clonar repositório ciclope/iac

```bash
    $ git clone https://gitlab.bktele.com.br/ped/ciclope/iac.git
```

## Atualizando o requirements.txt no iac

```bash
    $ cp packages/requirements.txt iac/docker-images/nginx_uwsgi/app/requirements.txt
```

## Subir os containers

```bash
    $ docker-compose -f ./iac/docker-compose_dev.yaml up -d --build
```

## Restaurar backup do Consul

```bash
    $ sudo curl --header "PRIVATE-TOKEN: V_rf5rpQ_gLYbCz8oa--" \
      "https://gitlab.bktele.com.br/api/v4/projects/17/packages/generic/dev_consul/0.0.042/backup.snap" \
      -o consul/backup/backup.snap 
    $ docker cp ./iac/docker-images/consul/consul.hcl dev_consul:/consul/config/
    $ docker exec dev_consul consul snapshot restore /consul/backup/backup.snap
    $ docker restart dev_consul
```

### Restaurando backup do consul com token

```bash
    $ docker exec dev_consul consul snapshot restore -token=e69dfdd2-b449-4d3d-ce4f-c77b66464c70 \
    /consul/backup/backup.snap
```

### Token do dev_consul

* token=e69dfdd2-b449-4d3d-ce4f-c77b66464c70

## Apagar o ambiente dev

```bash
    $ docker-compose -f ./iac/docker-compose_dev.yaml down
```

# Atualizar microsserviço com packages em desenvolvimento

## Compilando o pacote BKT_ConfigAndModel

```bash
    $ docker exec dev_packages python3 -m build /ciclope/packages/ciclope_package
```

## Atualizar o pacote BKT_ConfigAndModel no microsserviço desejado.

_Obs.: no exemplo abaixo, o pacote BK é atualizado no microsserviço `dev_puppet`_

```bash
    $ docker cp packages/ciclope_package/dist/BKT_ConfigAndModels-0.1.0-py3-none-any.whl \
    dev_puppet:/ciclope/

    $ docker exec dev_puppet pip3 install --force-reinstall \
    /ciclope/BKT_ConfigAndModels-0.1.0-py3-none-any.whl

    $ docker exec dev_puppet touch /ciclope/app/uwsgi.ini
```

# Miscs

## Como restaurar backup do mysql

O backup é restaurado automaticamente quando gerar a imagem (--build). O arquivo é baixado do packages do repositório iac.

Caso necessite restaurar a base de dados BK_DB, siga os seguintes passos:

```bash
   $ curl --header "PRIVATE-TOKEN: V_rf5rpQ_gLYbCz8oa--" \
   "https://gitlab.bktele.com.br/api/v4/projects/17/packages/generic/dev_mysql/0.0.042/BK_DB.sql" \
   -o BK_DB.sql

   $ docker exec dev_mysql mysql -uroot -proot BK_DB < BK_DB.sql

   $ rm BK_DB.sql # limpando o lixo
```


# To do:

* documentar em documentation;
