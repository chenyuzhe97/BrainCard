// let canvas = document.getElementById('brainCardCanvas');
// let canvas_width = canvas.width;
// let canvas_height = canvas.height;

let canvas_width = 1280;
let canvas_height = 720;

let stage = new Konva.Stage({
    container: 'brainCardCanvas',   // id of container <div>
    width: canvas_width,
    height: canvas_height
});

let layer = new Konva.Layer();
stage.add(layer);


let grid_h = 20;
let grid_w = 20;
let row = 2;
let col = undefined;
let image_width = undefined;
let image_height = undefined;


function winText(data) {
    let resultText = new Konva.Text({
        x: stage.width() / 2,
        y: stage.height() / 2,
        text: data['result'],
        fontSize: 200,
        fontFamily: 'Arial',
        fill: 'black',
        opacity: 1,
        align: 'center',
        verticalAlign: 'middle'
    });
    resultText.offsetX(resultText.width() / 2);
    resultText.offsetY(resultText.height() / 2);
    layer.add(resultText);
}

function sortScaling(data, initImageData, sortImageData, backgroundImageData) {
    let scalingTime = 3000;
    // 偏移后翻转才会在中轴
    Object.keys(sortImageData).forEach((key, idx) => {
        let el = sortImageData[key];
        el.x(el.x() + image_width / 2);
        el.offsetX(image_width / 2);
    })
    Object.keys(backgroundImageData).forEach((key, idx) => {
        let el = backgroundImageData[key];
        el.x(el.x() + image_width / 2);
        el.offsetX(image_width / 2);
    })
    let scaleAnim = new Konva.Animation(function (frame) {
        let time = frame.time;
        let rate = time / (scalingTime / 2);
        if (time >= scalingTime) {
            this.stop();
            winText(data);
        } else {
            Object.keys(sortImageData).forEach((key, idx) => {
                let el = sortImageData[key];
                let scale = rate - 1;
                el.scaleX(scale);
                if (scale >= 0) {
                    el.opacity(1);
                }
            })
            Object.keys(backgroundImageData).forEach((key, idx) => {
                let el = backgroundImageData[key];
                let scale = rate - 1;
                el.scaleX(scale);
                if (scale >= 0) {
                    el.opacity(0);
                }
            })
        }
    })
    scaleAnim.start();
}

