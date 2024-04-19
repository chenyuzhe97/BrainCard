import os
import random

from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template
from pydantic import ValidationError

from utils import algorithm
from viewModels import PlayerModel

load_dotenv()
app = Flask(__name__)
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', default=False)


@app.get('/')
@app.get('/index')
@app.get('/index.html')
def index():
    return render_template('index.html')


@app.post('/api/v1_0/play')
def play():
    chip_id = request.json.get('chipId', None)
    random_seed = request.json.get('randomSeed', random.randint(0, 2 ** 32 - 1))
    game_category = request.json.get('gameCategory', None)
    try:
        player = PlayerModel(chip_id=chip_id, random_seed=random_seed, game_category=game_category)
    except ValidationError as e:
        return jsonify(e.errors())
    res = algorithm(player.chip_id, player.random_seed, player.game_category)
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)
