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


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    //extraction des noms � partir du document XML (avec une feuille de style ou en javascript)
    var lesNoms = xmlDocument.getElementsByTagName("LastName");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charact�res contenant les noms s�par�s par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Acc�s au texte d'un noeud "LastName" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    for (i = 0; i < lesNoms.length; i++) {
        if (i > 0) {
            chaineDesNoms = chaineDesNoms + ", ";
        }
        chaineDesNoms = chaineDesNoms + lesNoms[i].firstChild.nodeValue + " ";
    }


    // Appel (ou recopie) de la fonction setNom(...) ou bien autre fa�on de modifier le texte de l'�l�ment "span"
    setNom(chaineDesNoms);


}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDocumentUrl, xslDocumentUrl) {
    //commenter la ligne suivante qui affiche la bo�te de dialogue!
    alert("Fonction � compl�ter...");
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
	
	
}


