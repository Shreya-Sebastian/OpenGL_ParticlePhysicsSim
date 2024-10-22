#pragma once

#include <framework/disable_all_warnings.h>
DISABLE_WARNINGS_PUSH()
#include <glm/vec3.hpp>
DISABLE_WARNINGS_POP()


struct Config {
    // Particle simulation parameters
    uint32_t numParticles       = 25;
    float particleSimTimestep   = 0.014f;
    float particleRadius        = 0.45f;
    bool particleInterCollision = true;

    // Particle simulation flags
    bool doSingleStep           = false;
    bool doContinuousSimulation = true;
    bool doResetSimulation      = false;

    // Container sphere parameters
    glm::vec3 sphereCenter          = glm::vec3(0.0f);
    float sphereRadius              = 3.0f;
    glm::vec3 sphereColor           = glm::vec3(1.0f);

    // ===== Part 2: Drawing =====

    bool shading = false;
    float ambient = 0.2f;
    glm::vec3 baseColour = glm::vec3(0.f, 0.f, 1.f);

    bool velocityColouring = false;
    float maxVelocity = 8.f;
    
    glm::vec3 zeroColour = glm::vec3(0.f, 1.f, 0.f);
    glm::vec3 maxColour = glm::vec3(1.f, 0.f, 0.f);


    uint32_t collisionCounter = 10;
    uint32_t frameCounter = 3;

    bool blinking = false;



};
