
/* prettyPhoto Gallery */

jQuery(".prettyphoto").prettyPhoto({
   overlay_gallery: false, social_tools: false
});
  
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


/* Love */

$('.love').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('bounceIn');
}, { offset: '70%' });

/* Contact */

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
 

