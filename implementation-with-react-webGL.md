### clock diagram code for Vnaira prototype with react webGL
```mermaid
graph TD
    subgraph Browser_Runtime [Browser Runtime: React Application]
        subgraph UI_Layer [Standard React / HTML]
            UI_Controls[Brand Configurator UI]
            State_Mgmt[Redux / Zustand State]
        end

        subgraph Three_Canvas [R3F Canvas / 3D Scene]
            direction TB
            Stage[Studio: Environment/Lights]
            Orbit[OrbitControls: Mouse Rotation]
            
            subgraph Avatar_Group [Avatar & Clothing]
                Base_Avatar[Avatar Mesh & Skeleton]
                Clothing_Mesh[T-Shirt Mesh]
                Bones_Linker[useFrame / SkinnedMesh logic]
            end
        end
    end

    subgraph Assets_CDN [Assets CDN]
        GLTF_Loader[useGLTF: Loads .gltf Assets]
    end

    %% Flow
    UI_Controls --> State_Mgmt
    State_Mgmt -- "Prop Changes" --> Three_Canvas
    GLTF_Loader -- "Async Load" --> Base_Avatar
    GLTF_Loader -- "Async Load" --> Clothing_Mesh
    Clothing_Mesh -- "Map to Skeleton" --> Base_Avatar
