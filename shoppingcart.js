let x = 0;  //plussa på sedan ta bort i kundvagnen möjligtvis

let clothesUrl;
let clothesArray = new Array();
let arrayIndex = -1;

//array med sounds från mixkit för när användare lägger till varor
let myAudio = [
    'soundsnoti/mixkit-happy-bell-alert-601.wav'
    //,'soundsnoti/mixkit-cooking-stopwatch-alert-1792.wav'
    ];

function addtoCart (url, size, price) {

    //ALL CLOTHES SIZE VALUES SENT FROM 2nd PARAMETER 
    if (size == 'no') {
        console.log('not in store') ;
        showErrorItem(); 
    }
        else {
            console.log(' added to cart! ');
            //prices and item added 
            x++; 
            let cartCounter = document.getElementById('counting_cart'); 
            localStorage.counter = JSON.stringify(x);
            cartCounter.innerHTML = x; 

            arrayIndex++;
            clothesArray[arrayIndex] = url;
            localStorage.items = JSON.stringify(clothesArray);

            //random item
            let rand = Math.floor((Math.random() * myAudio.length));
            let src = myAudio[rand];
            
            let audio = document.getElementById('errorAudio');
            audio.setAttribute("src", src);
            audio.volume = 0.2;
            audio.play();

            //cleara eventuell error div
            document.getElementById('errorShopDiv').innerHTML = '';
        }
}
function shoppingCart () {

    //location.href = 'shoppingcart.html';

    //ändrar body document till nav och footer för att sen lägga in div med items 
    document.body.innerHTML = 
    //navigation
    ' <nav class="navbar"><a href="index.html"><img src="logotype SL.png" alt="Company Logo"></a><ul class="nav"><li class="nav-item"><a href="index.html" class="glbnav">Home </a></li><li class="nav-item"><a href="camera.html" class="glbnav"> Find your Style </a></li><li class="nav-item"><a href="viewclothes.html" class="glbnav"> Available in Store </a></li></ul> <button id="shoppingcart_link" onclick="shoppingCart()"><img src="shopping-cart.png" alt="shoppingcart" class="shopcart_img"><p id="counting_cart"></p></button></nav><div id="navinfodiv"><li id="navinfo"><p> i </p></li> <p id="phover"> If any problems occur, kindly contact our employees in the store. <br> <br> If noone is available at this time, you can turn to our customer service, which is available during all our opening hours. <br> <br> Telephone: +46 01 001 101 </p></div>' + 
    //footer
    '<footer> <div class="footertext"><h2>Connect</h2><p><br> +46 01 001 101 <br> shoppingstore@business.com <br> P G Vejdes väg, 351 95 Växjö</p></div> <div class="footertext"><h2>About</h2><p><br> Our goal is to create faster, better and more personal experiences <br> <br> Our stores always have helpful people around <br>So that you can get the best experience possible!  </p></div> <div class="footertext" id="sendfeedbackDiv">  <p><br> We would love to hear what you think about our service, by simply sending us your emotion, you help us create better service! </p><br><select name="sendfeedback" id="sendfeedback" placeholder="😄"><OPTION Value="not satisfied">😡</OPTION><OPTION Value="not so satisfied">😞</OPTION><OPTION Value="no big feeling">😐</OPTION><OPTION Value="kind of good">🙂</OPTION><OPTION Value="very good">😄</OPTION></select> <button id="sendfbBtn" onclick="sendFeedback(document.getElementById("sendfeedback").value)">Send Emotion</button></div></div></footer>';

    window.location = '#shopping-bag';

        let storedItem = JSON.parse(localStorage.items);

        let myDiv = document.createElement('div');
        myDiv.id = 'shopping_bag';

        for (let i = 0; i < storedItem.length; i++) {
    
            let div = document.createElement('div');
            div.className = 'itemsDiv';
    
            let img = document.createElement('img');
                img.src = storedItem[i]; 
                img.className = 'shoppingbagImg';
    
            let text = document.createElement('p');
                if (storedItem[i].includes('pants') ) text.innerHTML = 'pants';
                    else if (storedItem[i].includes('shirt')) text.innerHTML = 'shirt';
                        else text.innerHTML = 'clothing product';
            text.className = 'shoppingbagText';
    
            div.appendChild(img);
            div.appendChild(text); 
            let btn = document.createElement('button');
                btn.className = 'shoppingbagDelete';
                btn.innerHTML = 'X';
                div.appendChild(btn);
            
            myDiv.appendChild(div);
            document.body.appendChild(myDiv);
    
            btn.onclick = function () {
                btn.parentElement.style.display = 'none';
                removeCartCounter();
        }  
    }
    //skapa en knapp som väljer kläder och lägger order till butik att hämta 
    let orderBtn = document.createElement('button');
    orderBtn.id = 'sendOrder';
    orderBtn.innerHTML = 'Send Order';
    document.body.appendChild(orderBtn);

    orderBtn.onclick = function () {
        let randomNr = Math.floor(Math.random() * 1000);
        let message = '<div class="orderMessage">   <p> Thank you for your order! <br><br> Your order number is: ' + randomNr + ' </p> </div>';

        document.body.innerHTML += message;
        localStorage.items = '';
        localStorage.counter = 0;
    }
}
function removeCartCounter() {
    if (x > 0) {
        localStorage.counter--;
        x = JSON.parse(localStorage.counter);

        let cartCounter = document.getElementById('counting_cart'); 
        cartCounter.innerHTML = x; 
    
        localStorage.counter = JSON.stringify(x);
    }
    else {
        x = 0; 
        localStorage.counter = JSON.stringify(x);
    }
}

