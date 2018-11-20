$(document).ready(function () {
	//logo color
	var randomLinks = $('#circle');
	var original = randomLinks.css('color');
	randomLinks.hover(function () { //mouseover
		var col = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		$(this).css("background-color", col);
	}, function () { //mouseout
		$(this).css("background-color", "white");
	});
	//logo color end

	//bg color start
	var wHeight = $(window).innerHeight();
	var siblings = $('.slide').siblings();
	var perset = {};
	var sumHeight = 0;
	for (var i = 0; i < siblings.length; i++) {
		if (siblings[i].dataset.background) {
			perset[sumHeight] = siblings[i].dataset.background;
		} else
			perset[sumHeight] = 0;

		sumHeight = sumHeight + siblings[i].clientHeight;
	}

	processScroll();

	function lessThan(nums, key) {
		if (nums == null || nums.length == 0 || key == 0)
			return 0;
		low = 0;
		high = nums.length - 1;
		while (low <= high) {
			mid = parseInt((low + high) >> 1);
			if (key <= nums[mid]) {
				high = mid - 1;
			} else {
				low = mid + 1;
			}
		}
		return high;
	}

	var scroll_pos = 0;

	function processScroll() {
		scroll_pos = $(this).scrollTop();

		var presetHeights = Object.keys(perset);
		var x = lessThan(presetHeights, scroll_pos);
		var bgColor = perset[presetHeights[x]];
		if (bgColor) {
			$("body").css('background-color', bgColor);
		}
	}

	//$(document).scroll(processScroll);
	//Function called twice!!! Not good! probably this is the issue.

	//bg color end

	//Spy start
	//spy
	var topoffset = 50; //variable for menu height
	//Activate Scrollspy
	$('body').scrollspy({
		target: 'header .navbar-fixed-top',
		offset: topoffset
	});


	// add inbody class
	var hash = $(this).find('li.active a').attr('href');
	if (hash !== '#myhome') {
		$('header nav').addClass('inbody');
	} else {
		$('header nav').removeClass('inbody');
	}


	// Add an inbody class to nav when scrollspy event fires
	$('.navbar-fixed-top').on('activate.bs.scrollspy', function () {
		var hash = $(this).find('li.active a').attr('href');
		if (hash !== '#myhome') {
			$('header nav').addClass('inbody');
		} else {
			$('header nav').removeClass('inbody');
		}
	});

	//Use smooth scrolling when clicking on navigation
	$('.navbar a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') ===
			this.pathname.replace(/^\//, '') &&
			location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - topoffset + 2
				}, 500);
				return false;
			} //target.length
		} //click function
	}); //smooth scrolling


	//Spy end
});

