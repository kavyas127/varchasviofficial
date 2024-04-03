window.addEventListener('scroll', function() {
    var headerElements = document.querySelector('.needs-change');
    var scrollPosition = window.scrollY;
    var pageHeight = window.innerHeight * 2;

    if (scrollPosition > pageHeight) {
        headerElements.style.color = '#FDF7E4';
        headerElements.style.fontWeight = "200";
    } else {
        headerElements.style.color = '#04364A'; 
        headerElements.style.fontWeight = "800";
    }
});

