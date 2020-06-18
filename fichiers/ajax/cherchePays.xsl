<?xml version="1.0"?>

<xsl:stylesheet version  ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name="code"/>

<xsl:template match='//country[codes/cca2="FR"]'>
  <HTML>
  <BODY bgcolor="#FFFFCC">
  <p>
    <xsl:value-of select="./name/common"/>.  
  </p>

  <p>
    <xsl:value-of select="./capital"/>
  </p>
  </BODY>
  </HTML>			
</xsl:template>

</xsl:stylesheet>