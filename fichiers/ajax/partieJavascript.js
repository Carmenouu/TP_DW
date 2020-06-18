//// Partie Professeur

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeNode(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�treet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3e parametre est défini à false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    /*if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }*/

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, newElementName) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier �l�ment fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//// Partie r�ponses au TP

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "resultat" avec la chaine de caract�res en param�tre	  
function setDessin(dessin) {
    var elementHtmlARemplir = window.document.getElementById("resultat");
    elementHtmlARemplir.innerHTML = dessin;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function afficherSVG(svgDocumentUrl) {
	//charge le document SVG donn� en param�tre
	// Fonction utilisée dans les boutons 4 et 6
	
	var svgDocument = chargerHttpXML(svgDocumentUrl) ;
	
	var oSerializer = new XMLSerializer() ;
	
	var dessin = oSerializer.serializeToString(svgDocument) ;

    // Appel de la fonction setDessin
    setDessin(dessin);
	
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton1_changerCouleurs() {
	//modifie la couleur de l'arri�re plan de la page en bleu et la couleur du texte du bouton en blanc.
	document.body.style.backgroundColor = "blue" ;
	var bouton = document.getElementById("myButton1") ;
	bouton.style.color = "white" ;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_reinitialiserCouleurs() {
	//remet les couleurs de base pour l'arri�re plan et le bouton 1
	document.body.style.backgroundColor = "white" ;
	var bouton = document.getElementById("myButton1") ;
	bouton.style.color = "black" ;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxCountries(xmlDocumentUrl, xslDocumentUrl) {
	
	var inputElement = document.getElementById("codeCountry") ;
	var code = inputElement.value ;

    var xsltProcessor = new XSLTProcessor();
	xsltProcessor.setParameter(null, "code", code) ;
	
    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("resultat");
    // Premier �l�ment fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "p"
    var elementAInserer = newXmlDocument.getElementsByTagName("p")[0];
	
    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);


}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton5_exempleSVGcliquables(svgDocumentUrl) {
	afficherSVG(svgDocumentUrl) ;

	var cercle = document.getElementById("leCercle") ;
	var rectangle = document.getElementById("leRect") ;
	var courbe = document.getElementById("laCourbe") ;
	var elementHtmlARemplir = window.document.getElementById("title");
	
	cercle.addEventListener('click', function (event) {
		    elementHtmlARemplir.innerHTML = "Titre de la forme : " + cercle.getAttribute("title") ;
	}) ;
	
	
	rectangle.addEventListener('click', function (event) {
		    elementHtmlARemplir.innerHTML = "Titre de la forme : " + rectangle.getAttribute("title") ;
	}) ;
	
	
	courbe.addEventListener('click', function (event) {
		    elementHtmlARemplir.innerHTML = "Titre de la forme : " + courbe.getAttribute("title") ;
	}) ;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton7_paysSVGcliquables(svgDocumentUrl) {
	afficherSVG(svgDocumentUrl) ;
    
    var elementHtmlARemplir = window.document.getElementById("title");
    pays = document.querySelectorAll("path");

    pays.forEach(function(element){
        element.addEventListener('click', function (event) {
		    elementHtmlARemplir.innerHTML = "Pays : " + event.target.attributes[1].nodeValue ;
	    });
    });
}

function Bouton8_paysSVGhover(svgDocumentUrl)
{
    afficherSVG(svgDocumentUrl) ;
    
    var elementHtmlARemplir = window.document.getElementById("title");
    pays = document.querySelectorAll("path");

    //pour chaque pays
    pays.forEach(function(item){
        //event mousover
        item.addEventListener('mouseover', function (event) {
            let codePays = event.target.id;

            //element.explicitOriginalTarget.classList.add("selected");
            event.target.style.fill = "green";

            //XSL ET XML BOUTON 3
            //recuperation nomPays et capitale
            var xsltProcessor = new XSLTProcessor();
	        xsltProcessor.setParameter(null, "code", codePays) ;
            // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
            var xslDocument = chargerHttpXML("cherchePays.xsl");
            // Importation du .xsl
            xsltProcessor.importStylesheet(xslDocument);
            // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
            var xmlDocument = chargerHttpXML("countriesTP.xml");
            // Cr�ation du document XML transform� par le XSL
            var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

            
            document.querySelector("table").style.display = "block";
            document.getElementById("table-pays").innerHTML = newXmlDocument.getElementById("pays").innerHTML;
            document.getElementById("table-capital").innerHTML = newXmlDocument.getElementById("capitale").innerHTML;
            let img = document.createElement("img");
            img.id = "flag";
            img.src = "http://www.geonames.org/flags/x/" + codePays.toLowerCase() + ".gif";
            img.height = "40";
            img.width = "60";
            document.getElementById("table-flag").appendChild(img);

            //appelle ajax pour recuperer la
            let jsonCurrency = chargerHttpJSON("https://restcountries.eu/rest/v2/alpha/"+codePays.toLowerCase());
            document.getElementById("table-currency").innerHTML = jsonCurrency.currencies[0].name;
            
        });
        
        //event mouseout
        item.addEventListener('mouseleave', function (event) {
            //element.explicitOriginalTarget.classList.remove("selected");
            event.target.style.fill = "#CCCCCC";
            console.log(event.target.className);
            document.getElementById("table-flag").removeChild(document.getElementById("flag"))
            document.querySelector("table").style.display = "none";
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton9_autocompletion(xmlDocumentUrl){
	var xmlDocument = chargerHttpXML("countriesTP.xml");
	var countriesList = xmlDocument.getElementsByTagName("cca2");
	var options = '';
	var dataListCountries = document.getElementById("codes") ;
	
	for(var i=0; i< countriesList.length; i++){
		options += '<option value="'+countriesList[i].innerHTML+'"/>';
	}
	dataListCountries.innerHTML = options;
}