module.exports = function (menuBtn, navbar) {
 
  menuBtn.addEventListener('click', ()=>{
    navbar.classList.toggle('active');
  })
};