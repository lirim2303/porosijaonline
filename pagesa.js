document.addEventListener('DOMContentLoaded', function() {
    let karroca = JSON.parse(localStorage.getItem('karroca')) || [];
    let informacioniPagesesDiv = document.getElementById('informacioni-pageses');

    if (karroca.length === 0) {
        informacioniPagesesDiv.innerHTML = '<p>Karroca juaj është bosh. Nuk keni asnjë produkt për të paguar.</p>';
    } else {
        informacioniPagesesDiv.innerHTML = `
            <h2>Produktet në Karrocë:</h2>
            <ul>
                ${karroca.map(item => `
                    <li>${item.sasia} x ${item.emri} - ${item.cmimi} den</li>
                `).join('')}
            </ul>
        `;
    }
});
document.getElementById("shporta").addEventListener("click", function() {
    // Ky funksion do të hapë dritaren e pagesës
    window.location.href = "karroca.html";  // Kalo tek faqja e pagesës
});