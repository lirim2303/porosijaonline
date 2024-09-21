// Funksioni për të marrë artikujt nga localStorage
function merrArtikujt() {
    const artikujt = localStorage.getItem('artikujt'); // Merr të dhënat nga localStorage
    return artikujt ? JSON.parse(artikujt) : []; // Kthe të dhënat si objekt JSON
}

// Funksioni për të shfaqur artikujt në shportë
function shfaqArtikujt() {
    const artikujt = merrArtikujt();
    const shportaDiv = document.getElementById('shporta'); // Merr elementin e shportës

    shportaDiv.innerHTML = ''; // Përdorim 'innerHTML' për të zbrazur shportën

    artikujt.forEach(artikulli => {
        const div = document.createElement('div'); // Krijon një element të ri div
        div.innerText = artikulli.emri + ' - ' + artikulli.cmimi; // Shtojmë përmbajtjen
        shportaDiv.appendChild(div); // Shtojmë div-in në shportë
    });
}

// Thërrasim funksionin për të shfaqur artikujt
shfaqArtikujt();
