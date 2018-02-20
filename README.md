# Vegsochk.Umbrella

## Deployment
builds the release and puts it into the release store on the server
mix edeliver version production
```
env MIX_ENV=prod mix edeliver build release
mix edeliver deploy release to production
mix edeliver deploy release to production --version=0.1.2+2742e62
mix edeliver restart production
```
