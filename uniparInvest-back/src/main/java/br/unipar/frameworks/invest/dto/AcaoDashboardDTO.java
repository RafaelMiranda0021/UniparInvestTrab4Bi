package br.unipar.frameworks.invest.dto;

public class AcaoDashboardDTO {

    private String ticker;
    private String empresa;
    private Double preco;

    public AcaoDashboardDTO() {
    }

    public AcaoDashboardDTO(String ticker, String empresa, Double preco) {
        this.ticker = ticker;
        this.empresa = empresa;
        this.preco = preco;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}