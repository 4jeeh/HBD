var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  for (var i = 0; i < 100; i++) {
    var heart = new createjs.Shape();
    heart.graphics.beginFill(
      createjs.Graphics.getHSL(
        Math.random() * 30 - 45,
        100,
        50 + Math.random() * 30
      )
    );
    heart.graphics
      .moveTo(0, -12)
      .curveTo(1, -20, 8, -20)
      .curveTo(16, -20, 16, -10)
      .curveTo(16, 0, 0, 12);
    heart.graphics
      .curveTo(-16, 0, -16, -10)
      .curveTo(-16, -20, -8, -20)
      .curveTo(-1, -20, 0, -12);
    heart.y = -100;

    container.addChild(heart);
  }

  var text = new createjs.Text(
    "Hai, rasanya udah lama banget ya kita nggak saling cerita. Gimana rasanya bertambah dewasa? Hehe.\n\n" +
      "Selamat ulang tahun! Aku selalu mendoakan yang terbaik buat kamu. Aku tahu kamu punya banyak impian besar, dan aku yakin kamu bisa mencapainya dengan segala kemampuan kamu.\n\n" +
      "Maaf ya, mungkin aku cuma bisa kasih kado dan web sederhana ini. Tapi ini aku buat sepenuh hati, khusus untuk kamu.\n\n" +
      "Terus semangat ya! Aku tahu kamu hebat. Jangan terlalu keras sama diri sendiri, kurangin overthinkingnya, dan jangan lupa jaga pola makan dan istirahat yang cukup.\n\n" +
      "Aku yakin suatu hari nanti kamu bakal jadi seseorang yang membanggakan orang tua, sukses besar, dan bahagia dunia akhirat.\n\n" +
      "Apapun yang terjadi, aku selalu ada di sini buat kamu, kapanpun kamu butuh.\n\n" +
      "Selamat menikmati hari spesialmu. I’m always by your side, forever and always. ❤\n\n" +
      "Klik dimana aja biar ada soundnya",
    "bold 16px Arial",
    "#fff"
  );
  text.textAlign = "center";
  text.x = w / 2;
  text.y = h / 2 - text.getMeasuredLineHeight();
  stage.addChild(text);

  for (i = 0; i < 100; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

  for (var i = 0; i < l; i++) {
    var heart = container.getChildAt(i);
    if (heart.y < -50) {
      heart._x = Math.random() * w;
      heart.y = h * (1 + Math.random()) + 50;
      heart.perX = (1 + Math.random() * 2) * h;
      heart.offX = Math.random() * h;
      heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
      heart.velY = -Math.random() * 2 - 1;
      heart.scale = Math.random() * 2 + 1;
      heart._rotation = Math.random() * 40 - 20;
      heart.alpha = Math.random() * 0.75 + 0.05;
      heart.compositeOperation =
        Math.random() < 0.33 ? "lighter" : "source-over";
    }
    var int = ((heart.offX + heart.y) / heart.perX) * Math.PI * 2;
    heart.y += (heart.velY * heart.scaleX) / 2;
    heart.x = heart._x + Math.cos(int) * heart.ampX;
    heart.rotation = heart._rotation + Math.sin(int) * 30;
  }

  captureContainer.updateCache("source-over");

  stage.update(event);
}

init();

document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("backgroundMusic");

  async function tryPlayMusic() {
    try {
      await music.play();
      music.muted = false;
    } catch (err) {
      console.log("Autoplay diblokir. Menunggu interaksi pengguna...");
    }
  }

  document.addEventListener(
    "click",
    function () {
      music.muted = false;
      music.play();
    },
    { once: true }
  );

  music.volume = 0.5;
  tryPlayMusic();
});
