package br.unipar.frameworks.invest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Acao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empresa;
    private String ticker;
    private String descricao;
}