<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:param name="code"/>
  <xsl:template match="/">
  <html>
		<head>
			<title>XSLT Excercises</title>
		</head>
		<body bgcolor="beige">
			<xsl:apply-templates select="node()">
				<xsl:with-param name="code" select = "code" />
			</xsl:apply-templates>
		</body>
   </html>
  </xsl:template>
  
 <xsl:template match='//country[codes/cca2=$code]'>
	<p>
		Pays : <span id="pays"><xsl:value-of select="./name/common"/></span> <br />  
		Capitale : <span id="capitale"><xsl:value-of select="./capital"/></span>
	</p>
  </xsl:template>

 
  
</xsl:stylesheet>
