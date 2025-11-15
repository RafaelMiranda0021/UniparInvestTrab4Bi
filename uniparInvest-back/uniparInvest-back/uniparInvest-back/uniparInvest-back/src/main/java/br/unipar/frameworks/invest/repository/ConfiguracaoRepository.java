package br.unipar.frameworks.invest.repository;

import br.unipar.frameworks.invest.model.Configuracao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConfiguracaoRepository extends JpaRepository<Configuracao, Long> {

    Optional<Configuracao> findByUsuarioId(Long usuarioId);
}