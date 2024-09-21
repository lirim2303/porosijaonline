document.addEventListener('DOMContentLoaded', function() {
    let karroca = JSON.parse(localStorage.getItem('karroca')) || [];
    let karrocaDiv = document.getElementById('karroca');

    if (karroca.length === 0) {
        karrocaDiv.innerHTML = '<p>Karroca juaj është bosh.</p>';
    } else {
        karrocaDiv.innerHTML = `
            <table>
                <tr>
                    <th>Artikulli</th>
                    <th>Çmimi</th>
                    <th>Sasia</th>
                    <th>Veprimi</th>
                </tr>
                ${karroca.map((item, index) => `
                    <tr>
                        <td>${item.emri}</td>
                        <td>${item.cmimi} den</td>
                        <td>${item.sasia}</td>
                        <td><button class="fshi-artikull" data-index="${index}">Fshi</button></td>
                    </tr>
                `).join('')}
            </table>
            <button id="pastro-karrocen">Pastro Karrocën</button>
        `;

        // Shto event listener për çdo buton fshirjeje
        const fshiArtikujt = document.querySelectorAll('.fshi-artikull');
        fshiArtikujt.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                karroca.splice(index, 1); // Fshi artikullin nga array
                localStorage.setItem('karroca', JSON.stringify(karroca)); // Ruaj në localStorage
                location.reload(); // Rindiz faqen për të rifreskuar karrocën
            });
        });
    }

    document.getElementById('pastro-karrocen').addEventListener('click', function() {
        localStorage.removeItem('karroca');
        location.reload();
    });
});
