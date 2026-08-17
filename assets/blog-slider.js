(() => {
	const initBlogSlider = (section) => {
		if (!section || section.dataset.blogSliderInitialized === "true") return;

		const slider = section.querySelector(".blog-slider__swiper");
		const settings = section.querySelector(".blog-slider");

		if (!slider || !settings || typeof window.Swiper === "undefined") return;

		const slideCount = Number(settings.dataset.slideCount) || 0;
		if (slideCount < 1) return;

		const autoplayEnabled = settings.dataset.autoplay === "true" && slideCount > 1;
		const loopEnabled = settings.dataset.loop === "true" && slideCount > 1;
		const stopAutoplay = settings.dataset.stopAutoplay === "true";
		const delay = (Number(settings.dataset.delay) || 3) * 1000;
		const speed = (Number(settings.dataset.speed) || 1.5) * 1000;
		const nextButton = section.querySelector(".swiper-button-next");
		const previousButton = section.querySelector(".swiper-button-prev");
		const pagination = section.querySelector(".swiper-pagination");

		new window.Swiper(slider, {
			speed,
			loop: loopEnabled,
			keyboard: {
				enabled: true,
			},
			allowTouchMove: true,
			autoplay: autoplayEnabled
				? {
						delay,
						pauseOnMouseEnter: stopAutoplay,
						disableOnInteraction: false,
					}
				: false,
			navigation: nextButton && previousButton
				? {
						nextEl: nextButton,
						prevEl: previousButton,
					}
				: undefined,
			pagination: pagination
				? {
						el: pagination,
						type: "fraction",
					}
				: undefined,
		});

		section.dataset.blogSliderInitialized = "true";
	};

	const initAllBlogSliders = (root = document) => {
		if (root.matches?.(".section-main-blog")) initBlogSlider(root);
		root.querySelectorAll?.(".section-main-blog").forEach(initBlogSlider);
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => initAllBlogSliders());
	} else {
		initAllBlogSliders();
	}
	window.addEventListener("load", () => initAllBlogSliders());

	document.addEventListener("shopify:section:load", (event) => {
		initAllBlogSliders(event.target);
	});
})();
