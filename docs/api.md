# API文档

## play

### v1.0

- 输入
    - 芯片号
    - 随机种子
    - 游戏类型

```json
{
  "chip_id": 1,
  "random_seed": 1,
  "game_category": 1
}
```

- 输出
    - 牌对象
        - id：编号，int类型
        - type：牌花色，str类型
            - 'h'或者'hearts'：红桃
            - 'd'或者'diamonds'：方片
            - 's'或者'spades'：黑桃
            - 'c'或者'clubs'：梅花
        - rank：位阶，str类型
            - 1-10
            - J、Q、K
            - JOKER（简写O），其中红桃和方片代表大鬼（红色），黑桃和梅花代表小鬼（黑色）
    - all：所有的牌，牌对象数组
    - remain：去除一些牌之后剩余的牌，等分给用户和脑
        - user：用户拿到的牌，牌对象数组
        - brain：大脑拿到的牌，牌对象数组
    - sorted：用户和大脑进行排序后的结果，格式同remian
    - 输赢情况，str类型

```json
{
  "all": [
    {
      "id": 1,
      "type": "h",
      "rank": "1"
    },
    {
      "id": 2,
      "type": "h",
      "rank": "2"
    }
  ],
  "remain": {
    "user": [],
    "brain": []
  },
  "sorted": {
    "user": [],
    "brain": []
  },
  "result": "User Win!"
}
```
