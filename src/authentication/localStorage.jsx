




// Function to retrieve data from localStorage
// export const getDataFromLocalStorage = (key) => {
//     const storedData = localStorage.getItem(key);
//     return storedData ? JSON.parse(storedData) : null;
// };

import { logPrint } from "./logPrint";


// export const saveDataToLocalStorage = (key, data) => {
//     localStorage.setItem(key, JSON.stringify(data));
// };

export const deleteKeyToLocalStorage = (key) => {
    localStorage.removeItem(key);
}


export const getDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);

    // Check if the stored data is "undefined" (as a string) or null
    if (storedData === "undefined" || storedData === null) {
        return null;
    }

    try {
        return JSON.parse(storedData);
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
};




export const saveDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    // console.log('getCookie() ======> ', getCookie())
};
    




export const getLoginUserID = () => {
    logPrint('getLoginUserID :: '+getDataFromLocalStorage("user-credential")?.["empid"] )
    return getDataFromLocalStorage("user-credential")?.["empid"]
}



// Function to fetch the image as a Blob and save it to local storage
export const saveImageToLocalStorage = (imageUrl) => {
    fetch(imageUrl)
        .then(response => response.blob()) // Fetch the image as a Blob
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64data = reader.result; // Convert Blob to Base64
                return base64data
                // localStorage.setItem(storageKey, base64data); // Save Base64 image to localStorage
            };
            reader.readAsDataURL(blob); // Read the Blob as a data URL (Base64)
        })
        .catch(error => console.error('Image fetch error:', error));
}





// export const  getCookie = () => {
//     const name = 'csrftoken'
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === (name + '=')) {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   }
  
// //   const csrfToken = getCookie();