# API文档

## play

v1.0:
```text
req: {
    'chip_id':int,
    'random_seed':int',
    'game_category':int,
    'experiment_serial_number':int
    'epochs':int,
}

res:{
    'raw': {
        'user': [],
        'brain': []
    },
    'sort': {
        'user': [],
        'brain': []
    },
    'result': str
}

```