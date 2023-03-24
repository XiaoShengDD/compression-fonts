<template>
  <div id="card">

    <canvas width="1300" height="3000" id="myCanvas">
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>

    <img :src="base64" alt="">

    <button @click="download">下载</button>

  </div>

</template>


<script>

import QRCode from 'qrcode'

export default {
  components: {

  },
  name: "card",
  data() {
    return {
      QRImgUrl: "",
      text: "BEGIN:VCARD\nVERSION:2.1\nX-ESI-CATEGORIES;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:=E5=AE=B6=E4=BA=BA\nN;CHARSET=UTF-8:赵镇3\nTEL;CELL:13050550556\nEND:VCARD",
      base64: '',
    }
  },

  created() {
  },

  mounted() {

    this.get_qrcode()

  },
  methods: {

    get_qrcode() {   //生成工点二维码  及验证密码   --- 前端
      QRCode.toDataURL(this.text, {
        errorCorrectionLevel: 'L',
        margin: 0,
        width: 806,
        color: {
          dark: "#3d9ef8",//前景色
          light: "#fff"//背景色
        }
      }, (err, url) => {
        if (err) throw err

        this.setCanvas({
          url: url,
          name: '小明',
          position: '后台工程师',
          phone: '13050550556',
          email: 'zhen.zhao@ys100.com',
          // coName: '鹰硕集团（深圳）有限公司鹰硕集团（深圳）有限公司鹰硕集团（深圳）有限公司',
          coName: '鹰硕集团（深圳）有限公司',
          head: require('@/assets/head.jpeg'),
          link: '官网：www.ys100.com',
          tel: '电话：86-755-82513846 | 400-8893-913',
          address: '地址：深圳市宝安区留仙三路6号鸿荣源鸿威工业区D栋3楼',
          //   address: '地址：深圳市宝安区',

        })
      })
    },


    /*  
     *  设置图片弧度
     *  参数说明
     *  ctx Canvas实例
     *  img 图片地址
     *   x  x轴坐标
     *   y  y轴坐标
     *   w  宽度
     *   h  高度
     *   r  弧度大小
     */
    drawRoundRect(ctx, r, x, y, w, h, img) {
      ctx.save();
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, w, h);
      ctx.restore(); // 返回上一状态
    },


    /*  文字换行
     *  ctx Canvas实例
     *   t 文字
     *   x  x轴坐标
     *   y  y轴坐标
     *   w  文字最大宽度
     *  top 每行字体y坐标间隔20
     */
    drawtext(ctx, t, x, y, w, top = 80) {

      //参数说明
      //ctx：canvas的 2d 对象，t：绘制的文字，x,y:文字坐标，w：文字最大宽度
      let chr = t.split("")
      let temp = ""
      let row = []

      for (let a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < w && ctx.measureText(temp + (chr[a])).width <= w) {
          temp += chr[a];
        } else {
          row.push(temp);
          temp = chr[a];
        }
      }
      row.push(temp)

      for (let b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * top);//每行字体y坐标间隔20
      }
      return row.length - 1
    },


    // 渲染画布
    setCanvas(options) {

      let falg, falg1

      var myCanvas = document.getElementById('myCanvas')
      let ctx = myCanvas.getContext('2d');


      // 头像
      let head = new Image();
      head.src = options.head;
      head.onload = () => {
        falg = true
        this.drawRoundRect(ctx, 30, 90, 120, 270, 270, head)
      };


      // 姓名
      ctx.font = "normal bold 84px sans-serif";
      ctx.fillStyle = "#3d9ef8"; // text color
      ctx.fillText(options.name, 400, 200);
      // 当前名称宽度
      let nameWidth = ctx.measureText(options.name).width

      // 电话 邮箱 职位
      ctx.font = "60px sans-serif";
      ctx.fillStyle = "#333333"; // text color
      ctx.fillText(options.phone, 400, 300);
      // 计算职位x轴距离
      let x = 430 + nameWidth
      ctx.fillText(options.position, x, 200);
      // 渲染当前邮箱，并且返回超出行数 计算邮箱超出高度
      let emailRowHeight = (this.drawtext(ctx, options.email, 400, 300, 820) * 80)

      // 横线
      ctx.moveTo(0, 520 + emailRowHeight);
      ctx.lineTo(1300, 520 + emailRowHeight);
      ctx.lineWidth = 5
      ctx.strokeStyle = "#E5F1FF";
      ctx.lineCap = "butt"
      ctx.stroke();


      // 二维码
      let qrCode = new Image();
      qrCode.src = options.url;
      qrCode.onload = () => {
        falg1 = true
        ctx.drawImage(qrCode, 247, 650 + emailRowHeight);
      };


      // 公司名称
      ctx.font = "84px sans-serif";
      ctx.fillStyle = "#333333"; // text color
      // 渲染当前公司名称，并且返回超出行数 计算公司名称超出高度
      let coNameRowHeight = (this.drawtext(ctx, options.coName, 90, (1550 + emailRowHeight), 1120, 100) * 100) + emailRowHeight


      // 公司信息 电话，官网，地址
      ctx.font = "60px sans-serif";
      ctx.fillStyle = "#909198"; // text color
      // 渲染当前公司官网，并且返回超出行数 计算公司官网超出高度
      ctx.fillText(options.tel, 90, 1800 + coNameRowHeight);
      let linkRowHeight = (this.drawtext(ctx, options.link, 90, (1800 + coNameRowHeight), 1120) * 80) + coNameRowHeight
      let addressRowHeight = (this.drawtext(ctx, options.address, 90, (1880 + linkRowHeight), 1120) * 80) + linkRowHeight

      // 底部文字
      ctx.font = "60px sans-serif";
      ctx.fillStyle = "#909198"; // text color
      ctx.textAlign = "center";
      ctx.fillText("长按图片识别二维码或扫一扫，添加名片", 650, 2200 + addressRowHeight);


      // 修改画布背景颜色
      let imageData = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        // 当该像素是透明的，则设置成白色
        if (imageData.data[i + 3] === 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // 修改画布高度
      let canvasData = ctx.getImageData(0, 0, 1300, 2300 + addressRowHeight);  // 保存画布
      myCanvas.height = 2300 + addressRowHeight;
      ctx.putImageData(canvasData, 0, 0);  //  改变完宽高后，重绘画布


      setTimeout(() => {
        this.base64 = document.getElementById('myCanvas').toDataURL("image/png")
      }, 300)


    },
    download() {

      this.base64 = document.getElementById('myCanvas').toDataURL("image/png")
      let card = this.dataURLtoFile(this.base64, 'card')
      let aDom = document.createElement("a"); // 创建一个 a 标签
      aDom.download = card.name; // 设置文件名
      let href = URL.createObjectURL(card); // 将file对象转成 UTF-16 字符串
      aDom.href = href; // 放入href
      document.body.appendChild(aDom); // 将a标签插入 body
      aDom.click(); // 触发 a 标签的点击
      document.body.removeChild(aDom); // 移除刚才插入的 a 标签
      URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串

    },

    dataURLtoFile(dataurl, filename) {//将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },


  },

}
</script>
<style >
* {
  margin: 0;
  padding: 0;
}

#myCanvas {
  margin: 0 auto;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: none;
}

img {
  width: 100vw;
}
</style>