function sortMove(data, initImageData, remainImageData, backgroundImageData) {
    Object.keys(remainImageData).forEach((key, idx) => {
        let el = remainImageData[key];
        el.x(el.x() - image_width / 2);
        el.offsetX(0);
    })
    Object.keys(backgroundImageData).forEach((key, idx) => {
        let el = backgroundImageData[key];
        el.x(el.x() - image_width / 2);
        el.offsetX(0);
        el.scaleX(1);
    })
    let sortData = data['sort']
    let userData = sortData['user'];
    let userImageData = userData.map((el) => el['id']).map(id => initImageData[id]);
    let userCardMove = userImageData.map((el, idx) => {
        let new_x = (idx + 2) * grid_w + (idx + 1) * image_width;
        let new_y = grid_h;
        let current_x = el.getAbsolutePosition().x;
        let current_y = el.getAbsolutePosition().y;
        return {
            'rawPos': {'x': current_x, 'y': current_y},
            'newPos': {'x': new_x, 'y': new_y},
        };
    })
    let brainData = sortData['brain'];
    let brainImageData = brainData.map((el) => el['id']).map(id => initImageData[id]);
    let brainCardMove = brainImageData.map((el, idx) => {
        let new_x = (idx + 2) * grid_w + (idx + 1) * image_width;
        let new_y = 2 * grid_h + image_height;
        let current_x = el.getAbsolutePosition().x;
        let current_y = el.getAbsolutePosition().y;
        return {
            'rawPos': {'x': current_x, 'y': current_y},
            'newPos': {'x': new_x, 'y': new_y},
        };
    })
    let moveTime = 2000;
    let sortMoveAnim = new Konva.Animation(function (frame) {
        let time = frame.time;
        let timeRemain = moveTime - time;
        if (timeRemain <= 0) {
            this.stop();
            sortScaling(data, initImageData, remainImageData, backgroundImageData);
        } else {
            // 因为动画帧秒数不同，只能实时计算
            userData.forEach((item, idx) => {
                let id = item['id'];
                let elFront = initImageData[id];
                let elBack = backgroundImageData[id];
                let rawPos = userCardMove[idx]['rawPos'];
                let newPos = userCardMove[idx]['newPos'];
                let current_x = (newPos['x'] - rawPos['x']) * (time / moveTime) + rawPos['x']
                let current_y = (newPos['y'] - rawPos['y']) * (time / moveTime) + rawPos['y']
                elFront.x(current_x);
                elFront.y(current_y);
                elBack.x(current_x);
                elBack.y(current_y);
            })
            brainData.forEach((item, idx) => {
                let id = item['id'];
                let elFront = initImageData[id];
                let elBack = backgroundImageData[id];
                let rawPos = brainCardMove[idx]['rawPos'];
                let newPos = brainCardMove[idx]['newPos'];
                let current_x = (newPos['x'] - rawPos['x']) * (time / moveTime) + rawPos['x']
                let current_y = (newPos['y'] - rawPos['y']) * (time / moveTime) + rawPos['y']
                elFront.x(current_x);
                elFront.y(current_y);
                elBack.x(current_x);
                elBack.y(current_y);
            })
        }
    });
    sortMoveAnim.start();

}


function remainScaling(data, initImageData, remainImageData, backgroundImageData) {
    let scalingTime = 3000;
    // 偏移后翻转才会在中轴
    Object.keys(remainImageData).forEach((key, idx) => {
        let el = remainImageData[key];
        el.x(el.x() + image_width / 2);
        el.offsetX(image_width / 2);
    })
    Object.keys(backgroundImageData).forEach((key, idx) => {
        let el = backgroundImageData[key];
        el.x(el.x() + image_width / 2);
        el.offsetX(image_width / 2);
    })
    let scaleAnim = new Konva.Animation(function (frame) {
        let time = frame.time;
        let rate = time / (scalingTime / 2);
        if (time >= scalingTime) {
            this.stop();
            sortMove(data, initImageData, remainImageData, backgroundImageData);
        } else {
            Object.keys(remainImageData).forEach((key, idx) => {
                let el = remainImageData[key];
                let scale = 1 - rate;
                el.scaleX(scale);
                if (scale <= 0) {
                    el.opacity(0);
                }
            })
            Object.keys(backgroundImageData).forEach((key, idx) => {
                let el = backgroundImageData[key];
                let scale = 1 - rate;
                el.scaleX(scale);
                if (scale <= 0) {
                    el.opacity(1);
                }
            })
        }
    })
    scaleAnim.start();
}


