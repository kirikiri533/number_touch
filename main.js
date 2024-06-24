"use strict";
{

    class Panel{
        constructor(){
            this.el = document.createElement("li");
            this.el.classList.add("pressed");
            this.el.addEventListener("click",()=>{
               this.check();
            })
            
        }
        getEl(){
            return this.el;
        }
        activate(num)
        {
            this.el.classList.remove("pressed");
            this.el.textContent = num;
        }
        check(){
            if(currentNum === parseInt(this.el.textContent,10)){
                this.el.classList.add("pressed");
                currentNum++;

                if(currentNum === 15){
                    // clearTimeout(timeoutId);
                    start.classList.remove("inactive");
                    currentNum = 0;
                }
            }
        }
    }

    class Board{
        constructor(){
          this.panels = [];
          for(let i = 0; i < 15; i++){
            this.panels.push(new Panel());
          }
          this.setUp();
        }
        setUp(){
            const board = document.getElementById("board");
            this.panels.forEach(panel => {
                board.appendChild(panel.getEl());
            });
        }
        activate(level)
        {
            const nums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
 
            this.panels.forEach(panel => {
                const num = nums.splice(Math.floor(Math.random()*nums.length),1)[0];
                panel.activate(num);
            });
        }
           // この関数欲しい
        // {pressed 解除
        // textContents つける}
    }

    // function runTimer(){
    //     const timer = document.getElementById("timer");
    //     timer.textContent = ((Date.now()-startTime) / 1000).toFixed(2);

    //     timeoutId = setTimeout(()=>{
    //         runTimer();
    //     },10)
    // }

    let currentNum = 0;
    // let startTime;
    // let timeoutId;
    let endTime;
    let intervalId;  

    const board = new Board();
    const timer = document.getElementById("timer");

    function check(){
        // 残り時間　=終了時刻　-現在時刻
        let countdown = endTime - new Date().getTime();

         // タイマーの終了
        if(countdown < 0){
            clearInterval(intervalId);
            countdown = 10 * 1000;
            start.classList.remove("inactive");
            location.reload();
        }

        const totalSeconds = Math.floor(countdown / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const minutesFormatted = String(minutes).padStart(2,"0");
        const secondsFormatted = String(seconds).padStart(2,"0");

        timer.textContent = `${minutesFormatted}:${secondsFormatted}`;

    }


    const start = document.getElementById("start");
    start.addEventListener("click",()=>{
        endTime = new Date().getTime() + 10 * 1000;
        intervalId = setInterval(check,100);

        start.classList.add("inactive");
        board.activate();
        //押したらtimer に経過時間を入れたい
        startTime = Date.now();
        runTimer();
    })
}