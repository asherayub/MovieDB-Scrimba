let watchListMovies = localStorage.getItem("watchlist");
document.querySelector(".movies").innerHTML = watchListMovies;
document.getElementById("clear-watchlist").addEventListener("click", () => {
  localStorage.removeItem("watchlist");
  document.querySelector(".movies").textContent = "";
  document.getElementById("notifier").style.top = "2%";
  setTimeout(() => {
    document.getElementById("notifier").style.top = "-100%";
  }, 1500);
});
 