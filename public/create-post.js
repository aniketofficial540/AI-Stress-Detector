document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        backButton: document.getElementById('back-button'),
        shareButton: document.getElementById('share-button'),
        postImageInput: document.getElementById('post-image'),
        imagePreview: document.getElementById('image-preview'),
        postCaption: document.getElementById('post-caption'),
        selectImageBtn: document.getElementById('select-image-btn'),
        step1: document.getElementById('step-1'),
        step2: document.getElementById('step-2')
    };

    let currentStep = 1;
    let selectedFile = null;

    elements.backButton.addEventListener('click', goBack);
    elements.shareButton.addEventListener('click', sharePost);
    elements.selectImageBtn.addEventListener('click', () => elements.postImageInput.click());
    elements.postImageInput.addEventListener('change', handleImageUpload);
    elements.postCaption.addEventListener('input', updateShareButtonState);

    function goBack() {
        if (currentStep === 1) {
            window.location.href = 'profile.html';
        } else {
            showStep(1);
        }
    }

    function handleImageUpload(e) {
        if (e.target.files && e.target.files[0]) {
            selectedFile = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                elements.imagePreview.src = event.target.result;
                showStep(2);
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    function showStep(step) {
        currentStep = step;
        elements.step1.style.display = step === 1 ? 'flex' : 'none';
        elements.step2.style.display = step === 2 ? 'flex' : 'none';
    }

    function updateShareButtonState() {
        elements.shareButton.disabled = elements.postCaption.value.trim() === '';
    }

    // async function sharePost() {
    //     if (!selectedFile) {
    //         alert("Please select an image!");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("image", selectedFile);
    //     formData.append("caption", elements.postCaption.value);

    //     try {
    //         const response = await fetch("/create-post", {
    //             method: "POST",
    //             body: formData
    //         });

    //         if (response.ok) {
    //             window.location.href = `/profile/${username}`;
    //         } else {
    //             alert("Error uploading post!");
    //         }
    //     } catch (error) {
    //         console.error("Upload failed:", error);
    //         alert("Something went wrong!");
    //     }
    // }

    async function sharePost() {
        if (!selectedFile) {
            alert("Please select an image!");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("caption", elements.postCaption.value);
    
        try {
            const response = await fetch("/create-post", {
                method: "POST",
                body: formData
            });
    
            if (response.ok) {
                const data = await response.json(); // Expecting { success: true, username: "some_username" }
                window.location.href = `/profile/${data.username}`;  // Correct URL redirection
            } else {
                alert("Error uploading post!");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Something went wrong!");
        }
    }
    
    
});
