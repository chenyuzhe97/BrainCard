from flask import Flask, request, jsonify, render_template

from utils import algorithm

app = Flask(__name__)


@app.get('/')
@app.get('/index')
@app.get('/index.html')
def index():
    return render_template('index.html')


@app.post('/api/v1_0/play')
def play():
    chip_id = request.json.get('chip_id', None)
    random_seed = request.json.get('random_seed', None)
    game_category = request.json.get('game_category', None)
    experiment_serial_number = request.json.get('experiment_serial_number', None)
    epochs = request.json.get('epochs', None)
    # todo:增加后端数据验证
    res = algorithm(**{
        'chip_id': chip_id,
        'random_seed': random_seed,
        'game_category': game_category,
        'experiment_serial_number': experiment_serial_number,
        'epochs': epochs
    })
    # res format
    # res = {
    #     'raw': {
    #         'user': [],
    #         'brain': []
    #     },
    #     'sort': {
    #         'user': [],
    #         'brain': []
    #     },
    #     'result': ''
    # }
    return jsonify(res)


if __name__ == '__main__':
    app.run()
