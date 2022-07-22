# Dados do consul e mariadb

Os containers **dev_consul** e **dev_mysql** são pré-requisitos para vários microsserviços.

Como o objetivo de facilitar o desenvolvimento, usaremos inicialmente os dados (mysql e consul) restaurados de um backup do **servidor homologação** (192.168.10.81). Esse backup é enviado para o packages do **iac** manualmente a partir de um script executado no **servidor homologação**.

## Atualizando packages do iac

Acesse o servidor **servidor homologação** (192.168.10.81) e execute o script *gitlab_iac.py*. Esse procedimento irá gerar o backup (consul e mariadb) e enviar para o gitlab.

```bash
# /etc/bktelecom/gitlab_iac.py
```

Este script atualizará os seguintes packages no repositório **iac**:

* dev_mysql / BK_DB.sql
* dev_consul / backup.snap
