package br.unipar.frameworks.invest.model; 

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
public class Configuracao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "configuracao_acao",
        joinColumns = @JoinColumn(name = "configuracao_id"),
        inverseJoinColumns = @JoinColumn(name = "acao_id")
    )
    private List<Acao> acoesSelecionadas;

    private int intervaloAtualizacaoMs;

    @OneToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "usuario_id", unique = true) 
    private Usuario usuario;
}