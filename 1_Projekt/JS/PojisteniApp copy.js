'use strict'

class PojisteniApp {
    /*get celeJmeno() {
        return `${this.jmenoInput} ${this.prijmeniInput}`;
    }*/

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
            if (this.jmenoInput.value.length !== 0 && this.prijmeniInput.value.length !== 0 && this.vekInput.value > 0 && this.telefonInput.length >9) {
                const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
                this.pojistenci.push(pojistenec);
                this.ulozPojistence();
                this.vytvorTabulku();
            } else
                alert("Musíte vyplnit všechny údaje!");    
        }
    }

    ulozPojistence() {
        localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci));
    }

     vytvorTabulku() {
         this.table = document.querySelector("tbody");
         this.table.innerText = "";
        
         for (let i = 0; i < this.pojistenci.length; i++) {
            console.log('cyklus berzi');
            const tr = document.createElement("tr");
            this.table.appendChild(tr);
            
            const bunkaJmeno = document.createElement("td");
            bunkaJmeno.innerText = '';
            tr.appendChild(bunkaJmeno);
            bunkaJmeno.innerText += this.pojistenci[i].jmeno + ' ' + this.pojistenci[i].prijmeni;

           const bunkaTel = document.createElement("td");
            bunkaTel.innerText = '';
            tr.appendChild(bunkaTel);
            bunkaTel.innerText += this.pojistenci[i].telefon;

            const bunkaVek = document.createElement("td");
            bunkaVek.innerText = '';
            tr.appendChild(bunkaVek);
             bunkaVek.innerText += this.pojistenci[i].vek;
             
             const bunkaSmazat = document.createElement("td");
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
            /*console.log('cyklus berzi');
            const tr = document.createElement("tr");
            this.table.appendChild(tr);
            
            const bunkaJmeno = document.createElement("td");
            bunkaJmeno.innerText = '';
            tr.appendChild(bunkaJmeno);
            bunkaJmeno.innerText += this.pojistenci.prijmeni;

           const bunkaTel = document.createElement("td");
            bunkaTel.innerText = '';
            tr.appendChild(bunkaTel);
            bunkaTel.innerText += this.pojistenci.telefon;

            const bunkaVek = document.createElement("td");
            bunkaVek.innerText = '';
            tr.appendChild(bunkaVek);
            bunkaVek.innerText += this.pojistenci.vek;
       */
    }
}

