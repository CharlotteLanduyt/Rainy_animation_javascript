// umbrella_animation

const animation_button = document.getElementById("animation_button");
const animation_progression = document.getElementById("animation_progression");

const umbrella_pictures = document.getElementById("animation_images")

function move_on_animation(event) {

    if (event.offsetY >= 1 && event.offsetY < animation_progression.offsetHeight) {
        animation_button.style.top = event.offsetY + "px";
    } else if (event.offsetY < 1 && event.offsetY > animation_progression.offsetHeight) {
        animation_button.style.top = animation_progression.offsetHeight + "px";
    }

    switch(true) {
        case animation_button.style.top.slice(0,-2) < animation_progression.offsetHeight/4:
            umbrella_pictures.style.backgroundImage = "url(../../public/images/fond_d.png)"
            break;

        case animation_button.style.top.slice(0,-2) < animation_progression.offsetHeight/3:
            umbrella_pictures.style.backgroundImage = "url(../../public/images/fond_c.png)"
            break;

        case animation_button.style.top.slice(0,-2) < animation_progression.offsetHeight/2:
            umbrella_pictures.style.backgroundImage = "url(../../public/images/fond_b.png)"
            break;

        default:
            umbrella_pictures.style.backgroundImage = "url(../../public/images/fond_a.png)"
            break;
    }
}   

function push_animation() {
    animation_button.style.pointerEvents = "none"

    document.addEventListener('mousemove', move_on_animation);

    document.addEventListener('mouseup', stop_animation);
}

function stop_animation() {
    document.removeEventListener('mousemove', move_on_animation);

    animation_button.style.pointerEvents = "auto"
}

animation_button.addEventListener('mousedown', push_animation);




// bubblegum_animation

const hand_push = document.getElementById("hand_push")
const push_button = document.getElementById("push_button")

function longueurArcOvale(longueur, largeur) {
    const a = longueur / 2;
    const b = largeur / 2;

    const h = Math.pow((a - b), 2) / Math.pow((a + b), 2);

    const L = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

    return L;
}

function push_push_animation(event) {
    push_button.style.pointerEvents = "none"
    push_button.style.transitionDelay= "initial"
    push_button.style.transition = "initial"


    if (event.offsetY >= 0 && event.offsetY < hand_push.offsetHeight) {
        document.getElementById("bubble_image").style.height = push_button.offsetTop + "%"
        document.getElementById("bubble_image").style.width = push_button.offsetTop + "%"

        push_button.style.top = (event.offsetY / hand_push.offsetHeight) * 100 + "%";

        let arcLength = longueurArcOvale(hand_push.offsetHeight, hand_push.offsetWidth)/2;

        if(push_button.offsetTop < hand_push.offsetHeight/2){
            push_button.style.right = (((push_button.offsetTop/(arcLength/hand_push.offsetHeight)))/hand_push.offsetHeight) * 100 + "%";
        }else{
            push_button.style.right = ((arcLength/2-(push_button.offsetTop/(arcLength/hand_push.offsetHeight)))/hand_push.offsetHeight)*100 + "%";
        }
    }
}   

function go_push_animation() {
    document.addEventListener('mousemove', push_push_animation);

    document.addEventListener('mouseup', stop_push_animation);
}

function stop_push_animation() {
    document.removeEventListener('mousemove', push_push_animation);

    document.getElementById("bubble_image").classList.remove("animate")
    push_button.style.pointerEvents = "auto"

    go_to_top()
}

function go_to_top(){
    setTimeout(() => {
        push_button.style.right = 0
        push_button.style.top = 0

        document.getElementById("bubble_image").style.height = 0 + "%"
        document.getElementById("bubble_image").style.width = 0 + "%"
    }, 1000)
    
}

push_button.addEventListener('mousedown', go_push_animation);



// rain animation 

const canvas = document.getElementById("rain_animation");
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];

function createRaindrop() {
    const x = Math.random() * canvas.width;
    const y = -5;
    const speed = Math.random() * 5 + 2;
    const length = Math.random() * 50 + 10;

    raindrops.push({ x, y, speed, length });
}

function updateRaindrops() {
    for (let i = 0; i < raindrops.length; i++) {
        const raindrop = raindrops[i];
        raindrop.y += raindrop.speed;

        if (raindrop.y > canvas.height) {
            raindrops.splice(i, 1);
            i--;
        }
    }
}

function drawRaindrops() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'white';
    context.lineWidth = 0.4;

    for (let i = 0; i < raindrops.length; i++) {
        const raindrop = raindrops[i];

        context.beginPath();
        context.moveTo(raindrop.x, raindrop.y);
        context.lineTo(raindrop.x, raindrop.y + raindrop.length);
        context.stroke();
    }
}

let drop_count = 25
let frameCount = 1;


function animate() {

    if (frameCount % drop_count === 0) {
        createRaindrop();
    }
    updateRaindrops();
    drawRaindrops();

    frameCount++;
    requestAnimationFrame(animate);
}



const circle = document.getElementById('wheel_rain_activate');
let isDragging = false;
let previousX = 0;
let previousY = 0;
let currentRotation = 0;

circle.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        animate();

        const dx = event.clientX - previousX;

        if (drop_count > 0 && drop_count <= 25) {
            if (dx < 0) {
                drop_count - 1 <= 0 ? drop_count = 1 : drop_count -= 1;
            } else if (dx > 0) {
                drop_count + 1 > 25 ? drop_count = 25 : drop_count += 1;
            }
        }

        console.log(drop_count)

        currentRotation += dx * 1;
        circle.style.transform = `rotate(${currentRotation}deg)`;

        previousX = event.clientX;
        previousY = event.clientY;
    }
});


document.addEventListener('mouseup', () => {
    isDragging = false;
    circle.style.cursor = 'grab';
});

circle.addEventListener('mouseleave', () => {
    isDragging = false;
    circle.style.cursor = 'grab';
});
