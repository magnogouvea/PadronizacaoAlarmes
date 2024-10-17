package com.projetopessoal.pradonizacaoalarmes.controller;

import com.projetopessoal.pradonizacaoalarmes.dtos.FirewallDTO;
import com.projetopessoal.pradonizacaoalarmes.model.FirewallModel;
import com.projetopessoal.pradonizacaoalarmes.repository.FirewallRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = {"http://localhost:3000", "https://seusite.com"}) 
@RestController
@RequestMapping("/api/firewall")
@Slf4j
public class FirewallController {
    @Autowired
    private FirewallService firewallService;

    
    private FirewallModel addHateoasLinks(FirewallModel firewall) {
        Integer id = firewall.getId();
        firewall.add(linkTo(methodOn(FirewallController.class).getFirewallById(id)).withSelfRel());
        firewall.add(linkTo(methodOn(FirewallController.class).getAllFirewalls(Pageable.unpaged(), null)).withRel("Lista de Firewalls"));
        return firewall;
    }

    
    @PostMapping
    public ResponseEntity<FirewallModel> saveFirewall(@RequestBody @Valid FirewallDTO firewallDTO) {
        log.info("Recebida requisição para salvar firewall: {}", firewallDTO.dispositivo());
        FirewallModel savedFirewall = firewallService.saveFirewall(firewallDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(addHateoasLinks(savedFirewall));
    }

    
    @GetMapping
    public ResponseEntity<Page<FirewallModel>> getAllFirewalls(Pageable pageable, @RequestParam(required = false) String filtro) {
        log.info("Recebida requisição para listar todos os firewalls com filtro: {}", filtro);
        Page<FirewallModel> firewalls = firewallService.getAllFirewalls(pageable, filtro);
        firewalls.getContent().forEach(this::addHateoasLinks);
        return ResponseEntity.ok(firewalls);
    }

 
    @GetMapping("/{id}")
    public ResponseEntity<FirewallModel> getFirewallById(@PathVariable(value = "id") Integer id) {
        log.info("Recebida requisição para buscar firewall por ID: {}", id);
        FirewallModel firewall = firewallService.getFirewallById(id);
        return ResponseEntity.ok(addHateoasLinks(firewall));
    }


    @PutMapping("/{id}")
    public ResponseEntity<FirewallModel> updateFirewall(@PathVariable(value = "id") Integer id,
                                                        @RequestBody @Valid FirewallDTO firewallDTO) {
        log.info("Recebida requisição para atualizar firewall com ID: {}", id);
        FirewallModel updatedFirewall = firewallService.updateFirewall(id, firewallDTO);
        return ResponseEntity.ok(addHateoasLinks(updatedFirewall));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFirewall(@PathVariable(value = "id") Integer id) {
        log.info("Recebida requisição para deletar firewall com ID: {}", id);
        firewallService.deleteFirewall(id);
        return ResponseEntity.noContent().build();
    }
}

