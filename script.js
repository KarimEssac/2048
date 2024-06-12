let Score =0;
let HighestScore = localStorage.getItem('highestScore') ? parseInt(localStorage.getItem('highestScore')) : 0;
let boxes = document.querySelectorAll(".box")
let NewGame = document.querySelectorAll(".NewGame");
var maxNum =2;
let noplay = 0;
var themecolor = "";
var mood = "light";
let selectedValue =2 ;
let selectedColor =""
$('#Score').text(Score)
$('#HighestScore').text(HighestScore);
let emptyArr = [] //the empty array is declared to know which slot is empty
//let mainArr =new Array(4).fill().map(_ => new Array(4).fill(0)) //main array is to represent the whole game in a 2D array
function mightlost(){
    for (let i =0;i<16;i++){
        if (boxes[i].textContent == ''){
            return false;
        }
    }
    return true;
}
function heLOST(){
    //0
    if (boxes[0].textContent == boxes[1].textContent || boxes[0].textContent == boxes[4].textContent){
        return false;
    }
    //1
    else if (boxes[1].textContent == boxes[0].textContent || boxes[1].textContent == boxes[2].textContent || boxes[1].textContent == boxes[5].textContent){
        return false;
    }
    //2
    else if (boxes[2].textContent == boxes[1].textContent || boxes[2].textContent == boxes[3].textContent || boxes[2].textContent == boxes[6].textContent){
        return false;
    }
    //3
    else if (boxes[3].textContent == boxes[2].textContent || boxes[3].textContent == boxes[7].textContent){
        return false;
    }
    //4
    else if (boxes[4].textContent == boxes[0].textContent || boxes[4].textContent == boxes[5].textContent || boxes[4].textContent == boxes[8].textContent){
        return false;
    }
    //5 , 6 , 9 , 10
    for (let i = 5 ;i<11;){
        if (boxes[i].textContent == boxes[(i+1)].textContent || boxes[i].textContent == boxes[(i-1)].textContent || boxes[i].textContent == boxes[(i-4)].textContent || boxes[i].textContent == boxes[(i+4)].textContent)
            return false;
        if (i== 5 || i == 9 || i == 10) {i++;continue;}
        else if (i =6) i+=3;
    }
    //7
    if (boxes[7].textContent == boxes[3].textContent || boxes[7].textContent == boxes[6].textContent || boxes[7].textContent == boxes[11].textContent){
        return false;
    }
    //8
    else if (boxes[8].textContent == boxes[9].textContent || boxes[8].textContent == boxes[4].textContent || boxes[8].textContent == boxes[12].textContent){
        return false;
    }
    //11
    else if (boxes[11].textContent == boxes[10].textContent || boxes[11].textContent == boxes[7].textContent || boxes[11].textContent == boxes[15].textContent){
        return false;
    }
    //12
    else if (boxes[12].textContent == boxes[13].textContent || boxes[12].textContent == boxes[8].textContent){
        return false;
    }
    //13
    else if (boxes[13].textContent == boxes[14].textContent || boxes[13].textContent == boxes[12].textContent || boxes[13].textContent == boxes[9].textContent){
        return false;
    }
    //14
    else if (boxes[14].textContent == boxes[13].textContent || boxes[14].textContent == boxes[15].textContent || boxes[14].textContent == boxes[10].textContent){
        return false;
    }
    //15
    else if (boxes[15].textContent == boxes[14].textContent || boxes[15].textContent == boxes[11].textContent){
        return false;
    }
    return true;
}
function lost(){
    if (mightlost()){
        if (heLOST()){
            sad();
        }
    }
}
//empty array to randomize the next play
function findEmpty()
{
boxes.forEach((element,index) => {
    if (element.textContent == ""){
        emptyArr.push(index);
    }
});
}
function celebrate(){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('won').style.display = 'block';
}
function sad(){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('lost').style.display = 'block';
}
//Fun to find an empty slot to place the next box in it
function nPlay(){
    findEmpty();
    const nePlay = Math.floor(Math.random()*emptyArr.length);
    boxes[emptyArr[nePlay]].textContent = '2';
    boxes[emptyArr[nePlay]].classList+=(' n2box animate__animated animate__fadeIn');
    emptyArr =[];
}
function dblfn(){
    skip();
    createNewGame();
}
function removeanime(boxes,n){
    boxes[n].classList.remove('animate__zoomIn');
}
function reanimate(boxes, n){
    boxes[n].classList.remove('animate__zoomIn');
    void boxes[n].offsetWidth;
    boxes[n].classList.add('animate__zoomIn');
}
function createNewGame(){
    for (let i =0;i<3;i++){
        boxes[i].classList = 'col box me-0 animate__animated';
        boxes[i].textContent = ''
    }
    boxes[3].classList = 'col box animate__animated'
    boxes[3].textContent = ''
    for (let i =4;i<7;i++){
        boxes[i].classList = 'col box me-0 mt-0 animate__animated';
        boxes[i].textContent = ''
    }
    boxes[7].classList = 'col box mt-0 animate__animated';
    boxes[7].textContent = ''
    for (let i =8;i<11;i++){
        boxes[i].classList = 'col box me-0 mt-0 animate__animated'
        boxes[i].textContent = ''
    }
    boxes[11].classList = 'col box mt-0 animate__animated'
    boxes[11].textContent = ''
    for (let i = 12 ;i<15;i++){
        boxes[i].classList = 'col box me-0 mt-0 animate__animated'
        boxes[i].textContent = ''
    }
    boxes[15].classList = 'col box mt-0 animate__animated'
    boxes[15].textContent = ''
    Score = 0;
    $('#Score').text(Score)
    maxNum = 0;
    nPlay()
    getMax(2)
}
function getMax(n){
        if (maxNum < n){
            maxNum = n;
            if (maxNum == 2048){
                celebrate();
            }
            const apply = document.querySelector('.apply')
            apply.classList.add("n"+n+"box");
            var maxCol = window.getComputedStyle(apply).backgroundColor;
            themecolor = maxCol.replace('rgb', 'rgba').replace(')',',');
            apply.classList.remove("n"+n+"box")
            beamingGame();
        }
}
function beamingGame(){
    let gameb = document.querySelector(".gameBody")
    gameb.style.background = 'linear-gradient(185deg,'+ 'var(--theme-color-light),' + themecolor + '0.4))';
    gameb.style.backgroundSize = '400% 400%';
    gameb.style.webkitAnimation = 'Beam 30s ease infinite';
    gameb.style.mozAnimation = 'Beam 30s ease infinite';
    gameb.style.animation = 'Beam 30s ease infinite';
}
function modeChange(){
    const darkLight = document.getElementById("darkLight");
    const root = document.documentElement;
    if (darkLight.classList.contains('fa-moon')) {
        darkLight.classList.remove("fa-moon");
        darkLight.classList.add("fa-sun");
        root.style.setProperty('--theme-color-light', 'rgb(8, 9, 10)');
        root.style.setProperty('--theme-color-dark', 'rgb(248,249,250)');
    } else {
        darkLight.classList.remove("fa-sun");
        darkLight.classList.add("fa-moon");
        root.style.setProperty('--theme-color-light', 'rgb(248,249,250)');
        root.style.setProperty('--theme-color-dark', 'rgb(8, 9, 10)');
    }
}
function paletteChange(){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('colorPalette').style.display = 'block';
    
}
function updateSelectedValue() {
    const selectElement = document.getElementById('Select');
    selectedValue = selectElement.value;
    let sample = document.querySelector('.sample');
    sample.classList = 'box n'+ selectedValue +'box sample'
    sample.textContent = selectedValue;
    document.getElementById("exampleColorInput").value =getComputedStyle(document.documentElement).getPropertyValue(`--n${selectedValue}-color`);
    document.getElementById("Ok").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--n${selectedValue}-color`);;
}
function updateSelectedColor() {
    selectedColor = document.getElementById('exampleColorInput').value;
    document.documentElement.style.setProperty('--n'+selectedValue+'-color', selectedColor);
    document.getElementById("Ok").style.backgroundColor = selectedColor;
    localStorage.setItem('n'+selectedValue+'box-color', selectedColor);
}
function skip(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('colorPalette').style.display = 'none';
    document.getElementById('won').style.display = 'none';
    document.getElementById('lost').style.display = 'none';
}
function ok(){

}
/*Refreshing the mainArr each play
function findArr(){
    boxes.forEach((element,index) => {
        mainArr[Math.floor(index/4)][index%4] = element.textContent;
        
})
console.log(mainArr)
}*/

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
let xDown = null;
let yDown = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}
function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(yDiff) > Math.abs(xDiff)) {
        if (yDiff >0)
        slideUp();
        else slideDown();
    }
    else if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
           
            slideLeft();
        } else {
            
            slideRight();
        }
    }

    // Reset values
    xDown = null;
    yDown = null;
}
function slideUp() {
    let done = false;
            let counter =4;
            for (let i =4 ;i<16;i++){
                let parr =[];
                if (boxes[i].textContent!=''){
                    for (let it = i;it>3;it-=4){
                    if ((boxes[it-4].textContent == '') ){
                    let n = boxes[it].textContent
                    boxes[it].textContent =''
                    boxes[it].classList.remove('n'+n+'box')
                    boxes[it-4].textContent = n;
                    boxes[it-4].classList.add('n'+n+'box')
                    done = true
                    removeanime(boxes,it);
                    reanimate(boxes,it-4)
                    continue;
                    }
                    else if (boxes[it-4].textContent == boxes[it].textContent && parr[boxes[it]] != 1){
                        let n = boxes[it].textContent
                        boxes[it].textContent =''
                        boxes[it].classList.remove('n'+n+'box')
                        boxes[it-4].textContent = n * 2
                        boxes[it-4].classList.remove('n'+n+'box')
                        boxes[it-4].classList.add('n'+n*2+'box') 
                        done = true;
                        parr[boxes[it-4]]=1
                        removeanime(boxes,it);
                        reanimate(boxes,it-4)
                        getMax(n*2)
                        Score += n*2
                        $('#Score').text(Score);
                        if (HighestScore < Score){
                            HighestScore = Score
                            $('#HighestScore').text(HighestScore);
                            localStorage.setItem('highestScore', HighestScore);
                        }
                        break;
                    }
                    break;
                }
                }
            }
            if(done==true)nPlay()
                else lost()
}
function slideRight() {
    let done = false;
            for (let i =14 ;i>=0;){
                let parr =[];
                if (boxes[i].textContent!=''){
                    for (let it = i;(it!=15 && it!= 11 && it!=7 && it !=3);it++){
                    if ((boxes[it+1].textContent == '') ){
                    let n = boxes[it].textContent
                    boxes[it].textContent =''
                    boxes[it].classList.remove('n'+n+'box')
                    boxes[it+1].textContent = n;
                    boxes[it+1].classList.add('n'+n+'box')
                    done = true
                    removeanime(boxes,it);
                    reanimate(boxes,it+1)
                    continue;
                    }
                    else if (boxes[it+1].textContent == boxes[it].textContent && parr[boxes[it]] != 1){
                        let n = boxes[it].textContent
                        boxes[it].textContent =''
                        boxes[it].classList.remove('n'+n+'box')
                        boxes[it+1].textContent = n * 2
                        boxes[it+1].classList.remove('n'+n+'box')
                        boxes[it+1].classList.add('n'+n*2+'box') 
                        done = true
                        parr[boxes[it+1]]=1
                        removeanime(boxes,it);
                        reanimate(boxes,it+1)
                        getMax(n*2)
                        Score += n*2
                        $('#Score').text(Score);
                        if (HighestScore < Score){
                            HighestScore = Score
                            $('#HighestScore').text(HighestScore);
                            localStorage.setItem('highestScore', HighestScore);
                        }
                        break;
                    }

                    break;
                }
                }
                i--; if (i == 11 || i == 7 || i == 3) i--;
            }
            if(done==true)nPlay()
                else lost()
}
function slideLeft(){
    let done = false;
            for (let i =1 ;i<16;){
                let parr =[];
                if (boxes[i].textContent!=''){
                    for (let it = i;it%4!=0;it--){
                    if ((boxes[it-1].textContent == '') ){
                    let n = boxes[it].textContent
                    boxes[it].textContent =''
                    boxes[it].classList.remove('n'+n+'box')
                    boxes[it-1].textContent = n;
                    boxes[it-1].classList.add('n'+n+'box')
                    done = true
                    removeanime(boxes,it);
                    reanimate(boxes,it-1)
                    continue;
                    }
                    else if (boxes[it-1].textContent == boxes[it].textContent && parr[boxes[it]] != 1){
                        let n = boxes[it].textContent
                        boxes[it].textContent =''
                        boxes[it].classList.remove('n'+n+'box')
                        boxes[it-1].textContent = n * 2
                        boxes[it-1].classList.remove('n'+n+'box')
                        boxes[it-1].classList.add('n'+n*2+'box') 
                        done = true
                        parr[boxes[it-1]]=1
                        removeanime(boxes,it);
                        reanimate(boxes,it-1)
                        getMax(n*2)
                        Score += n*2
                        $('#Score').text(Score);
                        if (HighestScore < Score){
                            HighestScore = Score
                            $('#HighestScore').text(HighestScore);
                            localStorage.setItem('highestScore', HighestScore);
                        }
                        break;
                    }
                    break;
                }
                }
                i++; if (i%4==0) i++;
            }
            if(done==true)nPlay()
                else lost()
}
function slideDown(){
    let done = false;
            let counter =4;
            for (let i =11 ;i>=0;i--){
                let parr =[];
                if (boxes[i].textContent!=''){
                    for (let it = i;it<12;it+=4){
                    if ((boxes[it+4].textContent == '') ){
                    let n = boxes[it].textContent
                    boxes[it].textContent =''
                    boxes[it].classList.remove('n'+n+'box')
                    boxes[it+4].textContent = n;
                    boxes[it+4].classList.add('n'+n+'box')
                    done = true
                    removeanime(boxes,it);
                    reanimate(boxes,it+4)
                    continue;
                    }
                    else if (boxes[it+4].textContent == boxes[it].textContent && parr[boxes[it]] != 1){
                        let n = boxes[it].textContent
                        boxes[it].textContent =''
                        boxes[it].classList.remove('n'+n+'box')
                        boxes[it+4].textContent = n * 2
                        boxes[it+4].classList.remove('n'+n+'box')
                        boxes[it+4].classList.add('n'+n*2+'box') 
                        done = true
                        parr[boxes[it+4]]=1
                        removeanime(boxes,it);
                        reanimate(boxes,it+4)
                        getMax(n*2)
                        Score += n*2
                        $('#Score').text(Score);
                        if (HighestScore < Score){
                            HighestScore = Score
                            $('#HighestScore').text(HighestScore);
                            localStorage.setItem('highestScore', HighestScore);
                        }
                        break;
                    }
                    break;
                }
                }
            }
            if(done==true)nPlay()
                else lost()
}
//jquery
$(document).ready(function(){
    //Up Movement
    $(document).keyup(function(event){
        if (event.key === 'ArrowUp'){
            slideUp();
        }
    })
    //Down Movement
    $(document).keyup(function(event){
        if (event.key === 'ArrowDown'){
            slideDown()
        }
    })
    //Left Movement
    $(document).keyup(function(event){
        if (event.key === 'ArrowLeft'){
            slideLeft();
        }
    })
    //Right Movement
    $(document).keyup(function(event){
        if (event.key === 'ArrowRight'){
            slideRight()
        }
    })
})
document.addEventListener('DOMContentLoaded', () => {
    HighestScore = localStorage.getItem('highestScore') ? parseInt(localStorage.getItem('highestScore')) : 0;
    document.getElementById('HighestScore').innerText = HighestScore;
    for (let i =2 ;i<=131072;i*=2){
        let changedbox = localStorage.getItem('n'+i+'box-color')
        if (changedbox){
            document.documentElement.style.setProperty('--n'+i+'-color', changedbox);
        }
    }
    document.getElementById("exampleColorInput").value =getComputedStyle(document.documentElement).getPropertyValue(`--n2-color`);
    document.getElementById("Ok").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--n2-color`);;
});
nPlay()
//findArr()