document.addEventListener("DOMContentLoaded", function () {

  gsap.to(".title-load", { 
    // opacity: 0, 
    stagger: { 
      amount: 0.25, 
    }, 
    delay: 6, 
    duration: .5, 
    y: -150,
  });

  gsap.from(".loader-1", {
    width: 0,
    duration: 6,
    ease: "power2.inOut",
  });

  gsap.from(".loader-2", {
    width: 0,
    delay: 1.9,
    duration: 2,
    ease: "power2.inOut",
  });

  gsap.to(".loader", {
    background: "none",
    delay: 6,
    duration: 0.1,
  });

  gsap.to(".loader-1", {
    rotate: 90,
    y: -50,
    duration: 0.5,
    delay: 6,
  });

  gsap.to(".loader-2", {
    x: -75,
    y: 75,
    duration: 0.5,
  }, "<");

  gsap.to(".loader", {
    scale: 38,
    duration: 1,
    delay: 7,
    ease: "power2.inOut",
  });

  gsap.to(".loader", {
    rotate: 45,
    y: 500,
    x: 2000,
    duration: 1,
    delay: 7,
    ease: "power2.inOut",
  });

  // Старий пердун
  gsap.set(".santa-fly", {
    x: -100,
    y: 0,
    opacity: 1,
  });
  gsap.to(".santa-fly", {
    x: window.innerWidth + 1000,
    duration: 8,
    ease: "power1.inOut",
  });
  gsap.to(".santa-fly", {
    y: "+=40",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 1.2,
  });

});

document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".loading-screen", {
    opacity: 0,
    duration: 0.5,
    delay: 7.5,
    ease: "power1.inOut",
    onComplete: () => {
      const ls = document.querySelector(".loading-screen");
      if (ls) ls.style.display = "none";
      document.body.classList.add("loaded");
      console.log('App loaded ✅');
    }
  });
});
