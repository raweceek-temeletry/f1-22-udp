
export interface CarMotionData {
    m_worldPositionX: number           // World space X position
    m_worldPositionY: number           // World space Y position
    m_worldPositionZ: number           // World space Z position
    m_worldVelocityX: number           // Velocity in world space X
    m_worldVelocityY: number           // Velocity in world space Y
    m_worldVelocityZ: number           // Velocity in world space Z
    m_worldForwardDirX: number         // World space forward X direction (normalised)
    m_worldForwardDirY: number         // World space forward Y direction (normalised)
    m_worldForwardDirZ: number         // World space forward Z direction (normalised)
    m_worldRightDirX: number           // World space right X direction (normalised)
    m_worldRightDirY: number           // World space right Y direction (normalised)
    m_worldRightDirZ: number           // World space right Z direction (normalised)
    m_gForceLateral: number            // Lateral G-Force component
    m_gForceLongitudinal: number       // Longitudinal G-Force component
    m_gForceVertical: number           // Vertical G-Force component
    m_yaw: number                      // Yaw angle in radians
    m_pitch: number                    // Pitch angle in radians
    m_roll: number                     // Roll angle in radians
}

