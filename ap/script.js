// স্ক্রিন স্যুইচিং মেকানিজম
function nextScreen(screenNum) {
    document.querySelectorAll('.app-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`screen-${screenNum}`).classList.add('active');
    
    if(screenNum === 4) {
        setupBalloons();
    }
}

// স্ক্রিন ২: বিশেষ বয়স উন্মোচন লজিক
function revealAge() {
    const slot1 = document.getElementById('slot-1');
    const slot2 = document.getElementById('slot-2');
    
    let count = 0;
    let interval = setInterval(() => {
        slot1.textContent = Math.floor(Math.random() * 9);
        slot2.textContent = Math.floor(Math.random() * 9);
        count++;
        if(count > 15) {
            clearInterval(interval);
            slot1.textContent = '1'; // এখানে পছন্দমতো বয়স সেট করতে পারেন
            slot2.textContent = '9';
            document.getElementById('reveal-btn').classList.add('hidden');
            document.getElementById('age-next-btn').classList.remove('hidden');
        }
    }, 80);
}

// স্ক্রিন ৩: ১২টির বদলে ৪টি সেরা মেসেজ কার্ডে রূপান্তর
const messages = [
    "The way your guidance inspires everyone around you to grow and do better every day. 🚀",
    "How beautifully you balance leadership with your kind, supportive nature. 💼",
    "Your incredible patience and the positive energy you bring to the room. ✨",
    "Simply because you are the most respectful, elegant, and amazing Madam ever! 👑"
];
let currentCardIndex = 0;

// HTML-এর কাউন্টারটি আপডেট করার জন্য ১২ থেকে ৪ করা হলো
document.querySelector('.card-counter').innerHTML = '<span id="current-card">1</span>/4';

function nextCard() {
    currentCardIndex++;
    if(currentCardIndex < messages.length) {
        document.getElementById('current-card').textContent = currentCardIndex + 1;
        document.getElementById('message-card').textContent = messages[currentCardIndex];
        if(currentCardIndex === messages.length - 1) {
            document.getElementById('card-btn').textContent = "Continue ➔";
        }
    } else {
        nextScreen(4);
    }
}

// স্ক্রিন ৪: বেলুন সেটআপ ও পপিং লজিক
const balloonColors = ['#ff4d6d', '#3a86ff', '#ffbe0b', '#8338ec', '#38b000'];
const adjectives = ['Kind', 'Smart', 'Elegant', 'Graceful', 'Inspiring'];

function setupBalloons() {
    const rack = document.getElementById('balloon-rack');
    rack.innerHTML = '';
    let poppedCount = 0;

    for(let i=0; i<5; i++) {
        const b = document.createElement('div');
        b.classList.add('live-balloon');
        b.style.backgroundColor = balloonColors[i];
        b.textContent = "Pop Me";
        
        b.addEventListener('click', () => {
            if(b.textContent === "Pop Me") {
                b.textContent = adjectives[i];
                b.style.transform = "scale(1.1)";
                b.style.boxShadow = "0 0 15px " + balloonColors[i];
                poppedCount++;
                if(poppedCount === 5) {
                    document.getElementById('balloon-next-btn').classList.remove('hidden');
                }
            }
        });
        rack.appendChild(b);
    }
}

// স্ক্রিন ৫: ফটো মেমোরিজ স্লাইডার 
// (আপনারimages ফোল্ডারের আসল ছবির নাম অনুযায়ী নিচের নামগুলো পরিবর্তন করতে পারেন)
const photos = [
    "images/pic1.jpg.jpeg",  
    "images/pic3.jpg.jpeg"  
];
let currentPhotoIndex = 0;
function nextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex < photos.length) {
        document.getElementById('memory-img').src = photos[currentPhotoIndex];
        if (currentPhotoIndex === photos.length - 1) {
            document.getElementById('photo-btn').textContent = "Go to Cake Ceremony 🎂";
        }
    } else {
        nextScreen(6);
    }
}

// স্ক্রিন ৬: ইন্টারেক্টিভ ক্যান্ডেল নেভানো
let blownCandles = 0;
function blowCandle(candleEl) {
    if(!candleEl.classList.contains('out')) {
        candleEl.classList.add('out');
        blownCandles++;
        if(blownCandles === 4) {
            setTimeout(() => {
                nextScreen(7);
            }, 800);
        }
    }
}

// স্ক্রিন ৯: ফাইনাল গিফট খোলা
function openFinalGift() {
    const gift = document.querySelector('.mystery-gift');
    gift.textContent = "💥";
    setTimeout(() => {
        nextScreen(10);
    }, 500);
}
