<?php

$xmlString = <<<XML
<data>
    <name>suci</name>
    <age>17</age>
    <city>Martapura</city>
</data>
XML;

$xml = simplexml_load_string($xmlString);

$json = json_encode($xml);

echo $json;

?>