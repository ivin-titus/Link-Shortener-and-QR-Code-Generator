# **Documentation for Link Shortener and QR Code Generator**

## **Overview**

This project is a **Link Shortener and QR Code Generator**, designed to simplify sharing links and text. The web application shortens URLs and generates QR codes for any input, providing a seamless way to handle and share digital information.

<br>

## **Deployment**
The project can be accessed live at:  
**[Link Shortener and QR Code Generator](https://link-shortener-and-qr-code-generator.vercel.app/)**
<br>

## **Features**

- **URL Shortening:** Automatically shortens long URLs for easy sharing.
- **QR Code Generation:** Converts text or links into scannable QR codes.
- **Error Handling:** Ensures inputs do not exceed 256 characters and validates URLs.
- **Copy & Download Functionality:**  
  - Copy shortened URLs with one click.  
  - Download generated QR codes as PNG images.  
- **Responsive Design:** Mobile and desktop-friendly UI for an optimal user experience.  
<br>

## **Preview of the Application**
![App Preview](./static/images/demo.png)
**&copy; 2024 Ivin Titus**
<br>

## **Usage**

### 1. Input Data
- Enter any URL or text in the input field.
- Ensure the text length is within 256 characters.

### 2. Generate Shortened URL and QR Code
- Press the **Generate** button.
- If the input is a valid URL, it will be shortened.
- A QR code for the shortened URL or text will be generated.

### 3. Copy or Download
- Copy the shortened URL by clicking the **Copy** button.
- Download the QR code by clicking the **Download QR Code** button.

### Example Scenarios
- **Shorten a URL:** Input `https://example.com/very/long/url` to get a shortened version like `https://tinyurl.com/abc123`.
- **Generate a QR Code:** Input "Hello, World!" to create a scannable QR code containing the text.
<br>

## **Code Highlights**

### Backend (Flask)
1. **URL Validation:**  
   ```python
   def is_valid_url(url):
       """Check if the given string is a valid URL."""
       result = urlparse(url)
       return all([result.scheme, result.netloc])
   ```

2. **Shorten URLs using TinyURL API:**  
   ```python
   def shorten_url(url):
       s = pyshorteners.Shortener()
       return s.tinyurl.short(url)
   ```

3. **QR Code Generation:**  
   ```python
   qr = qrcode.QRCode(version=1, box_size=10, border=2)
   qr.add_data(data)
   qr.make(fit=True)
   img = qr.make_image(fill_color="black", back_color="white")
   ```

### Frontend (HTML & JavaScript)
1. **Dynamic Input Validation:**
   ```javascript
   document.getElementById('qrInput').addEventListener('input', function() {
       // Hides containers for empty input
   });
   ```

2. **Copy Shortened URL:**  
   ```javascript
   function copyUrl() {
       navigator.clipboard.writeText(shortUrl.value).then(() => alert("URL copied!"));
   }
   ```

3. **Lazy Loading Background:**  
   ```javascript
   const bgImage = new Image();
   bgImage.src = "path/to/bg.png";
   bgImage.onload = () => body.style.backgroundImage = `url('${bgImage.src}')`;
   ```

<br>

## **Installation and Setup**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ivin-titus/link-shortener-qr-generator.git
   cd link-shortener-qr-generator
   ```

2. **Install Dependencies**  
   ```bash
   pip install flask qrcode pyshorteners
   ```

3. **Run the Application**  
   ```bash
   python app.py
   ```

4. **Access Locally**  
   Open `http://127.0.0.1:5000/` in your browser.

<br>


## **Credits and License**

This project is open-source and free to use under the **MIT License**. You are free to reuse and redistribute the code with proper attribution.  

**&copy; 2024 Ivin Titus**. All rights reserved.