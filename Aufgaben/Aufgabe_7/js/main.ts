/*
Aufgabe: Aufgabe 5
Name: Johannes Rümenapp
Matrikel: 261175
Datum: 09.05.2019

Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/

namespace A7 {

    //Wenn die Seite lädt wird die Funktion init aufgerufen
    window.addEventListener("load", init);

    /**
     * Funktion seiteGenerieren wird mit dem Parameter data von data.ts aufgerufen
     */
    function init(): void {
        seiteGenerieren(data);

        let fieldsets: HTMLCollectionOf<HTMLFieldSetElement> = document.getElementsByTagName("fieldset");
        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
            document.getElementById("button").addEventListener("click", bestellungPruefen);
            document.getElementById("button2").addEventListener("click", generateUrl);
        }


    }

    let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
    let legend: HTMLLegendElement = document.createElement("legend");

    /**
     * 
     * @param _data mein Datensatz an Produktkategorien
     * @var kategoriePos Position/Name des Arrays welches Produkte der Produktkategorien enthält
     * @var value ist ein Array aus Produkten vom Array _data an der Position kategoriePos
     * @var div wird erstellt und an fieldset angehangen
     * div wird Text zugewiesen (kategoriePos)
     * 
     */
    function seiteGenerieren(_data: fieldsetboxes): void {
        document.getElementById("inhalt").appendChild(fieldset);
        fieldset.appendChild(legend);
        legend.innerText = "Auswahl";

        // das gleiche wie for(let i = 0; i < _data.length; i++){}
        for (let kategoriePos in _data) {
            let value: Products[] = _data[kategoriePos];
            let div: HTMLDivElement = document.createElement("div");
            fieldset.appendChild(div);
            div.innerText = kategoriePos;

            //für jedes productPos in Value(=eine Produktkategorie) wird die function seiteAnzeigen aufgerufen
            for (let productsPos in value) {
                seiteAnzeigen(value[productsPos]);
            }

        }
    }

    /**
     * @param _product ist ein übergebenes Produkt
     * Für Produkte des Types number, checkbox radio werden die jeweiligen Elemente erstellt und Atribute gesetzt
     */
    function seiteAnzeigen(_product: Products): void {
        if (_product.type == "number") {
            let input: HTMLInputElement = document.createElement("input");
            fieldset.appendChild(input);
            input.before(_product.id);
            input.setAttribute("name", _product.id);
            input.setAttribute("type", _product.type);
            input.setAttribute("id", _product.id);
            input.setAttribute("valueStart", "0");
            input.setAttribute("step", "1");
            input.setAttribute("max", "5");
            input.setAttribute("min", "0");
            input.setAttribute("preis", _product.price);

        } else if (_product.type == "checkbox") {
            let input: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            fieldset.appendChild(input);
            fieldset.appendChild(label);
            label.innerText = _product.id;
            label.setAttribute("for", _product.id);
            input.setAttribute("type", _product.type);
            input.setAttribute("id", _product.id);
            input.setAttribute("name", _product.id);
            input.setAttribute("preis", _product.price);

        } else if (_product.type == "radio") {
            let input: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            fieldset.appendChild(input);
            fieldset.appendChild(label);
            label.innerText = _product.id;
            label.setAttribute("for", _product.id);
            input.setAttribute("type", _product.type);
            input.setAttribute("id", _product.id);
            input.setAttribute("name", _product.name);
            input.setAttribute("preis", _product.price);
            input.setAttribute("value", _product.value);
        } else {
            console.log("Der Produkttyp ist ungültig!");
        }
    }


    /**
     * 
     */
    function handleChange(): void {
        let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
        let sum: number = 0;

        document.getElementById("extras2").innerHTML = "";
        document.getElementById("darreichungsform2").innerHTML = "";
        document.getElementById("versandart2").innerHTML = "";
        document.getElementById("eissorte2").innerHTML = "";

        for (let i: number = 0; i < input.length; i++) {
            if (input[i].checked == true) {
                sum += Number(input[i].getAttribute("preis"));
                if (input[i].type == "checkbox") {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[i].id} `;
                    document.getElementById("extras2").appendChild(ziel);
                } else if (input[i].name == "Darreichungsform") {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[i].id}`;
                    document.getElementById("darreichungsform2").appendChild(ziel);
                } else if (input[i].name == "Versandart") {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[i].id}`;
                    document.getElementById("versandart2").appendChild(ziel);
                }
            }
            if (input[i].type == "number" && Number(input[i].value) > 0) {
                sum += (Number(input[i].getAttribute("preis")) * Number(input[i].value));
                let ziel = document.createElement("li");
                ziel.innerHTML = `${input[i].value}x ${input[i].name} `;
                document.getElementById("eissorte2").appendChild(ziel);
            }
            document.getElementById("preis1").innerHTML = `Preis:   ${sum} €`;
        }

    }


    function bestellungPruefen(): void {
        let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
        let fehlend: string = "";
        let darreichungsformUeberprueft: boolean = false;
        let eissorteUeberprueft: boolean = false;
        let versandartUeberprueft: boolean = false;
        let adresseUeberprueft: boolean = true;

        for (let i: number = 0; i < input.length; i++) {
            if (input[i].type == "text")
                if (input[i].value == "") {
                    adresseUeberprueft = false;
                }
            if (input[i].type == "number") {
                if (Number(input[i].value) > 0) {
                    eissorteUeberprueft = true;
                }
            }
            if (input[i].name == "Darreichungsform") {
                if (input[i].checked == true) {
                    darreichungsformUeberprueft = true;
                }
            }
            if (input[i].name == "Versandart") {
                if (input[i].checked == true) {
                    versandartUeberprueft = true;
                }
            }
        }
        if (darreichungsformUeberprueft == false) {
            fehlend += "Darreichungsform, ";
        }
        if (eissorteUeberprueft == false) {
            fehlend += "Eissorte, ";
        }
        if (versandartUeberprueft == false) {
            fehlend += "Versandart, ";
        }
        if (adresseUeberprueft == false) {
            fehlend += "Adressdaten, ";
        }
        if (fehlend == "") {
            alert("Die Bestellung ist bei uns erfolgreich eingegangen. Vielen Dank!")
        } else {
            alert("Biite füllen Sie folgende Felder aus: " + fehlend);
        }
    }

    function generateUrl(): void {
        let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
        let url: string = "https://lassdasmaldenpapamachen.herokuapp.com/?";
        //let url: string = "http://localhost:8100/?";
        for (let i: number = 0; i < input.length; i++) {
            //Darreichungsform
            if (input[i].name == "Darreichungsform") {
                if (input[i].checked == true) {
                    url += `${input[i].name}=${input[i].value}&`;
                }
            }
            //Eissorte
            if (input[i].type == "number") {
                if (Number(input[i].value) > 0) {
                    url += `${input[i].id}=${input[i].value}x&`;
                }
            }
            //Extras
            if (input[i].type == "checkbox") {
                if (input[i].checked == true) {
                    url += `${input[i].name}=Ausgewählt&`;
                }
            }
            //Versandart
            if (input[i].name == "Versandart") {
                if (input[i].checked == true) {
                    url += `${input[i].name}=${input[i].value}`;
                }
            }
        }
        sendRequestWithCustomData(url);
    }

    function sendRequestWithCustomData(_url: string): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", _url, true);
        xhr.addEventListener("readystatechange", handleStateChange);
        xhr.send();
    }

    function handleStateChange(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById("serverantwort").innerHTML = "<strong>Folgende Bestellung ist bei uns eingegangen:</strong><br><br>" + xhr.response;
        }
    }
}