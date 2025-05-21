document.addEventListener("DOMContentLoaded", () => {
  const background = document.getElementById("spacy-background");
  const stars = [];
  const shootingStars = [];

  function createStar() {
    const star = document.createElement("div");
    star.classList.add("stars");
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.opacity = Math.random();
    star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Blink duration
    star.style.filter = `blur(${Math.random() * 2 + 1}px)`; // Slight blur
    background.appendChild(star);
    stars.push(star);

    // Remove star after animation ends
    setTimeout(() => {
      background.removeChild(star);
      stars.splice(stars.indexOf(star), 1);
    }, 5000);
  }

  function createShootingStar() {
    const shootingStar = document.createElement("div");
    shootingStar.classList.add("stars");
    shootingStar.style.left = `${Math.random() * window.innerWidth}px`;
    shootingStar.style.top = `${Math.random() * window.innerHeight / 2}px`;
    shootingStar.style.width = "4px";
    shootingStar.style.height = "4px";
    shootingStar.style.backgroundColor = "#fff";
    shootingStar.style.animation = `shooting-star ${Math.random() * 2 + 1}s linear`;
    background.appendChild(shootingStar);
    shootingStars.push(shootingStar);

    // Remove shooting star after animation ends
    setTimeout(() => {
      background.removeChild(shootingStar);
      shootingStars.splice(shootingStars.indexOf(shootingStar), 1);
    }, 2000);
  }

  function animateStars() {
    if (Math.random() < 0.1) createStar(); // Add stars randomly
    if (Math.random() < 0.02) createShootingStar(); // Add shooting stars randomly
    requestAnimationFrame(animateStars);
  }

  animateStars();
});