
// Function to check if today is a Sirtuk day
async function isSirtukDay() {
    const today = new Date();
    console.log('Current date:', today);

    try {
        // Format today's date as YYYY-MM-DD using local time
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log('Formatted date:', formattedDate);

        // Get Hebrew date from Hebcal API
        console.log('Fetching from Hebcal API...');
        const response = await fetch(`https://www.hebcal.com/converter?cfg=json&date=${formattedDate}&g2h=1`);
        console.log('API Response status:', response.status);
        const data = await response.json();
        console.log('API Response data:', data);

        // Add the Hebrew date to the page
        const dateElement = document.getElementById('date');
        console.log('Date element found:', !!dateElement);
        if (dateElement) {
            dateElement.textContent = data.hebrew;
            console.log('Set date text to:', data.hebrew);
        } else {
            console.error('Date element not found in DOM');
        }

        // Check if it's Shabbat (day 6 is Saturday)
        if (today.getDay() === 6) {
            console.log('It is Shabbat');
            return true;
        }

        // Check for special dates
        if (data.hm === "Kislev" && (data.hd === 19 || data.hd === 20)) return true;  // י"ט-כ' כסלו
        if (data.hm === "Sh'vat" && (data.hd === 10 || data.hd === 11)) return true;  // י'-י"א שבט
        if (data.hm === "Nisan" && data.hd === 11) return true;   // י"א ניסן
        if (data.hm === "Tamuz" && data.hd === 3) return true;    // ג' תמוז
        if (data.hm === "Tamuz" && (data.hd === 12 || data.hd === 13)) return true; // י"ב-י"ג תמוז
        if (data.hm === "Elul" && data.hd === 18) return true;    // י"ח אלול
        if (data.hm === "Tishrei" && (data.hd === 1 || data.hd === 2)) return true; // ראש השנה
        if (data.hm === "Tishrei" && data.hd === 10) return true;    // יום כיפור
        if (data.hm === "Tishrei" && (data.hd >= 15 && data.hd <= 22)) return true; // סוכות ושמח"ת
        if (data.hm === "Kislev" && data.hd === 1) return true;    // ראש חודש כסלו
        if (data.hm === "Kislev" && data.hd === 14) return true;    // י"ד כסלו
        if (data.hm === "Tevet" && data.hd === 5) return true;    // דידן נצח
        if (data.hm === "Sh'vat" && data.hd === 22) return true;    // כ"ב שבט
        if (data.hm === "Adar" && (data.hd === 14 || data.hd === 15)) return true;  // פורים
        if (data.hm === "Nisan" && (data.hd >= 15 && data.hd <= 22)) return true;  // פסח וחול המועד
        if (data.hm === "Iyyar" && data.hd === 18) return true;  // ל"ג בעומר
        if (data.hm === "Sivan" && (data.hd === 6 || data.hd === 7)) return true;  // שבועות (יומיים בחו"ל)
        
        return false;
    } catch (error) {
        console.error('Error fetching Hebrew date:', error);
        return false;
    }
}

// Update the page with the result
async function updatePage() {
    console.log('Starting page update...');
    // Show loading state
    const yesNoElement = document.getElementById('yes-no');
    const dateElement = document.getElementById('date');
    
    console.log('Found elements:', {
        yesNo: !!yesNoElement,
        date: !!dateElement
    });

    if (yesNoElement) yesNoElement.textContent = '...';
    if (dateElement) dateElement.textContent = 'Loading...';

    const isSirtuk = await isSirtukDay();
    console.log('Is Sirtuk day:', isSirtuk);
    
    if (yesNoElement) yesNoElement.textContent = isSirtuk ? 'Yes' : 'No';
}

// Run when the page loads
console.log('Initial page load...');
updatePage();

// Update the page every minute to handle date changes
setInterval(updatePage, 60000); 