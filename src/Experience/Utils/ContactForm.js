import "../../Styles/contact.css"
import $ from "jquery";

window.Jquery = window.$ = $;

const body = document.querySelector("body");
body.innerHTML = `
    <div class="form-wrapper">
        <header>
            <h1>Send me a message</h1>
            <p>Fill in all the information</p>
        </header>
        <form action="contact-form">
            <div class="input-section name-section">
                <input type="name" autocomplete="off" placeholder="Enter your full name" class="name">
                <div class="animated-button">
                    <span class="icon-person">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 976q-24 0-42-18t-18-42V436q0-24 18-42t42-18h237V236q0-24 18-42t42-18h87q24 0 42 18t18 42v140h236q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V436H584q0 28-18.5 44T519 496h-78q-27 0-45.5-16T377 436H140v480Zm92-107h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265 744q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q22.5 0 38.25-15.75T408 638q0-22.5-15.75-38.25T354 584q-22.5 0-38.25 15.75T300 638q0 22.5 15.75 38.25T354 692Zm214-63h170v-50H568v50ZM437 436h87V236h-87v200Zm43 240Z"/></svg>
                    </span>
                    <span class="next-button name">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                    </span>
                </div>
            </div>
            <div class="input-section email-section folded">
                <input type="text" autocomplete="off" placeholder="Enter your email" class="email">
                <div class="animated-button">
                    <span class="icon-mail">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140 371v465h680V371L480 594Zm0-60 336-218H145l335 218ZM140 371v-55 520-465Z"/></svg>
                    </span>
                    <span class="next-button email">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                    </span>
                </div>
            </div>
            <div class="input-section subject-section folded">
                <input type="text" name="subject" placeholder="Enter your reason of contact" class="subject">
                <div class="animated-button">
                    <span class="icon-question-mark">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M430 896V356H200V256h560v100H530v540H430Z"/></svg>
                    </span>
                    <span class="next-button subject">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                    </span>
                </div>
            </div>
            <div class="input-section text-section folded">
                <input type="text" autocomplete="off" placeholder="Enter your message" class="text">
                <div class="animated-button">
                    <span class="icon-paper">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M160 856v-60h386v60H160Zm0-166v-60h640v60H160Zm0-167v-60h640v60H160Zm0-167v-60h640v60H160Z"/></svg>
                    </span>
                    <span class="next-button text">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                    </span>
                </div>
            </div>
            <div class="sending">
                <p>Sending...</p>
            </div>
            <div class="success">
                <p>Your message has been sent, thank you!</p>
            </div>
        </form>
    </div>
    `;

$('.name').on("change keyup paste",
    function(){
        if($(this).val()){
            $('.icon-person').addClass("next");
        } else {
            $('.icon-person').removeClass("next");
        }
    }
);

$('.next-button').hover(
    function(){
        $(this).css('cursor', 'pointer');
    }
);

$('.next-button.name').click(
    function(){
        $('.name-section').addClass("fold-up");
        $('.email-section').removeClass("folded");
    }
);

$('.name').keypress(function(e){

    if(e.code == "Enter"){
        $('.name-section').addClass("fold-up");
        $('.email-section').removeClass("folded");
    }
});

$('.email').on("change keyup paste",
    function(){
        if($(this).val()){
            $('.icon-mail').addClass("next");
        } else {
            $('.icon-mail').removeClass("next");
        }
    }
);

$('.next-button').hover(
    function(){
        $(this).css('cursor', 'pointer');
    }
);

$('.next-button.email').click(
    function(){
        $('.email-section').addClass("fold-up");
        $('.subject-section').removeClass("folded");
    }
);

$('.email').keypress(function(e){

    if(e.code == "Enter"){
        $('.email-section').addClass("fold-up");
        $('.subject-section').removeClass("folded");
    }
});


$('.subject').on("change keyup paste",
    function(){
        if($(this).val()){
            $('.icon-question-mark').addClass("next");
        } else {
            $('.icon-question-mark').removeClass("next");
        }
    }
);

$('.next-button.subject').click(
    function(){
        $('.subject-section').addClass("fold-up");
        $('.text-section').removeClass("folded");
    }
);        var subject = $('.subject').val();

$('.subject').keypress(function(e){

    if(e.code == "Enter"){
        $('.subject-section').addClass("fold-up");
        $('.text-section').removeClass("folded");
    }
});


$('.text').on("change keyup paste",
    function(){
        if($(this).val()){
            $('.icon-paper').addClass("next");
        } else {
            $('.icon-paper').removeClass("next");
        }
    }
);
    
$('.next-button').hover(
    function(){
        $(this).css('cursor', 'pointer');
    }
);

$('.next-button.text').click(
    function(){
        $('.text-section').addClass("fold-up");
        $('.sending').css("marginTop", 0);
        sendEmail();
    }
);

$('.text').keypress(function(e){

    if(e.code == "Enter"){
        $('.text-section').addClass("fold-up");
        $('.sending').css("marginTop", 0);
        sendEmail();
    }
});

const serviceID = 'service_rxeiy0y';
const templateID = 'template_ymps2am';

function sendEmail() {
    var params = {
        name : $('.name').val(),
        email : $('.email').val(),
        subject : $('.subject').val(),
        text : $('.text').val()
    }

    emailjs.send(serviceID, templateID, params)
        .then(function(res){
            $('.sending').css("display", "none");
            $('.success').css("marginTop", 0);
        })
        .catch((err) => console.log(err))
    ;
}