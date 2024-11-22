/**
 * Callback
 * Promise
 * Async/ await
 */

// console.log("Start");

// setTimeout(()=>{
//     console.log("Waiting"); // bắt buộc xử lý trước "End"
// },1500)

// console.log("End");

/**
 * Start
 * Waiting
 * End
 */

// callback: hàm gọi lại trong hàm khác, thông qua tham số

function sayHello(name){
    console.log(`Xin chào ${name}`);
}

function greeting(callback){
    callback('chinhpd5')
}

// greeting(sayHello)

// greeting((name)=>{
//     console.log(`Chào mừng ${name}`);
// })

// map,find,some filter,...
var data = [1,2,3]
// data.map((item,index)=>{})

// ứng dụng callback để xử lý bất đồng bộ

// tạo 1 hàm fake 1 tác vụ bất đồng bộ
function delay(callback,ms){
    setTimeout(()=>{
        callback('Waiting')
    },ms)
}

function doingCallback(){
    console.log("Start");
    delay((data)=>{
        console.log(data); // "waiting"
        console.log("End");

        //==============
        console.log("Start 2");
        delay((data)=>{
            console.log(data);
            console.log("End 2");

            //==============
            console.log("Start 3");
            delay((data)=>{
                console.log(data);
                console.log("End 3");

            },1500)
        },2000)
    },1000)
}

// doingCallback()
// callback hell

// Promise: lời hứa (Thành công | Thất bại)

// const myPromise = new Promise((resolve, reject)=>{// khai báo
//     const isCheck = true; 
//     if(isCheck){
//         resolve("Thành công")
//     }else{
//         reject("Thất bại")
//     }
// })

// // thực thi
// myPromise
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     .finally(()=>{
//         console.log("Hoàn thành");
//     })

// ứng dụng promise để giải quyết Bất đồng bộ

function delay1(ms){
    return new Promise((reslove,reject)=>{
        const isCheck = true;
        setTimeout(()=>{
            if(isCheck){
                reslove("Waiting")
            }else{
                reject('Thất bại')
            }
        },ms)
    })
}

function doingPromise(){
    console.log("Start");
    delay1(1500)
        .then((data)=>{
            console.log(data);
            console.log("End");

            //=-=======
            console.log("Start 2");
            return delay1(1000);//nếu return về 1 promise -> thực thi ở .then tiếp theo
        })
        .then((data)=>{
            console.log(data);
            console.log("End 2");

            //============
            console.log("Start 3");
            return delay1(2000);// nếu Promise gặp lỗi -> .catch xử lý lỗi
        })
        .then((data)=>{
            console.log(data);
            console.log("End 3");
        })
        .catch(err=>console.log(err))
        // .finally()// có thể có hoặc không

}

// doingPromise()

// async / await

async function doingAsync(){
    try {
        console.log("Start");
        const data = await delay1(2000); // Bất đồng bộ
        console.log(data);// Waiting
        console.log("End");

        //=========================
        console.log("Start 2");
        const data2 = await delay1(1000); // Bất đồng bộ
        console.log(data2);// Waiting
        console.log("End 2");

        
        //=========================
        console.log("Start 3");
        const data3 = await delay1(1000); // Bất đồng bộ
        console.log(data3);// Waiting
        console.log("End 3");
    } catch (error) {
        console.log(error);
    }
}
doingAsync();


