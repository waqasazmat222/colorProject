import express from 'express'
import cors from 'cors'
var app = express();
app.use(cors());
import canvas from 'canvas'

let img= new canvas.Image();
img.src = "logo.png";
let myCanvas=canvas.createCanvas(256,128);
let context=myCanvas.getContext("2d");
context.drawImage(img, 0, 0, 256, 128);
let imgData=context.getImageData(0,0,256,128);

let newimgData=imgData.data;
let index=0;
for(let r=0;r<256;r+=8){
    for(let g=0;g<256;g+=8){
        for(let b=0;b<256;b+=8){
            newimgData[index]=r;
             newimgData[index+1]=g;
             newimgData[index+2]=b;
            index+=4;  
        }
    }
}
imgData.data=newimgData;
context.putImageData(imgData,0,0);
let image=myCanvas.toBuffer();
app.get('/color.png', (req, res) => {
    res.set({'Content-Type': 'image/png'})
    res.send(image)
})

app.listen(9000)