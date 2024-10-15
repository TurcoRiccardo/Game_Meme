-- SQLite
DROP TABLE IF EXISTS "meme";
DROP TABLE IF EXISTS "didascalia";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "risultati";


CREATE TABLE "meme" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"percorso" TEXT NOT NULL
);

CREATE TABLE "didascalia" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"testo" TEXT NOT NULL,
    "memeId" INTEGER,
    FOREIGN KEY("memeId") REFERENCES "meme"("id") ON DELETE CASCADE ON UPDATE SET NULL
);

CREATE TABLE "user" (
    "email" TEXT PRIMARY KEY,
	"name" TEXT NOT NULL,
    "punteggio" INTEGER NOT NULL,
	"password" TEXT NOT NULL,
	"salt" TEXT NOT NULL
);

CREATE TABLE "risultati" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"emailUser" TEXT NOT NULL,
    "meme1" TEXT,
    "didascalia1" TEXT,
    "risultato1" INTEGER,
    "meme2" TEXT,
    "didascalia2" TEXT,
    "risultato2" INTEGER,
    "meme3" TEXT,
    "didascalia3" TEXT,
    "risultato3" INTEGER,
    FOREIGN KEY("emailUser") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE SET NULL
);

DELETE FROM "meme";
DELETE FROM "didascalia";
DELETE FROM "user";
DELETE FROM "risultati";

INSERT INTO "meme" ("percorso") VALUES("stonks");
INSERT INTO "meme" ("percorso") VALUES("notStonks");
INSERT INTO "meme" ("percorso") VALUES("bart");
INSERT INTO "meme" ("percorso") VALUES("dinkleberg");
INSERT INTO "meme" ("percorso") VALUES("woman");
INSERT INTO "meme" ("percorso") VALUES("diCaprio");
INSERT INTO "meme" ("percorso") VALUES("drake");
INSERT INTO "meme" ("percorso") VALUES("maniSuiFianchi");
INSERT INTO "meme" ("percorso") VALUES("pulsanteRosso");
INSERT INTO "meme" ("percorso") VALUES("mathLady");

INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando al fantacalcio ti segnano tutti gli attaccanti", 1);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Io dopo aver visto 'The Wolf of Wall Street' una volta", 1);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando tiri fuori i soldi ma ti cadono nel tombino", 2);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando posti un meme e non diventa virale", 2);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando scopri che tra pochi giorni inizia la sessione estiva", 3);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando mia mamma mi ha gia chiamato 5 volte", 3);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Chi ha mangiato la mia torta?", 4);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando il computer si blocca all'improvviso", 4);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando i tuoi amici ti rubano le patatine", 5);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando non riesci a prendere per un pelo l'ascensore e c'è qualcuno al suo interno", 5);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando il capo ti dice che puoi andare via prima", 6);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Mamme che urlano 'la cena è pronta' quando hanno appena buttato la pasta", 6);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando non vuoi lavorare tardi ma vuoi uscire con gli amici", 7);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ti propongono di lavorare nel weekend ma vai ad un barbecue con gli amici", 7);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ti svegli e ti rendi conto che è ancora troppo presto", 8);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando sei un chirurgo e dopo ore di operazione senti un parente dire 'grazie a dio è salvo'", 8);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando devi scegliere tra dieta e pizza", 9);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando devi scegliere tra svegliarti presto e rimanere a letto", 9);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando cerchi di capire l'ultima email del capo", 10);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando cerchi di decifrere la ricetta f medico", 10);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando cerchi parcheggio in centro", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando vedi che è finalmente il weekend!", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando capisci che è di nuovo lunedì", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando fai piani per il weekend ma finisci per restare a casa", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando finalmente finisci un progetto", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando scopri una nuova serie TV", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando cerchi parcheggio al centro commerciale", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando scopri un nuovo hobby", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando scopri che domani è festa", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando finalmente è venerdì", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando finisce l'ultima stagione della tua serie preferita", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ti rendi conto che oggi è lunedì", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando scopri una nuova app di social media", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando la tua dieta fallisce di nuovo", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando cerchi di sembrare cool", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando finalmente capisci il compito", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando scopri una scorciatoia", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ti ricordi di mettere la sveglia", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando il weekend finisce troppo presto", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ti rendi conto che hai lasciato il cellulare a casa", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando il tuo amico cancella i piani all'ultimo minuto", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando vedi il cibo arrivare al tavolo accanto", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando apri il frigo e non c'è cibo", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando capisci di aver dimenticato di fare un compito importante", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ti chiedono cosa vuoi per cena e rispondi 'non so'", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando hai fame ma non sai cosa mangiare", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando hai fretta e il semaforo diventa rosso", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando dici 'Andiamo a fare una passeggiata' ma fuori piove", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando ricordi una battuta divertente durante una riunione seria", NULL);
INSERT INTO "didascalia" ("testo", "memeId") VALUES("Quando trovi un nuovo meme che ti fa ridere", NULL);
INSERT INTO "user" ("email", "name", "punteggio", "password", "salt") VALUES("turco.riccardo@polito.it", "riccardo", 10, "de30ca91c53c2847cb05697dcd0158ad0244f063094aa58fca06bd10e2d6f74a", "72e4eeb14def3b21"); -- testtest
INSERT INTO "user" ("email", "name", "punteggio", "password", "salt") VALUES("albert.einstein@relativity.org", "albert", 0, "844326082abc96539775dc446bd862b22a46d7e57164e6c8ac0f6d185936c046	", "e818f0647b4e1fe0"); -- testtest

INSERT INTO "risultati" ("emailUser", "meme1", "didascalia1", "risultato1", "meme2", "didascalia2", "risultato2", "meme3", "didascalia3", "risultato3")
VALUES("turco.riccardo@polito.it", "stonks", "Io dopo aver visto 'The Wolf of Wall Street' una volta", 5, "notStonks", "Quando tiri fuori i soldi ma ti cadono nel tombino", 5, "bart", "Quando non vuoi lavorare tardi ma vuoi uscire con gli amici", 0);
