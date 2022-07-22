# Servidor Homologação

### Dados:

* IP: 192.168.10.81
* Usuário: bktadmin
* Senha: \<vault\>

*Obs.: Acessível apenas via vpn*

# Instalação

## 1. Instalar Ubuntu Server 20.04 LTS

Instalar o Ubuntu 20.04 LTS.

## 2. Pós instalação base

```bash
$ sudo apt update
$ sudo apt upgrade -y
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
$ sudo apt update
$ sudo apt install docker-ce docker-compose
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

## 3. Montar o ambiente

Executar os passos do guia [dev_ambiente.md](dev_ambiente.md)

## 4. Diretório /etc/bktelecom

```bash
$ sudo mkdir /etc/bktelecom

$ sudo cat <<EOF > /etc/bktelecom/backup.py
#!/usr/bin/python3
import os
from datetime import datetime

dia = datetime.today().strftime('%A')

# backup consul
os.system("/usr/bin/docker exec dev_consul consul snapshot save -token=e69dfdd2-b449-4d3d-ce4f-c77b66464c70 /consul/backup/dev_consul-'%s'.snap" % dia)
os.system("/usr/bin/gzip -f /ciclope/consul/backup/dev_consul-'%s'.snap" % dia)

# backup BK_DB
os.system("/usr/bin/docker exec dev_mysql mysqldump BK_DB -uroot -proot > /ciclope/db/backup/BK_DB-'%s'.sql" % dia)
os.system("/usr/bin/gzip /ciclope/db/backup/BK_DB-'%s'.sql" % dia)
EOF

$ sudo chmod 750 /etc/bktelecom/backup.py

$ sudo cat <<EOF > /etc/bktelecom/gitlab_iac.py
#!/usr/bin/python3
import os
from datetime import datetime

try:
    # backup consul
    print("gerando backup do consul e atualizando o package do iac no gitlab")
    os.system("/usr/bin/docker exec dev_consul consul snapshot save -token=e69dfdd2-b449-4d3d-ce4f-c77b66464c70 /consul/backup/backup.snap")
    os.system('curl --header "PRIVATE-TOKEN: _uZFYxaF_-yBdwVm7r9h" --upload-file /ciclope/consul/backup/backup.snap "https://gitlab.bktele.com.br/api/v4/projects/17/packages/generic/dev_consul/0.0.042/backup.snap"')
    print(" sucesso.")
except:
    print(" erro. favor verificar o problema")

try:
    # backup BK_DB
    print("gerando backup da base BK_DB e atualizando o package do iac no gitlab")
    os.system("/usr/bin/docker exec dev_mysql mysqldump BK_DB -uroot -proot > /ciclope/db/backup/BK_DB.sql")
    os.system('curl --header "PRIVATE-TOKEN: _uZFYxaF_-yBdwVm7r9h" --upload-file /ciclope/db/backup/BK_DB.sql "https://gitlab.bktele.com.br/api/v4/projects/17/packages/generic/dev_mysql/0.0.042/BK_DB.sql"')
    print(" sucesso.")
except:
    print(" erro. favor verificar o problema")
EOF

$ sudo chmod 750 /etc/bktelecom/gitlab_iac.py

$ sudo echo "10 0 * * * root /etc/bktelecom/backup.py >> /dev/null" >> /etc/crontab
```

