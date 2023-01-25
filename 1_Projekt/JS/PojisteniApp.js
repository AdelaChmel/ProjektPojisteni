'use strict'

class PojisteniApp {

    constructor() {
        const pojistenciZeStorage = localStorage.getItem("pojistenci");
        this.pojistenci = pojistenciZeStorage ? JSON.parse(pojistenciZeStorage) : [];


        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.vekInput = document.getElementById("vek");
        this.telefonInput = document.getElementById("telefon");
        this.tlacitko = document.getElementById("tlacitko");
        //this.table = document.getElementById("seznam-pojistencu");
        this._nastavUdalosti();
    }

    _nastavUdalosti() {
        this.tlacitko.onclick = () => {
            console.log(this.pojistenci);
            if (this.jmenoInput.value.length == 0) {
                alert("Vyplňte jméno")
            } else if (this.prijmeniInput.value.length == 0) {
                alert("Vyplňte příjmení")
            } else if (this.vekInput.value <= 0) {
                alert("Vyplňte věk!")
            } else if (this.telefonInput.value.length < 9 ) {
                alert("Vyplňte telefonní číslo!")
            } else {
                const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
                this.pojistenci.push(pojistenec);
                this.ulozPojistence();
                this.vytvorTabulku();
            }
        }
    }

    ulozPojistence() {
        localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci));
    }

     vytvorTabulku() {
         this.table = document.querySelector("tbody");
         this.table.innerText = "";
        
         for ( const pojistenec of this.pojistenci) {
            console.log(pojistenec);
            const tr = document.createElement("tr");
            this.table.appendChild(tr);
            
            const bunkaJmeno = document.createElement("td");
            bunkaJmeno.innerText = '';
           
             bunkaJmeno.innerText += pojistenec.celeJmeno;
              tr.appendChild(bunkaJmeno);

            const bunkaTel = document.createElement("td");
            bunkaTel.innerText = '';
            tr.appendChild(bunkaTel);
            bunkaTel.innerText += pojistenec.telefon;

            const bunkaVek = document.createElement("td");
            bunkaVek.innerText = '';
            tr.appendChild(bunkaVek);
             bunkaVek.innerText += pojistenec.vek;
             
            const bunkaSmazat = document.createElement("td");
            bunkaSmazat.id = "smazat";
             //bunkaSmazat.innerHTML = '';
            tr.appendChild(bunkaSmazat);
            this._pridejTlacitko("Smazat", () => {
                this.pojistenci = this.pojistenci.filter(p => p !== pojistenec);
                this.ulozPojistence();
                this.vytvorTabulku();
            }, bunkaSmazat);
         }  

        }
     _pridejTlacitko(titulek, callback, element) {
             const button = document.createElement("button");
             button.onclick = callback;
             button.innerText = titulek;
             element.appendChild(button);     
    }
}

