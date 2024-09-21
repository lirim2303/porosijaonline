// Marrim të gjithë butonat "Shto në karrocë"
document.addEventListener('DOMContentLoaded', () => {
    const butonat = document.querySelectorAll('.shto-ne-karroce');

    butonat.forEach(buton => {
        buton.addEventListener('click', function() {
            // Marrim të dhënat e produktit
            const emri = this.getAttribute('data-emri');
            const cmimi = this.getAttribute('data-cmimi');
            const sasia = this.previousElementSibling.value; // Marrim sasinë nga inputi

            // Krijojmë objektin e produktit
            const produkt = {
                emri: emri,
                cmimi: parseFloat(cmimi),
                sasia: parseInt(sasia) // Kthejmë sasinë në numër
            };

            // Marrim karrocën nga localStorage ose krijojmë një të re
            let karroca = JSON.parse(localStorage.getItem('karroca')) || [];

            // Shtojmë produktin në karrocë
            karroca.push(produkt);

            // Ruajmë karrocën përsëri në localStorage
            localStorage.setItem('karroca', JSON.stringify(karroca));

            // Përditësojmë numrin e artikujve në shportë
            azhuroNumrinEShportes();

            // Njoftojmë përdoruesin
            alert(`${sasia} x ${emri} është shtuar në karrocë!`);
        });
    });

    // Funksion për të përditësuar numrin e artikujve në shportë
    function azhuroNumrinEShportes() {
        const karroca = JSON.parse(localStorage.getItem('karroca')) || [];
        const numriArtikujve = karroca.reduce((total, produkt) => total + produkt.sasia, 0);
        document.getElementById('cart-count').textContent = numriArtikujve;
    }

    // Kalimi në faqen e karrocës kur klikojmë "Kaloni në Pagesë" ose shportën
    document.getElementById('kaloni-ne-pagesen').addEventListener('click', kaloniNePagesen);
    document.getElementById('shporta').addEventListener('click', kaloniNePagesen);

    function kaloniNePagesen() {
        window.location.href = 'karroca.html'; // Kalon tek faqja e karrocës
    }

    // Shfaqim produktet në karrocë kur ngarkohet faqja
    shfaqProduktetNeKarroce();
});

// Menaxhimi i shfaqjes së artikujve në karrocë
document.addEventListener('DOMContentLoaded', () => {
    const listaProdukteve = document.getElementById('lista-produkteve');

    function shfaqProduktetNeKarroce() {
        let karroca = JSON.parse(localStorage.getItem('karroca')) || [];

        if (karroca.length === 0) {
            listaProdukteve.innerHTML = '<p>Karroca juaj është bosh.</p>';
        } else {
            let html = `
                <table>
                    <tr>
                        <th>Artikulli</th>
                        <th>Çmimi për njësi</th>
                        <th>Sasia</th>
                        <th>Totali</th>
                        <th>Veprime</th>
                    </tr>
            `;

            karroca.forEach((produkt, index) => {
                html += `
                    <tr>
                        <td>${produkt.emri}</td>
                        <td>${produkt.cmimi.toFixed(2)} den</td>
                        <td>
                            <button class="dekreto" data-index="${index}">-</button>
                            <span>${produkt.sasia}</span>
                            <button class="inkreto" data-index="${index}">+</button>
                        </td>
                        <td>${(produkt.cmimi * produkt.sasia).toFixed(2)} den</td>
                        <td>
                            <button class="fshij-produkt" data-index="${index}">Fshije</button>
                        </td>
                    </tr>
                `;
            });

            html += `</table>`;
            listaProdukteve.innerHTML = html;

            // Shtojmë funksionalitetin për butonat e rritjes/uljes së sasisë dhe për fshirjen e produktit
            shtoEventetEButonave();
        }
    }

    // Funksion për të menaxhuar butonat për sasinë dhe fshirjen e produkteve
    function shtoEventetEButonave() {
        const butonatInkrito = document.querySelectorAll('.inkreto');
        const butonatDekrito = document.querySelectorAll('.dekreto');
        const butonatFshij = document.querySelectorAll('.fshij-produkt');

        butonatInkrito.forEach(buton => {
            buton.addEventListener('click', function() {
                ndryshoSasine(this.dataset.index, 1);
            });
        });

        butonatDekrito.forEach(buton => {
            buton.addEventListener('click', function() {
                ndryshoSasine(this.dataset.index, -1);
            });
        });

        butonatFshij.forEach(buton => {
            buton.addEventListener('click', function() {
                fshijProdukt(this.dataset.index);
            });
        });
    }

    // Funksion për të ndryshuar sasinë e një produkti në karrocë
    function ndryshoSasine(index, ndryshim) {
        let karroca = JSON.parse(localStorage.getItem('karroca')) || [];
        if (karroca[index].sasia + ndryshim > 0) {
            karroca[index].sasia += ndryshim;
        }
        localStorage.setItem('karroca', JSON.stringify(karroca));
        shfaqProduktetNeKarroce(); // Rifreskojmë listën e produkteve
    }

    // Funksion për të fshirë një produkt nga karroca
    function fshijProdukt(index) {
        let karroca = JSON.parse(localStorage.getItem('karroca')) || [];
        karroca.splice(index, 1); // Fshijmë produktin me indeksin e dhënë
        localStorage.setItem('karroca', JSON.stringify(karroca));
        shfaqProduktetNeKarroce(); // Rifreskojmë listën e produkteve
    }

    // Thirrim funksionin për të shfaqur produktet kur ngarkohet faqja
    shfaqProduktetNeKarroce();
});
