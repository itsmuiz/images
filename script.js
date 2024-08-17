async function main() {
    // Fetch the content from the directory or file
    let response = await fetch('../img/');

    // Parse the response as text
    let text = await response.text();

    // Create a temporary div element to hold the fetched content
    let div = document.createElement('div');
    div.innerHTML = text;

    // Get all anchor tags within the fetched content
    let as = div.getElementsByTagName('a');

    // Create a container for the cards
    let container = document.createElement('div');
    container.classList.add('container');

    // Loop through each anchor tag
    for (let a of as) {
        // Check if the href ends with .jpg
        if (a.href.endsWith('.jpg')) {
            // Define product details (customize these as needed)
            let productName = 'Product Name'; // Replace with actual product name if available
            let productPrice = '$29.99'; // Replace with actual price if available
            let productDetails = 'Product Details'; // Replace with actual details if available
            
            // Create the product card using a template literal
            let productCard = `
                <div class="product-item animate-on-scroll">
                    <img src="${a.href}" alt="${productName}">
                    <h3>${productName}</h3>
                    <p>${productPrice}</p>
                    <button class="btn" onclick="sendWhatsAppMessage('${productName}', '${productPrice}', '${productDetails}')">
                        Add to Cart
                    </button>
                </div>
            `;
            
            // Append the product card to the container
            container.innerHTML += productCard;
        }
    }

    // Clear the body content and append the container
    document.body.innerHTML = '';
    document.body.appendChild(container);
}

// Function to send a WhatsApp message
function sendWhatsAppMessage(name, price, details) {
    let message = `Product: ${name}\nPrice: ${price}\nDetails: ${details}`;
    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

main();
