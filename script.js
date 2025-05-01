// Function to check if today is a Sirtuk day
async function isSirtukDay() {
    const today = new Date();

    // Check if it's Shabbat (day 6 is Saturday)
    if (today.getDay() === 6) {
        return true;
    }

    try {
        // Format today's date as YYYY-MM-DD
        const formattedDate = today.toISOString().split('T')[0];

        // Get Hebrew date from Hebcal API
        const response = await fetch(`https://www.hebcal.com/converter?cfg=json&date=${formattedDate}&g2h=1`);
        const data = await response.json();

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
        

        // Add the Hebrew date to the page
        document.getElementById('date').textContent = data.hebrew;

        return false;
    } catch (error) {
        console.error('Error fetching Hebrew date:', error);
        return false;
    }
}

// Update the page with the result
async function updatePage() {
    // Show loading state
    document.getElementById('yes-no').textContent = '...';
    document.getElementById('date').textContent = 'Loading...';

    const isSirtuk = await isSirtukDay();
    document.getElementById('yes-no').textContent = isSirtuk ? 'Yes' : 'No';
}

// Run when the page loads
updatePage(); 