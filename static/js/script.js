// Input event management
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector('.container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.container').style.transition = 'opacity 0.5s ease';
            document.querySelector('.container').style.opacity = '1';
        }, 100);
    
        if (performance.navigation.type === 1) {
            document.getElementById('qrInput').value = '';
            document.getElementById('qrContainer').classList.add('hidden');
            document.getElementById('urlContainer').classList.add('hidden');
        }
    
        const qrInput = document.getElementById('qrInput');
        const qrContainer = document.getElementById('qrContainer');
        const urlContainer = document.getElementById('urlContainer');
    
        qrInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                qrContainer.classList.add('hidden');
                urlContainer.classList.add('hidden');
            }
        });
    
        document.getElementById('qrForm').addEventListener('submit', function(e) {
            if (qrInput.value.trim() === '') {
                e.preventDefault();
                qrContainer.classList.add('hidden');
                urlContainer.classList.add('hidden');
            }
        });
    
        if (!qrInput.value.trim()) {
            urlContainer.classList.add('hidden');
        }
    });

// Error message
    document.addEventListener('DOMContentLoaded', function() {
        const errorMessage = document.getElementById('errorMessage');
        const inputField = document.getElementById('qrInput');

        if (errorMessage) {
            setTimeout(() => {
                errorMessage.style.animation = 'fadeOut 0.75s forwards';
                
                inputField.value = '';

                errorMessage.addEventListener('animationend', () => {
                    errorMessage.remove();
                });
            }, 7500);
        }
    });

// Copy URL
    function copyUrl() {
        const shortUrl = document.getElementById('shortUrl');
        shortUrl.select();
        shortUrl.setSelectionRange(0, 99999); 
        
        navigator.clipboard.writeText(shortUrl.value).then(() => {
            const successMsg = document.createElement('div');
            successMsg.className = 'copy-success';
            successMsg.textContent = 'URL copied to clipboard!';
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 2000);
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const urlContainer = document.getElementById('urlContainer');
        const qrInput = document.getElementById('qrInput');
    
        qrInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                urlContainer.classList.add('hidden');
            }
        });
    
        document.getElementById('qrForm').addEventListener('submit', function(e) {
            if (qrInput.value.trim() === '') {
                urlContainer.classList.add('hidden');
            }
        });
    });

// Hide Footer
    const generateButton = document.querySelector('button[type="submit"]');
    const footer = document.querySelector('.footer-container');

    generateButton.addEventListener('click', function(e) {
        footer.classList.add('footer-hidden');
    
        setTimeout(() => {
            footer.classList.remove('footer-hidden');
        }, 3000);
    });

    let timeout;
    document.addEventListener('mousemove', function(e) {
        const bottomThreshold = window.innerHeight - 100; 
    
        clearTimeout(timeout);
    
        if (e.clientY > bottomThreshold) {
            footer.classList.remove('footer-hidden');
        } else {
            timeout = setTimeout(() => {
                if (footer.classList.contains('footer-hidden')) return;
                footer.classList.add('footer-hidden');
            }, 1000);
        }
    });

