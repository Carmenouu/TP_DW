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

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
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

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

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
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
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
        element.addEventListener('click', function (element) {
            console.log(element)
		    elementHtmlARemplir.innerHTML = "Pays : " + element.explicitOriginalTarget.attributes[1].nodeValue ;
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
        item.addEventListener('mouseover', function (element) {
            //ajout de la classe "surlignage"
            element.explicitOriginalTarget.classList.add("selected");
		    elementHtmlARemplir.innerHTML = "Pays : " + element.explicitOriginalTarget.attributes[1].nodeValue ;
        
            //generation du tableau
            var table = generateTable();
            let row = document.createElement("tr");
            let th = document.createElement("th");
            th.innerHTML = "donnees";
            row.appendChild(th);
            
            document.getElementById("resultatTable").appendChild(table);
            
        });
        
        //event mouseout
        item.addEventListener('mouseout', function (element) {
            console.log("tamer");
            element.explicitOriginalTarget.classList.remove("selected");
            document.querySelector("table").remove()
            //element.explicitOriginalTarget.style.fill = "black";
		    //elementHtmlARemplir.innerHTML = "Pays : " + element.explicitOriginalTarget.attributes[1].nodeValue ;
        });
    });
}

//genere un tableau
function generateTable()
{
    var head = ["name", "capital", "flag"];

    var table = document.createElement("table");

    let row = document.createElement("tr");
    for (let item of head) {
        let th = document.createElement("th");
        th.innerHTML = item;
        row.appendChild(th);
    }
    table.appendChild(row);

    console.log(table);

    return table;
}

