const cluster   = require('cluster');
const worker    = require('./worker');

/**
 * 创建一个工作进程 
 */
const init_work = async function(){
    // 衍生工作进程。
    let __worker = cluster.fork();
    console.log(`${__worker.id}开始`);

    //工作进程事件
    __worker.on('message',up_data);

    //任务结束，20秒后重新启动一个
    __worker.on('disconnect', ()=>{
        console.log(`${__worker.id}结束`);
        setTimeout(init_work,20000);
    })
}

/**
 * 上传数据
 */
const up_data = function(data){
    console.log('抓取到数据%o',data);
}

if (cluster.isMaster) {
    // 衍生工作进程。
    init_work();

    //退出
    cluster.on('exit', (worker, code, signal) => {
        console.log(`主进程 ${worker.process.pid} 已退出`);
    });
} else {
    //工作进程
    worker.start();
    console.log(`工作进程 ${process.pid} 已启动`);
}

