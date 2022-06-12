import {PacketHeader} from '../../PacketHeader/PacketHeader';

interface CarMotionData {
  m_worldPositionX: number; // World space X position
  m_worldPositionY: number; // World space Y position
  m_worldPositionZ: number; // World space Z position
  m_worldVelocityX: number; // Velocity in world space X
  m_worldVelocityY: number; // Velocity in world space Y
  m_worldVelocityZ: number; // Velocity in world space Z
  m_worldForwardDirX: number; // World space forward X direction (normalised)
  m_worldForwardDirY: number; // World space forward Y direction (normalised)
  m_worldForwardDirZ: number; // World space forward Z direction (normalised)
  m_worldRightDirX: number; // World space right X direction (normalised)
  m_worldRightDirY: number; // World space right Y direction (normalised)
  m_worldRightDirZ: number; // World space right Z direction (normalised)
  m_gForceLateral: number; // Lateral G-Force component
  m_gForceLongitudinal: number; // Longitudinal G-Force component
  m_gForceVertical: number; // Vertical G-Force component
  m_yaw: number; // Yaw angle in radians
  m_pitch: number; // Pitch angle in radians
  m_roll: number; // Roll angle in radians
}

export interface PacketMotionData {
  m_header: PacketHeader; // Header
  m_carMotionData: CarMotionData[]; // Data for all cars on track

  // Extra player car ONLY data
  m_suspensionPosition: number[]; // Note: All wheel arrays have the following order:
  m_suspensionVelocity: number[]; // RL, RR, FL, FR
  m_suspensionAcceleration: number[]; // RL, RR, FL, FR
  m_wheelSpeed: number[]; // Speed of each wheel
  m_wheelSlip: number[]; // Slip ratio for each wheel
  m_localVelocityX: number; // Velocity in local space
  m_localVelocityY: number; // Velocity in local space
  m_localVelocityZ: number; // Velocity in local space
  m_angularVelocityX: number; // Angular velocity x-component
  m_angularVelocityY: number; // Angular velocity y-component
  m_angularVelocityZ: number; // Angular velocity z-component
  m_angularAccelerationX: number; // Angular velocity x-component
  m_angularAccelerationY: number; // Angular velocity y-component
  m_angularAccelerationZ: number; // Angular velocity z-component
  m_frontWheelsAngle: number; // Current front wheels angle in radians
}
