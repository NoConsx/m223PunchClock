package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.AppUser;
import ch.zli.m223.punchclock.repository.UserRepository;
import ch.zli.m223.punchclock.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.BadRequestException;
import java.security.Principal;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserService userService;

    public UserController(UserRepository applicationUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder, UserService userService) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
    }

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.OK)
    public void signUp(@RequestBody AppUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        if (user.getUsername().toLowerCase().equals("admin")) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }
        applicationUserRepository.save(user);
    }

    @GetMapping("/currentUser")
    public AppUser getCurrentUser(Principal user) {
        return userService.retrieveUserByUsername(user.getName());
    }

    @GetMapping("/allUsers")
    public List<String> retrieveUsers(Principal user) {
        AppUser applicationUser = userService.retrieveUserByUsername(user.getName());
        if (!applicationUser.getRole().equals("ADMIN")) {
            throw new BadRequestException();
        }
        return applicationUserRepository.findAll().stream().map(AppUser::getUsername).collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppUser createUser(@RequestBody AppUser applicationUser, Principal user) {
        AppUser _applicationUser = userService.retrieveUserByUsername(user.getName());
        if (!_applicationUser.getRole().equals("ADMIN")) {
            throw new BadRequestException();
        }
        return applicationUserRepository.save(applicationUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable long id, Principal user) {
        AppUser applicationUser = userService.retrieveUserByUsername(user.getName());
        if (!applicationUser.getRole().equals("ADMIN")) {
            throw new BadRequestException();
        }
        if (applicationUserRepository.findById(id) == null) {
            throw new BadRequestException();
        }
        applicationUserRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppUser updateUser(@PathVariable long id, @Valid @RequestBody AppUser updatedUser, Principal user) {
        AppUser applicationUser = userService.retrieveUserByUsername(user.getName());
        if (!applicationUser.getRole().equals("ADMIN")) {
            throw new BadRequestException();
        }
        if (applicationUserRepository.findById(id) == null) {
            throw new BadRequestException();
        }
        Optional<AppUser> _updatedUser = applicationUserRepository.findById(id);
        _updatedUser.get().setUsername(updatedUser.getUsername());
        _updatedUser.get().setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
        _updatedUser.get().setRole(updatedUser.getRole());
        return applicationUserRepository.save(_updatedUser.get());
    }

}