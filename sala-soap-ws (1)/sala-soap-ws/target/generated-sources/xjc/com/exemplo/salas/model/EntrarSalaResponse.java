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
 *         <element name="sucesso" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         <element name="mensagem" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         <element name="vagasDisponiveis" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         <element name="capacidadeMaxima" type="{http://www.w3.org/2001/XMLSchema}int"/>
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
    "sucesso",
    "mensagem",
    "vagasDisponiveis",
    "capacidadeMaxima"
})
@XmlRootElement(name = "EntrarSalaResponse")
public class EntrarSalaResponse {

    protected boolean sucesso;
    @XmlElement(required = true)
    protected String mensagem;
    protected int vagasDisponiveis;
    @XmlElement(defaultValue = "4")
    protected int capacidadeMaxima;

    /**
     * Obtém o valor da propriedade sucesso.
     * 
     */
    public boolean isSucesso() {
        return sucesso;
    }

    /**
     * Define o valor da propriedade sucesso.
     * 
     */
    public void setSucesso(boolean value) {
        this.sucesso = value;
    }

    /**
     * Obtém o valor da propriedade mensagem.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMensagem() {
        return mensagem;
    }

    /**
     * Define o valor da propriedade mensagem.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMensagem(String value) {
        this.mensagem = value;
    }

    /**
     * Obtém o valor da propriedade vagasDisponiveis.
     * 
     */
    public int getVagasDisponiveis() {
        return vagasDisponiveis;
    }

    /**
     * Define o valor da propriedade vagasDisponiveis.
     * 
     */
    public void setVagasDisponiveis(int value) {
        this.vagasDisponiveis = value;
    }

    /**
     * Obtém o valor da propriedade capacidadeMaxima.
     * 
     */
    public int getCapacidadeMaxima() {
        return capacidadeMaxima;
    }

    /**
     * Define o valor da propriedade capacidadeMaxima.
     * 
     */
    public void setCapacidadeMaxima(int value) {
        this.capacidadeMaxima = value;
    }

}