function remainMove(data, initImageData) {
    let remainData = data['remain']
    let userData = remainData['user'];
    let userImageData = userData.map((el) => el['id']).map(id => initImageData[id]);
    let userCardMove = userImageData.map((el, idx) => {
        let new_x = (idx + 2) * grid_w + (idx + 1) * image_width;
        let new_y = grid_h;
        let current_x = el.getAbsolutePosition().x;
        let current_y = el.getAbsolutePosition().y;
        return {
            'rawPos': {'x': current_x, 'y': current_y},
            'newPos': {'x': new_x, 'y': new_y},
        };
    })
    let brainData = remainData['brain'];
    let brainImageData = brainData.map((el) => el['id']).map(id => initImageData[id]);
    let brainCardMove = brainImageData.map((el, idx) => {
        let new_x = (idx + 2) * grid_w + (idx + 1) * image_width;
        let new_y = 2 * grid_h + image_height;
        let current_x = el.getAbsolutePosition().x;
        let current_y = el.getAbsolutePosition().y;
        return {
            'rawPos': {'x': current_x, 'y': current_y},
            'newPos': {'x': new_x, 'y': new_y},
        };
    })

    let remaDataAll = userData.concat(brainData);
    // let remainImageData=remaDataAll.map((el) => el['id']).map(id => initImageData[id]);
    let remainImageData = {};
    remaDataAll.map((el) => el['id']).map(id => remainImageData[id] = initImageData[id]);
    let backgroundImageSrc = '/static/img/poker-qr/1B.svg';
    let backgroundImageData = {};
    Konva.Image.fromURL(backgroundImageSrc, (imageNode) => {
        Object.keys(remainImageData).forEach(function (key, idx) {
            let newImage = imageNode.image().cloneNode(true);
            // let j = idx + (data['init'].length - remainImageData.length);
            // let x_idx = Math.floor(j / row);
            // let y_idx = j % row;
            // let newImageNode = new Konva.Image({
            //     x: (x_idx + 1) * grid_w + x_idx * image_width,
            //     y: (y_idx + 1) * grid_h + y_idx * image_height,
            //     image: newImage,
            //     width: image_width,
            //     height: image_height,
            //     opacity: 0
            // });
            let newImageNode = new Konva.Image({
                x: remainImageData[key].x(),
                y: remainImageData[key].y(),
                image: newImage,
                width: image_width,
                height: image_height,
                opacity: 0
            })
            backgroundImageData[key] = newImageNode;
            layer.add(newImageNode);
        })
        let userText = new Konva.Text({
            x: grid_w,
            y: grid_h,
            text: 'User Cards',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'red',
            align: 'center',
            verticalAlign: 'middle',
            opacity: 0
        });
        layer.add(userText);
        let brainText = new Konva.Text({
            x: grid_w,
            y: 2 * grid_h + image_height,
            text: 'Brain Cards',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'green',
            align: 'center',
            verticalAlign: 'middle',
            opacity: 0
        });
        layer.add(brainText);
        let identityTextAnim = new Konva.Animation(function (frame) {
            let time = frame.time;
            let opacityRate = 0.5;
            let currentOpacity = opacityRate * (time / 1000);
            if (currentOpacity >= 1) {
                userText.opacity(1);
                brainText.opacity(1);
                this.stop();
            } else {
                userText.opacity(currentOpacity);
                brainText.opacity(currentOpacity);
            }
        });
        identityTextAnim.start();

        let moveTime = 2000;
        let remainMoveAnim = new Konva.Animation(function (frame) {
            let time = frame.time;
            let timeRemain = moveTime - time;
            if (timeRemain <= 0) {
                this.stop();
                remainScaling(data, initImageData, remainImageData, backgroundImageData);
            } else {
                // 因为动画帧秒数不同，只能实时计算
                userData.forEach((item, idx) => {
                    let id = item['id'];
                    let elFront = initImageData[id];
                    let elBack = backgroundImageData[id];
                    let rawPos = userCardMove[idx]['rawPos'];
                    let newPos = userCardMove[idx]['newPos'];
                    let current_x = (newPos['x'] - rawPos['x']) * (time / moveTime) + rawPos['x']
                    let current_y = (newPos['y'] - rawPos['y']) * (time / moveTime) + rawPos['y']
                    elFront.x(current_x);
                    elFront.y(current_y);
                    elBack.x(current_x);
                    elBack.y(current_y);
                })
                brainData.forEach((item, idx) => {
                    let id = item['id'];
                    let elFront = initImageData[id];
                    let elBack = backgroundImageData[id];
                    let rawPos = brainCardMove[idx]['rawPos'];
                    let newPos = brainCardMove[idx]['newPos'];
                    let current_x = (newPos['x'] - rawPos['x']) * (time / moveTime) + rawPos['x']
                    let current_y = (newPos['y'] - rawPos['y']) * (time / moveTime) + rawPos['y']
                    elFront.x(current_x);
                    elFront.y(current_y);
                    elBack.x(current_x);
                    elBack.y(current_y);
                })
                // userImageData.forEach((el, idx) => {
                //     let rawPos = userCardMove[idx]['rawPos'];
                //     let newPos = userCardMove[idx]['newPos'];
                //     let current_x = (newPos['x'] - rawPos['x']) * (time / moveTime) + rawPos['x']
                //     let current_y = (newPos['y'] - rawPos['y']) * (time / moveTime) + rawPos['y']
                //     el.x(current_x);
                //     el.y(current_y);
                // })
                // brainImageData.forEach((el, idx) => {
                //     let rawPos = brainCardMove[idx]['rawPos'];
                //     let newPos = brainCardMove[idx]['newPos'];
                //     let current_x = (newPos['x'] - rawPos['x']) * (time / moveTime) + rawPos['x']
                //     let current_y = (newPos['y'] - rawPos['y']) * (time / moveTime) + rawPos['y']
                //     el.x(current_x);
                //     el.y(current_y);
                // })
            }
        });
        remainMoveAnim.start();
    })


}


