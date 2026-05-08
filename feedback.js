document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    const aiLoader = document.getElementById('aiLoader');
    const uploadText = document.getElementById('uploadText');

    // Input fields to autofill
    const modelNameInput = document.getElementById('modelName');
    const modelNumberInput = document.getElementById('modelNumber');
    const priceInput = document.getElementById('price');
    const dateInput = document.getElementById('purchaseDate');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        if (file) {
            // 1. Show Image Preview
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                uploadText.textContent = "Change Image";
            }
            reader.readAsDataURL(file);

            // 2. Start AI Simulation
            simulateAIProcessing();
        }
    });

    function simulateAIProcessing() {
        // Show loading spinner
        aiLoader.classList.remove('hidden');
        
        // Clear current values to show "thinking"
        modelNameInput.value = "Analyzing...";
        modelNumberInput.value = "...";
        priceInput.value = "";

        // SIMULATION: Wait 2.5 seconds to mimic an API call to a server
        setTimeout(() => {
            // Hide loader
            aiLoader.classList.add('hidden');

            // 3. Populate fields with dummy data
            // In a real app, you would parse the JSON response from your API here.
            
            fillForm({
                model: "Sony WH-1000XM5 Headphones",
                sku: "WH-1000XM5/B",
                price: 349.99,
                date: new Date().toISOString().split('T')[0] // Today's date
            });

            alert("✨ AI successfully identified the product!");

        }, 2500);
    }

    function fillForm(data) {
        modelNameInput.value = data.model;
        modelNumberInput.value = data.sku;
        priceInput.value = data.price;
        dateInput.value = data.date;
        
        // Add a visual flash effect to show fields were updated
        [modelNameInput, modelNumberInput, priceInput].forEach(input => {
            input.style.backgroundColor = "#e8f0fe";
            setTimeout(() => {
                input.style.backgroundColor = "#f9f9f9";
            }, 1000);
        });
    }

    // Handle form submission
    document.getElementById('warrantyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Success! Your product has been registered.");
    });
});