# Pull zinc repository

```
git clone https://github.com/prabhatsharma/zinc.git
```

# Install

```
helm install -f values.yaml --set auth.username=admin --set auth.password=SomePassword -n nhkeva zinc $PATH_TO_ZINC_REPO/helm/zinc
```