function readMore(imgurl, sizevalue) {
    if (sizevalue == 'no') {
        showErrorItem();
    }
    else {
        let src = "findClothes (images)/mixkit-alert-quick-chime-766.wav";
        let audio = document.getElementById('errorAudio');
        audio.setAttribute("src", src);
        audio.volume = 0.2;
        audio.play();

        if (imgurl == 'shirt1') {
            document.getElementById('errorShopDiv').innerHTML = "<div id='infoShop'><p class='itemInfo'>In the picture bellow <br> you can see where your item is located <br> <br> MATERIAL: 100% COTTON. MACHINE WASHABLE.</p></h1><img src='findClothes (images)/findshirt1.jpg' alt='findclothes'><p class='productinfo'> </p></div>";
        }
        else if (imgurl == 'pants') {
            document.getElementById('errorShopDiv').innerHTML = "<div id='infoShop'><p class='itemInfo'>In the picture bellow <br> you can see where your item is located <br> <br> MATERIAL: DENIM. MACHINE WASHABLE.</p></h1><img src='findClothes (images)/findpants.jpg' alt='findclothes'><p class='productinfo'> </p></div>";
        }
        else if (imgurl == 'shirt2') {
            document.getElementById('errorShopDiv').innerHTML = "<div id='infoShop'><p class='itemInfo'>In the picture bellow <br> you can see where your item is located <br> <br> MATERIAL: 100% COTTON. MACHINE WASHABLE.</p></h1><img src='findClothes (images)/findshirt2.jpg' alt='findclothes'><p class='productinfo'> </p></div>";
        }
        else if (imgurl == 'shirt3') {
            document.getElementById('errorShopDiv').innerHTML = "<div id='infoShop'><p class='itemInfo'>In the picture bellow <br> you can see where your item is located <br> <br> MATERIAL: 100% COTTON. MACHINE WASHABLE.</p></h1><img src='findClothes (images)/findshirt3.jpg' alt='findclothes'><p class='productinfo'> </p></div>";
        }
    }
    
}

function showErrorItem () {
    document.getElementById('errorShopDiv').innerHTML = "<div id='errorShop'> <h1> We apologise! </h1> <p>The chosen size is not available in store..</p> <p> You can press 'order' to notify us! </p> <p>But it might take up to 12days for arrival in store. </p> <button onclick='errorItem()'> Order! </button></div>";

    
    let src = "erroritem.wav";
    let audio = document.getElementById('errorAudio');
    audio.setAttribute("src", src); 
    audio.volume = 0.2; 
    audio.play();
}
function errorItem () {
    let src = "sent.wav";
    let audio = document.getElementById('errorAudio');
    audio.setAttribute("src", src);
    audio.volume = 0.2;
    audio.play();
    
    document.getElementById('errorShop').innerHTML = '<h1> Thank you! </h1> <p> The store has been notified! </p> <br> <p> This notification will now close </p>';
    
    setTimeout(function(){
        document.getElementById('errorShopDiv').innerHTML = '';
    }, 5000);
}
//function för footer feedback
function sendFeedback (value) {
    let emote;

    if (value == 'not satisfied') {
        let src = "soundsnoti/mixkit-NotHappyAnswer.wav";
        let audio = document.getElementById('errorAudio');
            audio.setAttribute("src", src);
            audio.volume = 0.1;
            audio.play();

            emote = '&#128545';
    }
    else if (value == 'kind of good' || value == 'very good') {
        let src = "soundsnoti/mixkit-NiceAnswer.wav";
        let audio = document.getElementById('errorAudio');
            audio.setAttribute("src", src);
            audio.volume = 0.1;
            audio.play();

            emote = '&#128513';
    }
    else {
        let src = "soundsnoti/mixkit-cooking-stopwatch-alert-1792.wav";
        let audio = document.getElementById('errorAudio');
            audio.setAttribute("src", src);
            audio.volume = 0.1;
            audio.play();

            emote = '&#128528';
    }

    let div = document.createElement('div');
    div.className = 'responseFeedbackDiv';
    div.innerHTML = '<p> Thank your for your Emotional Feedback! <br> Your emotion to our service was: ' + '"' + value + '' + emote + '"' + '<br> we appreciate your feedback! </p> This window will close automatically in 5seconds ';
    let btn = document.createElement('button');
    btn.className = 'deleteresponseFeedbackDiv';
    btn.innerHTML = 'Close now?';
    div.appendChild(btn);

    let x = div;

    btn.onclick = function () {
        document.body.removeChild(x);
    } 
    document.body.appendChild(div);

    setTimeout(function(){
        document.body.removeChild(x);
    }, 5000);
}


