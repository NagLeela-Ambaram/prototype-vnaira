### clock diagram code for Vnaira prototype with unity webGL
```mermaid
graph TD
    subgraph Browser_Environment [Browser Environment]
        subgraph React_UI_Layer [React UI Layer]
            User_Input[User Interaction: Mouse/Touch]
            UI_Overlay[White-Label UI: Controls/Buttons]
            Bridge_API[Unity WebGL Context/Bridge]
        end

        subgraph Unity_Engine_Layer [Unity WebGL Engine]
            Room_Logic[Studio Room: Lights/Environment]
            Avatar_Controller[Avatar: Rotation & Input Logic]
            GLTF_Loader[GLTFast: Runtime Model Loader]
            Skinning_Engine[Skinning Logic: Mesh to Bone Binding]
        end
    end

    subgraph External_Assets [Storage]
        TSHIRT_GLTF[.gltf T-Shirt File]
        AVATAR_FBX[Avatar Base Model]
    end

    %% Data Flow
    User_Input --> UI_Overlay
    UI_Overlay --> Bridge_API
    Bridge_API -- "SendMessage: LoadModel(URL)" --> GLTF_Loader
    Bridge_API -- "SendMessage: SetRotation(float)" --> Avatar_Controller
    
    GLTF_Loader <-- "Fetch Asset" --> TSHIRT_GLTF
    GLTF_Loader --> Skinning_Engine
    Skinning_Engine -- "Attach to Bones" --> Avatar_Controller
    
    Avatar_Controller --> Room_Logic
