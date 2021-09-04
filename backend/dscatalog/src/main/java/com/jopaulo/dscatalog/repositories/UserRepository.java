package com.jopaulo.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jopaulo.dscatalog.entities.Product;
import com.jopaulo.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
