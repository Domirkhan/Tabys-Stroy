const anchors = document.querySelectorAll(".header__nav a");

anchors.forEach(anc => {
   anc.addEventListener("click", function(event){
      event.preventDefault();

      const id = anc.getAttribute("href");
      const elem = document.querySelector(id);

      window.scroll({
         top: elem.offsetTop -60,
         behavior: 'smooth'
      });
   });
});

const wel = document.querySelectorAll(".link-primary");

wel.forEach(wel => {
   wel.addEventListener("click", function(event){
      event.preventDefault();

      const id = wel.getAttribute("href");
      const elem = document.querySelector(id);

      window.scroll({
         top: elem.offsetTop -60,
         behavior: 'smooth'
      });
   });
});