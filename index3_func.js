document.getElementById('ham').addEventListener('click', function() {
    document.getElementById('menuOverlay').style.display = 'block';
});

document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('menuOverlay').style.display = 'none';
});