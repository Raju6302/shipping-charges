package com.codewithvijay.fullstackbackend.controller;

import com.codewithvijay.fullstackbackend.exception.UserNotFoundException;
import com.codewithvijay.fullstackbackend.model.City;
import com.codewithvijay.fullstackbackend.model.User;
import com.codewithvijay.fullstackbackend.repository.CityRepository;
import com.codewithvijay.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        City city = cityRepository.findByName(newUser.getToCity());
        if (city != null) {
            double total = city.getValue() * newUser.getWeight();
            newUser.setTotal(total);
        }
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/cities")
    List<City> getAllCities() {
        return cityRepository.findAll();
    }


    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setMobileNumber(newUser.getMobileNumber());
                    user.setEmail(newUser.getEmail());
                    user.setFromCity(newUser.getFromCity());
                    user.setToCity(newUser.getToCity());
                    user.setWeight(newUser.getWeight());
                    user.setTotal(newUser.getTotal());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "user with id " + id + " has been deleted";
    }
}
