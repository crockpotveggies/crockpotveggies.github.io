
  /* Animation */
$('.main-head').addClass('animation bounceIn');
	
$('.head-bottom').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInDown');
}, { offset: '70%' });

$('.contact-social').waypoint(function(down) {
	$(this).addClass('animation');
	$(this).addClass('fadeInDown');
}, { offset: '70%' });


  /* Mixpanel tracking */

$(function(){
  new MixpanelScrollTracker({
    attribute: 'section',
    event: 'Scrolled to',
    markers: [
      { position: 200, value: 'Near Top' },
      { position: 700, value: 'Content Beginning' },
      { position: 1200, value: 'Content Middle' }
    ]
  });
  mixpanel.track_links("#header_carrots", "Click", {referrer: document.referrer, link_type: "nav"});
  mixpanel.track_links(".blog_snippet", "Click", {referrer: document.referrer, link_type: "nav"});
      
  mixpanel.track_links("#social_twitter", "Click", {referrer: document.referrer, link_type: "social", link_channel: "twitter"});
  mixpanel.track_links("#social_github", "Click", {referrer: document.referrer, link_type: "social", link_channel: "github"});
  mixpanel.track_links("#social_linkedin", "Click", {referrer: document.referrer, link_type: "social", link_channel: "linkedin"});
  
  mixpanel.track_links("#header_title", "Click", {referrer: document.referrer, click_type: "ui"});
});


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
 

