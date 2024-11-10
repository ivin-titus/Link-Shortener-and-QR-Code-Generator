from flask import Flask, render_template, request, url_for
import qrcode
from io import BytesIO
import base64
from urllib.parse import urlparse
import pyshorteners
import os

app = Flask(__name__)

def is_valid_url(url):
    """Check if the given string is a valid URL"""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def shorten_url(url):
    """Shorten URL using TinyURL through pyshorteners"""
    try:
        s = pyshorteners.Shortener()
        return s.tinyurl.short(url)
    except:
        return url

def get_bg_image_url():
    """Get the background image URL with cache-busting parameter if modified"""
    image_path = os.path.join(app.static_folder, 'images', 'bg.png')
    if os.path.exists(image_path):
        modified_time = int(os.path.getmtime(image_path))  # Get last modified time as an integer
        return url_for('static', filename='images/bg.png') + f'?v={modified_time}'
    return url_for('static', filename='images/bg.png')

@app.route('/', methods=['GET', 'POST'])
def home():
    qr_image = None
    input_data = None
    error_message = None
    
    if request.method == 'POST':
        data = request.form.get('data', '').strip()
        
        # Server-side validation for character limit
        if len(data) > 256:
            error_message = "Error: Exceeds 256 characters!"
        elif data:
            # Check if input is a URL and shorten it if necessary
            if is_valid_url(data):
                data = shorten_url(data)
                
            # Generate QR code
            qr = qrcode.QRCode(version=1, box_size=10, border=2)
            qr.add_data(data)
            qr.make(fit=True)
            
            img = qr.make_image(fill_color="black", back_color="white")
            
            img_buffer = BytesIO()
            img.save(img_buffer, format='PNG')
            img_buffer.seek(0)
            
            img_str = base64.b64encode(img_buffer.getvalue()).decode()
            qr_image = f'data:image/png;base64,{img_str}'
            input_data = data
        
    # Pass the versioned background image URL to the template
    bg_image_url = get_bg_image_url()
    
    return render_template('index.html', qr_image=qr_image, input_data=input_data, error_message=error_message, is_valid_url=is_valid_url, bg_image_url=bg_image_url)

if __name__ == '__main__':
    app.run(debug=True)
