
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
    //和项目数据的关联目前还没有做，此时相当于是引用一个和当前项目无关的连接打包成客户端
    // win.loadFile('public/index.html')
    win.loadURL('http://39.105.220.189:8082/#/')
}

//应用就绪之后打开窗口
app.whenReady().then(() => {
    createWindow()
  })