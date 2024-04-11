from flask import Flask, request, jsonify, render_template
import random
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
    random_seed = request.json.get('random_seed', random.randint(0, 2**32-1))
    game_category = request.json.get('game_category', None)
    # todo:增加后端数据验证
    res = algorithm(**{
        'chip_id': chip_id,
        'random_seed': random_seed,
        'game_category': game_category,
    })
    return jsonify(res)


if __name__ == '__main__':
    app.run()
