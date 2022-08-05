# Criar o ambiente dev

## Criar diretório de trabalho

```bash
    $ mkdir tcc-backend
    $ cd tcc-backend
```

## Clonar repositórios em que vai trabalhar

Exemplo:

```bash
    $ git clone https://github.com/victor-souza1997/backend.git
    $ git clone https://github.com/victor-souza1997/frontend.git
```

## Clonar repositório ciclope/iac

```bash
    $ git clone https://github.com/victor-souza1997/iac.git
```
## Iniciar Docker na máquina

```bash
    $ service docker start
```

## Subir os containers

```bash
    $ docker-compose -f ./iac/docker-compose_dev.yaml up -d --build
```
