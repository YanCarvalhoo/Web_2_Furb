//
// Este arquivo foi gerado pela Eclipse Implementation of JAXB, v4.0.5 
// Consulte https://eclipse-ee4j.github.io/jaxb-ri 
// Todas as modificações neste arquivo serão perdidas após a recompilação do esquema de origem. 
//


package com.exemplo.salas.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de anonymous complex type.</p>
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.</p>
 * 
 * <pre>{@code
 * <complexType>
 *   <complexContent>
 *     <restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       <sequence>
 *         <element name="idSala" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         <element name="nomeJogador" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       </sequence>
 *     </restriction>
 *   </complexContent>
 * </complexType>
 * }</pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "idSala",
    "nomeJogador"
})
@XmlRootElement(name = "EntrarSalaRequest")
public class EntrarSalaRequest {

    @XmlElement(required = true)
    protected String idSala;
    @XmlElement(required = true)
    protected String nomeJogador;

    /**
     * Obtém o valor da propriedade idSala.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdSala() {
        return idSala;
    }

    /**
     * Define o valor da propriedade idSala.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdSala(String value) {
        this.idSala = value;
    }

    /**
     * Obtém o valor da propriedade nomeJogador.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNomeJogador() {
        return nomeJogador;
    }

    /**
     * Define o valor da propriedade nomeJogador.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNomeJogador(String value) {
        this.nomeJogador = value;
    }

}
