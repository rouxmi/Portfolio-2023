import "../../Styles/contact.css"
import $ from "jquery";

window.Jquery = window.$ = $;

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