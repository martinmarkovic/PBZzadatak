# PBZzadatak upute

## Upute za instalaciju i pokretanje

Za pokretanje projekta potrebno je instalriati sve potrebno za Frontend pomoću "npm isntall".

Za backend potrebno je stvoriti mongo bazu podataka zvanu PBZ, instalirati sails.js, "npm isntall".

Za pokretanje backenda potrebno je u jednom termial prozoru pokrenuti "mongod", a u drugom "sails lift".

Za pokretanje frontenda potrebno je u terminal unjeti "npm start" ili "ng serve".

## Što je sve u funkciji:
Unos informacija u bazu podataka (register sustav)

Promjena i brisanje ( za ulogirane korisnike po kriterijima moguća promjena osobne bilješke)

Pretraživanje po više kriterija (radi samo na backendu)

Promjena emaila (radi samo na backendu)

Ispis svih članova baze podataka (samo na backendu)

Forme za unos sa traženom kontrolom koja se nalazi kako u front endu tako i na backendu. Kod registracije nije moguće unjeti email pogrešknog formata, username sa manje od 6 znakova i slično.

Proizvoljna funckija, JWT. Token autorizacija i autentifikcija za backend koja kontrolira bilo koji proces kao dodana mjera sigurnosti za aplikaciju.

## Objašnjenje:
Određene funkcije rade samo u backendu budući da je angualr4 vrlo složene arhitekture zbog koje se u novijim verzijama popravilo neefikasnosti i nelogičnosti koje su postojale u ovoj verziji. Osobno nisam sve još razumio jer se angualr bazira više na poznavanju informacija vezanih uz sam framework nego na logici algoritama. Ono što radi u front endu su registracija, login i note change. Menu je sastavljen od vise komponenti koje se ucitavaju po potrebi bez reloada stranice (singlepage app). 