#version 410
#extension GL_ARB_explicit_uniform_location : enable

uniform sampler2D previousPositions;
uniform sampler2D previousVelocities;
uniform sampler2D previousBounceData;
uniform float timestep;
uniform uint numParticles;
uniform float particleRadius;
uniform vec3 containerCenter;
uniform float containerRadius;
uniform bool interParticleCollision;

layout(location = 0) out vec3 finalPosition;
layout(location = 1) out vec3 finalVelocity;
layout(location = 2) out vec3 finalBounceData;

void main() {
    // ===== Task 1.1 Verlet Integration =====

    vec3 acc = vec3(0.f, -9.81f, 0.f);

    float halfTexelStep = 1.0f / (float(numParticles) * 2.0f);
    vec2 particleIndex = vec2(((float(gl_FragCoord.x) + halfTexelStep )/ float(numParticles)) , 0.f);
    vec3 previousPos = texture2D(previousPositions, particleIndex).xyz;
    vec3 previousVel = texture2D(previousVelocities, particleIndex).xyz;
    vec3 previousBounceData = texture2D(previousBounceData, particleIndex).xyz;

    //Verlet integration (velocity variant)
    finalPosition = previousPos + timestep * previousVel + 0.5f * acc * pow(timestep, 2);
    finalVelocity = previousVel + 0.5f * (acc + acc) * timestep;

    int numCollisions = 0;

    // ===== Task 1.3 Inter-particle Collision =====
    if (interParticleCollision) {
        for (uint i = 0; i < numParticles; ++i) {
            // Skip self-collision
            if (i == gl_FragCoord.x) continue;
            
            vec2 otherParticleIndex = vec2((float(i) / float(numParticles)) + halfTexelStep, 0.f);
            vec3 otherParticlePosition = texture(previousPositions, otherParticleIndex).xyz;

            float dist = distance(finalPosition, otherParticlePosition);

            if(dist <= 2 * particleRadius) //colliding with other particle
            {
                numCollisions++;
                
                vec3 dirAway = previousPos - otherParticlePosition;
                dirAway = normalize(dirAway);

                float relOffset = particleRadius * 0.01f; 

                finalPosition += relOffset * dirAway;

                finalVelocity = reflect(finalVelocity, dirAway);
            }
        }
    }

    
    // ===== Task 1.2 Container Collision =====

    
    float dist = distance(containerCenter, finalPosition) + particleRadius;
    

    if (dist >= containerRadius){ //colliding with sphere
    
        vec3 dirToCenter = containerCenter - finalPosition;
    
        dirToCenter = normalize(dirToCenter);
        
        float relOffset = particleRadius * 0.01f; 
    
        finalPosition += relOffset * dirToCenter;
    
        finalVelocity = reflect(finalVelocity, dirToCenter);
    
    }

}
