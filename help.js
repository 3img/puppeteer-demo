/**
 * 
 * @param {int} time 睡眠时间
 */
const sleep=function(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

exports.sleep = sleep