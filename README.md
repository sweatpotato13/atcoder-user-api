# AtCoderUserInfoAPI

Atcoder UserInfo API 

## Environment
* Docker

## Usage
```
docker-compose up -d
```

```
http://localhost:8000/user/CuteWisp
```

## API Reference

### GET /user/:{userid}
base-url is `https://api.cutewisp.com/atcoder`
```
https://api.cutewisp.com/atcoder/user/CuteWisp
```

```json
{
    "bitrh": 1995,
    "highest": 740,
    "id": 6468795,
    "match": 13,
    "rank": 17772,
    "rating": 717,
    "user": "CuteWisp",
    "win": 0
}
```
