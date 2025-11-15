package br.unipar.frameworks.invest.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "configuracoes")
public class Configuracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "configuracao_acoes",
        joinColumns = @JoinColumn(name = "configuracao_id"),
        inverseJoinColumns = @JoinColumn(name = "acao_id")
    )
    private List<Acao> acoesSelecionadas;

    @Column(nullable = false)
    private Long intervaloAtualizacaoMs;

    public Configuracao() {}

    public Configuracao(Long id, List<Acao> acoesSelecionadas, Long intervaloAtualizacaoMs) {
        this.id = id;
        this.acoesSelecionadas = acoesSelecionadas;
        this.intervaloAtualizacaoMs = intervaloAtualizacaoMs;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<Acao> getAcoesSelecionadas() { return acoesSelecionadas; }
    public void setAcoesSelecionadas(List<Acao> acoesSelecionadas) { this.acoesSelecionadas = acoesSelecionadas; }

    public Long getIntervaloAtualizacaoMs() { return intervaloAtualizacaoMs; }
    public void setIntervaloAtualizacaoMs(Long intervaloAtualizacaoMs) { this.intervaloAtualizacaoMs = intervaloAtualizacaoMs; }
}
