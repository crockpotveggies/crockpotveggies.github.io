
/* prettyPhoto Gallery */

jQuery(".prettyphoto").prettyPhoto({
   overlay_gallery: false, social_tools: false
});

  /* Work Block Icons in Pretty Photo*/
  
$(".works-item").hover(function(){ 
	$(this).find(".works-social").slideDown(350);
}, function (){
	$(this).find(".works-social").slideUp(350);
});
  
  /* Click Function for Social media in Friends Block */
	
$(".friend-item a").click(function(e){
	e.preventDefault();
	$(this).next(".friend-social").fadeToggle();
 }); 
  
  /* Click Ends */
 
  /* Animation */
  
  /* Header */
  
$('.main-head').addClass('animation bounceIn');

$('.head-left').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInLeft');
}, { offset: '70%' });
	
$('.head-bottom').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceInUp');
}, { offset: '70%' });

$('.head-right').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInRight');
}, { offset: '70%' });

/* Works */

$('.works-item').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInUp');
}, { offset: '70%' });

/* Service */

$('.service-item').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('flipInY');
}, { offset: '70%' });

/* Status */

$('.status-item h5').waypoint(function(down) {
	if(!$(this).hasClass("finish"))
	{
		$(this).countTo();
		$(this).addClass('finish');
	}
},{ offset: '100%' });

/* Blog */

$('.progress-bar').waypoint(function(down) {
	if(!$(this).hasClass("pfinish"))
	{	
		var $pvalue = $(this).attr("data-limit");
		$(this).animate({
			width: $pvalue+"%" },800);
		$(this).addClass('pfinish');
	}
},{ offset: '100%' });

/* Test */

$('.test-one').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceInLeft');
}, { offset: '90%' });

$('.test-two').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceInLeft');
}, { offset: '90%' });

$('.test-three').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceInLeft');
}, { offset: '90%' });

/* Friends */

$('.friend-item').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInDown');
}, { offset: '70%' });

/* Love */

$('.love').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceIn');
}, { offset: '70%' });

/* Contact */

$('.con-num').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceInUp');
}, { offset: '70%' });

$('.contact-item').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('flipInY');
}, { offset: '70%' });

$('.contact-social').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInDown');
}, { offset: '70%' });


  /* Scroll to GoTop */

$(".gotop").hide();

$(function(){
	$(window).scroll(function(){
	  if ($(this).scrollTop()>500)
	  {
		$('.gotop').slideDown();
	  } 
	  else
	  {
		$('.gotop').slideUp();
	  }
	});

	$('.gotop a').click(function (e) {
	  e.preventDefault();
	  $('body,html').animate({scrollTop: 0}, 1500);
	});

});

  /* Scroll Ends */
  
 
  /* Contact Slider */

$(".slider-button").click(function(e) {
	e.preventDefault();
    var $slidebtn=$(this);
    var $slidebox=$(this).parent().parent();
    if($slidebox.css('left')=="-400px"){
      $slidebox.animate({
        left:0
      },500); 
    }
    else{
      $slidebox.animate({
        left:-400
      },500);
    }
});		

  /* Contact Slider Ends */
 

