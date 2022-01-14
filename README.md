# Run Development DB

```
docker run --name redis -d -v $(pwd)/dev-redis-data/:/data -p 6379:6379 redis:6
docker run -v $(pwd)/dev-zinc-data:/data -e DATA_PATH="/data" -p 4080:4080 -e FIRST_ADMIN_USER=admin -e FIRST_ADMIN_PASSWORD=D3vD4t4b4s3 --name zinc public.ecr.aws/prabhat/zinc:latest
```

# Utils

https://jvilk.com/MakeTypes/
