package br.unipar.frameworks.invest.repository;

import br.unipar.frameworks.invest.model.Acao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcaoRepository extends JpaRepository<Acao, Long> {
}