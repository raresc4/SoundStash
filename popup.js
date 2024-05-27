function isYoutube(url) {
    return url.includes("youtube.com/watch");
}

window.onload = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    if(!isYoutube(currentTab.url)){
        document.getElementById("notYoutube").textContent = "This is not a youtube video!";
    }
    else{
        const btn = document.getElementById("ytButton");
        btn.classList.add("show");
        btn.addEventListener("click", async () => {
            try {
                const response = await fetch('http://localhost:5000/button_clicked', {
                  method: 'POST',
                  body: currentTab.url
                });
            
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                const receivedLink = await response.text();  
                console.log("Link donwloaded: ", receivedLink);
            } catch (error) {
              console.error("Error:", error);
            }
          });
    }
});
}