function remainOpacity(data, initImageData) {
    let initData = data['init'];
    let remainData = data['remain'];
    let initDataIds = initData.map((el) => el['id']);
    let remainDataAll = remainData['user'].concat(remainData['brain']);
    let remainDataIds = remainDataAll.map((el) => el['id']);
    let filteredDataIds = initDataIds.filter(item => !remainDataIds.includes(item));
    let filteredImageData = filteredDataIds.map(id => initImageData[id]);

    let fadeOutAnim = new Konva.Animation(function (frame) {
        let time = frame.time,// 动画开始后的总时间
            timeDiff = frame.timeDiff,// 自上一帧以来经过的时间
            lastTime = frame.lastTime,// 上一帧开始时的时间戳
            frameRate = frame.frameRate;// 动画帧率，单位是帧/秒
        let opacityRate = 0.5;
        let currentOpacity = 1 - opacityRate * (time / 1000);
        if (currentOpacity <= 0) {
            for (let item of filteredImageData) {
                item.opacity(0);
            }
            this.stop();
            remainMove(data, initImageData);
        } else {
            for (let item of filteredImageData) {
                item.opacity(currentOpacity);
            }
        }
    }, layer);
    fadeOutAnim.start();
}

function show(data) {
    layer.removeChildren();
    layer.draw();
    let initData = data['init'];
    let initDataLength = initData.length;
    col = initDataLength / row;
    image_width = (canvas_width - (col + 1) * grid_w) / col;
    image_height = (canvas_height - (row + 1) * grid_h) / row;

    // 初始化
    let initImageData = {};
    initData.forEach((el, idx, arr) => {
        let imageName = String(el['rank']).toUpperCase()+String(el['type'][0]).toUpperCase()  ;
        let imageSrc = '/static/img/poker-qr/' + imageName + '.svg';
        Konva.Image.fromURL(imageSrc, (imageNode) => {
            initImageData[el['id']] = imageNode;
            let x_idx = Math.floor(idx / row);
            let y_idx = idx % row;
            imageNode.setAttrs({
                x: (x_idx + 1) * grid_w + x_idx * image_width,
                y: (y_idx + 1) * grid_h + y_idx * image_height,
                width: image_width,
                height: image_height,
                // stroke:'green',
                // strokeWidth:10
            });
            layer.add(imageNode);
        })
    })

    // 剩余卡
    setTimeout(remainOpacity, 1000, data, initImageData);
}

function play(req) {
    fetch('/api/v1_0/play', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(req),
    }).then(res => res.json()).then(json => show(json))
}

function submitBrainCardForm(form) {
    let formData = new FormData(form);
    let data={};
    formData.forEach((value, key) => data[key] = value)
    play(data);
    return false;
}

