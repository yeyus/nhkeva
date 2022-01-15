# Pull bitnami helm repository

```
helm repo add bitnami https://charts.bitnami.com/bitnami
```

# Install

```
helm install --set architecture=standalone --set auth.enabled=true --set auth.password=SamplePassword --set master.persistence.enabled=true --set master.persistence.storageClass=nfs-client -n nhkeva nhkeva-redis bitnami/redis
```