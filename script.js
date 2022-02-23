window.onload=function(){
    let movingRight;
    let movingLeft;
    let grid = document.querySelector('.grid');  
    let blockWidth=100;
    let blockHeight=20;
    let gridWidth=895;
    let gridHeight=600;
    let XballIncrement=2;
    let YballIncrement=2;
    let score=0;
    let scorespan=document.getElementById('score');
    class Block{
        constructor(x,y){
            this.bottomLeft=[x,y];
            this.bottomRight=[x+blockWidth,y];
            this.topLeft=[x,y+blockHeight];
            this.topRight=[x+blockWidth,y+blockHeight];

        }
    }
    // Funkcija crtajBlok, prima objekt klase blok i crta ga na divu
    let drawBlock=function(blockObject,id){
        let block=document.createElement('div');
        block.classList.add('block');
        block.style.bottom=blockObject.bottomLeft[1].toString()+'px';
        block.style.left=blockObject.bottomLeft[0].toString()+'px';
        block.setAttribute('id',id);
        grid.appendChild(block);
        


    }
    let blocks=[]
    

    let platform = document.createElement('div');
    platform.classList.add('platform');
    platform.style.bottom='5px';
    platform.style.left=(gridWidth/2-100).toString()+'px';
    grid.append(platform);
    //Platforma se krece koristeci mis ili tastaturu
    let mouseIsInGameArea=false
    

    // function platformMoveByMouse(e){
    //     if(e.offsetX>0 && e.offsetX<695){
    //         curretPlatformXPosition=e.offsetX
    //         platform.style.left=curretPlatformXPosition+'px'
            

    //     }
        
     

    // }
    // function for moving platform with mouse
    
    let curretPlatformXPosition=gridWidth/2-100
    function movePlatform(e) {
        if (e.key=='ArrowLeft'){
            curretPlatformXPosition-=19;
            if (curretPlatformXPosition<0) curretPlatformXPosition=0
            platform.style.left=curretPlatformXPosition+'px'
            
        }
        if (e.key=='ArrowRight'){
            curretPlatformXPosition+=19;
            if (curretPlatformXPosition>gridWidth-200) curretPlatformXPosition=gridWidth-200
            platform.style.left=curretPlatformXPosition+'px'
            
        }
        
    }
    function StartMovingPlatform(e){
        if (e.key=='ArrowLeft'&&curretPlatformXPosition>0){
            movingLeft=setInterval(function(){
                curretPlatformXPosition-=5
                if (curretPlatformXPosition<0) clearInterval(movingLeft)
                platform.style.left=curretPlatformXPosition+'px'
            
            },200)
             
            
        }

        if (e.key=='ArrowRight'&&curretPlatformXPosition<gridWidth-200){
            movingRight=setInterval(function(){
                curretPlatformXPosition+=5
                if (curretPlatformXPosition>gridWidth-200) clearInterval(movingRight)
                platform.style.left=curretPlatformXPosition+'px'
            
            },200)
             
            
        }


    }
    function StopMovingPlatform(e){
        if (e.key=='ArrowLeft'){
            
            clearInterval(movingLeft)
             
            
        }

        if (e.key=='ArrowRight'){
            clearInterval(movingRight)
            
             
            
        }

    }

   


    document.addEventListener('keydown',movePlatform
       
    )
    // document.addEventListener('keydown',StartMovingPlatform)
    // document.addEventListener('keyup',StopMovingPlatform)

   
    
    let ball=document.createElement('div');
    ball.classList.add('ball');
    
    let ballCurentPositionBottomLeft=[gridWidth/2-10.5,15+6];
    ball.style.left=ballCurentPositionBottomLeft[0];
    ball.style.bottom=ballCurentPositionBottomLeft[1];
    grid.appendChild(ball);
    ball.style.left=ballCurentPositionBottomLeft[0].toString()+'px';
    ball.style.bottom=ballCurentPositionBottomLeft[1].toString()+'px';

    function moveBall(){
       
        if (ball.style.left==(gridWidth-20)+'px'){
            
            XballIncrement=-XballIncrement;

        }
        if (ball.style.left=='-1px'){
            XballIncrement=-XballIncrement;
            
        }
        //.log(ball.style.left)

        if (ball.style.bottom=='579px'){
            YballIncrement=-YballIncrement;
            //.log(42)
            
        }

        if (ball.style.bottom=='1px'){
            gameOver();
            
            
        }

        if (ballCurentPositionBottomLeft[0]>=curretPlatformXPosition && ballCurentPositionBottomLeft[0]<=curretPlatformXPosition+200 && ballCurentPositionBottomLeft[1]==17){
            YballIncrement=-YballIncrement;
            
        }
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if(checkforBlockCollisions(blocks[i])){
                
            // Starting at index position i, remove 1 elements(splice sintaksa ) 
            blocks.splice(i,1)
            document.getElementById(i.toString()).remove();
            let divBlocksArray=Array.from(document.querySelectorAll('.block'))
            for (let i = 0; i < divBlocksArray.length; i++) {
                divBlocksArray[i].setAttribute('id',i.toString())
               
                
                
            }
            score+=1
            scorespan.innerHTML=`Score:${score}`
            
            if (score==48){
                win();

            }
            


            }


            
        }
        function win() {
        clearInterval(intervalMoveBall);
        document.removeEventListener("keydown", movePlatform);
        // document.removeEventListener('mousemove',platformMoveByMouse)
        scorespan.innerHTML=`You won! Your score is ${score}.`
        btn.style.display='inline'

            
        }
        





        ballCurentPositionBottomLeft[0]+=XballIncrement;
        ballCurentPositionBottomLeft[1]+=YballIncrement;
        ball.style.left=ballCurentPositionBottomLeft[0].toString()+'px';
        ball.style.bottom=ballCurentPositionBottomLeft[1].toString()+'px';



    }
    let intervalMoveBall
    let btn=document.getElementById('btn')
    btn.addEventListener('click',function(){
        let trenutniblokovi=Array.from(document.querySelectorAll('.block'))
        for (let i = 0; i < trenutniblokovi.length; i++) {
            trenutniblokovi[i].remove();
            
            
        }

        score=0
        ballCurentPositionBottomLeft=[gridWidth/2-10.5,15+6];
        XballIncrement=2;
        YballIncrement=2;
        // document.addEventListener('mousemove',platformMoveByMouse)
        document.addEventListener('keydown',movePlatform)
       
       
        blocks=[]
        for(let i=0;i<6;i++){
            for(let j=0;j<8;j++){
            
                blocks.push(new Block(j*blockWidth+(j+1)*10,gridHeight-blockHeight*(i+1)-10*(i+1)))
        
        
            }
            
           
    
    
        }
        
    
        for(let i=0;i<blocks.length;i++){
            drawBlock(blocks[i],i.toString());
            
    
    
        }

        intervalMoveBall=setInterval(moveBall,8);
        btn.style.display='none'

    })
    
    //funkcija provjere doticanja blokova, prima objekt bloka i mijenja xy ball inkrement i returna true ako je collision
    function checkforBlockCollisions(blockObject) {
        let ballCenterXY=[ballCurentPositionBottomLeft[0]+10,ballCurentPositionBottomLeft[1]+10];
        //donji dio bloka
        if (ballCenterXY[0]>=blockObject.bottomLeft[0] && ballCenterXY[0]<=blockObject.bottomRight[0] && (ballCenterXY[1]==blockObject.bottomLeft[1]||ballCenterXY[1]==blockObject.bottomLeft[1]+1)){
            YballIncrement=-YballIncrement

            return true
        }

        //gornji dio bloka

        if (ballCenterXY[0]>=blockObject.bottomLeft[0] && ballCenterXY[0]<=blockObject.bottomRight[0] && (ballCenterXY[1]==blockObject.topLeft[1]||ballCenterXY[1]==blockObject.topLeft[1]+1)){
            YballIncrement=-YballIncrement

            return true
        }

        //lijevi dio bloka

        if ((ballCenterXY[0]==blockObject.bottomLeft[0] || ballCenterXY[0]==blockObject.bottomLeft[0]+1) && ballCenterXY[1]>= blockObject.bottomLeft[1] && blockObject.topLeft[1]>=ballCenterXY[1]){

            XballIncrement=-XballIncrement

            return true
        }

        //desni dio bloka
        if ((ballCenterXY[0]==blockObject.bottomRight[0] || ballCenterXY[0]==blockObject.bottomRight[0]+1) && ballCenterXY[1]>= blockObject.bottomLeft[1] && blockObject.topLeft[1]>=ballCenterXY[1]){

            XballIncrement=-XballIncrement

            return true
        }


        




        




        

        

        
    }
   
    function gameOver(){
        clearInterval(intervalMoveBall);
        document.removeEventListener("keydown", movePlatform);
        // document.removeEventListener('mousemove',platformMoveByMouse)
        scorespan.innerHTML=`Game over! Your score was ${score}.`
        btn.style.display='inline'
        

    }
}