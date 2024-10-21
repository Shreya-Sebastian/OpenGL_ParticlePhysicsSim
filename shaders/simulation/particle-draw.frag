#version 410

uniform vec3 containerCenter;
uniform vec3 zeroColour;
uniform vec3 maxColour;
uniform float maxVelocity;
uniform vec3 baseColour;
uniform bool velocityColouring;
uniform float ambient; 
uniform bool shading; 
uniform int collisionCounter;
uniform int frameCounter;

layout(location = 0) in vec3 fragPosition;
layout(location = 1) in vec3 fragNormal;
layout(location = 2) in vec3 fragVelocity;
layout(location = 3) in vec3 fragBounceData;

layout(location = 0) out vec4 fragColor;

void main() {

    vec3 colour;
  
    // ===== Task 2.1 Speed-based Colors =====

    if(velocityColouring)
    {
        float speed = length(fragVelocity);
        float a = speed / maxVelocity;

        vec3 vcolour = mix(zeroColour, maxColour, a);
        colour = vcolour;
    }

    else 
    {
        colour = baseColour;
    }

    // ===== Task 2.2 Shading =====
    
    
    vec3 finalColour = colour;

    if(shading)
    {

        vec3 lightDir = normalize(containerCenter - fragPosition);

        vec3 normal = normalize(fragNormal);

        vec3 diffuse = max((dot(normal, lightDir)*colour), 0.f);
        finalColour = (ambient + diffuse) * colour;
    }

    fragColor = vec4(finalColour, 1.0);
}
