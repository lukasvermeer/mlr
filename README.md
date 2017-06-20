# Measure of Lexical Richness

Het analyseprogramma MLR (Measure of Lexical Richness, Maat voor Lexicale Rijkdom) kan gebruikt worden voor een drietal zaken:

1. wat is het relatieve aandeel makkelijke en moeilijke woorden in een tekst (de lexicale rijkdom)?
2. wat is de tekstmoeilijkheid van een verhaal voor een bepaalde leerling/groep leerlingen? en
3. hoe groot is bij benadering de woordenschat van de schrijver/spreker van een tekst?

Een werkende versie van het programma is te benaderen op het volgende adres: [http://lukasvermeer.github.io/mlr/](http://lukasvermeer.github.io/mlr/)

## Doelgroep

Het programma richt zich op teksten van (leerlingen in) het basisonderwijs, met een woordenschatgrootte tot ongeveer 15.000 lemma’s, dus kinderen tot en met groep 8, en is bedoeld voor onderzoekers en leermiddelenontwikkelaars. Ook leerkrachten kunnen het gebruiken, bijvoorbeeld om de moeilijke en makkelijke woorden uit een tekst op te sporen.

## Methode

Uitgangspunt is: hoe minder frequent een woord in een taal gebruikt wordt, hoe moeilijker het woord is. En ook: de meest frequente woorden worden het eerst geleerd, want de meest frequente woorden zitten ook het meest in het taalaanbod. De frequentiewoordenlijst van Schrooten & Vermeer (1994) met ruim 26.000 lemma’s (woordenboekingangen) vormt de basis van de MLR. De oorspronkelijke versie (2001-2016) is beschreven in Vermeer (2000).

## Gebruik

Bij het invoeren van een tekst (van een kind, of uit een boek) in het scherm worden de losse woorden (“tokens”) herleid naar hun hoofdvorm (“lemma’s”), dus *boekje* naar *boek*, en *fietste* naar *fietsen*. Bedenk dat daarbij lang niet alle mogelijke samenstellingen van woorden (*gympak, gymbroek, gymzaal, gymschoen*, …) en alle afgeleide vormen van woorden (op *on-, -heid, -tje, -ing, -atie,* …) herleid worden naar een lemma. Voer eventueel van het bedoelde woord het lemma in om na te gaan of het in Schrooten/Vermeer voorkomt. Dat kan ook door woorden in vaste formaties en uitdrukkingen als *niet_op_zijn_mondje_gevallen* en *in_zijn_sas* met een _ te verbinden. 

De door de gebruiker ingevoerde tekst van een kind of uit een boek wordt in de output (onder het kopje *Tokens*) direct weergegeven; de geel gemarkeerde woorden komen niet voor in de lijst van Schrooten & Vermeer, of werden niet herkend. Van wit gemarkeerde woorden is meteen een betekenis gekozen. Bij blauw gemarkeerde woorden kan door op het woord te klikken eventueel de betekenis gekozen worden die in die context de juiste is, bijvoorbeeld *bank_zitten* (lijst 1) of *bank_geld* (lijst 4). Bij de lichtblauwe woorden komen de verschillende betekenissen uit dezelfde lijst, bij de donkerblauwe komt een andere betekenis uit een hogere lijst. Vóór elke betekenis wordt steeds aangegeven in welke lijst het woord voorkomt. Voor de berekening van de tekstdekking, de MLR-score en de indicatie van de grootte van de woordenschat (MLR-25) wordt standaard de betekenis uit de laagste lijst (die met de meest frequente woorden) gekozen. Aardrijkskundige namen (*Amsterdam*) en de meeste uitroepen (*huh*) staan niet in de lijsten. In afwijking van de vorige versie van de MLR worden de verschillende vormen van sterke werkwoorden (*liep, gebracht*) niet meer apart aangegeven, maar alleen het lemma (*lopen, brengen*).

## Resultaten

De lemma’s worden onder het kopje *Lijstverdeling* ingedeeld in negen frequentiecategorieën. Lijst 1 bevat de 1000 meest frequente lemma’s, lijst 2 de daarop volgende 1000 meest frequente (dus van 1001-2000), en zo ook in lijst 3, 4 en 5 met elk 1000 lemma’s. Lijst 6 telt 1500 lemma’s (dus van 5001-6500), lijst 7 1600, lijst 8 4500 lemma’s, en lijst 9 de 13400 minst frequente lemma’s. In totaal bevatten de lijsten dus 26000 verschillende lemma’s. De output geeft de frequenties van elk lemma weer (klik op *Lemmalijsten* om per lijst de woorden te zien). Boven deze lijstverdeling  wordt de lexicale rijkdom van de tekst weergegeven in een MLR-score, die gebaseerd is op het relatieve aandeel makkelijke en moeilijke woorden in een tekst (zie voor een verantwoording Vermeer, 2004 en Van Hout & Vermeer, 2007).

Daarnaast wordt ook de score voor de MLR-25 gegeven, die een indicatie geeft van de grootte van de woordenschat van de schrijver/spreker van die tekst, gebaseerd op de vijfentwintig woorden uit de tekst van het kind die het minst frequent voorkomen in Schrooten & Vermeer (zie voor deze maat Vermeer, 2016). Deze indicatie wordt pas zichtbaar als een tekst vijftig of meer lemma’s telt. 

Ten slotte wordt (klik op *Lemmadekking*) in een figuur aangegeven hoe begrijpelijk een ingevoerde tekst is voor een lezer met een bepaald woordenschatniveau (“tekstdekking”, zie hierover Goossens & Vermeer, 2009). Ook voor de selectie van woorden voor woordenschatlessen kan de MLR ingezet worden (zie voor voorbeelden Van de Guchte & Vermeer, 2003).

## Verwijzingen

Meeste zijn te downloaden via [ResearchGate](https://www.researchgate.net/profile/Anne_Vermeer)

- Schrooten, W. & A. Vermeer (1994). *Woorden in het basisonderwijs. 15.000 woorden aangeboden aan leerlingen.* Tilburg: TUP. Tekst en woordenlijst te downloaden via [www.annevermeer.com](http://www.annevermeer.com)
- Vermeer, A. (2000). *Lexicale rijkdom, tekstmoeilijkheid en woordenschatgrootte.* Beschrijving van de MLR, een woordenschat-analyseprogramma. *Toegepaste Taalwetenschap in Artikelen 64, 95-105.* ([PDF](https://let.uvt.nl/general/people/avermeer/mlr/mlrttwia64.PDF))
- Vermeer, A. (2004). The relation between lexical richness and vocabulary size in Dutch L1 and L2 children. In: P. Bogaards & B. Laufer (eds.) *Vocabulary in a Second Language: Selection, Acquisition and Testing* (pp. 173-189). Amsterdam: John Benjamins.
- Hout, R. van & A. Vermeer (2007). Comparing measures of lexical richness. In: H. Daller, J. Milton & J. Treffers-Daller (eds.), *Modelling and assessing vocabulary knowledge* (pp. 93-116). Cambridge: Cambridge University Press.
- Goossens, N. & A. Vermeer (2009). Wat is een optimale tekstdekking? Woordkennis en tekstbegrip in groep 6. *Toegepaste Taalwetenschap in Artikelen* 82, 81-92.
- Vermeer, A. (2016). Lexicale rijkdom, frequentielagen en tekstmoeilijkheid. *Dutch Journal of Applied Linguistics* 5, 1, 18-33.
- Guchte, C. van de & A. Vermeer (2003). Een passende woordkeus: het kiezen van woorden voor woordenschatlessen. *Toegepaste Taalwetenschap in Artikelen* 69, 9-23. ([PDF](https://let.uvt.nl/general/people/avermeer/wrdlst/wrdkeusttwia.pdf))
