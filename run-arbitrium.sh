#!/bin/bash
if [ ! -e /opt/docker/arbitrium ] ; then
   echo "# Cloning repo:http://projetos@www.tools.ages.pucrs.br/arbitrium/api.git to Arbitrium"
   git clone --depth 1 --branch 038-integracao-jenkins http://projetos@www.tools.ages.pucrs.br/arbitrium/api.git /opt/docker/arbitrium
   cd /opt/docker/arbitrium
else
   echo "# Puling repo: http://projetos@www.tools.ages.pucrs.br/arbitrium/api.git to Arbitrium"
   cd /opt/docker/arbitrium
   git pull
fi

docker-compose up
