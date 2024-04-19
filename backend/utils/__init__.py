def algorithm(chip_id: int, random_seed: float, game_category: int):
    return {
        'init': [
            {
                'id': 1,
                'type': 'h',
                'rank': 'a',
            }, {
                'id': 2,
                'type': 'h',
                'rank': '2',
            }, {
                'id': 3,
                'type': 'h',
                'rank': '3',
            }, {
                'id': 4,
                'type': 'h',
                'rank': '4',
            }, {
                'id': 5,
                'type': 'h',
                'rank': '5',
            }, {
                'id': 6,
                'type': 'h',
                'rank': '6',
            }, {
                'id': 7,
                'type': 'h',
                'rank': '7',
            }, {
                'id': 8,
                'type': 'h',
                'rank': '8',
            },
        ],
        'remain': {
            'user': [
                {
                    'id': 1,
                    'type': 'h',
                    'rank': 'a',
                }, {
                    'id': 2,
                    'type': 'h',
                    'rank': '2',
                }, {
                    'id': 7,
                    'type': 'h',
                    'rank': '7',
                },
            ],
            'brain': [
                {
                    'id': 4,
                    'type': 'h',
                    'rank': '4',
                }, {
                    'id': 5,
                    'type': 'h',
                    'rank': '5',
                }, {
                    'id': 6,
                    'type': 'h',
                    'rank': '6',
                },
            ],
        },
        'sort': {
            'user': [
                {
                    'id': 7,
                    'type': 'h',
                    'rank': '7',
                }, {
                    'id': 2,
                    'type': 'h',
                    'rank': '2',
                }, {
                    'id': 1,
                    'type': 'h',
                    'rank': 'a',
                },
            ],
            'brain': [
                {
                    'id': 6,
                    'type': 'h',
                    'rank': '6',
                }, {
                    'id': 4,
                    'type': 'h',
                    'rank': '4',
                }, {
                    'id': 5,
                    'type': 'h',
                    'rank': '5',
                }
            ],
        },
        'result': 'Brain Win!'
    }
