package com.projeto.demo.controller;

import com.projeto.demo.dtos.FirewallDTO;
import com.projeto.demo.model.FirewallModel;
import com.projeto.demo.repository.FirewallRepository;
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

@RestController
@RequestMapping("/firewall")
@CrossOrigin(origins = "http://localhost:3000")
public class FirewallController {

  @Autowired
  private FirewallRepository firewallRepository;

  private FirewallModel addHateoasLinks(FirewallModel firewall) {
    Integer id = firewall.getId();
    firewall.add(linkTo(methodOn(FirewallController.class).getFirewallById(id)).withSelfRel());
    firewall.add(linkTo(methodOn(FirewallController.class).getAllFirewalls()).withRel("Lista de Firewalls"));
    return firewall;
  }

  @PostMapping
  public ResponseEntity<Object> saveFirewall(@RequestBody @Valid FirewallDTO firewallDTO) {
    try {

      if (firewallRepository.existsByDispositivo(firewallDTO.dispositivo())) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Dispositivo já cadastrado");
      }

      var firewallModel = new FirewallModel();
      BeanUtils.copyProperties(firewallDTO, firewallModel);
      firewallModel = firewallRepository.save(firewallModel);

      return ResponseEntity.status(HttpStatus.CREATED).body(addHateoasLinks(firewallModel));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o firewall");
    }
  }

  @GetMapping
  public ResponseEntity<List<FirewallModel>> getAllFirewalls() {
    List<FirewallModel> firewalls = firewallRepository.findAll();
    if (!firewalls.isEmpty()) {
      firewalls.forEach(this::addHateoasLinks); // Adiciona os links HATEOAS em cada Firewall
    }
    return ResponseEntity.status(HttpStatus.OK).body(firewalls);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getFirewallById(@PathVariable(value = "id") Integer id) {
    Optional<FirewallModel> firewallModel = firewallRepository.findById(id);
    if (firewallModel.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Firewall não encontrado");
    }
    return ResponseEntity.status(HttpStatus.OK).body(addHateoasLinks(firewallModel.get()));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateFirewall(@PathVariable(value = "id") Integer id,
      @RequestBody @Valid FirewallDTO firewallDTO) {
    Optional<FirewallModel> firewallModelOptional = firewallRepository.findById(id);
    if (firewallModelOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Firewall não encontrado");
    }

    var firewallModel = firewallModelOptional.get();
    BeanUtils.copyProperties(firewallDTO, firewallModel);
    firewallRepository.save(firewallModel);

    return ResponseEntity.status(HttpStatus.OK).body(addHateoasLinks(firewallModel));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteFirewall(@PathVariable(value = "id") Integer id) {
    Optional<FirewallModel> firewallModel = firewallRepository.findById(id);
    if (firewallModel.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Firewall não encontrado");
    }
    firewallRepository.delete(firewallModel.get());
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
